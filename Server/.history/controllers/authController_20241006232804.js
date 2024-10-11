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

  // Kiểm tra nếu email hoặc password trống
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  User.findByEmail(email, (err, users) => {
    if (err) {
      return res.status(500).send("Server error");
    }

    const user = users[0];
    if (!user) {
      return res.status(404).send("User not found");
    }

    // So sánh mật khẩu
    bcrypt.compare(password, user.HashPassword, (err, isMatch) => {
      if (err) {
        console.log("Error comparing passwords:", err);
        return res.status(500).send("Error while comparing passwords");
      }

      // Debugging: Kiểm tra mật khẩu và hash
      console.log(`Entered Password: ${password}`);
      console.log(`Stored Hashed Password: ${user.HashPassword}`);

      if (!isMatch) {
        console.log("Passwords do not match.");
        return res.status(401).send("Invalid password");
      }

      // Mật khẩu hợp lệ, tạo JWT
      const token = jwt.sign(
        { id: user.UserID, role: user.Role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token });
    });
  });
};
