import Profile from "../models/profile.model.js";

export const getUserProfile = async (req, res) => {
  const { email } = req.user;
  try {
    const profile = await Profile.findOne({ email });
    if (!profile) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile found successfully", profile });
  } catch (error) {
    console.log("Get Profile error: ", error);
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
    const profiles = await Profile.find().sort({ createdAt: -1 });

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

export const updateProfileRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
      }
    );

    if (!updatedProfile)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      message: "Profile role updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Role error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) return res.status(404).json({ message: "Delete failed" });
    res.status(200).json({ message: "Profile deleted successfully", profile });
  } catch (error) {
    console.error("Delete Profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
