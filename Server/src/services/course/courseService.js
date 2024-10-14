const CourseModel = require("~/models/course/CourseModel");
const UserModel = require("~/models/UserModel");
const message = require("~/config/message.json");

const courseService = {
  /**
   * Tạo một khóa học mới.
   * @param {Number} userID - ID của người dùng yêu cầu tạo khóa học.
   * @return {Promise<Number>} - Promise chứa ID của khóa học mới tạo hoặc lỗi.
   */
  create: (userID) => {
    return new Promise((resolve, reject) => {
      // Tìm người dùng theo ID
      UserModel.findById(userID, (err, user) => {
        if (err || !user) {
          console.log(`Error Get User By Id: ${err ? err : "NoIdUser"}`);
          return reject(message.course.creationError.description.noUserID);
        }

        if (user.Role === "student") {
          return reject(message.course.creationError.description.noPermission);
        }

        const params = [userID, new Date()];

        CourseModel.createCourse(params, (err, courseID) => {
          if (err) {
            console.log(`Fail to create course with UserID: ${userID}`);
            return reject(message.course.creationError.description.failed);
          }
          resolve(courseID); // Trả về ID của khóa học vừa tạo
        });
      });
    });
  },

  /**
   * Cập nhật tên khóa học.
   * @param {Number} userID - ID của người dùng yêu cầu cập nhật.
   * @param {Number} courseID - ID của khóa học cần cập nhật.
   * @param {String} name - Tên mới của khóa học.
   * @return {Promise<void>} - Promise không trả về giá trị hoặc lỗi.
   */
  updateCourseName: (userID, courseID, name) => {
    return new Promise((resolve, reject) => {
      CourseModel.findById(courseID, (err, course) => {
        if (err || !course) {
          return reject(message.course.updateError.description.courseNotFound);
        }

        if (course.UserID !== userID) {
          return reject(message.course.updateError.description.noPermission);
        }
      });

      CourseModel.findByName(name, (err, course) => {
        if (err || course) {
          return reject(
            message.course.updateError.description.nameNotAvailable
          );
        }
      });

      CourseModel.updateName(courseID, name, (err) => {
        if (err) {
          return reject(message.course.updateError.description.serverfail);
        }
        resolve();
      });
    });
  },
};

module.exports = courseService;
