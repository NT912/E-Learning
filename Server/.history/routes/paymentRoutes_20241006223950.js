const express = require("express");
const {
  processPayment,
  recordPayment,
} = require("../controllers/paymentController");
const router = express.Router();

router.post("/process", processPayment);
router.post("/record", recordPayment);

module.exports = router;
