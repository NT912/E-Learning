import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send("Token required");
  }

  const token = authHeader.split(" ")[1]; // Giả sử token đi kèm với 'Bearer ' trước
  if (!token) {
    return res.status(403).send("Token missing");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    // Gán thông tin người dùng vào req.user
    req.user = decoded;
    next();
  });
};

export { verifyToken };
