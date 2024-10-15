const { check, validationResult } = require("express-validator");
const message = require("../config/message.json")

const courseValidator = {
    createCourse: [
        check("courseID", )
          .notEmpty()
          .withMessage(message.course.updateError.description.missCourseID), 
        check("courseName", )
          .notEmpty()
          .withMessage(message.course.updateError.description.missCourseName), 
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({
              success: false,
              title: message.course.creationError.title,
              description: errors.array().map(err => err.msg).join(", ")
            });
          }
          next();
        },
    ],
};

// Export the validator for use in other modules
module.exports = courseValidator;

Còn trò chơi á, thì nhóm mọi người chắc cũng hướng nội nhiều khó mà đưa ra ý kiến. 
Với mọi người học với nhau nhưng mà cũng chưa có thân lắm. Nên trò chơi là cái phải có để mọi người cởi mở chớ không anh nghĩ bựa đó cũng ngại.

Nên chơi trò gì thì bựa sau lên lớp mọi người nên đóng góp trên lớp đi. A thấy lên lớp mọi người cũng dễ nói chuyện hơn. thứ 4 với thứ 6 mọi người có 
