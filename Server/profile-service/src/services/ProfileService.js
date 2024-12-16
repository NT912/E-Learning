const User = require("../models/UserModel");

const ProfileService = {
  getProfile: async (userId) => {
    return await User.getUserProfile(userId);
  },

  updateProfile: async (userId, profileData) => {
    const updates = {};
    for (const key in profileData) {
      if (profileData[key]) updates[key] = profileData[key];
    }

    return await User.updateUserProfile(userId, updates);
  },
};

module.exports = ProfileService;
