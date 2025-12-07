const isModerator = (req, res, next) => {
  try {
    if (req.user.role !== "moderator")
      return res.status(403).json({ message: "Moderator access denied" });

    next();
  } catch (error) {
    console.error("Is Moderator error:", error);
    res
      .status(500)
      .json({ message: "Is Moderator error", error: error.message });
  }
};

export default isModerator;
