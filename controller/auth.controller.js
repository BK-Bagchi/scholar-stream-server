import jwt from "jsonwebtoken";
import admin from "../firebase.config.js";
import Profile from "../models/profile.model.js";

export const issueJWT = async (req, res) => {
  const { accessToken } = req.body;

  if (!accessToken)
    return res.status(400).json({ message: "Access token missing" });

  try {
    const decoded = await admin.auth().verifyIdToken(accessToken);
    const { name, picture: avatar, email } = decoded;

    let profile = await Profile.findOne({ email });
    if (!profile) {
      profile = new Profile({
        name,
        email,
        avatar,
      });
      await profile.save();
    }

    const newJWT = jwt.sign(
      {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name || "",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "JWT issued successfully",
      token: newJWT,
      user: {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        photoURL: profile.avatar,
        role: profile.role,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ message: "Invalid Firebase token" });
  }
};
