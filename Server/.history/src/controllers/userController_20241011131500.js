import { User } from "~/models/User";
import { courseService } from "~/services/courseService";

const getUserProfile = (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).send("User not authenticated");
  }

  const userId = req.user.id;
  User.findById(userId, (err, user) => {
    if (err) return res.status(500).send("Error fetching user profile");
    res.status(200).json(user);
  });
};

export const userController = {
  getUserProfile,
};
