const express = require("express");
const noblox = require("noblox.js");
const cors = require("cors");

const app = express();

/* =========================
   Middlewares
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Roblox Login (Production)
========================= */
// حط Cookie في Environment Variable على Render
// ROBLOX_COOKIE=your_cookie_here

(async () => {
  try {
    await noblox.setCookie(process.env.ROBLOX_COOKIE);
    const currentUser = await noblox.getCurrentUser();
    console.log("🤖 Logged in as:", currentUser.UserName);
  } catch (err) {
    console.error("❌ Roblox login failed");
  }
})();

/* =========================
   SCAN USER (موجود عندك)
   GET /scan?username=
========================= */
app.get("/scan", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ success: false });
  }

  try {
    const userId = await noblox.getIdFromUsername(username);
    const thumb = await noblox.getPlayerThumbnail(
      userId,
      "150x150",
      "png",
      false,
      "Headshot"
    );

    res.json({
      success: true,
      username,
      userId,
      imageUrl: thumb[0].imageUrl
    });
  } catch (err) {
    res.json({ success: false });
  }
});

/* =========================
   KICK REQUEST (Official)
   POST /api/kick
========================= */
app.post("/api/kick", async (req, res) => {
  const { target, reason } = req.body;

  if (!target || !reason) {
    return res.status(400).json({
      success: false,
      message: "Missing target or reason"
    });
  }

  let userId;

  try {
    // لو دخل ID مباشرة
    if (!isNaN(target)) {
      userId = Number(target);
    } else {
      // لو دخل Username
      userId = await noblox.getIdFromUsername(target);
    }

    console.log("🚨 KICK REQUEST");
    console.log("UserId:", userId);
    console.log("Reason:", reason);

    /*
      هنا ما نسوي Kick مباشر
      لأن الطرد الحقيقي يتم داخل Roblox عبر HttpService
      (الخطوة الجاية)
    */

    res.json({
      success: true,
      message: "Kick request accepted",
      userId
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to resolve user"
    });
  }
});

/* =========================
   Server Start (Render)
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("📡 Server running on port", PORT);
});

