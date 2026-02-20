import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    sessionId: String,
    messages: [messageSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
