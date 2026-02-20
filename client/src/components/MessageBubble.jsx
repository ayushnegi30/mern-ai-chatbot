import ReactMarkdown from "react-markdown";

const MessageBubble = ({ message }) => {
  if (message.content === "__loading__") {
    return (
      <div className="bubble ai">
        <span className="typing">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    );
  }

  return (
    <div className={`bubble ${message.role}`}>
      <ReactMarkdown>
        {message.content}
      </ReactMarkdown>
    </div>
  );
};

export default MessageBubble;
