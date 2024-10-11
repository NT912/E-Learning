const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { Payment } from "~/models/Payment";

exports.processPayment = (req, res) => {
  const { amount, currency, description } = req.body;
  stripe.paymentIntents.create(
    {
      amount,
      currency,
      payment_method_types: ["card"],
      description,
    },
    (err, paymentIntent) => {
      if (err) return res.status(500).send("Payment error");
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    }
  );
};

exports.recordPayment = (req, res) => {
  const { userID, courseID, amount } = req.body;
  Payment.create(
    { userID, courseID, amount, date: new Date() },
    (err, result) => {
      if (err) return res.status(400).send("Error recording payment");
      res.status(201).send("Payment recorded");
    }
  );
};
