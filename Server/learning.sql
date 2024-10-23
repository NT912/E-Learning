-- -- Table structure for table `answer`
-- CREATE TABLE `answer` (
--   `AnswerID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `QuestionID` int UNSIGNED DEFAULT NULL,
--   `Content` text,
--   `Score` float DEFAULT NULL,
--   PRIMARY KEY (`AnswerID`)
-- );

-- -- Table structure for table `category`
-- CREATE TABLE `category` (
--   `CategoryID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `Name` text,
--   `Description` text,
--   PRIMARY KEY (`CategoryID`)
-- );

-- -- Table structure for table `chapter`
-- CREATE TABLE `chapter` (
--   `ChapterID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `OrderNumber` int DEFAULT NULL,
--   `Title` text,
--   `Description` text,
--   PRIMARY KEY (`ChapterID`)
-- );

-- -- Table structure for table `contentcourse`
-- CREATE TABLE `contentcourse` (
--   `ContentCourseID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `Content` text,
--   PRIMARY KEY (`ContentCourseID`)
-- );

-- -- Table structure for table `course`
-- CREATE TABLE `course` (
--   `CourseID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `Name` text,
--   `PictureLink` text,
--   `ShortCut` text,
--   `Description` text,
--   `CreateAt` datetime DEFAULT NULL,
--   `ParentID` int UNSIGNED DEFAULT NULL,
--   `State` varchar(10) DEFAULT NULL,
--   `CategoryID` int UNSIGNED DEFAULT NULL,
--   `Cost` float DEFAULT NULL,
--   PRIMARY KEY (`CourseID`)
-- );

-- -- Table structure for table `categoryofcourse`
-- CREATE TABLE `categoryofcourse` (
--   `CategoryOfCourseID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `CourseID` int UNSIGNED,
--   `CategoryID` int UNSIGNED,
--   PRIMARY KEY (`CategoryOfCourseID`)
-- );

-- -- Table structure for table `coursedepend`
-- CREATE TABLE `coursedepend` (
--   `CourseDependID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `DependOnCourseID` int UNSIGNED DEFAULT NULL,
--   `IsRequire` bit(1) DEFAULT NULL,
--   PRIMARY KEY (`CourseDependID`)
-- );

-- -- Table structure for table `discussion`
-- CREATE TABLE `discussion` (
--   `DiscussionID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `LessonID` int UNSIGNED DEFAULT NULL,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `ParentID` int UNSIGNED DEFAULT NULL,
--   `Content` text,
--   `CreateAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`DiscussionID`)
-- );

-- -- Table structure for table `enrollment`
-- CREATE TABLE `enrollment` (
--   `EnrollmentID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   PRIMARY KEY (`EnrollmentID`)
-- );

-- -- Table structure for table `exercise`
-- CREATE TABLE `exercise` (
--   `ExerciseID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `LessonID` int UNSIGNED NOT NULL,
--   `Title` text,
--   `Description` text,
--   `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
--   `CreateAt` datetime DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`ExerciseID`)
-- );

-- -- Table structure for table `exercise_submission`
-- CREATE TABLE `exercise_submission` (
--   `SubmissionID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `ExerciseID` int UNSIGNED NOT NULL,
--   `UserID` int UNSIGNED NOT NULL,
--   `Code` text,
--   `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
--   `Score` float DEFAULT NULL,
--   `Status` enum('pending','passed','failed') DEFAULT NULL,
--   `Output` text,
--   `SubmittedAt` datetime DEFAULT CURRENT_TIMESTAMP,
--   PRIMARY KEY (`SubmissionID`)
-- );

-- -- Table structure for table `lesson`
-- CREATE TABLE `lesson` (
--   `LessonID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `ChapterID` int UNSIGNED NOT NULL,
--   `FileLink` text,
--   `Title` text,
--   `Period` int DEFAULT NULL,
--   `OrderNumber` int DEFAULT NULL,
--   `Description` text,
--   `IsAllowDemo` tinyint(1) DEFAULT NULL,
--   PRIMARY KEY (`LessonID`)
-- );

-- -- Table structure for table `note`
-- CREATE TABLE `note` (
--   `NoteID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `ProgressID` int UNSIGNED DEFAULT NULL,
--   `Content` text,
--   PRIMARY KEY (`NoteID`)
-- );

-- -- Table structure for table `payment`
-- CREATE TABLE `payment` (
--   `PaymentID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `PaymentCode` text,
--   `Amount` float DEFAULT NULL,
--   `Purpose` varchar(20) DEFAULT NULL,
--   `Status` varchar(10) DEFAULT NULL,
--   `CreateAt` datetime DEFAULT NULL,
--   `ExpireAt` datetime DEFAULT NULL,
--   `UpdateAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`PaymentID`)
-- );

