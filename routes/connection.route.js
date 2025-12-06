import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getConnectedList,
  makeConnection,
} from "../controller/connection.controller.js";

const connectionRouter = express.Router();

connectionRouter.get("/", (req, res) => {
  res.json({ message: "Connection route" });
});

connectionRouter.post("/", authMiddleware, makeConnection);

connectionRouter.get("/connectedList", authMiddleware, getConnectedList);

export default connectionRouter;
