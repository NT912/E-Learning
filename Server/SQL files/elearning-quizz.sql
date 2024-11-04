-- Database: quizz_db
CREATE DATABASE IF NOT EXISTS elearning_quizz;
USE elearning_quizz;

-- Bảng quizz
CREATE TABLE quizz (
  QuizzID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  CourseID INT UNSIGNED NOT NULL,            -- ID của khóa học liên quan từ Course Service
  Title VARCHAR(255) NOT NULL,               -- Tiêu đề của bài kiểm tra
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng question
CREATE TABLE question (
  QuestionID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  QuizzID INT UNSIGNED NOT NULL,             -- Liên kết đến Quizz
  Content TEXT NOT NULL,                     -- Nội dung câu hỏi
  Picture TEXT,                              -- Link hình ảnh câu hỏi (nếu có)
  FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID) ON DELETE CASCADE
);

-- Bảng answer
CREATE TABLE answer (
  AnswerID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  QuestionID INT UNSIGNED NOT NULL,          -- Liên kết đến Question
  Content TEXT NOT NULL,                     -- Nội dung câu trả lời
  Score FLOAT DEFAULT 0,                     -- Điểm của câu trả lời (có thể là 1 đúng hoặc 0 sai)
  FOREIGN KEY (QuestionID) REFERENCES question(QuestionID) ON DELETE CASCADE
);

-- Bảng submit
CREATE TABLE submit (
  SubmitID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  QuizzID INT UNSIGNED NOT NULL,             -- Liên kết đến Quizz
  UserID INT UNSIGNED NOT NULL,              -- ID của học sinh làm bài
  Score FLOAT DEFAULT NULL,                  -- Điểm tổng của bài làm
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID) ON DELETE CASCADE
);

-- Bảng user_answer: Lưu câu trả lời của học sinh cho mỗi câu hỏi
CREATE TABLE user_answer (
  UserAnswerID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  SubmitID INT UNSIGNED NOT NULL,            -- Liên kết đến Submit
  AnswerID INT UNSIGNED NOT NULL,            -- Liên kết đến Answer mà học sinh đã chọn
  FOREIGN KEY (SubmitID) REFERENCES submit(SubmitID) ON DELETE CASCADE,
  FOREIGN KEY (AnswerID) REFERENCES answer(AnswerID) ON DELETE CASCADE
);
