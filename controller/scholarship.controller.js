import Scholarship from "../models/scholarship.model.js";

export const addScholarship = async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body);

    res
      .status(201)
      .json({ message: "Scholarship added successfully", scholarship });
  } catch (error) {
    console.error("Add Scholarship error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
