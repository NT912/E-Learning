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
        email: profile.Email || "Chưa có",
        phoneNumber: profile.PhoneNumber || "Chưa có",
        about: profile.About || "Chưa có",
        avatar: profile.AvatarLink || "Chưa có",
        bankName: profile.BankName || "Chưa có",
        bankAccountNumber: profile.BankAccountNumber || "Chưa có",
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
   updateProfile = async (userId, profileData) => {
  let query = "UPDATE user SET ";

  // Lọc các trường cần cập nhật, bỏ qua các trường không thay đổi
  let fieldsToUpdate = [];
  let values = [];

  if (profileData.Name) {
    fieldsToUpdate.push("Name = ?");
    values.push(profileData.Name);
  }

  if (profileData.AvatarLink) {
    fieldsToUpdate.push("AvatarLink = ?");
    values.push(profileData.AvatarLink);
  }

  // Thêm các trường khác nếu có
  if (profileData.Email) {
    fieldsToUpdate.push("Email = ?");
    values.push(profileData.Email);
  }

  // Nếu không có trường nào để cập nhật, trả về lỗi
  if (fieldsToUpdate.length === 0) {
    throw new Error("No valid fields to update");
  }

  // Tạo câu lệnh SQL để cập nhật thông tin vào bảng user
  query += fieldsToUpdate.join(", ") + " WHERE UserID = ?";
  values.push(userId);

  try {
    // Thực thi câu lệnh SQL
    const [result] = await db.execute(query, values); // db.execute là phương thức để chạy câu lệnh SQL
    return result;
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
},
};

module.exports = profileController;
