SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `category` (
  `CategoryID` int(10) UNSIGNED NOT NULL,
  `Name` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categoryofcourse` (
  `CategoryOfCourseID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `CategoryID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `chapter` (
  `ChapterID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `chapter` (`ChapterID`, `CourseID`, `OrderNumber`, `Title`, `Description`) VALUES
(1, 2, NULL, NULL, NULL),
(2, 2, NULL, NULL, NULL);

CREATE TABLE `course` (
  `CourseID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED NOT NULL,
  `Name` text DEFAULT NULL,
  `PictureLink` text DEFAULT NULL,
  `ShortCut` text DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` datetime DEFAULT current_timestamp(),
  `ParentID` int(10) UNSIGNED DEFAULT NULL,
  `State` enum('Creating','Confirmed','Rejected','Approval','Active','Blocked') DEFAULT 'Creating',
  `CategoryID` int(10) UNSIGNED DEFAULT NULL,
  `Cost` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `course` (`CourseID`, `UserID`, `Name`, `PictureLink`, `ShortCut`, `Description`, `CreateAt`, `ParentID`, `State`, `CategoryID`, `Cost`) VALUES
(1, 1, NULL, NULL, NULL, NULL, '2024-11-12 14:19:02', NULL, 'Confirmed', NULL, 0),
(2, 2, 'Advanced JavaScript Programming', 'https://firebasestorage.googleapis.com/v0/b/web-doan-44696.appspot.com/o/Course_Avatar%2F1731404022357_member1.jpg?alt=media&token=48eb2746-678b-40bc-b912-8c068cd9182f', 'short cut content', NULL, '2024-11-12 15:50:54', NULL, 'Confirmed', NULL, 0),
(3, 2, NULL, NULL, NULL, NULL, '2024-11-17 09:24:12', NULL, 'Creating', NULL, 0),
(4, 2, 'Programming', NULL, NULL, NULL, '2024-11-19 13:19:44', NULL, 'Creating', NULL, 0);

CREATE TABLE `coursedepend` (
  `CourseDependID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `DependOnCourseID` int(10) UNSIGNED NOT NULL,
  `IsRequire` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `coursedepend` (`CourseDependID`, `CourseID`, `DependOnCourseID`, `IsRequire`) VALUES
(2, 2, 1, b'1');

CREATE TABLE `courseoutcome` (
  `CourseOutcomeID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `lesson` (
  `LessonID` int(10) UNSIGNED NOT NULL,
  `ChapterID` int(10) UNSIGNED NOT NULL,
  `FileLink` text DEFAULT NULL,
  `Title` text DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL,
  `OrderNumber` int(11) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `IsAllowDemo` tinyint(1) NOT NULL DEFAULT 0,
  `Type` varchar(50) DEFAULT NULL,
  `Link` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `lesson` (`LessonID`, `ChapterID`, `FileLink`, `Title`, `Duration`, `OrderNumber`, `Description`, `IsAllowDemo`, `Type`, `Link`) VALUES
(1, 1, '', 'aaa', 0, NULL, 'string', 0, 'link', 'https://www.youtube.com/watch?v=r8W_GDzHW7c&list=RDj-oB7Bbv4ig&index=16');

CREATE TABLE `note` (
  `NoteID` int(10) UNSIGNED NOT NULL,
  `ProgressID` int(10) UNSIGNED NOT NULL,
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `ratecourse` (
  `RateCourseID` int(10) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED NOT NULL,
  `CourseID` int(10) UNSIGNED NOT NULL,
  `StarNumber` int(11) DEFAULT NULL,
  `Comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`);

ALTER TABLE `categoryofcourse`
  ADD PRIMARY KEY (`CategoryOfCourseID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `CategoryID` (`CategoryID`);

ALTER TABLE `chapter`
  ADD PRIMARY KEY (`ChapterID`),
  ADD KEY `CourseID` (`CourseID`);

ALTER TABLE `course`
  ADD PRIMARY KEY (`CourseID`),
  ADD KEY `CategoryID` (`CategoryID`);

ALTER TABLE `coursedepend`
  ADD PRIMARY KEY (`CourseDependID`),
  ADD KEY `CourseID` (`CourseID`),
  ADD KEY `DependOnCourseID` (`DependOnCourseID`);

ALTER TABLE `courseoutcome`
  ADD PRIMARY KEY (`CourseOutcomeID`),
  ADD KEY `CourseID` (`CourseID`);

ALTER TABLE `lesson`
  ADD PRIMARY KEY (`LessonID`),
  ADD KEY `ChapterID` (`ChapterID`);

ALTER TABLE `note`
  ADD PRIMARY KEY (`NoteID`);

ALTER TABLE `ratecourse`
  ADD PRIMARY KEY (`RateCourseID`),
  ADD KEY `CourseID` (`CourseID`);

ALTER TABLE `category`
  MODIFY `CategoryID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `categoryofcourse`
  MODIFY `CategoryOfCourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `chapter`
  MODIFY `ChapterID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `course`
  MODIFY `CourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `coursedepend`
  MODIFY `CourseDependID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE `courseoutcome`
  MODIFY `CourseOutcomeID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `lesson`
  MODIFY `LessonID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `note`
  MODIFY `NoteID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `ratecourse`
  MODIFY `RateCourseID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `categoryofcourse`
  ADD CONSTRAINT `categoryofcourse_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE,
  ADD CONSTRAINT `categoryofcourse_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`) ON DELETE CASCADE;

ALTER TABLE `chapter`
  ADD CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE;

ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

ALTER TABLE `coursedepend`
  ADD CONSTRAINT `coursedepend_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE,
  ADD CONSTRAINT `coursedepend_ibfk_2` FOREIGN KEY (`DependOnCourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE;

ALTER TABLE `courseoutcome`
  ADD CONSTRAINT `courseoutcome_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE;

ALTER TABLE `lesson`
  ADD CONSTRAINT `lesson_ibfk_1` FOREIGN KEY (`ChapterID`) REFERENCES `chapter` (`ChapterID`) ON DELETE CASCADE;

ALTER TABLE `ratecourse`
  ADD CONSTRAINT `ratecourse_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `course` (`CourseID`) ON DELETE CASCADE;

COMMIT;
