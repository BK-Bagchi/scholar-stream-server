import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  deleteApplication,
  getAllApplications,
  getAnalytics,
  getUserApplications,
  postApplication,
  updateApplication,
  updateApplicationStatus,
} from "../controller/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/", (req, res) => {
  res.json({ message: "Application route" });
});

applicationRouter.post("/post", authMiddleware, postApplication);

applicationRouter.get("/all", authMiddleware, getAllApplications);

applicationRouter.get("/analytics", authMiddleware, getAnalytics);

applicationRouter.get("/user", authMiddleware, getUserApplications);

applicationRouter.put("/update/:id", authMiddleware, updateApplication);

//prettier-ignore
applicationRouter.patch("/update-status/:id", authMiddleware, updateApplicationStatus);

applicationRouter.delete("/delete/:id", authMiddleware, deleteApplication);

export default applicationRouter;
