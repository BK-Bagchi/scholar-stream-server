import jwt from "jsonwebtoken";
import Profile from "../models/profile.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized: Invalid token" });

    const { email: decodedEmail } = decoded;

    const profile = await Profile.findOne({ email: decodedEmail });
    if (!profile)
      return res.status(401).json({ message: "Unauthorized: Invalid user" });

    const { _id, name, email, role } = profile;
    req.user = { _id, name, email, role };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
