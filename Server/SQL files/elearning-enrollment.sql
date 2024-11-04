CREATE TABLE enrollment (
  EnrollmentID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  UserID INT UNSIGNED NOT NULL,
  CourseID INT UNSIGNED NOT NULL,
  StartDate DATE DEFAULT CURRENT_DATE,             
  EndDate DATE,                                     
  Status ENUM('buying', 'cancelled', 'bought', 'learning', 'completed') DEFAULT 'buying' NOT NULL, 
  Rating INT CHECK(Rating BETWEEN 1 AND 5),        
  Review TEXT,                                     
  CompletionDate DATE,    
  Cost Float DEFAULT 0                         
);

CREATE TABLE progress (
  ProgressID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  EnrollmentID INT UNSIGNED NOT NULL,
  LessonID INT UNSIGNED NOT NULL,
  ProgressTime INT DEFAULT 0,  
  IsCompleted BOOLEAN DEFAULT FALSE, 
  CompletionDate DATETIME DEFAULT NULL, 
  Attempts INT UNSIGNED DEFAULT 0, 
  LastAccessedAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (EnrollmentID) REFERENCES enrollment(EnrollmentID) ON DELETE CASCADE
);


CREATE TABLE note (
  NoteID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ProgressID INT UNSIGNED NOT NULL,
  Title VARCHAR(100) DEFAULT NULL,           
  Content TEXT DEFAULT NULL,                 
  atTime INT UNSIGNED DEFAULT 0,            
  IsImportant BOOLEAN DEFAULT FALSE,         
  CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
  UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  FOREIGN KEY (ProgressID) REFERENCES progress(ProgressID) ON DELETE CASCADE
);
