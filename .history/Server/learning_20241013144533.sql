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
