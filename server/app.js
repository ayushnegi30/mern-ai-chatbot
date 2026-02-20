import express from "express";
import cors from "cors";
import chatRoutes from "./routes/chat.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);

export default app;
