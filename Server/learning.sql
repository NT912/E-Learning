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
  `AnswerID` int(11) NOT NULL AUTO_INCREMENT,
  `QuestionID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Score` float DEFAULT NULL,
  PRIMARY KEY (`AnswerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Chapter`
--

CREATE TABLE `Chapter` (
  `ChapterID` int(11) NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  PRIMARY KEY (`ChapterID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ContentCourse`
--

CREATE TABLE `ContentCourse` (
  `ContentCourseID` int(11) NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  PRIMARY KEY (`ContentCourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Course`
--

CREATE TABLE `Course` (
  `CourseID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `Name` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `ShortCut` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `State` enum('public','wait','pending','rejected') DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Cost` float DEFAULT NULL,
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CourseDepend`
--

CREATE TABLE `CourseDepend` (
  `CourseDependID` int(11) NOT NULL AUTO_INCREMENT,
  `CourseID` int(11) DEFAULT NULL,
  `DependOnCourseID` int(11) DEFAULT NULL,
  `IsRequire` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`CourseDependID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Discussion`
--

CREATE TABLE `Discussion` (
  `DiscussionID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `VideoID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `ParentID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`DiscussionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Enrollment`
--

CREATE TABLE `Enrollment` (
  `EnrollmentID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  PRIMARY KEY (`EnrollmentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `File`
--

CREATE TABLE `File` (
  `FileID` int(11) NOT NULL AUTO_INCREMENT,
  `VideoID` int(11) DEFAULT NULL,
  `ChapterID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `DiscussionID` int(11) DEFAULT NULL,
  `FileLink` text DEFAULT NULL,
  PRIMARY KEY (`FileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Note`
--

CREATE TABLE `Note` (
  `NoteID` int(11) NOT NULL AUTO_INCREMENT,
  `ProgressID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  PRIMARY KEY (`NoteID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payment`
--

CREATE TABLE `Payment` (
  `PaymentID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `PaymentCode` text DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Purpose` enum('purchase_course','upgrade_premium') DEFAULT NULL,
  `Status` enum('pending','success','error') DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`PaymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Progress`
--

CREATE TABLE `Progress` (
  `ProgressID` int(11) NOT NULL AUTO_INCREMENT,
  `EnrollmentID` int(11) DEFAULT NULL,
  `VideoID` int(11) DEFAULT NULL,
  `ProgressTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`ProgressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Question`
--

CREATE TABLE `Question` (
  `QuestionID` int(11) NOT NULL AUTO_INCREMENT,
  `QuizzID` int(11) DEFAULT NULL,
  `Content` text DEFAULT NULL,
  `Picture` text DEFAULT NULL,
  PRIMARY KEY (`QuestionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Quizz`
--

CREATE TABLE `Quizz` (
  `QuizzID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` text DEFAULT NULL,
  PRIMARY KEY (`QuizzID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RateCourse`
--

CREATE TABLE `RateCourse` (
  `RateCourseID` int(11) NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `CourseID` int(11) DEFAULT NULL,
  `StarNumber` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL,
  PRIMARY KEY (`RateCourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Submit`
--

CREATE TABLE `Submit` (
  `SubmitID` int(11) NOT NULL AUTO_INCREMENT,
  `QuizzID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`SubmitID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `SystemTransaction`
--

CREATE TABLE `SystemTransaction` (
  `SystemTransactionID` int(11) NOT NULL AUTO_INCREMENT,
  `PaymentID` int(11) DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `Status` enum('pending','success','error') DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`SystemTransactionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` text DEFAULT NULL,
  `HashPassword` text DEFAULT NULL,
  `PhoneNumber` text DEFAULT NULL,
  `About` text DEFAULT NULL,
  `AvatarLink` text DEFAULT NULL,
  `BankName` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `IsPremium` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserAnswer`
--

CREATE TABLE `UserAnswer` (
  `UserAnswerID` int(11) NOT NULL AUTO_INCREMENT,
  `SubmitID` int(11) DEFAULT NULL,
  `AnswerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserAnswerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserTransaction`
--

CREATE TABLE `UserTransaction` (
  `UserTransactionID` int(11) NOT NULL AUTO_INCREMENT,
  `PaymentID` int(11) DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text DEFAULT NULL,
  `Bank` text DEFAULT NULL,
  `BankAccountNumber` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`UserTransactionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE `Video` (
  `VideoID` int(11) NOT NULL AUTO_INCREMENT,
  `ChapterID` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `VideoLink` text DEFAULT NULL,
  `Time` int(11) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `IsAllowDemo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`VideoID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
