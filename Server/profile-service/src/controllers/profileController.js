const ProfileService = require("../services/ProfileService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");
const firebaseHelper = require("../helpers/firebaseHelper");

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const profileData = { ...req.body };

      // Kiểm tra nếu có file avatar được tải lên
      if (req.file) {
        const avatarUrl = await firebaseHelper.uploadAvatarUser(req.file);
        profileData.AvatarLink = avatarUrl;
      }

      const updatedProfile = await ProfileService.updateProfile(
        userId,
        profileData
      );

      return sendResponse(
        res,
        true,
        messages.profile.updateSuccess.title,
        messages.profile.updateSuccess.description,
        updatedProfile
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.profile.updateError.title,
        error.message
      );
    }
  },
};

module.exports = profileController;
