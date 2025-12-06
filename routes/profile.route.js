import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} from "../controller/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  res.json({ message: "Profile route" });
});

profileRouter.post("/", authMiddleware, createProfile);

profileRouter.get("/allProfile", getAllProfiles);

profileRouter.get("/:id", authMiddleware, getProfileById);

profileRouter.put("/:id", authMiddleware, updateProfile);

profileRouter.delete("/:id", authMiddleware, deleteProfile);

export default profileRouter;
