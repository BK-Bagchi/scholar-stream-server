import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    if (!review) return res.status(404).json({ message: "Review not created" });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error("Add Review error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    if (reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });

    res.status(200).json({ message: "Reviews found successfully", reviews });
  } catch (error) {
    console.error("Get Reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserReviews = async (req, res) => {
  const { email } = req.user;
  try {
    const reviews = await Review.find({ userEmail: email }).sort({
      createdAt: -1,
    });

    if (reviews.length === 0)
      return res.status(404).json({ message: "No reviews found" });

    res.status(200).json({ message: "Reviews found successfully", reviews });
  } catch (error) {
    console.error("Get User Reviews error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
