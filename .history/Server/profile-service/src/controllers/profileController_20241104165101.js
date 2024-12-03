const profileService = require("../services/profileService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");

const profileController = {
  updateProfile: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const updatedProfile = await profileService.updateProfile(
        userId,
        req.body
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
