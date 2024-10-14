const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authService = {
  signup: async (userData) => {
    try {
      const existingUser = await User.findByEmail(userData.email);
      if (existingUser) {
        throw new Error("Email already exists. Please use a different email.");
      }

      const hashedPassword = await bcrypt.hash(userData.password, 8); // Giảm salt rounds
      userData.password = hashedPassword;
      userData.role = userData.role || "student";

      const user = await User.create(userData);
      return { message: "User created successfully", user };
    } catch (error) {
      throw new Error("User registration failed. Please try again later.");
    }
  },

  login: async (userData) => {
    try {
      const user = await User.findByEmail(userData.email);
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(
        userData.password,
        user.HashPassword
      );
      if (!isMatch) throw new Error("Invalid password");

      const token = jwt.sign(
        { id: user.UserID, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return { message: "Login successful", token };
    } catch (error) {
      throw new Error(error.message || "Login failed. Please try again later.");
    }
  },
};

module.exports = authService;
