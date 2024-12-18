-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2024 at 05:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `elearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `AnswerID` int(10) UNSIGNED NOT NULL,
  `QuestionID` int(10) UNSIGNED DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(10) UNSIGNED NOT NULL,
  `Name` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categoryofcourse`
--

CREATE TABLE `categoryofcourse` (
  `CategoryOfCourseID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `CategoryID` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chapter`
--

CREATE TABLE `chapter` (
  `ChapterID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapter`
--

INSERT INTO `chapter` (`ChapterID`, `CourseID`, `OrderNumber`, `Title`, `Description`) VALUES
(2, 1, NULL, NULL, NULL),
(3, 4, NULL, NULL, NULL),
(4, 4, NULL, 'chapter 1:', NULL),
(7, 3, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `CourseID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `Name` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `ShortCut` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ParentID` int(10) UNSIGNED DEFAULT NULL,
  `State` enum('Creating','Confirmed','Rejected','Approval','Active','Blocked') DEFAULT 'Creating',
  `CategoryID` int(10) UNSIGNED DEFAULT NULL,
  `Cost` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`CourseID`, `UserID`, `Name`, `PictureLink`, `ShortCut`, `Description`, `CreateAt`, `ParentID`, `State`, `CategoryID`, `Cost`) VALUES
(1, 3, 'sdsad', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/Course_Avatar%2F1729654548220_f9217d6eb53f0d61542e.jpg?alt=media&token=9434fcf6-3c35-4cf5-ad83-72da2e93e8ad', 'sdsad', 'kdshdaskdhsl', '2024-10-16 11:36:25', NULL, 'Confirmed', NULL, 67),
(3, 3, 'string', NULL, NULL, NULL, '2024-10-23 15:16:43', NULL, 'Creating', NULL, 0),
(4, 3, 'sdsadl', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/Course_Avatar%2F1729864876389_member2.jpg?alt=media&token=db7022eb-81b1-4c09-9dfb-17f1f06ce2a3', 'sdsad', 'kdshdaskdhsl', '2024-10-23 20:55:28', NULL, 'Confirmed', NULL, 67),
(5, 3, NULL, NULL, NULL, NULL, '2024-10-25 21:03:50', NULL, 'Creating', NULL, 0),
(6, 3, 'lam', NULL, NULL, NULL, '2024-10-26 21:57:12', NULL, 'Creating', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `coursedepend`
--

CREATE TABLE `coursedepend` (
  `CourseDependID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `DependOnCourseID` int(10) UNSIGNED DEFAULT NULL,
  `IsRequire` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `courseoutcome`
--

CREATE TABLE `courseoutcome` (
  `CourseOutcomeID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courseoutcome`
--

INSERT INTO `courseoutcome` (`CourseOutcomeID`, `CourseID`, `Content`) VALUES
(1, 1, NULL),
(3, 4, NULL),
(4, 4, NULL),
(5, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `discussion`
--

CREATE TABLE `discussion` (
  `DiscussionID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `LessonID` int(10) UNSIGNED DEFAULT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `ParentID` int(10) UNSIGNED DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `EnrollmentID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `ExerciseID` int(10) UNSIGNED NOT NULL,
  `LessonID` int(10) UNSIGNED NOT NULL,
  `Title` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
  `CreateAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercise_submission`
--

CREATE TABLE `exercise_submission` (
  `SubmissionID` int(10) UNSIGNED NOT NULL,
  `ExerciseID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED NOT NULL,
  `Code` text DEFAULT NULL,
  `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `Status` enum('pending','passed','failed') DEFAULT NULL,
  `Output` text DEFAULT NULL,
  `SubmittedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE `lesson` (
  `LessonID` int(10) UNSIGNED NOT NULL,
  `ChapterID` int(10) UNSIGNED NOT NULL,
  `FileLink` text DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Period` int(11) DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `IsAllowDemo` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`LessonID`, `ChapterID`, `FileLink`, `Title`, `Period`, `OrderNumber`, `Description`, `IsAllowDemo`) VALUES
(5, 2, NULL, NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `NoteID` int(10) UNSIGNED NOT NULL,
  `ProgressID` int(10) UNSIGNED DEFAULT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `PaymentCode` text DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Purpose` varchar(20) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `ProgressID` int(10) UNSIGNED NOT NULL,
  `EnrollmentID` int(10) UNSIGNED DEFAULT NULL,
  `LessonID` int(10) UNSIGNED DEFAULT NULL,
  `ProgressTime` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `QuestionID` int(10) UNSIGNED NOT NULL,
  `QuizzID` int(10) UNSIGNED DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Picture` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quizz`
--

CREATE TABLE `quizz` (
  `QuizzID` int(10) UNSIGNED NOT NULL,
  `LessonID` int(10) UNSIGNED DEFAULT NULL,
  `ChapterID` int(10) UNSIGNED DEFAULT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `Title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quizz`
--

INSERT INTO `quizz` (`QuizzID`, `LessonID`, `ChapterID`, `CourseID`, `Title`) VALUES
(1, NULL, 2, NULL, NULL),
(3, 5, NULL, NULL, NULL),
(4, 5, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ratecourse`
--

CREATE TABLE `ratecourse` (
  `RateCourseID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `CourseID` int(10) UNSIGNED DEFAULT NULL,
  `StarNumber` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `submit`
--

CREATE TABLE `submit` (
  `SubmitID` int(10) UNSIGNED NOT NULL,
  `QuizzID` int(10) UNSIGNED DEFAULT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `systemtransaction`
--

CREATE TABLE `systemtransaction` (
  `SystemTransactionID` int(10) UNSIGNED NOT NULL,
  `PaymentID` int(10) UNSIGNED DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `UserID` int(10) UNSIGNED DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(10) UNSIGNED NOT NULL,
  `Email` text DEFAULT NULL,
  `HashPassword` text DEFAULT NULL,
  `PhoneNumber` text DEFAULT NULL,
  `About` text DEFAULT NULL,
  `AvatarLink` text DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `Role` enum('student','teacher','admin') NOT NULL DEFAULT 'student',
  `CreateAt` datetime DEFAULT NULL,
  `IsPremium` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Email`, `HashPassword`, `PhoneNumber`, `About`, `AvatarLink`, `BankName`, `BankAccountNumber`, `Role`, `CreateAt`, `IsPremium`) VALUES
(1, 's1@gmail.com', '$2a$10$X535TKEhM0nmjdeX2lTK8.DZ/rbwzHg04C/.wCqkrlE5Cpuo4Lkwq', NULL, NULL, NULL, NULL, NULL, 'student', '2024-10-16 11:32:37', NULL),
(3, 't1@gmail.com', '$2a$10$CV8bGUBBcpZv9hVQ21k4GuLvQUSpAWVoUYIY46SqJlgiJ4Kuknaja', NULL, NULL, NULL, NULL, NULL, 'teacher', '2024-10-16 11:33:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `useranswer`
--

CREATE TABLE `useranswer` (
  `UserAnswerID` int(10) UNSIGNED NOT NULL,
  `SubmitID` int(10) UNSIGNED DEFAULT NULL,
  `AnswerID` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usertransaction`
--

CREATE TABLE `usertransaction` (
  `UserTransactionID` int(10) UNSIGNED NOT NULL,
  `PaymentID` int(10) UNSIGNED DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Bank` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`AnswerID`),
  ADD KEY `FK_answer_question` (`QuestionID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `categoryofcourse`
--
ALTER TABLE `categoryofcourse`
  ADD PRIMARY KEY (`CategoryOfCourseID`),
  ADD KEY `FK_categoryofcourse_course` (`CourseID`),
  ADD KEY `FK_categoryofcourse_category` (`CategoryID`);

--
-- Indexes for table `chapter`
--
ALTER TABLE `chapter`
  ADD PRIMARY KEY (`ChapterID`),
  ADD KEY `FK_chapter_course` (`CourseID`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `FK_course_user` (`UserID`),
  ADD KEY `FK_course_category` (`CategoryID`);

--
-- Indexes for table `coursedepend`
--
ALTER TABLE `coursedepend`
  ADD PRIMARY KEY (`CourseDependID`),
  ADD KEY `FK_coursedepend_course` (`CourseID`),
  ADD KEY `FK_coursedepend_dependoncourse` (`DependOnCourseID`);

--
-- Indexes for table `courseoutcome`
--
ALTER TABLE `courseoutcome`
  ADD PRIMARY KEY (`CourseOutcomeID`),
  ADD KEY `FK_contentcourse_course` (`CourseID`);

--
-- Indexes for table `discussion`
--
ALTER TABLE `discussion`
  ADD PRIMARY KEY (`DiscussionID`),
  ADD KEY `FK_discussion_user` (`UserID`),
  ADD KEY `FK_discussion_lesson` (`LessonID`),
  ADD KEY `FK_discussion_course` (`CourseID`),
  ADD KEY `FK_discussion_parent` (`ParentID`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`EnrollmentID`),
  ADD KEY `FK_enrollment_user` (`UserID`),
  ADD KEY `FK_enrollment_course` (`CourseID`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`ExerciseID`),
  ADD KEY `FK_exercise_lesson` (`LessonID`);

--
-- Indexes for table `exercise_submission`
--
ALTER TABLE `exercise_submission`
  ADD PRIMARY KEY (`SubmissionID`),
  ADD KEY `FK_exercise_submission_exercise` (`ExerciseID`),
  ADD KEY `FK_exercise_submission_user` (`UserID`);

--
-- Indexes for table `lesson`
--
ALTER TABLE `lesson`
  ADD PRIMARY KEY (`LessonID`),
  ADD KEY `FK_lesson_chapter` (`ChapterID`);

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`NoteID`),
  ADD KEY `FK_note_progress` (`ProgressID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `FK_payment_user` (`UserID`),
  ADD KEY `FK_payment_course` (`CourseID`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`ProgressID`),
  ADD KEY `FK_progress_enrollment` (`EnrollmentID`),
  ADD KEY `FK_progress_lesson` (`LessonID`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`QuestionID`),
  ADD KEY `FK_question_quizz` (`QuizzID`);

--
-- Indexes for table `quizz`
--
ALTER TABLE `quizz`
  ADD PRIMARY KEY (`QuizzID`),
  ADD KEY `FK_quizz_lesson` (`LessonID`),
  ADD KEY `FK_quizz_chapter` (`ChapterID`),
  ADD KEY `FK_quizz_course` (`CourseID`);

--
-- Indexes for table `ratecourse`
--
ALTER TABLE `ratecourse`
  ADD PRIMARY KEY (`RateCourseID`),
  ADD KEY `FK_ratecourse_user` (`UserID`),
  ADD KEY `FK_ratecourse_course` (`CourseID`);

--
-- Indexes for table `submit`
--
ALTER TABLE `submit`
  ADD PRIMARY KEY (`SubmitID`),
  ADD KEY `FK_submit_quizz` (`QuizzID`),
  ADD KEY `FK_submit_user` (`UserID`);

--
-- Indexes for table `systemtransaction`
--
ALTER TABLE `systemtransaction`
  ADD PRIMARY KEY (`SystemTransactionID`),
  ADD KEY `FK_systemtransaction_payment` (`PaymentID`),
  ADD KEY `FK_systemtransaction_user` (`UserID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `useranswer`
--
ALTER TABLE `useranswer`
  ADD PRIMARY KEY (`UserAnswerID`),
  ADD KEY `FK_useranswer_submit` (`SubmitID`),
  ADD KEY `FK_useranswer_answer` (`AnswerID`);

--
-- Indexes for table `usertransaction`
--
ALTER TABLE `usertransaction`
  ADD PRIMARY KEY (`UserTransactionID`),
  ADD KEY `FK_usertransaction_payment` (`PaymentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `AnswerID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categoryofcourse`
--
ALTER TABLE `categoryofcourse`
  MODIFY `CategoryOfCourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chapter`
--
ALTER TABLE `chapter`
  MODIFY `ChapterID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `CourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `coursedepend`
--
ALTER TABLE `coursedepend`
  MODIFY `CourseDependID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `courseoutcome`
--
ALTER TABLE `courseoutcome`
  MODIFY `CourseOutcomeID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `discussion`
--
ALTER TABLE `discussion`
  MODIFY `DiscussionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `EnrollmentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `ExerciseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exercise_submission`
--
ALTER TABLE `exercise_submission`
  MODIFY `SubmissionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lesson`
--
ALTER TABLE `lesson`
  MODIFY `LessonID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `NoteID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `progress`
--
ALTER TABLE `progress`
  MODIFY `ProgressID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `QuestionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `quizz`
--
ALTER TABLE `quizz`
  MODIFY `QuizzID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ratecourse`
--
ALTER TABLE `ratecourse`
  MODIFY `RateCourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `submit`
--
ALTER TABLE `submit`
  MODIFY `SubmitID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `systemtransaction`
--
ALTER TABLE `systemtransaction`
  MODIFY `SystemTransactionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `useranswer`
--
ALTER TABLE `useranswer`
  MODIFY `UserAnswerID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usertransaction`
--
ALTER TABLE `usertransaction`
  MODIFY `UserTransactionID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `FK_answer_question` FOREIGN KEY (`QuestionID`) REFERENCES `question` (`QuestionID`);

--
-- Constraints for table `categoryofcourse`
--
ALTER TABLE `categoryofcourse`
  ADD CONSTRAINT `FK_categoryofcourse_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  ADD CONSTRAINT `FK_categoryofcourse_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`);

--
-- Constraints for table `chapter`
--
ALTER TABLE `chapter`
  ADD CONSTRAINT `FK_chapter_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_course_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  ADD CONSTRAINT `FK_course_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `coursedepend`
--
ALTER TABLE `coursedepend`
  ADD CONSTRAINT `FK_coursedepend_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_coursedepend_dependoncourse` FOREIGN KEY (`DependOnCourseID`) REFERENCES `course` (`CourseID`);

--
-- Constraints for table `courseoutcome`
--
ALTER TABLE `courseoutcome`
  ADD CONSTRAINT `FK_contentcourse_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `discussion`
--
ALTER TABLE `discussion`
  ADD CONSTRAINT `FK_discussion_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_discussion_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`),
  ADD CONSTRAINT `FK_discussion_parent` FOREIGN KEY (`ParentID`) REFERENCES `discussion` (`DiscussionID`),
  ADD CONSTRAINT `FK_discussion_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `FK_enrollment_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_enrollment_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `exercise`
--
ALTER TABLE `exercise`
  ADD CONSTRAINT `FK_exercise_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

--
-- Constraints for table `exercise_submission`
--
ALTER TABLE `exercise_submission`
  ADD CONSTRAINT `FK_exercise_submission_exercise` FOREIGN KEY (`ExerciseID`) REFERENCES `exercise` (`ExerciseID`),
  ADD CONSTRAINT `FK_exercise_submission_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `lesson`
--
ALTER TABLE `lesson`
  ADD CONSTRAINT `FK_lesson_chapter` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `FK_note_progress` FOREIGN KEY (`ProgressID`) REFERENCES `progress` (`ProgressID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FK_payment_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_payment_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `FK_progress_enrollment` FOREIGN KEY (`EnrollmentID`) REFERENCES `enrollment` (`EnrollmentID`),
  ADD CONSTRAINT `FK_progress_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FK_question_quizz` FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`);

--
-- Constraints for table `quizz`
--
ALTER TABLE `quizz`
  ADD CONSTRAINT `FK_quizz_chapter` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`),
  ADD CONSTRAINT `FK_quizz_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_quizz_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`);

--
-- Constraints for table `ratecourse`
--
ALTER TABLE `ratecourse`
  ADD CONSTRAINT `FK_ratecourse_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  ADD CONSTRAINT `FK_ratecourse_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `submit`
--
ALTER TABLE `submit`
  ADD CONSTRAINT `FK_submit_quizz` FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`),
  ADD CONSTRAINT `FK_submit_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `systemtransaction`
--
ALTER TABLE `systemtransaction`
  ADD CONSTRAINT `FK_systemtransaction_payment` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`),
  ADD CONSTRAINT `FK_systemtransaction_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);

--
-- Constraints for table `useranswer`
--
ALTER TABLE `useranswer`
  ADD CONSTRAINT `FK_useranswer_answer` FOREIGN KEY (`AnswerID`) REFERENCES `answer` (`AnswerID`),
  ADD CONSTRAINT `FK_useranswer_submit` FOREIGN KEY (`SubmitID`) REFERENCES `submit` (`SubmitID`);

--
-- Constraints for table `usertransaction`
--
ALTER TABLE `usertransaction`
  ADD CONSTRAINT `FK_usertransaction_payment` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
