const express = require("express");
const router = express.Router();
const admin = require("../../config/database/firebaseAdmin");
const userTokenModel = require("../models/userTokenModel"); 

// Endpoint để gửi thông báo bằng email
router.post("/send", async (req, res) => {
  const { email, title, body } = req.body;

  try {
    // Tìm FCM token từ email của người dùng
    const fcmToken = await userTokenModel.findTokenByEmail(email);
    if (!fcmToken) {
      return res.status(404).send({ success: false, message: "FCM token không tồn tại cho email này." });
    }

    // Cấu hình thông báo
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: fcmToken,
    };

    // Gửi thông báo
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    console.error("Lỗi khi gửi thông báo:", error);
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = router;
