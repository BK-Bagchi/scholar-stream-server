import express from "express";
import {
  addScholarship,
  deleteScholarship,
  getAllScholarship,
  updateScholarship,
} from "../controller/scholarship.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/isAdmin.js";

const scholarshipRouter = express.Router();

scholarshipRouter.get("/", (req, res) => {
  res.json({ message: "Scholarship route" });
});

scholarshipRouter.post("/add", authMiddleware, isAdmin, addScholarship);

scholarshipRouter.get("/get", getAllScholarship);

// prettier-ignore
scholarshipRouter.put("/update/:id", authMiddleware, isAdmin, updateScholarship);

// prettier-ignore
scholarshipRouter.delete("/delete/:id", authMiddleware, isAdmin, deleteScholarship);

export default scholarshipRouter;
