const userTokenModel = require('../models/userTokenModel');

const userTokenService = {
  saveToken: async (userId, fcmToken, deviceType) => {
    try {
      await userTokenModel.saveToken(userId, fcmToken, deviceType);
    } catch (error) {
      console.error("Error saving FCM token:", error);
      throw new Error("Unable to save FCM token");
    }
  },
};

module.exports = userTokenService;
