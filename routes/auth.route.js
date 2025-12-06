import express from "express";
import { issueJWT } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
  res.json({ message: "Auth route" });
});

authRouter.post("/issueJWT", issueJWT);

export default authRouter;
