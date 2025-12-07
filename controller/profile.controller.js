import Profile from "../models/profile.model.js";

export const createProfile = async (req, res) => {
  try {
    //prettier-ignore
    const { name, email, photoURL: avatar, subject, studyMode, availabilityTime, location, experienceLevel, rating, } = req.body;

    if (!name || !email || !avatar)
      return res
        .status(400)
        .json({ message: "Name, email, and avatar are required." });

    //prettier-ignore
    const profile = await Profile.create({ name, email, avatar, subject, studyMode, availabilityTime,  location, experienceLevel, rating });

    if (!profile)
      return res.status(500).json({ message: "Profile not created." });

    res.status(201).json({
      message: "Profile created successfully.",
      profile,
    });
  } catch (error) {
    console.error("Create Profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findById(id);
    if (!profile) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Profile found successfully", profile });
  } catch (error) {
    console.log("Get Profile error: ", error);
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    if (profiles.length === 0)
      return res.status(404).json({ message: "No profiles found" });

    res.status(200).json({
      message: `${profiles.length} profiles found`,
      profiles,
    });
  } catch (error) {
    console.error("Get Profiles error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProfile)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
