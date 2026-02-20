import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import {
  sendMessageAPI,
  getChatHistoryAPI,
  getAllChatsAPI,
  deleteChatAPI
} from "../services/api";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();

  // Initial load
  useEffect(() => {
    let stored = localStorage.getItem("sessionId");

    if (!stored) {
      stored = Date.now().toString();
      localStorage.setItem("sessionId", stored);
    }

    setSessionId(stored);
    loadChat(stored);
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    const res = await getAllChatsAPI();
    setChatList(res.data || []);
  };

  const loadChat = async (id) => {
    localStorage.setItem("sessionId", id);
    setSessionId(id);
    const res = await getChatHistoryAPI(id);
    setMessages(res.data.messages || []);
    setShowSidebar(false); // close sidebar on mobile
  };

  const startNewChat = () => {
    const newId = Date.now().toString();
    localStorage.setItem("sessionId", newId);
    setSessionId(newId);
    setMessages([]);
    setShowSidebar(false);
    fetchChatList();
  };

  const deleteChat = async (id) => {
    await deleteChatAPI(id);

    if (id === sessionId) {
      startNewChat();
    } else {
      fetchChatList();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionId");
    navigate("/login");
  };

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "ai", content: "__loading__" }
    ]);

    setLoading(true);

    try {
      const res = await sendMessageAPI(text, sessionId);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: res.data.reply
        };
        return updated;
      });

      fetchChatList();
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          content: "Something went wrong."
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${showSidebar ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setShowSidebar(false)}>
          ✕
        </button>

        <h2 className="logo">AI Chat</h2>

        <button className="new-chat-btn" onClick={startNewChat}>
          + New Chat
        </button>

        <div className="chat-history">
          {chatList.map((chat, index) => (
            <div key={index} className="history-row">
              <button
                className="history-item"
                onClick={() => loadChat(chat.sessionId)}
              >
                Chat {index + 1}
              </button>

              <button
                className="delete-btn"
                title="Delete chat"
                onClick={() => deleteChat(chat.sessionId)}
              >
                🗑️
              </button>
            </div>
            
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <div className="chat-area">
        <header className="chat-header">
          <button
            className="menu-btn"
            onClick={() => setShowSidebar(true)}
          >
            ☰
          </button>

          <span>AI Chatbot</span>

          {/* Profile / Logout */}
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              👤
            </button>

            {showProfile && (
              <div className="profile-menu">
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        <ChatWindow messages={messages} />
        <ChatInput onSend={sendMessage} loading={loading} />
      </div>

    </div>
  );
};

export default Chat;
