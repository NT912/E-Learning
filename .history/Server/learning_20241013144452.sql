<<<<<<< HEAD
CREATE TABLE answer (
  AnswerID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  QuestionID int NULL,
  Content TEXT NULL,
  Score FLOAT NULL
);

CREATE TABLE category (
  CategoryID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Name TEXT NULL,
  Description TEXT NULL
);

CREATE TABLE chapter (
  ChapterID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  CourseID int NULL,
  OrderNumber int NULL,
  Title TEXT NULL,
  Description TEXT NULL
);

CREATE TABLE contentcourse (
  ContentCourseID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  CourseID int NULL,
  Content TEXT NULL
);

CREATE TABLE course (
  CourseID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  UserID int NULL,
  Name TEXT NULL,
  PictureLink TEXT NULL,
  ShortCut TEXT NULL,
  Description TEXT NULL,
  CreateAt DATETIME NULL,
  ParentID int NULL,
  State VARCHAR(10) NULL CHECK (State IN ('public', 'wait', 'pending', 'rejected')),
  CategoryID int NULL,
  Cost FLOAT NULL
);

CREATE TABLE coursedepend (
  CourseDependID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  CourseID int NULL,
  DependOnCourseID int NULL,
  IsRequire BIT NULL
);

CREATE TABLE discussion (
  DiscussionID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  UserID int NULL,
  VideoID int NULL,
  CourseID int NULL,
  ParentID int NULL,
  Content TEXT NULL,
  CreateAt DATETIME NULL
);

CREATE TABLE enrollment (
  EnrollmentID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  UserID int NULL,
  CourseID int NULL
);

CREATE TABLE files (
  FileID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  VideoID int NULL,
  ChapterID int NULL,
  CourseID int NULL,
  DiscussionID int NULL,
  FileLink TEXT NULL
);

CREATE TABLE note (
  NoteID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  ProgressID int NULL,
  Content TEXT NULL
);

CREATE TABLE payment (
  PaymentID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  UserID int NULL,
  CourseID int NULL,
  PaymentCode TEXT NULL,
  Amount FLOAT NULL,
  Purpose VARCHAR(20) NULL CHECK (Purpose IN ('purchase_course', 'upgrade_premium')),
  Status VARCHAR(10) NULL CHECK (Status IN ('pending', 'success', 'error')),
  CreateAt DATETIME NULL,
  ExpireAt DATETIME NULL,
  UpdateAt DATETIME NULL
);

CREATE TABLE progress (
  ProgressID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  EnrollmentID int NULL,
  VideoID int NULL,
  ProgressTime int NULL
);

CREATE TABLE question (
  QuestionID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  QuizzID int NULL,
  Content TEXT NULL,
  Picture TEXT NULL
);

CREATE TABLE quizz (
  QuizzID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  VideoID int NULL,
  ChapterID int NULL,
  Course int NULL,
  Title TEXT NULL
);

CREATE TABLE ratecourse (
  RateCourseID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  UserID int NULL,
  CourseID int NULL,
  StarNumber int NULL,
  Comment TEXT NULL
);

CREATE TABLE submit (
  SubmitID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  QuizzID int NULL,
  UserID int NULL,
  Score FLOAT NULL,
  CreateAt DATETIME NULL
);

CREATE TABLE systemtransaction (
  SystemTransactionID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  PaymentID int NULL,
  Amount FLOAT NULL,
  Message TEXT NULL,
  UserID int NULL,
  BankName TEXT NULL,
  BankAccountNumber TEXT NULL,
  Status VARCHAR(10) NULL CHECK (Status IN ('pending', 'success', 'error')),
  CreateAt DATETIME NULL
);

CREATE TABLE users (
  UserID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  Email TEXT NULL,
  HashPassword TEXT NULL,
  PhoneNumber TEXT NULL,
  About TEXT NULL,
  AvatarLink TEXT NULL,
  BankName TEXT NULL,
  BankAccountNumber TEXT NULL,
  CreateAt DATETIME NULL,
  IsPremium DATETIME NULL
);

CREATE TABLE useranswer (
  UserAnswerID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  SubmitID int NULL,
  AnswerID int NULL
);

CREATE TABLE usertransaction (
  UserTransactionID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  PaymentID int NULL,
  Amount FLOAT NULL,
  Message TEXT NULL,
  Bank TEXT NULL,
  BankAccountNumber TEXT NULL,
  CreateAt DATETIME NULL
);

