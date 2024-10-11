import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kiểm tra nếu không có header authorization
  console.log("Authorization Header:", authHeader); // In ra để kiểm tra

  if (!authHeader) {
    return res.status(403).send("Token required");
  }

  const token = authHeader.split(" ")[1]; // Giả sử token đi kèm với 'Bearer <token>'
  console.log("Extracted Token:", token); // In ra để kiểm tra

  if (!token) {
    return res.status(403).send("Token missing");
  }

  // Giải mã token và gán thông tin người dùng vào req.user
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    console.log("Decoded Token:", decoded); // In ra thông tin đã giải mã
    req.user = decoded; // Gán thông tin người dùng vào req.user
    next(); // Chuyển tiếp đến middleware tiếp theo
  });
};

export { verifyToken };
