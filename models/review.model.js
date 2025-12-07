import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true,
    },
    universityName: String,
    userName: String,
    userEmail: String,
    userImage: String,
    ratingPoint: {
      type: Number,
      min: 1,
      max: 5,
    },
    reviewComment: String,
    reviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
