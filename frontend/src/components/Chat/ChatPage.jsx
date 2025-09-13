import React, { useState } from "react";
import { FiUser } from "react-icons/fi"; // Account icon
import "./ChatPage.css";
import logo from "../../assets/logo.png"; // Porter Saathi logo

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [listening, setListening] = useState(false);

  // Handle send
  const handleSendMessage = (msg) => {
    if (!msg.trim()) return;

    const newMessage = { sender: "user", text: msg };
    setChats((prev) => [...prev, newMessage]);
    setMessage("");

    // Add to history if new
    if (!chatHistory.includes(msg)) {
      setChatHistory((prev) => [...prev, msg]);
    }

    // Simulate bot response with thinking
    setIsBotThinking(true);
    setTimeout(() => {
      setIsBotThinking(false);
      setChats((prev) => [
        ...prev,
        { sender: "bot", text: "This is a sample response." },
      ]);
    }, 1500);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage(message);
  };

  // Handle mic
  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript); // put in input box, don't auto-send
      setListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error", err);
      setListening(false);
    };
  };

  return (
    <div className="chat-container">
      {/* Navbar */}
      <div className="navbar">
        <img src={logo} alt="Porter Saathi" className="logo" />

        <div className="navbar-right">
          <a href="/home" className="home-nav-link">Home</a>
          <div
            className="account-section"
            onClick={() => (window.location.href = "/account")}
          >
            <FiUser className="account-icon" />
            <span className="user-role">Auditor</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        {/* Sidebar */}
        <div className="sidebar">
          <button className="new-chat">+ New Chat</button>
          {chatHistory.map((chat, idx) => (
            <button
              key={idx}
              className="history-item"
              onClick={() => setChats([{ sender: "user", text: chat }])}
            >
              {chat}
            </button>
          ))}
        </div>

        {/* Chat Section */}
        <div className="chat-section">
          {chats.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${
                msg.sender === "user" ? "user-bubble" : "bot-bubble"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {/* Bot thinking animation */}
          {isBotThinking && (
            <div className="chat-bubble bot-bubble">
              <span className="dot-flashing"></span>
            </div>
          )}

          {/* Greeting (only if no chats) */}
          {chats.length === 0 && (
            <div className="chat-greeting-text">
              hi, how can I help you today?
            </div>
          )}

          {/* Input bar fixed at bottom */}
          <div className="chat-input-row">
            <div className="chat-bottom-input-wrap">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type or speak your message..."
                className="chat-bottom-input"
                onKeyDown={handleKeyPress}
              />
              <button
                className={`chat-bottom-mic${listening ? " listening" : ""}`}
                onClick={handleMicClick}
                aria-label="Voice Input"
                title="Speak"
                type="button"
              >
                {/* Your old Mic SVG */}
                <svg
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <rect
                      x="9"
                      y="2"
                      width="6"
                      height="12"
                      rx="3"
                      fill="currentColor"
                    />
                    <path
                      d="M5 10v2a7 7 0 0 0 14 0v-2"
                      stroke={listening ? "#fff" : "#fff"}
                      strokeWidth="2"
                      fill="none"
                    />
                    <line
                      x1="12"
                      y1="22"
                      x2="12"
                      y2="18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="8"
                      y1="22"
                      x2="16"
                      y2="22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              </button>
            </div>

            <button
              onClick={() => handleSendMessage(message)}
              className="chat-bottom-send"
              aria-label="Send"
              type="button"
              title="Send"
            >
              <span role="img" aria-label="send" style={{ marginRight: 6 }}>
                ➤
              </span>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
