const express = require("express");
const router = express.Router();

router.post("/kick", (req, res) => {
  const { target, reason } = req.body;

  console.log("KICK REQUEST:", {
    target,
    reason
  });

  res.json({
    success: true,
    message: "Kick request received"
  });
});

module.exports = router;
app.use("/api", require("./actions/kick.server"));
