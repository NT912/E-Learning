CREATE TABLE enrollment (
  EnrollmentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  UserID INT UNSIGNED NOT NULL,
  CourseID INT UNSIGNED NOT NULL, -- Giả sử có thể liên kết với Course Service
  FOREIGN KEY (UserID) REFERENCES user(UserID) ON DELETE CASCADE
);

CREATE TABLE progress (
  ProgressID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  EnrollmentID INT UNSIGNED NOT NULL,     -- ID của học sinh trong khóa học
  LessonID INT UNSIGNED NOT NULL,         -- Bài học mà học sinh đang theo dõi
  ProgressTime INT DEFAULT 0,             -- Thời gian dừng video hoặc phần trăm hoàn thành bài học
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);  

CREATE TABLE note (
  NoteID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ProgressID INT UNSIGNED NOT NULL, -- Giả sử có bảng progress bên ngoài để theo dõi tiến độ
  Content TEXT DEFAULT NULL
);

