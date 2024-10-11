import express from "express";
import { processPayment, recordPayment } from "~/controllers/paymentController";
import { verifyToken } from "~/middleware/authMiddleware";

const router = express.Router();

router.post("/process", verifyToken, processPayment);
router.post("/record", verifyToken, recordPayment);

// Export trực tiếp router
export default router;