-- -- Table structure for table `progress`
-- CREATE TABLE `progress` (
--   `ProgressID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `EnrollmentID` int UNSIGNED DEFAULT NULL,
--   `LessonID` int UNSIGNED DEFAULT NULL,
--   `ProgressTime` int DEFAULT NULL,
--   PRIMARY KEY (`ProgressID`)
-- );

-- -- Table structure for table `question`
-- CREATE TABLE `question` (
--   `QuestionID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `QuizzID` int UNSIGNED DEFAULT NULL,
--   `Content` text,
--   `Picture` text,
--   PRIMARY KEY (`QuestionID`)
-- );

-- -- Table structure for table `quizz`
-- CREATE TABLE `quizz` (
--   `QuizzID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `LessonID` int UNSIGNED DEFAULT NULL,
--   `ChapterID` int UNSIGNED DEFAULT NULL,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `Title` text,
--   PRIMARY KEY (`QuizzID`)
-- );

-- -- Table structure for table `ratecourse`
-- CREATE TABLE `ratecourse` (
--   `RateCourseID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `CourseID` int UNSIGNED DEFAULT NULL,
--   `StarNumber` int DEFAULT NULL,
--   `Comment` text,
--   PRIMARY KEY (`RateCourseID`)
-- );

-- -- Table structure for table `submit`
-- CREATE TABLE `submit` (
--   `SubmitID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `QuizzID` int UNSIGNED DEFAULT NULL,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `Score` float DEFAULT NULL,
--   `CreateAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`SubmitID`)
-- );

-- -- Table structure for table `systemtransaction`
-- CREATE TABLE `systemtransaction` (
--   `SystemTransactionID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `PaymentID` int UNSIGNED DEFAULT NULL,
--   `Amount` float DEFAULT NULL,
--   `Message` text,
--   `UserID` int UNSIGNED DEFAULT NULL,
--   `BankName` text,
--   `BankAccountNumber` text,
--   `Status` varchar(10) DEFAULT NULL,
--   `CreateAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`SystemTransactionID`)
-- );

-- -- Table structure for table `user`
-- CREATE TABLE `user` (
--   `UserID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `Email` text,
--   `HashPassword` text,
--   `PhoneNumber` text,
--   `About` text,
--   `AvatarLink` text,
--   `BankName` text,
--   `BankAccountNumber` text,
--   `Role` enum('student','teacher','admin') NOT NULL DEFAULT 'student',
--   `CreateAt` datetime DEFAULT NULL,
--   `IsPremium` datetime DEFAULT NULL,
--   PRIMARY KEY (`UserID`)
-- );

-- -- Table structure for table `useranswer`
-- CREATE TABLE `useranswer` (
--   `UserAnswerID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `SubmitID` int UNSIGNED DEFAULT NULL,
--   `AnswerID` int UNSIGNED DEFAULT NULL,
--   PRIMARY KEY (`UserAnswerID`)
-- );

-- -- Table structure for table `usertransaction`
-- CREATE TABLE `usertransaction` (
--   `UserTransactionID` int UNSIGNED NOT NULL AUTO_INCREMENT,
--   `PaymentID` int UNSIGNED DEFAULT NULL,
--   `Amount` float DEFAULT NULL,
--   `Message` text,
--   `Bank` text,
--   `BankAccountNumber` text,
--   `CreateAt` datetime DEFAULT NULL,
--   PRIMARY KEY (`UserTransactionID`)
-- );


-- -- Foreign key for table `answer`
-- ALTER TABLE `answer` 
-- ADD CONSTRAINT `FK_answer_question` 
-- FOREIGN KEY (`QuestionID`) REFERENCES `question` (`QuestionID`);

-- -- Foreign key for table `chapter`
-- ALTER TABLE `chapter` 
-- ADD CONSTRAINT `FK_chapter_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign key for table `contentcourse`
-- ALTER TABLE `contentcourse` 
-- ADD CONSTRAINT `FK_contentcourse_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `course`
-- ALTER TABLE `course` 
-- ADD CONSTRAINT `FK_course_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- ALTER TABLE `course` 
-- ADD CONSTRAINT `FK_course_category` 
-- FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

-- -- Foreign key for table `categoryofcourse`
-- ALTER TABLE `categoryofcourse` 
-- ADD CONSTRAINT `FK_categoryofcourse_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- ALTER TABLE `categoryofcourse` 
-- ADD CONSTRAINT `FK_categoryofcourse_category` 
-- FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

