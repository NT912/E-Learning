import { User } from "~/models/User";

const getUserProfile = (req, res) => {
  const userId = req.user.id;
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send("Error fetching user profile");
    res.status(200).json(user);
  });
};
