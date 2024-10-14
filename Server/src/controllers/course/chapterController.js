const courseService = require("~/services/courseService");
const message = require('~/config/message.json');

const sendResponse = (res, success, title, description = null) => {
  res.status(success ? 201 : 400).send({
    success,
    title,
    description,
  });
};

const chapterController = {
    create: async (req, res) => {
        const courseID = req.body.courseID;
        const chapterName = req.body.chapterName;
        const userID = req.body.userID;

        if (!courseID || !chapterName || userID) {
            return sendResponse(
                res,
                false,
                message.course.creationError.title,  
                message.course.creationError.description.userIdMissing
              );
        }

        try {
            const result = await chapterService.createChapter(courseID, chapterName, userID);
            sendResponse(
              res,
              true,
              message.chapter.creationSuccess.title,
              { chapterID: result }
            );
          } catch (err) {
            sendResponse(
              res,
              false,
              message.chapter.creationError.title,
              err
            );
          }
    }
}

module.exports = chapterController;
