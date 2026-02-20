import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
    </div>
  );
};

export default ChatWindow;