CREATE TABLE video (
  VideoID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
  ChapterID int NULL,
  Title TEXT NULL,
  VideoLink TEXT NULL,
  Time int NULL,
  Description TEXT NULL,
  PictureLink TEXT NULL,
  IsAllowDemo BIT NULL
);

-- Thêm các khóa ngoại (Foreign Key) và các ràng buộc khác
ALTER TABLE answer
  ADD CONSTRAINT FK_answer_question FOREIGN KEY (QuestionID) REFERENCES question(QuestionID);

ALTER TABLE chapter
  ADD CONSTRAINT FK_chapter_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE contentcourse
  ADD CONSTRAINT FK_contentcourse_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE course
  ADD CONSTRAINT FK_course_user FOREIGN KEY (UserID) REFERENCES users(UserID);
  
ALTER TABLE course
  ADD CONSTRAINT FK_course_category FOREIGN KEY (CategoryID) REFERENCES category(CategoryID);

ALTER TABLE coursedepend
  ADD CONSTRAINT FK_coursedepend_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE coursedepend
  ADD CONSTRAINT FK_coursedepend_dependoncourse FOREIGN KEY (DependOnCourseID) REFERENCES course(CourseID);

ALTER TABLE discussion
  ADD CONSTRAINT FK_discussion_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE discussion
  ADD CONSTRAINT FK_discussion_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

ALTER TABLE discussion
  ADD CONSTRAINT FK_discussion_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE discussion
  ADD CONSTRAINT FK_discussion_parent FOREIGN KEY (ParentID) REFERENCES discussion(DiscussionID);

ALTER TABLE enrollment
  ADD CONSTRAINT FK_enrollment_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE enrollment
  ADD CONSTRAINT FK_enrollment_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE files
  ADD CONSTRAINT FK_file_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

ALTER TABLE files
  ADD CONSTRAINT FK_file_chapter FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID);

ALTER TABLE files
  ADD CONSTRAINT FK_file_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE files
  ADD CONSTRAINT FK_file_discussion FOREIGN KEY (DiscussionID) REFERENCES discussion(DiscussionID);

ALTER TABLE note
  ADD CONSTRAINT FK_note_progress FOREIGN KEY (ProgressID) REFERENCES progress(ProgressID);

ALTER TABLE payment
  ADD CONSTRAINT FK_payment_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE payment
  ADD CONSTRAINT FK_payment_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE progress
  ADD CONSTRAINT FK_progress_enrollment FOREIGN KEY (EnrollmentID) REFERENCES enrollment(EnrollmentID);

ALTER TABLE progress
  ADD CONSTRAINT FK_progress_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

ALTER TABLE question
  ADD CONSTRAINT FK_question_quizz FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID);

ALTER TABLE quizz
  ADD CONSTRAINT FK_quizz_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

ALTER TABLE quizz
  ADD CONSTRAINT FK_quizz_chapter FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID);

ALTER TABLE ratecourse
  ADD CONSTRAINT FK_ratecourse_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE ratecourse
  ADD CONSTRAINT FK_ratecourse_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

ALTER TABLE submit
  ADD CONSTRAINT FK_submit_quizz FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID);

ALTER TABLE submit
  ADD CONSTRAINT FK_submit_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE systemtransaction
  ADD CONSTRAINT FK_systemtransaction_payment FOREIGN KEY (PaymentID) REFERENCES payment(PaymentID);

ALTER TABLE systemtransaction
  ADD CONSTRAINT FK_systemtransaction_user FOREIGN KEY (UserID) REFERENCES users(UserID);

ALTER TABLE useranswer
  ADD CONSTRAINT FK_useranswer_submit FOREIGN KEY (SubmitID) REFERENCES submit(SubmitID);

ALTER TABLE useranswer
  ADD CONSTRAINT FK_useranswer_answer FOREIGN KEY (AnswerID) REFERENCES answer(AnswerID);

ALTER TABLE usertransaction
  ADD CONSTRAINT FK_usertransaction_payment FOREIGN KEY (PaymentID) REFERENCES payment(PaymentID);

ALTER TABLE video
  ADD CONSTRAINT FK_video_chapter FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID);
=======
-- CREATE TABLE answer (
--   AnswerID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   QuestionID INT,
--   Content TEXT,
--   Score FLOAT
-- );

