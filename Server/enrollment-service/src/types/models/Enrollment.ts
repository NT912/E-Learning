export interface Enrollment {
  EnrollmentID?: number;
  UserID: number;
  CourseID: number;
  StartDate?: Date;
  EndDate?: Date;
  Status?: 'buying' | 'cancelled' | 'bought' | 'learning' | 'completed';
  Rating?: number;
  Review?: string;
  CompletionDate?: Date;
  Cost?: number;
}
