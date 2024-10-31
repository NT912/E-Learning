import courseDependModel from "../models/courseDependModel";
import courseModel from "../models/courseModel";


const courseDependService = {
  /**
   * Kiểm tra xem userID có phải là chủ của khóa học không.
   * @param userID - ID của người dùng.
   * @param courseID - ID của khóa học.
   * @return Promise<boolean>
   */
  checkCourseOwnership: async (userID: number, courseID: number): Promise<boolean> => {
    const course = await courseModel.findById(courseID);
    if (!course) throw new Error("Course not found.");
    return course.UserID === userID;
  },

  /**
   * Thêm phụ thuộc cho khóa học
   * @param userID - ID của người dùng
   * @param courseID - ID của khóa học
   * @param dependOnCourseID - ID của khóa học cần hoàn thành trước
   * @param isRequire - Điều kiện bắt buộc
   */
  addCourseDepend: async (
    userID: number,
    courseID: number,
    dependOnCourseID: number,
    isRequire: boolean
  ): Promise<void> => {
    if (courseID === dependOnCourseID) throw new Error("Course cannot depend on itself.");

    const isOwner = await courseDependService.checkCourseOwnership(userID, courseID);
    if (!isOwner) throw new Error("User does not have permission to modify dependencies of this course.");

    const course = await courseModel.findById(dependOnCourseID);
    if (!course) throw new Error("Dependent course does not exist.");

    await courseDependModel.addCourseDepend(courseID, dependOnCourseID, isRequire);
  },

  /**
   * Xóa phụ thuộc khỏi khóa học
   * @param userID - ID của người dùng
   * @param courseID - ID của khóa học
   * @param dependOnCourseID - ID của khóa học cần hoàn thành trước
   */
  removeCourseDepend: async (
    userID: number,
    courseID: number,
    dependOnCourseID: number
  ): Promise<void> => {
    const isOwner = await courseDependService.checkCourseOwnership(userID, courseID);
    if (!isOwner) throw new Error("User does not have permission to modify dependencies of this course.");

    await courseDependModel.removeCourseDepend(courseID, dependOnCourseID);
  },

  /**
   * Lấy danh sách phụ thuộc của khóa học
   * @param courseID - ID của khóa học
   * @return Promise<Array>
   */
  getCourseDependencies: async (courseID: number): Promise<Array<any>> => {
    return await courseDependModel.getCourseDependencies(courseID);
  }
};

export default courseDependService;
