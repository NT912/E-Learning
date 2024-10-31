import categoryOfCourseModel from "../models/categoryOfCourseModel";
import courseModel from "../models/courseModel";

const categoryOfCourseService = {
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
   * Thêm danh mục vào một khóa học.
   * @param userID - ID của người dùng.
   * @param courseID - ID của khóa học.
   * @param categoryIDs - Mảng chứa các ID của danh mục.
   * @return Promise<void>
   */
  addCategoriesToCourse: async (userID: number, courseID: number, categoryIDs: number[]): Promise<void> => {
    try {
      const isOwner = await categoryOfCourseService.checkCourseOwnership(userID, courseID);
      if (!isOwner) throw new Error("User does not have permission for this course.");

      await Promise.all(
        categoryIDs.map((categoryID) => 
          categoryOfCourseModel.addCategoryToCourse(courseID, categoryID)
        )
      );
    } catch (err: any) {
      throw new Error(`Failed to add categories to course: ${err.message}`);
    }
  },

  /**
   * Xóa danh mục khỏi một khóa học.
   * @param userID - ID của người dùng.
   * @param courseID - ID của khóa học.
   * @param categoryID - ID của danh mục.
   * @return Promise<void>
   */
  removeCategoryFromCourse: async (userID: number, courseID: number, categoryID: number): Promise<void> => {
    try {
      const isOwner = await categoryOfCourseService.checkCourseOwnership(userID, courseID);
      if (!isOwner) throw new Error("User does not have permission for this course.");

      await categoryOfCourseModel.removeCategoryFromCourse(courseID, categoryID);
    } catch (err: any) {
      throw new Error(`Failed to remove category from course: ${err.message}`);
    }
  },

  /**
   * Lấy tất cả danh mục của một khóa học.
   * @param courseID - ID của khóa học.
   * @return Promise<Array>
   */
  getCategoriesOfCourse: async (courseID: number): Promise<any[]> => {
    try {
      const categories = await categoryOfCourseModel.getCategoriesOfCourse(courseID);
      return categories;
    } catch (err: any) {
      throw new Error(`Failed to get categories of course: ${err.message}`);
    }
  }
};

export default categoryOfCourseService;
