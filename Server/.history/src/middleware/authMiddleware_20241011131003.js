import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra nếu không có header authorization
  if (!authHeader) {
    return res.status(403).send("Token required");
  }

  const token = authHeader.split(" ")[1]; // Giả sử token đi kèm với 'Bearer <token>'

  if (!token) {
    return res.status(403).send("Token missing");
  }

  // Giải mã token và gán thông tin người dùng vào req.user
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    req.user = decoded; // Gán thông tin người dùng vào req.user
    next(); // Chuyển tiếp đến middleware tiếp theo
  });
};

// Export hàm verifyToken
export { verifyToken };
