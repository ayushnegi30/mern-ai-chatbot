import Chat from "../models/Chat.js";
import { getAIResponse } from "../services/ai.service.js";

export const sendMessage = async (req, res) => {
  const { message, sessionId } = req.body;
  const userId = req.userId;

  let chat = await Chat.findOne({ sessionId, userId });

  if (!chat) {
    chat = await Chat.create({ sessionId, userId, messages: [] });
  }

  chat.messages.push({ role: "user", content: message });

  const aiReply = await getAIResponse(message);

  chat.messages.push({ role: "ai", content: aiReply });
  await chat.save();

  res.json({ reply: aiReply });
};

export const getChatHistory = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.userId;

  const chat = await Chat.findOne({ sessionId, userId });
  res.json({ messages: chat?.messages || [] });
};

export const getAllChats = async (req, res) => {
  const chats = await Chat.find(
    { userId: req.userId },
    { sessionId: 1 }
  ).sort({ updatedAt: -1 });

  res.json(chats);
};

export const deleteChat = async (req, res) => {
  await Chat.deleteOne({
    sessionId: req.params.sessionId,
    userId: req.userId
  });
  res.json({ message: "Deleted" });
};
