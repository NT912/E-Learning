import { enrollmentService } from "~/services/enrollmentService";

const enroll = (req, res) => {
  enrollmentService.enroll(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(201).send("Enrollment successful");
  });
};

export const EnrollmentController = {
  enroll,
};
