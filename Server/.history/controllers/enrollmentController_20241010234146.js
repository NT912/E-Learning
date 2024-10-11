import { enrollmentService } from "~/services/enrollmentService";

exports.enroll = (req, res) => {
  enrollmentService.enroll(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    res.status(201).send("Enrollment successful");
  });
};
