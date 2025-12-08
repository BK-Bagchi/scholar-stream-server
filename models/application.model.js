import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    userEmail: String,
    universityName: String,
    scholarshipCategory: {
      type: String,
      enum: ["Full fund", "Partial", "Self-fund"],
    },
    degree: {
      type: String,
      enum: ["Diploma", "Bachelor", "Masters", "PhD"],
    },
    applicationFees: Number,
    serviceCharge: Number,
    applicationStatus: {
      type: String,
      enum: ["pending", "processing", "approved", "rejected"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    feedback: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