-- CREATE TABLE category (
--   CategoryID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   Name TEXT,
--   Description TEXT
-- );

-- CREATE TABLE chapter (
--   ChapterID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   CourseID INT,
--   OrderNumber INT,
--   Title TEXT,
--   Description TEXT
-- );

-- CREATE TABLE contentcourse (
--   ContentCourseID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   CourseID INT,
--   Content TEXT
-- );

-- CREATE TABLE course (
--   CourseID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   UserID INT,
--   Name TEXT,
--   PictureLink TEXT,
--   ShortCut TEXT,
--   Description TEXT,
--   CreateAt DATETIME,
--   ParentID INT,
--   State VARCHAR(10) CHECK (State IN ('public', 'wait', 'pending', 'rejected')),
--   CategoryID INT,
--   Cost FLOAT
-- );

-- CREATE TABLE coursedepend (
--   CourseDependID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   CourseID INT,
--   DependOnCourseID INT,
--   IsRequire BIT
-- );

-- CREATE TABLE discussion (
--   DiscussionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   UserID INT,
--   VideoID INT,
--   CourseID INT,
--   ParentID INT,
--   Content TEXT,
--   CreateAt DATETIME
-- );

-- CREATE TABLE enrollment (
--   EnrollmentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   UserID INT,
--   CourseID INT
-- );

-- CREATE TABLE file (
--   FileID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   VideoID INT,
--   ChapterID INT,
--   CourseID INT,
--   DiscussionID INT,
--   FileLink TEXT
-- );

-- CREATE TABLE note (
--   NoteID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   ProgressID INT,
--   Content TEXT
-- );

-- CREATE TABLE payment (
--   PaymentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   UserID INT,
--   CourseID INT,
--   PaymentCode TEXT,
--   Amount FLOAT,
--   Purpose VARCHAR(20) CHECK (Purpose IN ('purchase_course', 'upgrade_premium')),
--   Status VARCHAR(10) CHECK (Status IN ('pending', 'success', 'error')),
--   CreateAt DATETIME,
--   ExpireAt DATETIME,
--   UpdateAt DATETIME
-- );

-- CREATE TABLE progress (
--   ProgressID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   EnrollmentID INT,
--   VideoID INT,
--   ProgressTime INT
-- );

-- CREATE TABLE question (
--   QuestionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   QuizzID INT,
--   Content TEXT,
--   Picture TEXT
-- );

-- CREATE TABLE quizz (
--   QuizzID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   VideoID INT,
--   ChapterID INT,
--   Course INT,
--   Title TEXT
-- );

-- CREATE TABLE ratecourse (
--   RateCourseID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   UserID INT,
--   CourseID INT,
--   StarNumber INT,
--   Comment TEXT
-- );

-- CREATE TABLE submit (
--   SubmitID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   QuizzID INT,
--   UserID INT,
--   Score FLOAT,
--   CreateAt DATETIME
-- );

-- CREATE TABLE systemtransaction (
--   SystemTransactionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   PaymentID INT,
--   Amount FLOAT,
--   Message TEXT,
--   UserID INT,
--   BankName TEXT,
--   BankAccountNumber TEXT,
--   Status VARCHAR(10) CHECK (Status IN ('pending', 'success', 'error')),
--   CreateAt DATETIME
-- );

-- CREATE TABLE user (
--   UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   Email TEXT,
--   HashPassword TEXT,
--   PhoneNumber TEXT,
--   About TEXT,
--   AvatarLink TEXT,
--   BankName TEXT,
--   BankAccountNumber TEXT,
--   CreateAt DATETIME,
--   IsPremium DATETIME
-- );

-- CREATE TABLE useranswer (
--   UserAnswerID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   SubmitID INT,
--   AnswerID INT
-- );

-- CREATE TABLE usertransaction (
--   UserTransactionID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   PaymentID INT,
--   Amount FLOAT,
--   Message TEXT,
--   Bank TEXT,
--   BankAccountNumber TEXT,
--   CreateAt DATETIME
-- );

-- CREATE TABLE video (
--   VideoID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   ChapterID INT,
--   Title TEXT,
--   VideoLink TEXT,
--   Time INT,
--   Description TEXT,
--   PictureLink TEXT,
--   IsAllowDemo BIT
-- );

