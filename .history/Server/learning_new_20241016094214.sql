-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (arm64)
--
-- Host: localhost    Database: e_learning
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `AnswerID` int NOT NULL AUTO_INCREMENT,
  `QuestionID` int DEFAULT NULL,
  `Content` text,
  `Score` float DEFAULT NULL,
  PRIMARY KEY (`AnswerID`),
  KEY `FK_answer_question` (`QuestionID`),
  CONSTRAINT `FK_answer_question` FOREIGN KEY (`QuestionID`) REFERENCES `question` (`QuestionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `Name` text,
  `Description` text,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Category 1','Description for Category 1');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `ChapterID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int DEFAULT NULL,
  `OrderNumber` int DEFAULT NULL,
  `Title` text,
  `Description` text,
  PRIMARY KEY (`ChapterID`),
  KEY `FK_chapter_course` (`CourseID`),
  CONSTRAINT `FK_chapter_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,1,1,'Chapter 1','Description for Chapter 1'),(2,1,NULL,'Chapter 1: Basics of Programming',NULL);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contentcourse`
--

DROP TABLE IF EXISTS `contentcourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contentcourse` (
  `ContentCourseID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int DEFAULT NULL,
  `Content` text,
  PRIMARY KEY (`ContentCourseID`),
  KEY `FK_contentcourse_course` (`CourseID`),
  CONSTRAINT `FK_contentcourse_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contentcourse`
--

LOCK TABLES `contentcourse` WRITE;
/*!40000 ALTER TABLE `contentcourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `contentcourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `CourseID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Name` text,
  `PictureLink` text,
  `ShortCut` text,
  `Description` text,
  `CreateAt` datetime DEFAULT NULL,
  `ParentID` int DEFAULT NULL,
  `State` varchar(10) DEFAULT NULL,
  `CategoryID` int DEFAULT NULL,
  `Cost` float DEFAULT NULL,
  PRIMARY KEY (`CourseID`),
  KEY `FK_course_user` (`UserID`),
  KEY `FK_course_category` (`CategoryID`),
  CONSTRAINT `FK_course_category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  CONSTRAINT `FK_course_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `course_chk_1` CHECK ((`State` in (_utf8mb4'public',_utf8mb4'wait',_utf8mb4'pending',_utf8mb4'rejected')))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Course 1','','','Description for Course 1','2024-10-15 08:27:35',NULL,'public',1,0),(2,1,NULL,NULL,NULL,NULL,'2024-10-15 21:11:08',NULL,NULL,NULL,NULL),(3,1,NULL,NULL,NULL,NULL,'2024-10-15 21:15:09',NULL,NULL,NULL,NULL),(4,1,NULL,NULL,NULL,NULL,'2024-10-15 21:17:46',NULL,NULL,NULL,NULL),(5,1,NULL,NULL,NULL,NULL,'2024-10-15 21:21:00',NULL,NULL,NULL,NULL),(6,1,NULL,NULL,NULL,NULL,'2024-10-15 21:21:03',NULL,NULL,NULL,NULL),(7,1,NULL,NULL,NULL,NULL,'2024-10-15 21:21:28',NULL,NULL,NULL,NULL),(8,1,NULL,NULL,NULL,NULL,'2024-10-15 21:23:14',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursedepend`
--

DROP TABLE IF EXISTS `coursedepend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursedepend` (
  `CourseDependID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int DEFAULT NULL,
  `DependOnCourseID` int DEFAULT NULL,
  `IsRequire` bit(1) DEFAULT NULL,
  PRIMARY KEY (`CourseDependID`),
  KEY `FK_coursedepend_course` (`CourseID`),
  KEY `FK_coursedepend_dependoncourse` (`DependOnCourseID`),
  CONSTRAINT `FK_coursedepend_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `FK_coursedepend_dependoncourse` FOREIGN KEY (`DependOnCourseID`) REFERENCES `course` (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursedepend`
--

LOCK TABLES `coursedepend` WRITE;
/*!40000 ALTER TABLE `coursedepend` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursedepend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion`
--

DROP TABLE IF EXISTS `discussion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion` (
  `DiscussionID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `LessonID` int DEFAULT NULL,
  `CourseID` int DEFAULT NULL,
  `ParentID` int DEFAULT NULL,
  `Content` text,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`DiscussionID`),
  KEY `FK_discussion_user` (`UserID`),
  KEY `FK_discussion_course` (`CourseID`),
  KEY `FK_discussion_parent` (`ParentID`),
  KEY `FK_discussion_lesson` (`LessonID`),
  CONSTRAINT `FK_discussion_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `FK_discussion_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`) ON DELETE CASCADE,
  CONSTRAINT `FK_discussion_parent` FOREIGN KEY (`ParentID`) REFERENCES `discussion` (`DiscussionID`),
  CONSTRAINT `FK_discussion_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion`
--

LOCK TABLES `discussion` WRITE;
/*!40000 ALTER TABLE `discussion` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `EnrollmentID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `CourseID` int DEFAULT NULL,
  PRIMARY KEY (`EnrollmentID`),
  KEY `FK_enrollment_user` (`UserID`),
  KEY `FK_enrollment_course` (`CourseID`),
  CONSTRAINT `FK_enrollment_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `FK_enrollment_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `ExerciseID` int NOT NULL AUTO_INCREMENT,
  `LessonID` int NOT NULL,
  `Title` text,
  `Description` text,
  `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
  `CreateAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ExerciseID`),
  KEY `LessonID` (`LessonID`),
  CONSTRAINT `exercise_ibfk_1` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_submission`
--

DROP TABLE IF EXISTS `exercise_submission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_submission` (
  `SubmissionID` int NOT NULL AUTO_INCREMENT,
  `ExerciseID` int NOT NULL,
  `UserID` int NOT NULL,
  `Code` text,
  `Language` enum('python','javascript','c','csharp','java','ruby','php','go') DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `Status` enum('pending','passed','failed') DEFAULT NULL,
  `Output` text,
  `SubmittedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`SubmissionID`),
  KEY `ExerciseID` (`ExerciseID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `exercise_submission_ibfk_1` FOREIGN KEY (`ExerciseID`) REFERENCES `exercise` (`ExerciseID`),
  CONSTRAINT `exercise_submission_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_submission`
--

LOCK TABLES `exercise_submission` WRITE;
/*!40000 ALTER TABLE `exercise_submission` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_submission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `LessonID` int NOT NULL AUTO_INCREMENT,
  `ChapterID` int NOT NULL,
  `FileLink` text,
  `Title` text,
  `Period` int DEFAULT NULL,
  `OrderNumber` int DEFAULT NULL,
  `Description` text,
  `IsAllowDemo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`LessonID`),
  KEY `ChapterID` (`ChapterID`),
  CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `NoteID` int NOT NULL AUTO_INCREMENT,
  `ProgressID` int DEFAULT NULL,
  `Content` text,
  PRIMARY KEY (`NoteID`),
  KEY `FK_note_progress` (`ProgressID`),
  CONSTRAINT `FK_note_progress` FOREIGN KEY (`ProgressID`) REFERENCES `progress` (`ProgressID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `CourseID` int DEFAULT NULL,
  `PaymentCode` text,
  `Amount` float DEFAULT NULL,
  `Purpose` varchar(20) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  `ExpireAt` datetime DEFAULT NULL,
  `UpdateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `FK_payment_user` (`UserID`),
  KEY `FK_payment_course` (`CourseID`),
  CONSTRAINT `FK_payment_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `FK_payment_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `payment_chk_1` CHECK ((`Purpose` in (_utf8mb4'purchase_course',_utf8mb4'upgrade_premium'))),
  CONSTRAINT `payment_chk_2` CHECK ((`Status` in (_utf8mb4'pending',_utf8mb4'success',_utf8mb4'error')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `progress`
--

DROP TABLE IF EXISTS `progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progress` (
  `ProgressID` int NOT NULL AUTO_INCREMENT,
  `EnrollmentID` int DEFAULT NULL,
  `LessonID` int DEFAULT NULL,
  `ProgressTime` int DEFAULT NULL,
  PRIMARY KEY (`ProgressID`),
  KEY `FK_progress_enrollment` (`EnrollmentID`),
  KEY `FK_progress_lesson` (`LessonID`),
  CONSTRAINT `FK_progress_enrollment` FOREIGN KEY (`EnrollmentID`) REFERENCES `enrollment` (`EnrollmentID`),
  CONSTRAINT `FK_progress_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progress`
--

LOCK TABLES `progress` WRITE;
/*!40000 ALTER TABLE `progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `QuestionID` int NOT NULL AUTO_INCREMENT,
  `QuizzID` int DEFAULT NULL,
  `Content` text,
  `Picture` text,
  PRIMARY KEY (`QuestionID`),
  KEY `FK_question_quizz` (`QuizzID`),
  CONSTRAINT `FK_question_quizz` FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (2,5,'What is the capital of France?',NULL),(3,1,'What is the capital of France?',NULL),(4,1,'What is the capital of France?',NULL);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quizz`
--

DROP TABLE IF EXISTS `quizz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quizz` (
  `QuizzID` int NOT NULL AUTO_INCREMENT,
  `LessonID` int DEFAULT NULL,
  `ChapterID` int DEFAULT NULL,
  `CourseID` int DEFAULT NULL,
  `Title` text,
  PRIMARY KEY (`QuizzID`),
  KEY `FK_quizz_chapter` (`ChapterID`),
  KEY `FK_quizz_lesson` (`LessonID`),
  CONSTRAINT `FK_quizz_chapter` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`),
  CONSTRAINT `FK_quizz_lesson` FOREIGN KEY (`LessonID`) REFERENCES `lesson` (`LessonID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quizz`
--

LOCK TABLES `quizz` WRITE;
/*!40000 ALTER TABLE `quizz` DISABLE KEYS */;
INSERT INTO `quizz` VALUES (1,NULL,1,NULL,'Chapter 1 Quiz'),(3,NULL,1,NULL,'Chapter 1 Quiz'),(4,NULL,1,NULL,'Chapter 1 Quiz'),(5,NULL,1,NULL,'Chapter 1 Quiz');
/*!40000 ALTER TABLE `quizz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratecourse`
--

DROP TABLE IF EXISTS `ratecourse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratecourse` (
  `RateCourseID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `CourseID` int DEFAULT NULL,
  `StarNumber` int DEFAULT NULL,
  `Comment` text,
  PRIMARY KEY (`RateCourseID`),
  KEY `FK_ratecourse_user` (`UserID`),
  KEY `FK_ratecourse_course` (`CourseID`),
  CONSTRAINT `FK_ratecourse_course` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`),
  CONSTRAINT `FK_ratecourse_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratecourse`
--

LOCK TABLES `ratecourse` WRITE;
/*!40000 ALTER TABLE `ratecourse` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratecourse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submit`
--

DROP TABLE IF EXISTS `submit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submit` (
  `SubmitID` int NOT NULL AUTO_INCREMENT,
  `QuizzID` int DEFAULT NULL,
  `UserID` int DEFAULT NULL,
  `Score` float DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`SubmitID`),
  KEY `FK_submit_quizz` (`QuizzID`),
  KEY `FK_submit_user` (`UserID`),
  CONSTRAINT `FK_submit_quizz` FOREIGN KEY (`QuizzID`) REFERENCES `quizz` (`QuizzID`),
  CONSTRAINT `FK_submit_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submit`
--

LOCK TABLES `submit` WRITE;
/*!40000 ALTER TABLE `submit` DISABLE KEYS */;
/*!40000 ALTER TABLE `submit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `systemtransaction`
--

DROP TABLE IF EXISTS `systemtransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `systemtransaction` (
  `SystemTransactionID` int NOT NULL AUTO_INCREMENT,
  `PaymentID` int DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text,
  `UserID` int DEFAULT NULL,
  `BankName` text,
  `BankAccountNumber` text,
  `Status` varchar(10) DEFAULT NULL,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`SystemTransactionID`),
  KEY `FK_systemtransaction_payment` (`PaymentID`),
  KEY `FK_systemtransaction_user` (`UserID`),
  CONSTRAINT `FK_systemtransaction_payment` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`),
  CONSTRAINT `FK_systemtransaction_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `systemtransaction_chk_1` CHECK ((`Status` in (_utf8mb4'pending',_utf8mb4'success',_utf8mb4'error')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `systemtransaction`
--

LOCK TABLES `systemtransaction` WRITE;
/*!40000 ALTER TABLE `systemtransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `systemtransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Email` text,
  `HashPassword` text,
  `PhoneNumber` text,
  `About` text,
  `AvatarLink` text,
  `BankName` text,
  `BankAccountNumber` text,
  `Role` enum('student','teacher','admin') NOT NULL DEFAULT 'student',
  `CreateAt` datetime DEFAULT NULL,
  `IsPremium` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tt912002@gmail.com','$2a$10$GZm75Zg4NBVjZ8.bU7kkN.DBhRQIUYBw.bNmB1BzVAx/VeItZCI1e',NULL,NULL,NULL,NULL,NULL,'teacher','2024-10-14 18:39:02',NULL),(8,'tt@gmail.com','$2a$10$yITE9Wjqpd2AMutem4sXx.MEyDlowOtLpyzY4em9DVGE3ATJcqqA6',NULL,NULL,NULL,NULL,NULL,'teacher','2024-10-14 18:26:11',NULL),(10,'l4@gmail.com','$2a$10$WsizzHsyuKo2C1qS.9W49OKH7WQ7vz6cX/C5x.S0kxH3STFg2f9iW',NULL,NULL,NULL,NULL,NULL,'teacher','2024-10-15 21:09:52',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useranswer`
--

DROP TABLE IF EXISTS `useranswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useranswer` (
  `UserAnswerID` int NOT NULL AUTO_INCREMENT,
  `SubmitID` int DEFAULT NULL,
  `AnswerID` int DEFAULT NULL,
  PRIMARY KEY (`UserAnswerID`),
  KEY `FK_useranswer_submit` (`SubmitID`),
  KEY `FK_useranswer_answer` (`AnswerID`),
  CONSTRAINT `FK_useranswer_answer` FOREIGN KEY (`AnswerID`) REFERENCES `answer` (`AnswerID`),
  CONSTRAINT `FK_useranswer_submit` FOREIGN KEY (`SubmitID`) REFERENCES `submit` (`SubmitID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useranswer`
--

LOCK TABLES `useranswer` WRITE;
/*!40000 ALTER TABLE `useranswer` DISABLE KEYS */;
/*!40000 ALTER TABLE `useranswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertransaction`
--

DROP TABLE IF EXISTS `usertransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertransaction` (
  `UserTransactionID` int NOT NULL AUTO_INCREMENT,
  `PaymentID` int DEFAULT NULL,
  `Amount` float DEFAULT NULL,
  `Message` text,
  `Bank` text,
  `BankAccountNumber` text,
  `CreateAt` datetime DEFAULT NULL,
  PRIMARY KEY (`UserTransactionID`),
  KEY `FK_usertransaction_payment` (`PaymentID`),
  CONSTRAINT `FK_usertransaction_payment` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertransaction`
--

LOCK TABLES `usertransaction` WRITE;
/*!40000 ALTER TABLE `usertransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `usertransaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-16  9:42:15
