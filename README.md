# 🤖 MERN AI Chatbot

A full-stack **Generative AI Chatbot** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
The application allows users to securely authenticate, chat with an AI model, manage conversations, and restore chat history across sessions and devices.

---

## 🚀 Features

### 🔐 Authentication
- User Signup & Login using **JWT**
- Protected routes
- Profile menu with logout option

### 💬 AI Chat
- AI-powered responses using **OpenRouter API**
- Structured and readable AI responses (Markdown formatted)
- Typing loader while AI generates answers

### 🗂️ Chat Management
- User-specific chat history
- Restore previous conversations
- Start new chats
- Delete chat history

### 🎨 UI / UX
- ChatGPT-style modern interface
- Responsive design (Desktop & Mobile)
- Collapsible sidebar on mobile
- Clean, minimal, and user-friendly layout

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Axios
- React Markdown
- CSS (Responsive + modern UI)

### Backend
- Node.js
- Express.js
- JWT Authentication
- OpenRouter AI API

### Database
- MongoDB Atlas

---

## 📂 Project Structure



mern-ai-chatbot/
├── client/ # React frontend
├── server/ # Node + Express backend
├── README.md
└── .gitignore


---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/mern-ai-chatbot.git
cd mern-ai-chatbot

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside server/:

MONGO_URI=your_mongodb_atlas_uri
OPENROUTER_API_KEY=your_openrouter_api_key
JWT_SECRET=your_jwt_secret


Run backend:
npm run dev


3️⃣ Frontend Setup
cd client
npm install
npm run dev
