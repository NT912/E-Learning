const express = require("express");
import { processPayment, recordPayment } from "~/controllers/paymentController";
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/process", verifyToken, processPayment);
router.post("/record", verifyToken, recordPayment);

module.exports = router;
