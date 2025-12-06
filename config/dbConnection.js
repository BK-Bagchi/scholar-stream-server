import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//database connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB database connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

export default dbConnection;
