import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  deleteProfile,
  getAllProfiles,
  getProfileById,
  getUserProfile,
  updateProfile,
  updateProfileRole,
} from "../controller/profile.controller.js";
import isAdmin from "../middleware/isAdmin.js";

const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
  res.json({ message: "Profile route" });
});

profileRouter.get("/user", authMiddleware, getUserProfile);

profileRouter.get("/allProfile", getAllProfiles);

profileRouter.get("/:id", authMiddleware, getProfileById);

profileRouter.put("/:id", authMiddleware, isAdmin, updateProfile);

profileRouter.put("/role/:id", authMiddleware, isAdmin, updateProfileRole);

profileRouter.delete("/:id", authMiddleware, isAdmin, deleteProfile);

export default profileRouter;
