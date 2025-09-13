import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToChat = (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  const goToContact = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <div className="home-root">
      {/* Navbar */}
      <nav className="home-navbar">
        <div className="home-navbar-left">
          <img src={require("../../assets/logo.png")} alt="Logo" className="home-logo" />
        </div>
        <div className="home-navbar-center">
          <a href="#" className="home-nav-link home-nav-link-active">Home</a>
          <a href="#" className="home-nav-link" onClick={goToChat}>Chat</a>
          <a href="#" className="home-nav-link" onClick={e => {e.preventDefault(); navigate("/account");}}>Account</a>
          <a href="#" className="home-nav-link" onClick={goToContact}>Contact</a>
        </div>
        <div className="home-navbar-right">
          <span className="home-lang">EN</span>
          <button className="home-login-btn">Log In</button>
          <button className="home-signup-btn">Sign Up</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1>
            <span className="home-hero-bold">Your Voice. Your Rights. Your Saathi.</span>
          </h1>
          <button className="home-hero-btn" onClick={goToChat}>Start Chatting</button>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <h2 className="home-features-title">Empowering Features</h2>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" stroke="#FF9800" strokeWidth="2" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke="#FF9800" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="home-feature-title">Know Your Rights mode</div>
            <div className="home-feature-desc">
              Access accurate and simplified legal information tailored to your specific queries and context. Empower yourself with knowledge.
            </div>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#FF9800" strokeWidth="2" fill="none"/>
                <path d="M2 12h20M12 2c2.5 3.5 2.5 14.5 0 20M12 2c-2.5 3.5-2.5 14.5 0 20" stroke="#FF9800" strokeWidth="2"/>
              </svg>
            </div>
            <div className="home-feature-title">Voice-first Multilingual Assistant</div>
            <div className="home-feature-desc">
              Interact seamlessly using your voice in multiple languages, making information accessible to everyone, everywhere.
            </div>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="#FF9800" strokeWidth="2" fill="none"/>
                <path d="M8 12h8M12 8v8" stroke="#FF9800" strokeWidth="2"/>
              </svg>
            </div>
            <div className="home-feature-title">Accessible Anywhere</div>
            <div className="home-feature-desc">
              Our platform is designed to be inclusive, ensuring that all users can easily access and utilize its features on any device.
            </div>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
                <rect x="4" y="8" width="16" height="10" rx="2" stroke="#FF9800" strokeWidth="2" fill="none"/>
                <path d="M8 8V6a4 4 0 1 1 8 0v2" stroke="#FF9800" strokeWidth="2"/>
              </svg>
            </div>
            <div className="home-feature-title">Secure Chat History</div>
            <div className="home-feature-desc">
              Your conversations are encrypted and stored securely, giving you peace of mind and easy access to past interactions.
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-bottom">
          <span>© 2025 Porter Saathi. All rights reserved.</span>
          <div className="home-footer-links">
            <a href="#">Company</a>
            <a href="#">Resources</a>
            <a href="#">Legal</a>
          </div>
          <div className="home-footer-social">
            <a href="#"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg></a>
            <a href="#"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg></a>
            <a href="#"><svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M2 12h20" stroke="#000" strokeWidth="2"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
