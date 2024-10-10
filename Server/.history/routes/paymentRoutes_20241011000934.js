const express = require("express");
import { processPayment, recordPayment } from "~/controllers/paymentController";
import { verifyToken } from "~/middleware/authMiddleware";
const router = express.Router();

router.post("/process", verifyToken, processPayment);
router.post("/record", verifyToken, recordPayment);

export const paymentRoutes = {
  router,
};
