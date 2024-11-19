const Discussion = require("../models/DiscussionModel");
const DiscussionReply = require("../models/DiscussionReplyModel");

const discussionService = {
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
