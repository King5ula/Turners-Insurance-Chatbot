import { User } from "lucide-react";

function MessageBubble({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div className={`message ${isUser ? "message-user" : "message-ai"}`}>
      {isUser ? (
        <div className="message-icon" aria-hidden="true">
          <User size={18} />
        </div>
      ) : (
        <img
          src="/tinaFromTurners2.JPG"
          alt="Tina"
          className="tina-direct-avatar"
          width="35px"
          onError={(e) => {
            e.target.style.display = "none";
            const fallback = document.createElement("div");
            fallback.className = "message-icon";
            fallback.innerText = "T";
            e.target.parentNode.insertBefore(fallback, e.target);
          }}
        />
      )}

      <div className="message-content">
        <span className="message-label">{isUser ? "You" : "Tina"}</span>
        <p>{msg.content}</p>
      </div>
    </div>
  );
}

export default MessageBubble;
