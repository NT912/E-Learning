const ProfileService = require("../services/ProfileService");
const sendResponse = require("../helpers/sendResponse");
const messages = require("../../config/message.json");
const firebaseHelper = require("../helpers/firebaseHelper");

const profileController = {
  getProfile: async (req, res) => {
    try {
      const { id: userId } = req.user;

      // Lấy thông tin profile hiện tại từ cơ sở dữ liệu
      const profile = await ProfileService.getProfile(userId);

      // Trả về thông tin với các giá trị mặc định nếu không có thông tin
      const profileData = {
        email: profile.email || "Chưa có",
        phoneNumber: profile.phoneNumber || "Chưa có",
        about: profile.about || "Chưa có",
        avatar: profile.avatar || "Chưa có",
        bankName: profile.bankName || "Chưa có",
        bankAccountNumber: profile.bankAccountNumber || "Chưa có",
      };

      return sendResponse(
        res,
        true,
        messages.profile.fetchSuccess.title,
        messages.profile.fetchSuccess.description,
        profileData
      );
    } catch (error) {
      return sendResponse(
        res,
        false,
        messages.profile.fetchError.title,
        error.message
      );
    }
  },

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
