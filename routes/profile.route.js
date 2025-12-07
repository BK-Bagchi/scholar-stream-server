import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getAllProfiles,
  getProfileById,
  getUserProfile,
  updateProfile,
  updateProfileRole,
} from "../controller/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  res.json({ message: "Profile route" });
});

profileRouter.get("/user", authMiddleware, getUserProfile);

profileRouter.get("/allProfile", getAllProfiles);

profileRouter.get("/:id", authMiddleware, getProfileById);

profileRouter.put("/:id", authMiddleware, updateProfile);

profileRouter.put("/role/:id", authMiddleware, updateProfileRole);

export default profileRouter;
