import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    subject: String,
    studyMode: {
      type: String,
      enum: ["Online", "Offline"],
    },
    availabilityTime: String,
    location: String,
    experienceLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    partnerCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
