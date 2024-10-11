const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Đăng ký
exports.signup = (req, res) => {
  const { email, password, full_name, phone_number, role } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const userData = {
      email,
      password_hash: hash,
      full_name,
      phone_number,
      role,
      avatar: null,
    };

    User.create(userData, (err, result) => {
      if (err) return res.status(500).json({ message: "Error creating user" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Đăng nhập
exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, users) => {
    if (err || users.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = users[0];
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (!result)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        "secret_key",
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    });
  });
};
