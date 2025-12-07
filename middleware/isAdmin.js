const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin access denied" });

    next();
  } catch (error) {
    console.error("Is Admin error:", error);
    res.status(500).json({ message: "Is Admin error", error: error.message });
  }
};

export default isAdmin;
