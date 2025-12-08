import Application from "../models/application.model.js";

export const postApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    if (!application)
      return res.status(404).json({ message: "Application not created" });

    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Post Application error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    if (applications.length === 0)
      return res.status(404).json({ message: "No applications found" });

    res
      .status(200)
      .json({ message: "Applications found successfully", applications });
  } catch (error) {
    console.error("Get Applications error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserApplications = async (req, res) => {
  const { email } = req.user;
  try {
    const applications = await Application.find({ email }).sort({
      createdAt: -1,
    });
    if (applications.length === 0)
      return res.status(404).json({ message: "No applications found" });

    res
      .status(200)
      .json({ message: "Applications found successfully", applications });
  } catch (error) {
    console.error("Get User Applications error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
