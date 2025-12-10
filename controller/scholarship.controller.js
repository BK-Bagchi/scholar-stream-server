import Scholarship from "../models/scholarship.model.js";

export const addScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);

    if (!scholarship)
      return res.status(404).json({ message: "Scholarship not created" });

    res
      .status(201)
      .json({ message: "Scholarship added successfully", scholarship });
  } catch (error) {
    console.error("Add Scholarship error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllScholarship = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });

    if (scholarships.length === 0)
      return res.status(404).json({ message: "No scholarships found" });

    res
      .status(200)
      .json({ message: "Scholarship found successfully", scholarships });
  } catch (error) {
    console.error("Get Scholarship error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateScholarship = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedScholarship)
      return res
        .status(404)
        .json({ message: "Scholarship not found or not updated" });

    res.status(200).json({
      message: "Scholarship updated successfully",
      scholarship: updatedScholarship,
    });
  } catch (error) {
    console.error("Update Scholarship error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteScholarship = async (req, res) => {
  const { id } = req.params;
  try {
    const scholarship = await Scholarship.findByIdAndDelete(id);

    if (!scholarship)
      return res
        .status(404)
        .json({ message: "Scholarship not found or delete failed" });

    res.status(200).json({ message: "Scholarship deleted successfully" });
  } catch (error) {
    console.error("Delete Scholarship error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
