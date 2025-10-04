import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io, getRecieverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filterUsers = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("getUserForSidebar error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("getMessages error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // real time functionality will be here using socket.io
    const recieverSocketId = getRecieverSocketId(recieverId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json(newMessage);
    //realtime funcitonality will be here using socket.io
  } catch (error) {
    console.log("sendMessage error", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
