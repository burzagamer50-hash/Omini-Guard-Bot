import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// نخزن أمر الطرد مؤقتًا
let kickQueue = null;

/*
  إرسال أمر Kick من الموقع
  body:
  {
    username: "PlayerName",
    reason: "Reason text"
  }
*/
app.post("/kick", (req, res) => {
  const { username, reason } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "username is required"
    });
  }

  kickQueue = {
    action: "kick",
    username: username,
    reason: reason || "You have been kicked"
  };

  console.log("🚨 Kick queued:", kickQueue);

  res.json({
    success: true
  });
});

/*
  Roblox يسحب الأمر من هنا
*/
app.get("/poll", (req, res) => {
  if (!kickQueue) {
    return res.json({});
  }

  const data = kickQueue;
  kickQueue = null;

  console.log("📤 Kick sent to Roblox:", data);
  res.json(data);
});

/*
  فحص سريع
*/
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Server running on port", PORT);
});


