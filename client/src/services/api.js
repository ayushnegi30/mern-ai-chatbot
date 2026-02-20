import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-ai-chatbot-rdo9.onrender.com/api"
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const signupAPI = (data) => api.post("/auth/signup", data);
export const loginAPI = (data) => api.post("/auth/login", data);

// Chat APIs
export const sendMessageAPI = (message, sessionId) =>
  api.post("/chat", { message, sessionId });

export const getChatHistoryAPI = (sessionId) =>
  api.get(`/chat/${sessionId}`);

export const getAllChatsAPI = () => api.get("/chat");

export const deleteChatAPI = (sessionId) =>
  api.delete(`/chat/${sessionId}`);

export default api;
