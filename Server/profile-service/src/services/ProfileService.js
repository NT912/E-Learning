const User = require("../models/UserModel");

const ProfileService = {
  updateProfile: async (userId, profileData) => {
    const updates = {};
    for (const key in profileData) {
      if (profileData[key]) updates[key] = profileData[key];
    }

    return await User.updateUserProfile(userId, updates);
  },
};

module.exports = ProfileService;
