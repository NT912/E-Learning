-- Database: course_db
CREATE DATABASE IF NOT EXISTS course_db;
USE course_db;

-- Bảng Category (Danh mục khóa học)
CREATE TABLE category (
  CategoryID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  Name TEXT DEFAULT NULL,
  Description TEXT DEFAULT NULL
);

-- Bảng Course (Khóa học)
CREATE TABLE course (
  CourseID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  UserID INT UNSIGNED NOT NULL, -- Liên kết với user_id từ User Service
  Name TEXT DEFAULT NULL,
  PictureLink TEXT DEFAULT NULL,
  ShortCut TEXT DEFAULT NULL,
  Description TEXT DEFAULT NULL,
  CreateAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  ParentID INT UNSIGNED DEFAULT NULL,
  State ENUM('Creating', 'Confirmed', 'Rejected', 'Approval', 'Active', 'Blocked') DEFAULT 'Creating',
  CategoryID INT UNSIGNED DEFAULT NULL, -- Liên kết với category
  Cost FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (CategoryID) REFERENCES category(CategoryID)
);

-- Bảng CategoryOfCourse (Liên kết giữa Course và Category)
CREATE TABLE categoryofcourse (
  CategoryOfCourseID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  CourseID INT UNSIGNED NOT NULL,
  CategoryID INT UNSIGNED NOT NULL,
  FOREIGN KEY (CourseID) REFERENCES course(CourseID) ON DELETE CASCADE,
  FOREIGN KEY (CategoryID) REFERENCES category(CategoryID) ON DELETE CASCADE
);

-- Bảng Chapter (Chương trong khóa học)
CREATE TABLE chapter (
  ChapterID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  CourseID INT UNSIGNED NOT NULL,
  OrderNumber INT DEFAULT NULL,
  Title TEXT DEFAULT NULL,
  Description TEXT DEFAULT NULL,
  FOREIGN KEY (CourseID) REFERENCES course(CourseID) ON DELETE CASCADE
);

-- Bảng Lesson (Bài học trong chương)
CREATE TABLE lesson (
  LessonID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ChapterID INT UNSIGNED NOT NULL,
  FileLink TEXT DEFAULT NULL,
  Title TEXT DEFAULT NULL,
  Period INT DEFAULT NULL,
  OrderNumber INT DEFAULT NULL,
  Description TEXT DEFAULT NULL,
  Type VARCHAR(50) DEFAULT NULL;
  IsAllowDemo TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID) ON DELETE CASCADE
);

-- Bảng CourseDepend (Phụ thuộc giữa các khóa học)
CREATE TABLE coursedepend (
  CourseDependID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  CourseID INT UNSIGNED NOT NULL,
  DependOnCourseID INT UNSIGNED NOT NULL,
  IsRequire BIT DEFAULT NULL,
  FOREIGN KEY (CourseID) REFERENCES course(CourseID) ON DELETE CASCADE,
  FOREIGN KEY (DependOnCourseID) REFERENCES course(CourseID) ON DELETE CASCADE
);

-- Bảng CourseOutcome (Kết quả của khóa học)
CREATE TABLE courseoutcome (
  CourseOutcomeID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  CourseID INT UNSIGNED NOT NULL,
  Content TEXT DEFAULT NULL,
  FOREIGN KEY (CourseID) REFERENCES course(CourseID) ON DELETE CASCADE
);

-- Bảng Note (Ghi chú của học viên cho bài học)
CREATE TABLE note (
  NoteID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ProgressID INT UNSIGNED NOT NULL, -- Giả sử có bảng progress bên ngoài để theo dõi tiến độ
  Content TEXT DEFAULT NULL
);

CREATE TABLE ratecourse (
  RateCourseID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  UserID INT UNSIGNED NOT NULL,
  CourseID INT UNSIGNED NOT NULL, -- Liên kết với Course Service
  StarNumber INT DEFAULT NULL,
  Comment TEXT DEFAULT NULL,
  FOREIGN KEY (CourseID) REFERENCES course(CourseID) ON DELETE CASCADE
);