const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = (req, res) => {
  const { email, password, role } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send("Server error");
    User.create({ email, password: hash, role }, (err, result) => {
      if (err) return res.status(400).send("Error creating user");
      res.status(201).send("User created");
    });
  });
};

// exports.login = (req, res) => {
//   const { email, password } = req.body;
//   User.findByEmail(email, (err, users) => {
//     const user = users[0];
//     if (err || !user) return res.status(404).send("User not found");
//     bcrypt.compare(password, user.HashPassword, (err, isMatch) => {
//       console.log(`${password}`);
//       console.log(`${user.HashPassword}`);

//       if (!isMatch) return res.status(401).send("Invalid password");
//       const token = jwt.sign(
//         { id: user.UserID, role: user.Role },
//         process.env.JWT_SECRET,
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({ token });
//     });
//   });
// };

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Tìm người dùng dựa trên email
  User.findByEmail(email, (err, users) => {
    const user = users[0];
    if (!user) return res.status(404).send("User not found");

    // So sánh mật khẩu người dùng nhập với mật khẩu đã băm
    bcrypt.compare(password, user.HashPassword, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).send("Invalid password");

      // Mật khẩu hợp lệ, tạo token và trả về thông tin người dùng
      const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    });
  });
};
