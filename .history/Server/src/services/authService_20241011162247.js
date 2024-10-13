import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "~/models/User";

export const authService = {
  signup: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) return callback("Error hashing password");
      userData.password = hash;
      User.create(userData, callback);
    });
  },

  login: (userData, callback) => {
    User.findByEmail(userData.email, (err, user) => {
      if (!user) return callback("User not found");

      bcrypt.compare(userData.password, user.HashPassword, (err, isMatch) => {
        if (!isMatch) return callback("Invalid password");
        const token = jwt.sign(
          { id: user.UserID, role: user.Role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        callback(null, token);
      });
    });
  },
};
