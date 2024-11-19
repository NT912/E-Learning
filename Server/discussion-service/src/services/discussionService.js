const Discussion = require("../models/DiscussionModel");
const DiscussionReply = require("../models/DiscussionReplyModel");
const axios = require("axios");

const discussionService = {
  verifyCourseID: async (courseID) => {
    try {
      const response = await axios.get(
        `http://course-service/courses/${courseID}`
      );
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying CourseID:", error.message);
      return false;
    }
  },

  verifyUserID: async (userID) => {
    try {
      const response = await axios.get(`http://user-service/users/${userID}`);
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying UserID:", error.message);
      return false;
    }
  },

  createDiscussion: (courseID, userID, content) => {
    return Discussion.create({ courseID, userID, content });
  },

  getDiscussions: (courseID) => {
    return Discussion.findByCourseID(courseID);
  },

  updateDiscussion: (discussionID, userID, content) => {
    return Discussion.update(discussionID, userID, content);
  },

  deleteDiscussion: (discussionID, userID) => {
    return Discussion.delete(discussionID, userID);
  },

  createReply: (discussionID, userID, content) => {
    return DiscussionReply.create({ discussionID, userID, content });
  },

  getReplies: (discussionID) => {
    return DiscussionReply.findByDiscussionID(discussionID);
  },

  updateReply: (replyID, userID, content) => {
    return DiscussionReply.update(replyID, userID, content);
  },

  deleteReply: (replyID, userID) => {
    return DiscussionReply.delete(replyID, userID);
  },
};

module.exports = discussionService;
