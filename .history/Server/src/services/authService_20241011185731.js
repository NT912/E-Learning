import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "~/models/User";

export const authService = {
  signup: async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = await User.create(userData);
    return user;
  },

  login: async (userData) => {
    try {
      const user = await User.findByEmail(userData.email);
      if (!user) throw new Error("User not found");

      // So sánh mật khẩu
      const isMatch = await bcrypt.compare(
        userData.password,
        user.HashPassword
      );
      if (!isMatch) throw new Error("Invalid password");

      // Tạo JWT
      const token = jwt.sign(
        { id: user.UserID, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return token;
    } catch (err) {
      console.error("Error during login:", err);
      throw new Error(err.message);
    }
  },
};
