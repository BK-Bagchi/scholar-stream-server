import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getAllApplications,
  postApplication,
} from "../controller/application.controller.js";

const applicationRouter = express.Router();

applicationRouter.get("/", (req, res) => {
  res.json({ message: "Application route" });
});

applicationRouter.post("/post", authMiddleware, postApplication);

applicationRouter.get("/all", authMiddleware, getAllApplications);

export default applicationRouter;
