import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addReview,
  deleteReview,
  getReviews,
  getUserReviews,
  updateReview,
} from "../controller/review.controller.js";

const reviewRouter = express.Router();

reviewRouter.get("/", (req, res) => {
  res.json({ message: "Review route" });
});

reviewRouter.post("/add", authMiddleware, addReview);

reviewRouter.get("/get", authMiddleware, getReviews);

reviewRouter.get("/user-reviews", authMiddleware, getUserReviews);

reviewRouter.put("/update/:id", authMiddleware, updateReview);

reviewRouter.delete("/delete/:id", authMiddleware, deleteReview);

export default reviewRouter;
