const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");

const authService = {
  signup: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Set default role as 'student'
    userData.role = userData.role || "student";

    const user = await User.create(userData);
    return { message: "User created successfully", user };
  },

  login: async (userData) => {
    const user = await User.findByEmail(userData.email);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(userData.password, user.HashPassword);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.UserID, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return { message: "Login successful", token };
  },
};

module.exports = authService;
