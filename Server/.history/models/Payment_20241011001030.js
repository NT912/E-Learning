import { db } from "../config/db";

const Payment = {
  create: (paymentData, callback) => {
    const sql = `INSERT INTO Payment (UserID, CourseID, Amount, CreateAt) VALUES (?, ?, ?, ?)`;
    db.query(
      sql,
      [
        paymentData.userID,
        paymentData.courseID,
        paymentData.amount,
        new Date(),
      ],
      callback
    );
  },
};

export const Payment = {
  Payment,
};
