import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="input-bar">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Message AI..."
      />
      <button onClick={send} disabled={loading}>
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
