import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import QueryBuilderTwoToneIcon from '@mui/icons-material/QueryBuilderTwoTone';
import AccessibilityTwoToneIcon from '@mui/icons-material/AccessibilityTwoTone';


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
          <div
                      className="account-section"
                      onClick={() => (window.location.href = "/account")}
                    >
                      <FiUser className="account-icon" />
                      <span className="user-role">Auditor</span>
                    </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-bg" />
        <div className="home-hero-content">
          <h1>
            <span className="home-hero-bold">Welcome to Sprinto Vault!</span>
          </h1>
          <button className="home-hero-btn" onClick={goToChat}>Start Chatting</button>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">
        <h2 className="home-features-title">Evidence-on-Demand Capabilities</h2>
        <div className="home-features-grid">
          <div className="home-feature-card">
            <div className="home-feature-icon"> <AdminPanelSettingsTwoToneIcon/>
            </div>
            <div className="home-feature-title">AI Query Understanding</div>
            <div className="home-feature-desc">
              Converts vague asks into precise, actionable checks.
            </div>
          </div>
          
          <div className="home-feature-card">
            <div className="home-feature-icon"><QueryBuilderTwoToneIcon/>
            </div>
            <div className="home-feature-title">Multi-source Connectors</div>
            <div className="home-feature-desc">
              Search Jira and docs (PDF/XLSX/CSV) in one go.
            </div>
          </div>
          <div className="home-feature-card">
            <div className="home-feature-icon"><AccessibilityTwoToneIcon/>
            </div>
            <div className="home-feature-title">Evidence Formatting</div>
            <div className="home-feature-desc">
              Auditor-ready tables, 1-click CSV/XLS, with source links.
            </div>
          </div>
        </div>
      </section>
      

      {/* Footer */}
      <footer className="home-footer">
        <div className="home-footer-bottom">
          <span>© 2025 Sprinto Vault. All rights reserved.</span>
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
