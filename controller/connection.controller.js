import Connection from "../models/connection.model.js";
import Profile from "../models/profile.model.js";

export const makeConnection = async (req, res) => {
  const { profileEmail, connectedId } = req.body;
  try {
    const profile = await Profile.findOne({ email: profileEmail });
    const alreadyConnected = await Connection.findOne({
      profile: profile._id,
      connected: connectedId,
    });

    if (alreadyConnected)
      return res
        .status(400)
        .json({ message: "You are already connected with this user." });

    const connection = await Connection.create({
      profile: profile._id,
      connected: connectedId,
    });
    if (!connection)
      return res.status(500).json({ message: "Connection not created." });

    const partnerCountIncrement = await Profile.updateOne(
      { _id: connectedId },
      { $inc: { partnerCount: 1 } }
    );

    if (partnerCountIncrement.modifiedCount === 0)
      return res
        .status(500)
        .json({ message: "Failed to increment partner's connection count." });

    const connected = await Connection.find({ profile: profile._id })
      .populate("connected")
      .populate("profile");

    res
      .status(201)
      .json({ message: "Connection created successfully.", connected });
  } catch (error) {
    console.log("Make Connection error: ", error);
  }
};

export const getConnectedList = async (req, res) => {
  const { email } = req.user;
  try {
    const profile = await Profile.findOne({ email });
    const connected = await Connection.find({ profile: profile._id })
      .populate("connected")
      .populate("profile");
    res.status(200).json({ message: "Connected list found.", connected });
  } catch (error) {
    console.log("Get Connected List error: ", error);
  }
};