-- -- Thêm các khóa ngoại (Foreign Key) và các ràng buộc khác
-- ALTER TABLE answer
--   ADD CONSTRAINT FK_answer_question FOREIGN KEY (QuestionID) REFERENCES question(QuestionID);

-- ALTER TABLE chapter
--   ADD CONSTRAINT FK_chapter_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE contentcourse
--   ADD CONSTRAINT FK_contentcourse_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE course
--   ADD CONSTRAINT FK_course_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE course
--   ADD CONSTRAINT FK_course_category FOREIGN KEY (CategoryID) REFERENCES category(CategoryID);

-- ALTER TABLE coursedepend
--   ADD CONSTRAINT FK_coursedepend_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE coursedepend
--   ADD CONSTRAINT FK_coursedepend_dependoncourse FOREIGN KEY (DependOnCourseID) REFERENCES course(CourseID);

-- ALTER TABLE discussion
--   ADD CONSTRAINT FK_discussion_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE discussion
--   ADD CONSTRAINT FK_discussion_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

-- ALTER TABLE discussion
--   ADD CONSTRAINT FK_discussion_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE discussion
--   ADD CONSTRAINT FK_discussion_parent FOREIGN KEY (ParentID) REFERENCES discussion(DiscussionID);

-- ALTER TABLE enrollment
--   ADD CONSTRAINT FK_enrollment_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE enrollment
--   ADD CONSTRAINT FK_enrollment_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE file
--   ADD CONSTRAINT FK_file_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

-- ALTER TABLE file
--   ADD CONSTRAINT FK_file_chapter FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID);

-- ALTER TABLE file
--   ADD CONSTRAINT FK_file_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE file
--   ADD CONSTRAINT FK_file_discussion FOREIGN KEY (DiscussionID) REFERENCES discussion(DiscussionID);

-- ALTER TABLE note
--   ADD CONSTRAINT FK_note_progress FOREIGN KEY (ProgressID) REFERENCES progress(ProgressID);

-- ALTER TABLE payment
--   ADD CONSTRAINT FK_payment_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE payment
--   ADD CONSTRAINT FK_payment_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE progress
--   ADD CONSTRAINT FK_progress_enrollment FOREIGN KEY (EnrollmentID) REFERENCES enrollment(EnrollmentID);

-- ALTER TABLE progress
--   ADD CONSTRAINT FK_progress_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

-- ALTER TABLE question
--   ADD CONSTRAINT FK_question_quizz FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID);

-- ALTER TABLE quizz
--   ADD CONSTRAINT FK_quizz_video FOREIGN KEY (VideoID) REFERENCES video(VideoID);

-- ALTER TABLE quizz
--   ADD CONSTRAINT FK_quizz_chapter FOREIGN KEY (ChapterID) REFERENCES chapter(ChapterID);

-- ALTER TABLE ratecourse
--   ADD CONSTRAINT FK_ratecourse_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE ratecourse
--   ADD CONSTRAINT FK_ratecourse_course FOREIGN KEY (CourseID) REFERENCES course(CourseID);

-- ALTER TABLE submit
--   ADD CONSTRAINT FK_submit_quizz FOREIGN KEY (QuizzID) REFERENCES quizz(QuizzID);

-- ALTER TABLE submit
--   ADD CONSTRAINT FK_submit_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE systemtransaction
--   ADD CONSTRAINT FK_systemtransaction_payment FOREIGN KEY (PaymentID) REFERENCES payment(PaymentID);

-- ALTER TABLE systemtransaction
--   ADD CONSTRAINT FK_systemtransaction_user FOREIGN KEY (UserID) REFERENCES user(UserID);

-- ALTER TABLE useranswer
--   ADD CONSTRAINT FK_useranswer_submit FOREIGN KEY (SubmitID) REFERENCES submit(SubmitID);

-- ALTER TABLE useranswer
--   ADD CONSTRAINT FK_useranswer_answer FOREIGN KEY (AnswerID) REFERENCES answer(AnswerID);

-- ALTER TABLE usertransaction
--   ADD CONSTRAINT FK_usertransaction_payment FOREIGN KEY (PaymentID) REFERENCES payment(PaymentID);

-- ALTER TABLE video
--   ADD CONSTRAINT FK_video_chapter FOREIGN KEY (ChapterID) REFERENCES chapter
>>>>>>> a337f2627bc37470211f6fe5158cb22521318015
