import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    scholarshipName: String,
    universityName: String,
    universityImage: String,
    universityCountry: String,
    universityCity: String,
    universityWorldRank: Number,
    subjectCategory: String,
    scholarshipCategory: {
      type: String,
      enum: ["Full fund", "Partial", "Self-fund"],
    },
    degree: {
      type: String,
      enum: ["Diploma", "Bachelor", "Masters", "PhD"],
    },
    tuitionFees: Number,
    applicationFees: Number,
    serviceCharge: Number,
    applicationDeadline: Date,
    scholarshipPostDate: {
      type: Date,
      default: Date.now,
    },
    postedUserEmail: String,
  },
  {
    timestamps: true,
  }
);

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);

export default Scholarship;
