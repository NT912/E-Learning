export interface Enrollment {
  EnrollmentID?: number;
  UserID: number;
  CourseID: number;
  StartDate?: Date;
  EndDate?: Date;
  Status?: 'active' | 'completed' | 'cancelled' | 'suspended';
  Rating?: number;
  Review?: string;
  CompletionDate?: Date;
}