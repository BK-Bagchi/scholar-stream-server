import express from "express";
import {
  addScholarship,
  getScholarship,
} from "../controller/scholarship.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.js";

const scholarshipRouter = express.Router();

scholarshipRouter.get("/", (req, res) => {
  res.json({ message: "Scholarship route" });
});

scholarshipRouter.post("/add", authMiddleware, isAdmin, addScholarship);

scholarshipRouter.get("/get", authMiddleware, isAdmin, getScholarship);

export default scholarshipRouter;
