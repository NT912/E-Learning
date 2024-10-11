import { Discussion } from "~/models/Discussion";

const createDiscussion = (req, res) => {
  const { content, userID, videoID, courseID } = req.body;
  Discussion.create({ content, userID, videoID, courseID }, (err, result) => {
    if (err) return res.status(400).send("Error creating discussion");
    res.status(201).send("Discussion created");
  });
};

const getDiscussionsByCourse = (req, res) => {
  const { courseID } = req.params;
  Discussion.getByCourseID(courseID, (err, discussions) => {
    if (err) return res.status(500).send("Error fetching discussions");
    res.status(200).json(discussions);
  });
};

export const discussionController = {
  createDiscussion,
  getDiscussionsByCourse,
};
