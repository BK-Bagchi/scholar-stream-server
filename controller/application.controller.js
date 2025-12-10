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
    const applications = await Application.find({ userEmail: email })
      .populate("scholarshipId")
      .sort({
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

export const updateApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedApplication)
      return res
        .status(404)
        .json({ message: "Application not found or not updated" });

    res.status(200).json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update Application error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { applicationStatus: status },
      {
        new: true,
      }
    );

    if (!updatedApplication)
      return res
        .status(404)
        .json({ message: "Application not found or not updated" });

    res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Update Application Status error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findByIdAndDelete(id);

    if (!application) return res.status(404).json({ message: "Delete failed" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Delete Application error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
