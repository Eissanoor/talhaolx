const Message = require("../models/chatModel.js");
const path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { cloudinary } = require("../config/cloudanary.js");


const sendMessage = async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
  
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content
      });
  
      const savedMessage = await newMessage.save();
  
      res.status(200).json(savedMessage);
    } catch (error) {
      console.error("Error sending message:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  const getChatHistory = async (req, res) => {
    try {
      const { userId, contactId } = req.query;
  
      const messages = await Message.find({
        $or: [
          { sender: userId, receiver: contactId },
          { sender: contactId, receiver: userId }
        ]
      })
        .sort({ timestamp: 1 })
        .populate("sender", "username userId image")
        .populate("receiver", "username userId image");
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error retrieving chat history:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  const listUserChats = async (req, res) => {
    try {
      const { userId } = req.query;
  
      // Find all messages where the user is either the sender or receiver
      const messages = await Message.find({
        $or: [
          { sender: userId },
          { receiver: userId }
        ]
      })
        .sort({ timestamp: -1 }) // Sort by latest message first
        .populate("sender", "username userId image")
        .populate("receiver", "username userId image");
  
      // Use a Map to store unique chat participants
      const chatList = new Map();
  
      messages.forEach((message) => {
        const otherUser =
          message.sender?._id?.toString() === userId
            ? message.receiver
            : message.sender;
  
        // Ensure otherUser is not null before proceeding
        if (otherUser && !chatList.has(otherUser._id.toString())) {
          chatList.set(otherUser._id.toString(), {
            user: otherUser,
            lastMessage: message.content,
            timestamp: message.timestamp,
          });
        }
      });
  
      // Convert the Map to an array
      const chatsArray = Array.from(chatList.values());
  
      res.status(200).json(chatsArray);
    }catch (error) {
      console.error("Error listing user chats:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
module.exports = {
    sendMessage,
    getChatHistory,
    listUserChats
  };