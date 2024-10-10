import { jwt } from "jsonwebtoken";

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).send("Token required");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send("Invalid token");
    req.user = decoded;
    next();
  });
};