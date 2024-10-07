-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 06, 2024 at 12:11 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `learning`
--

-- --------------------------------------------------------

--
-- Table structure for table `Answer`
--

CREATE TABLE `Answer` (
  `AnswerID` int(11) NOT NULL,
  `QuestionID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int(11) NOT NULL,
  `Name` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Chapter`
--

CREATE TABLE `Chapter` (
  `ChapterID` int(11) NOT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ContentCourse`
--

CREATE TABLE `ContentCourse` (
  `ContentCourseID` int(11) NOT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE `Course` (
  `CourseID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Name` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `ShortCut` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `State` enum('public','wait','pending','rejected') DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Cost` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CourseDepend`
--

CREATE TABLE `CourseDepend` (
  `CourseDependID` int(11) NOT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `DependOnCourseID` int(11) DEFAULT NULL,
  `IsRequire` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Discussion`
--

CREATE TABLE `Discussion` (
  `DiscussionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `VideoID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Enrollment`
--

CREATE TABLE `Enrollment` (
  `EnrollmentID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `File`
--

CREATE TABLE `File` (
  `FileID` int(11) NOT NULL,
  `VideoID` int(11) DEFAULT NULL,
  `ChapterID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `DiscussionID` int(11) DEFAULT NULL,
  `FileLink` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Note`
--

CREATE TABLE `Note` (
  `NoteID` int(11) NOT NULL,
  `ProgressID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `PaymentCode` text DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Purpose` enum('purchase_course','upgrade_premium') DEFAULT NULL,
  `Status` enum('pending','success','error') DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Progress`
--

CREATE TABLE `Progress` (
  `ProgressID` int(11) NOT NULL,
  `EnrollmentID` int(11) DEFAULT NULL,
  `VideoID` int(11) DEFAULT NULL,
  `ProgressTime` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Question`
--

CREATE TABLE `Question` (
  `QuestionID` int(11) NOT NULL,
  `QuizzID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Picture` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Quizz`
--

CREATE TABLE `Quizz` (
  `QuizzID` int(11) NOT NULL,
  `Title` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RateCourse`
--

CREATE TABLE `RateCourse` (
  `RateCourseID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `StarNumber` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Submit`
--

CREATE TABLE `Submit` (
  `SubmitID` int(11) NOT NULL,
  `QuizzID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SystemTransaction`
--

CREATE TABLE `SystemTransaction` (
  `SystemTransactionID` int(11) NOT NULL,
  `PaymentID` int(11) DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `Status` enum('pending','success','error') DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `Email` text DEFAULT NULL,
  `HashPassword` text DEFAULT NULL,
  `PhoneNumber` text DEFAULT NULL,
  `About` text DEFAULT NULL,
  `AvatarLink` text DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `IsPremium` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserAnswer`
--

CREATE TABLE `UserAnswer` (
  `UserAnswerID` int(11) NOT NULL,
  `SubmitID` int(11) DEFAULT NULL,
  `AnswerID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserTransaction`
--

CREATE TABLE `UserTransaction` (
  `UserTransactionID` int(11) NOT NULL,
  `PaymentID` int(11) DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Bank` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE `Video` (
  `VideoID` int(11) NOT NULL,
  `ChapterID` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `VideoLink` text DEFAULT NULL,
  `Time` int(11) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `IsAllowDemo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Answer`
--
ALTER TABLE `Answer`
  ADD PRIMARY KEY (`AnswerID`),
  ADD KEY `QuestionID` (`QuestionID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `Chapter`
--
ALTER TABLE `Chapter`
  ADD PRIMARY KEY (`ChapterID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `ContentCourse`
--
ALTER TABLE `ContentCourse`
  ADD PRIMARY KEY (`ContentCourseID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `CourseDepend`
--
ALTER TABLE `CourseDepend`
  ADD PRIMARY KEY (`CourseDependID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `DependOnCourseID` (`DependOnCourseID`);

--
-- Indexes for table `Discussion`
--
ALTER TABLE `Discussion`
  ADD PRIMARY KEY (`DiscussionID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `VideoID` (`VideoID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `ParentID` (`ParentID`);

--
-- Indexes for table `Enrollment`
--
ALTER TABLE `Enrollment`
  ADD PRIMARY KEY (`EnrollmentID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `File`
--
ALTER TABLE `File`
  ADD PRIMARY KEY (`FileID`),
  ADD KEY `VideoID` (`VideoID`),
  ADD KEY `ChapterID` (`ChapterID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `DiscussionID` (`DiscussionID`);

--
-- Indexes for table `Note`
--
ALTER TABLE `Note`
  ADD PRIMARY KEY (`NoteID`),
  ADD KEY `ProgressID` (`ProgressID`);

--
-- Indexes for table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD UNIQUE KEY `PaymentCode` (`PaymentCode`) USING HASH,
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `Progress`
--
ALTER TABLE `Progress`
  ADD PRIMARY KEY (`ProgressID`),
  ADD KEY `EnrollmentID` (`EnrollmentID`),
  ADD KEY `VideoID` (`VideoID`);

--
-- Indexes for table `Question`
--
ALTER TABLE `Question`
  ADD PRIMARY KEY (`QuestionID`),
  ADD KEY `QuizzID` (`QuizzID`);

--
-- Indexes for table `Quizz`
--
ALTER TABLE `Quizz`
  ADD PRIMARY KEY (`QuizzID`);

--
-- Indexes for table `RateCourse`
--
ALTER TABLE `RateCourse`
  ADD PRIMARY KEY (`RateCourseID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `CourseID` (`CourseID`);

--
-- Indexes for table `Submit`
--
ALTER TABLE `Submit`
  ADD PRIMARY KEY (`SubmitID`),
  ADD KEY `QuizzID` (`QuizzID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `SystemTransaction`
--
ALTER TABLE `SystemTransaction`
  ADD PRIMARY KEY (`SystemTransactionID`),
  ADD KEY `PaymentID` (`PaymentID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `UserAnswer`
--
ALTER TABLE `UserAnswer`
  ADD PRIMARY KEY (`UserAnswerID`),
  ADD KEY `SubmitID` (`SubmitID`),
  ADD KEY `AnswerID` (`AnswerID`);

--
-- Indexes for table `UserTransaction`
--
ALTER TABLE `UserTransaction`
  ADD PRIMARY KEY (`UserTransactionID`),
  ADD KEY `PaymentID` (`PaymentID`);

--
-- Indexes for table `Video`
--
ALTER TABLE `Video`
  ADD PRIMARY KEY (`VideoID`),
  ADD KEY `ChapterID` (`ChapterID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Answer`
--
ALTER TABLE `Answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`QuestionID`) REFERENCES `Question` (`QuestionID`);

--
-- Constraints for table `Chapter`
--
ALTER TABLE `Chapter`
  ADD CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `ContentCourse`
--
ALTER TABLE `ContentCourse`
  ADD CONSTRAINT `contentcourse_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `Course`
--
ALTER TABLE `Course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `Category` (`CategoryID`);

--
-- Constraints for table `CourseDepend`
--
ALTER TABLE `CourseDepend`
  ADD CONSTRAINT `coursedepend_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`),
  ADD CONSTRAINT `coursedepend_ibfk_2` FOREIGN KEY (`DependOnCourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `Discussion`
--
ALTER TABLE `Discussion`
  ADD CONSTRAINT `discussion_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `discussion_ibfk_2` FOREIGN KEY (`VideoID`) REFERENCES `Video` (`VideoID`),
  ADD CONSTRAINT `discussion_ibfk_3` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`),
  ADD CONSTRAINT `discussion_ibfk_4` FOREIGN KEY (`ParentID`) REFERENCES `Discussion` (`DiscussionID`);

--
-- Constraints for table `Enrollment`
--
ALTER TABLE `Enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `File`
--
ALTER TABLE `File`
  ADD CONSTRAINT `file_ibfk_1` FOREIGN KEY (`VideoID`) REFERENCES `Video` (`VideoID`),
  ADD CONSTRAINT `file_ibfk_2` FOREIGN KEY (`ChapterID`) REFERENCES `Chapter` (`ChapterID`),
  ADD CONSTRAINT `file_ibfk_3` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`),
  ADD CONSTRAINT `file_ibfk_4` FOREIGN KEY (`DiscussionID`) REFERENCES `Discussion` (`DiscussionID`);

--
-- Constraints for table `Note`
--
ALTER TABLE `Note`
  ADD CONSTRAINT `note_ibfk_1` FOREIGN KEY (`ProgressID`) REFERENCES `Progress` (`ProgressID`);

--
-- Constraints for table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `Progress`
--
ALTER TABLE `Progress`
  ADD CONSTRAINT `progress_ibfk_1` FOREIGN KEY (`EnrollmentID`) REFERENCES `Enrollment` (`EnrollmentID`),
  ADD CONSTRAINT `progress_ibfk_2` FOREIGN KEY (`VideoID`) REFERENCES `Video` (`VideoID`);

--
-- Constraints for table `Question`
--
ALTER TABLE `Question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`QuizzID`) REFERENCES `Quizz` (`QuizzID`);

--
-- Constraints for table `RateCourse`
--
ALTER TABLE `RateCourse`
  ADD CONSTRAINT `ratecourse_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `ratecourse_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `Course` (`CourseID`);

--
-- Constraints for table `Submit`
--
ALTER TABLE `Submit`
  ADD CONSTRAINT `submit_ibfk_1` FOREIGN KEY (`QuizzID`) REFERENCES `Quizz` (`QuizzID`),
  ADD CONSTRAINT `submit_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

--
-- Constraints for table `SystemTransaction`
--
ALTER TABLE `SystemTransaction`
  ADD CONSTRAINT `systemtransaction_ibfk_1` FOREIGN KEY (`PaymentID`) REFERENCES `Payment` (`PaymentID`),
  ADD CONSTRAINT `systemtransaction_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

--
-- Constraints for table `UserAnswer`
--
ALTER TABLE `UserAnswer`
  ADD CONSTRAINT `useranswer_ibfk_1` FOREIGN KEY (`SubmitID`) REFERENCES `Submit` (`SubmitID`),
  ADD CONSTRAINT `useranswer_ibfk_2` FOREIGN KEY (`AnswerID`) REFERENCES `Answer` (`AnswerID`);

--
-- Constraints for table `UserTransaction`
--
ALTER TABLE `UserTransaction`
  ADD CONSTRAINT `usertransaction_ibfk_1` FOREIGN KEY (`PaymentID`) REFERENCES `Payment` (`PaymentID`);

--
-- Constraints for table `Video`
--
ALTER TABLE `Video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`ChapterID`) REFERENCES `Chapter` (`ChapterID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
