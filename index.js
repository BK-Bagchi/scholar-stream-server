import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import dbConnection from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import profileRouter from "./routes/profile.route.js";
import authRouter from "./routes/auth.route.js";
import scholarshipRouter from "./routes/scholarship.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// ───────────────────── Middlewares ───────────────────── //
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
); //handles which origins can make requests
app.use(morgan("dev")); //console logs http requests. Formats: [dev, combined, common, tiny, short]
app.use(express.json()); // receives json data
app.use(express.urlencoded({ extended: false })); //accepts client submitted form data

// ───────────────────── Routes ───────────────────── //
app.get("/", (req, res) => {
  res.send(`🚀Study Mate project is running`);
});

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/scholarship", scholarshipRouter);
app.use(errorHandler);

// ───────────────────── Database ───────────────────── //
dbConnection();

// ───────────────────── Server ───────────────────── //
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on ${port}`);
});
