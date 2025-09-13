import React, { useState, useRef, useEffect } from 'react';
import './ChatPage.css';
import { useNavigate } from "react-router-dom";

const assistantAvatar = (
  <div className="chat-bubble-avatar" title="Porter Saathi">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FF9800"/>
      <text x="12" y="17" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">🤵🏻</text>
    </svg>
  </div>
);

const TypingIndicator = () => (
  <div className="typing-indicator">
    <span className="typing-dot"></span>
    <span className="typing-dot"></span>
    <span className="typing-dot"></span>
  </div>
);

const LANGUAGES = [
  { label: 'English', value: 'en' },
  { label: 'Hindi', value: 'hi' },
  { label: 'Regional Language', value: 'regional' }
];

const mockHistory = [
  {
    title: "Legal Advice on Property Rights",
    preview: "AI: Based on the information provided, you likely have grounds...",
    date: "1 day ago"
  },
  {
    title: "Workplace Discrimination Query",
    preview: "You: Can you elaborate on the steps for filing a complaint?",
    date: "3 days ago"
  },
  {
    title: "Healthcare Access Information",
    preview: "AI: Certain programs exist to assist low-income individuals.",
    date: "1 week ago"
  },
  {
    title: "Consumer Rights Dispute",
    preview: "AI: It is advisable to gather all evidence of your purchase.",
    date: "2 weeks ago"
  },
  {
    title: "Employment Contract Review",
    preview: "You: Thank you for highlighting those clauses.",
    date: "3 weeks ago"
  }
];

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'Hello! I am Porter Saathi. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showRights, setShowRights] = useState(false);
  const [rightsActive, setRightsActive] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice recognition (Web Speech API)
  const handleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Simulate assistant reply after 1.2s
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { from: 'assistant', text: "I'm a voice-first assistant. How can I help you further?" }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Language change logic
  const handleLanguageSelect = async (lang) => {
    setShowLang(false);
    if (lang === 'regional') {
      // Ask for location
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo, just set a fake regional language based on latitude
          const { latitude } = position.coords;
          let region = 'te'; // Telugu
          if (latitude > 25) region = 'bn'; // Bengali
          if (latitude < 15) region = 'ta'; // Tamil
          setLanguage(region);
        },
        (error) => {
          alert('Location access denied. Cannot set regional language.');
        }
      );
    } else {
      setLanguage(lang);
    }
  };

  // Simulate translation (for demo)
  const translate = (text) => {
    if (language === 'hi') return 'नमस्ते! मैं पोर्टर साथी हूँ। मैं आपकी कैसे मदद कर सकता हूँ?';
    if (language === 'bn') return 'হ্যালো! আমি পোর্টার সাথী। আমি আপনাকে কীভাবে সাহায্য করতে পারি?';
    if (language === 'te') return 'హలో! నేను పోర్టర్ సాథి. నేను మీకు ఎలా సహాయపడగలను?';
    if (language === 'ta') return 'வணக்கம்! நான் போர்டர் சாத்தி. நான் உங்களுக்கு எப்படி உதவலாம்?';
    return text;
  };

  // Rights mode
  const handleRightsClick = () => {
    setRightsActive(!rightsActive);
    setShowRights(true);
    setTimeout(() => setShowRights(false), 2500);
  };

  // For demo, only translate the welcome message
  const displayMessages = messages.map((msg, idx) => {
    if (idx === 0 && language !== 'en') {
      return { ...msg, text: translate(msg.text) };
    }
    return msg;
  });

  return (
    <div className="chat-root chat-with-sidebar">
      {/* Navbar always at the top */}
      <nav className="chat-navbar">
        <img
          src={require('../../assets/logo.png')}
          alt="Porter Saathi Logo"
          className="chat-navbar-logo"
        />
        <span
          className="chat-navbar-title"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Home
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginRight: 24, position: 'relative' }}>
          {/* Language Selector */}
          <button
            className="nav-btn"
            style={{ color: 'var(--porter-blue)' }}
            onClick={() => setShowLang(v => !v)}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 12h20M12 2c2.5 3.5 2.5 14.5 0 20M12 2c-2.5 3.5-2.5 14.5 0 20" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span style={{ marginLeft: 6, fontWeight: 500 }}>
              {language === 'en' && 'English'}
              {language === 'hi' && 'Hindi'}
              {['bn','te','ta'].includes(language) && 'Regional'}
            </span>
            <svg width="16" height="16" style={{ marginLeft: 2 }} fill="currentColor" viewBox="0 0 20 20"><path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.585l3.71-3.355a.75.75 0 1 1 1.02 1.1l-4.25 3.85a.75.75 0 0 1-1.02 0l-4.25-3.85a.75.75 0 0 1 .02-1.06z"/></svg>
          </button>
          {/* Language Popup */}
          {showLang && (
            <div className="lang-popup">
              {LANGUAGES.map(opt => (
                <div
                  key={opt.value}
                  className="lang-popup-option"
                  onClick={() => handleLanguageSelect(opt.value)}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
          {/* Rights Button */}
          <button
            className={`nav-btn${rightsActive ? ' nav-btn-active' : ''}`}
            style={{ color: 'var(--porter-blue)' }}
            onClick={handleRightsClick}
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="2" fill={rightsActive ? "#0645db" : "none"}/>
              <path d="M9 12l2 2 4-4" stroke={rightsActive ? "#FF9800" : "currentColor"} strokeWidth="2" fill="none"/>
            </svg>
            <span style={{ marginLeft: 6, fontWeight: 500 }}>Know Your Rights</span>
          </button>
          {/* Rights Mode Banner */}
          {showRights && (
            <div className="rights-banner">
              <svg width="20" height="20" fill="currentColor" style={{marginRight: 8}} viewBox="0 0 24 24">
                <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" fill="#0645db"/>
              </svg>
              <span style={{ fontWeight: 500 }}>Know Your Rights Mode - {rightsActive ? 'Active' : 'Inactive'}</span>
              <button className="rights-banner-close" onClick={() => setShowRights(false)}>×</button>
            </div>
          )}
          {/* Account Icon */}
          <span className="chat-navbar-account" title="Account" onClick={() => navigate("/account")}>
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z"/>
            </svg>
          </span>
        </div>
      </nav>
      {/* Flex row: sidebar + main chat */}
      <div className="chat-content-row">
        {/* Left Side Panel: Chat History */}
        <aside className="chat-history-panel">
          <div className="chat-history-header">
            <span>Chat History</span>
            <span>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="5" y="5" width="14" height="14" rx="2" stroke="#222" strokeWidth="2"/>
                <path d="M8 9h8M8 13h5" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </div>
          <div className="chat-history-search">
            <input type="text" placeholder="Search chat history..." />
          </div>
          <div className="chat-history-list">
            {mockHistory.map((item, idx) => (
              <div className="chat-history-item" key={idx}>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="user"
                  className="chat-history-avatar"
                />
                <div className="chat-history-info">
                  <div className="chat-history-title">{item.title}</div>
                  <div className="chat-history-preview">{item.preview}</div>
                </div>
                <div className="chat-history-date">{item.date}</div>
              </div>
            ))}
          </div>
          <div className="chat-history-bottom">
            <button className="chat-history-new-btn">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="4" fill="#0645db"/>
                <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span style={{marginLeft: 8}}>New Chat</span>
            </button>
            <div className="chat-history-user">
              <span className="chat-history-user-dot"></span>
              Porter Saathi
            </div>
          </div>
        </aside>

        {/* Main chat area */}
        <div className="chat-main-area">
          <main className="chat-main">
            {/* Centered greeting */}
            {messages.length === 1 && !input && (
              <div className="chat-greeting">
                <span className="chat-greeting-icon">
                  <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#FF9800"/>
                    <path d="M12 7l3 1.5v2.5c0 2-1.4 4.1-3 4.2-1.6-.1-3-2.2-3-4.2V8.5L12 7z" fill="#fff"/>
                    <path d="M12 7l3 1.5v2.5c0 2-1.4 4.1-3 4.2-1.6-.1-3-2.2-3-4.2V8.5L12 7z" stroke="#0645db" strokeWidth="0.7"/>
                  </svg>
                </span>
                <span className="chat-greeting-text">How can I help you?</span>
              </div>
            )}

            {/* Chat messages */}
            <div className="chat-messages">
              {displayMessages.length > 1 && displayMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-bubble chat-bubble-${msg.from}`}
                >
                  {msg.from === 'assistant' && assistantAvatar}
                  <div className="chat-bubble-content">{msg.text}</div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble chat-bubble-assistant">
                  {assistantAvatar}
                  <TypingIndicator />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Floating input bar */}
            <div
              className={`chat-floating-bar${
                (input || displayMessages.length > 1) ? ' chat-floating-bar-bottom' : ''
              }`}
            >
              <div className="chat-bottom-input-wrap">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type or speak your message..."
                  className="chat-bottom-input"
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button
                  className={`chat-bottom-mic${listening ? ' listening' : ''}`}
                  onClick={handleMic}
                  aria-label="Voice Input"
                  title="Speak"
                  type="button"
                  style={{
                    background: listening ? '#FF9800' : '',
                    color: listening ? '#fff' : '',
                    transition: 'background 0.2s, color 0.2s'
                  }}
                >
                  {/* Mic SVG with arc turning white when listening */}
                  <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
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
                        stroke={listening ? "#fff" : "#0645db"}
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
                onClick={handleSend}
                className="chat-bottom-send"
                aria-label="Send"
                type="button"
              >
                <span role="img" aria-label="send" style={{marginRight: 6}}>➤</span>Send
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;