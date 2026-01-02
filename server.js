// server.js
const express = require("express");
const cors = require("cors");
const noblox = require("noblox.js"); // optional: used only if ROBLOX_COOKIE set
const { createClient } = require("@supabase/supabase-js"); // optional

const app = express();
app.use(cors());
app.use(express.json());

/* ========== Environment ========== */
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";    // required for admin requests
const POLL_KEY = process.env.POLL_KEY || "";          // required for Roblox poll
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "";

/* ========== Optional Supabase ========== */
let supabase = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  console.log("✅ Supabase client initialized");
}

/* ========== Optional noblox login (if you set ROBLOX_COOKIE) ========== */
if (process.env.ROBLOX_COOKIE) {
  (async () => {
    try {
      await noblox.setCookie(process.env.ROBLOX_COOKIE);
      const me = await noblox.getCurrentUser();
      console.log("🤖 noblox logged in as", me.UserName);
    } catch (err) {
      console.error("❌ noblox login failed:", err.message || err);
    }
  })();
}

/* ========== In-memory queue (simple) ========== */
// Each item: { id, action, targetName, userId, reason, durationSec, createdAt, createdBy }
const pendingActions = [];

/* helper: generate id */
function genId() {
  return Date.now().toString(36) + "-" + Math.floor(Math.random()*1e6).toString(36);
}

/* ========== Middleware: simple admin auth for POSTs ========== */
function requireAdmin(req, res, next) {
  const token = req.headers["x-admin-token"] || req.query.admin_token || "";
  if (!ADMIN_TOKEN) {
    // dev: allow if not set (but warn)
    console.warn("⚠️ ADMIN_TOKEN not set — admin auth is disabled!");
    return next();
  }
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
}

/* ========== Endpoints ========== */

/**
 * GET /scan?username=...
 * (you had this before) - keep it but optional
 */
app.get("/scan", async (req, res) => {
  const username = req.query.username;
  if (!username) return res.status(400).json({ success: false, message: "username required" });

  try {
    // try noblox if available to get userId and thumbnail
    if (process.env.ROBLOX_COOKIE) {
      const userId = await noblox.getIdFromUsername(username);
      const thumb = await noblox.getPlayerThumbnail(userId, "150x150", "png", false, "Headshot");
      return res.json({
        success: true,
        username,
        userId,
        imageUrl: thumb?.[0]?.imageUrl || null
      });
    } else {
      // noblox not available: return username only
      return res.json({ success: true, username });
    }
  } catch (err) {
    return res.json({ success: false, message: "scan failed" });
  }
});

/**
 * POST /api/action
 * body: { action: "kick"|"ban"|"permaban"|"blacklist", target: usernameOrId, reason, durationSec? }
 * header: x-admin-token: ADMIN_TOKEN
 */
app.post("/api/action", requireAdmin, async (req, res) => {
  const { action, target, reason, durationSec } = req.body;
  if (!action || !target) {
    return res.status(400).json({ success: false, message: "action and target required" });
  }

  // normalize
  const act = String(action).toLowerCase();
  const allowed = ["kick", "ban", "permaban", "blacklist"];
  if (!allowed.includes(act)) {
    return res.status(400).json({ success: false, message: "invalid action" });
  }

  // try resolve userId if noblox available and target is username
  let userId = null;
  let targetName = String(target);

  try {
    if (process.env.ROBLOX_COOKIE && isNaN(target)) {
      userId = await noblox.getIdFromUsername(targetName);
    } else if (!isNaN(target)) {
      userId = Number(target);
    }
  } catch (err) {
    console.warn("⚠ could not resolve userId via noblox:", err.message || err);
    // we'll still enqueue with targetName and let Roblox resolve by name
  }

  const id = genId();
  const entry = {
    id,
    action: act,
    targetName,
    userId,
    reason: reason || "",
    durationSec: durationSec ? Number(durationSec) : null,
    createdAt: new Date().toISOString(),
    createdBy: req.headers["x-admin-name"] || "web-admin"
  };

  pendingActions.push(entry);
  console.log("➕ Enqueued action:", entry);

  // log to supabase if configured
  if (supabase) {
    (async () => {
      try {
        await supabase.from("moderation_logs").insert([{
          id: entry.id,
          action: entry.action,
          target_userid: entry.userId,
          target_name: entry.targetName,
          reason: entry.reason,
          duration_sec: entry.durationSec,
          created_by: entry.createdBy,
          created_at: entry.createdAt
        }]);
      } catch (e) {
        console.warn("Supabase log failed:", e.message || e);
      }
    })();
  }

  return res.json({ success: true, id });
});

/**
 * Legacy compatibility: POST /api/kick  (keeps your existing frontend working)
 * body: { target, reason }
 */
app.post("/api/kick", requireAdmin, async (req, res) => {
  const { target, reason } = req.body;
  if (!target) return res.status(400).json({ success:false });
  // reuse the general endpoint behavior:
  req.body.action = "kick";
  req.body.durationSec = null;
  return app._router.handle(req, res, () => {});
});

/**
 * GET /api/poll?key=...
 * Roblox will poll this. Return the next pending action (FIFO) and remove it from queue.
 * Require ?key=POLL_KEY for simple auth.
 */
app.get("/api/poll", (req, res) => {
  const key = req.query.key || "";
  if (!POLL_KEY) {
    console.warn("⚠ POLL_KEY not set — poll auth disabled!");
  } else if (key !== POLL_KEY) {
    return res.status(401).json({});
  }

  if (pendingActions.length === 0) return res.json({});

  const next = pendingActions.shift();
  console.log("⇨ Dispatching to Roblox:", next);
  return res.json(next);
});

/* Health */
app.get("/health", (req, res) => res.json({ status: "ok" }));

/* ========== Start server ========== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("📡 Server running on port", PORT);
});
