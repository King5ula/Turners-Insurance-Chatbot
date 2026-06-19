import { useEffect, useRef, useReducer, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import { sendChatHistoryToBakend } from "../services/tinaApi";

//State Object
const initialState = {
  messages: [
    {
      role: "assistant",
      content:
        "Sup I'm Tina and I'm here to help you choose the right insurance policy for you and your situation. May I ask you a few personal questions so I can determine the BEST policy for you?",
    },
  ],
  isLoading: false,
};

//Reducer function to handle state changes
function chatReducer(state, action) {
  switch (action.type) {
    case "SEND_USER_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: "user", content: action.payload },
        ],
        isLoading: true,
      };
    case "RECEIVE_TINA_RESPONSE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: "assistant", content: action.payload },
        ],
        isLoading: false,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: "assistant", content: action.payload },
        ],
        isLoading: false,
      };
    default:
      return state;
  }
}

export default function InsuranceChatPage({ darkMode }) {
  //useReducer hook
  const [state, dispatch] = useReducer(chatReducer, initialState);
  //Keeping userInput as a useState
  const [userInput, setUserInput] = useState("");

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  //auto-scrolling handler
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [state.messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || state.isLoading) return;

    const userText = userInput;
    setUserInput(""); //Instantly clears input for better user experience

    //User msg action: appends loading and sets loading to true
    dispatch({ type: "SEND_USER_MESSAGE", payload: userText });

    const updatedHistory = [
      ...state.messages,
      { role: "user", content: userText },
    ];

    try {
      const tinaReplyText = await sendChatHistoryToBakend(updatedHistory);
      //AI response action
      dispatch({ type: "RECEIVE_TINA_RESPONSE", payload: tinaReplyText });
    } catch (error) {
      console.error(error);

      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Network error. Please make sure your server is online.",
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <main className={`chat-layout ${darkMode ? "dark-theme" : ""}`}>
      {/*Brand Sidebar Panel */}
      <div className="info-sidebar">
        <h3>Turners Protection</h3>
        <p>
          Get instant consultation recommendations powered by our automated AI
          helper assistant, Tina
        </p>
        <div className="product-tag MBI">Mechanical Breakdown (MBI)</div>
        <div className="product-tag">Comprehensive Insurance</div>
        <div className="product-tag">Third Party Cover</div>
      </div>

      {/*Main Conversational Container Box*/}
      <div className="chat-container">
        <div className="chat-window">
          {state.messages.map((msg, index) => (
            <MessageBubble key={index} msg={msg} />
          ))}

          {state.isLoading && (
            <div className="message-row assistant processing">
              <div className="avatar-bubble">Tina</div>
              <div className="message-bubble">Tina is typing...</div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Interactive Form Bar */}
        <div className="chat-input-bar">
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply to Tina here..."
            disabled={state.isLoading}
            rows={1}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={state.isLoading || !userInput.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
