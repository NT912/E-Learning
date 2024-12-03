const courseService = require("../../services/course/courseService");
const CourseStatus = require("../../../config");

const courseController = {
  /**
   * Tạo khóa học mới.
   * Hàm này nhận yêu cầu tạo một khóa học mới từ người dùng. Nó gọi hàm `create` của `courseService`,
   * truyền vào `user.id` từ đối tượng req. Nếu thành công, nó trả về `courseID` của khóa học mới tạo.
   * Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  createCourse: async (req, res) => {
    const user = req.user;

    try {
      const result = await courseService.create(user.id);
      res.status(201).json({
        courseID: result,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Cập nhật tên khóa học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  updateCourseName: async (req, res) => {
    const { courseID } = req.params;
    const name = req.body.courseName;
    const user = req.user;

    try {
      // Cập nhật tên khóa học
      await courseService.updateCourseName(user.id, courseID, name);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Cập nhật tên khóa học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  updateCourseAvatar: async (req, res) => {
    const { courseID } = req.params;
    const user = req.user;
    const file = req.file;

    try {
      // Cập nhật tên khóa học
      await courseService.updateCourseAvatar(user.id, courseID, file);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Cập nhật tên khóa học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  updateCourseShortcut: async (req, res) => {
    const { courseID } = req.params;
    const { content } = req.body;
    const user = req.user;

    try {
      // Cập nhật tên khóa học
      await courseService.updateCourseShortcut(user.id, courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Cập nhật tên khóa học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  updateCourseDescription: async (req, res) => {
    const { courseID } = req.params;
    const { content } = req.body;
    const user = req.user;

    try {
      // Cập nhật tên khóa học
      await courseService.updateCourseDescription(user.id, courseID, content);
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Cập nhật tên khóa học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  updateCourseCost: async (req, res) => {
    const { courseID } = req.params;
    const { amount } = req.body;
    const user = req.user;

    try {
      await courseService.updateCourseCost(user.id, courseID, amount);
      res.status(200).json("Course cost updated successfully");
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },

  /**
   * Xác nhận đăng khoá học.
   * Hàm này nhận yêu cầu cập nhật tên của khóa học dựa trên `courseID` và tên mới được cung cấp trong body.
   * Nó gọi hàm `updateCourseName` của `courseService` để thực hiện việc cập nhật. Nếu thành công, trả về
   * trạng thái 200 mà không cần thêm thông tin gì. Nếu có lỗi xảy ra, trả về mã lỗi và thông tin lỗi.
   */
  confirm: async (req, res) => {
    const { courseID } = req.params;
    const user = req.user;
    try {
      await courseService.updateCourseStatus(
        user.id,
        courseID,
        CourseStatus.CONFIRMED
      );
      res.status(200).json();
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  },
};

module.exports = courseController;