-- -- Foreign keys for table `coursedepend`
-- ALTER TABLE `coursedepend` 
-- ADD CONSTRAINT `FK_coursedepend_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- ALTER TABLE `coursedepend` 
-- ADD CONSTRAINT `FK_coursedepend_dependoncourse` 
-- FOREIGN KEY (`DependOnCourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `discussion`
-- ALTER TABLE `discussion` 
-- ADD CONSTRAINT `FK_discussion_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- ALTER TABLE `discussion` 
-- ADD CONSTRAINT `FK_discussion_lesson` 
-- FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

-- ALTER TABLE `discussion` 
-- ADD CONSTRAINT `FK_discussion_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- ALTER TABLE `discussion` 
-- ADD CONSTRAINT `FK_discussion_parent` 
-- FOREIGN KEY (`ParentID`) REFERENCES `discussion` (`DiscussionID`);

-- -- Foreign keys for table `enrollment`
-- ALTER TABLE `enrollment` 
-- ADD CONSTRAINT `FK_enrollment_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- ALTER TABLE `enrollment` 
-- ADD CONSTRAINT `FK_enrollment_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `exercise`
-- ALTER TABLE `exercise` 
-- ADD CONSTRAINT `FK_exercise_lesson` 
-- FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

-- -- Foreign keys for table `exercise_submission`
-- ALTER TABLE `exercise_submission` 
-- ADD CONSTRAINT `FK_exercise_submission_exercise` 
-- FOREIGN KEY (`ExerciseID`) REFERENCES `exercise` (`ExerciseID`);

-- ALTER TABLE `exercise_submission` 
-- ADD CONSTRAINT `FK_exercise_submission_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- -- Foreign keys for table `lesson`
-- ALTER TABLE `lesson` 
-- ADD CONSTRAINT `FK_lesson_chapter` 
-- FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`);

-- -- Foreign keys for table `note`
-- ALTER TABLE `note` 
-- ADD CONSTRAINT `FK_note_progress` 
-- FOREIGN KEY (`ProgressID`) REFERENCES `progress` (`ProgressID`);

-- -- Foreign keys for table `payment`
-- ALTER TABLE `payment` 
-- ADD CONSTRAINT `FK_payment_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- ALTER TABLE `payment` 
-- ADD CONSTRAINT `FK_payment_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `progress`
-- ALTER TABLE `progress` 
-- ADD CONSTRAINT `FK_progress_enrollment` 
-- FOREIGN KEY (`EnrollmentID`) REFERENCES `enrollment` (`EnrollmentID`);

-- ALTER TABLE `progress` 
-- ADD CONSTRAINT `FK_progress_lesson` 
-- FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

-- -- Foreign keys for table `question`
-- ALTER TABLE `question` 
-- ADD CONSTRAINT `FK_question_quizz` 
-- FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`);

-- -- Foreign keys for table `quizz`
-- ALTER TABLE `quizz` 
-- ADD CONSTRAINT `FK_quizz_lesson` 
-- FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

-- ALTER TABLE `quizz` 
-- ADD CONSTRAINT `FK_quizz_chapter` 
-- FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`);

-- ALTER TABLE `quizz` 
-- ADD CONSTRAINT `FK_quizz_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `ratecourse`
-- ALTER TABLE `ratecourse` 
-- ADD CONSTRAINT `FK_ratecourse_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- ALTER TABLE `ratecourse` 
-- ADD CONSTRAINT `FK_ratecourse_course` 
-- FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

-- -- Foreign keys for table `submit`
-- ALTER TABLE `submit` 
-- ADD CONSTRAINT `FK_submit_quizz` 
-- FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`);

-- ALTER TABLE `submit` 
-- ADD CONSTRAINT `FK_submit_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- -- Foreign keys for table `systemtransaction`
-- ALTER TABLE `systemtransaction` 
-- ADD CONSTRAINT `FK_systemtransaction_payment` 
-- FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`);

-- ALTER TABLE `systemtransaction` 
-- ADD CONSTRAINT `FK_systemtransaction_user` 
-- FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

-- -- Foreign keys for table `useranswer`
-- ALTER TABLE `useranswer` 
-- ADD CONSTRAINT `FK_useranswer_submit` 
-- FOREIGN KEY (`SubmitID`) REFERENCES `submit` (`SubmitID`);

-- ALTER TABLE `useranswer` 
-- ADD CONSTRAINT `FK_useranswer_answer` 
-- FOREIGN KEY (`AnswerID`) REFERENCES `answer` (`AnswerID`);

-- -- Foreign keys for table `usertransaction`
-- ALTER TABLE `usertransaction` 
-- ADD CONSTRAINT `FK_usertransaction_payment` 
-- FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`);

