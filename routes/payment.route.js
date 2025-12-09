import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  checkSession,
  createSession,
} from "../controller/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.get("/", (req, res) => {
  res.json({ message: "Payment route" });
});

paymentRouter.post("/create-session", authMiddleware, createSession);

paymentRouter.get("/session/:sessionId", authMiddleware, checkSession);

export default paymentRouter;
