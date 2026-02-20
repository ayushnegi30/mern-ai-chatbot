import express from "express";
import {
  sendMessage,
  getChatHistory,
  getAllChats,
  deleteChat
} from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect); // 🔐 all below routes protected

router.get("/", getAllChats);
router.get("/:sessionId", getChatHistory);
router.post("/", sendMessage);
router.delete("/:sessionId", deleteChat);

export default router;
