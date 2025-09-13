import React, { useRef, useState } from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";


const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const Account = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "john.doe",
    email: "john.joe@example.com",
    phone: "+987653210",
    photo: null,
  });
  const fileInput = useRef();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile({ ...profile, photo: ev.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    alert("Changes saved!");
  };

  const handleLogout = () => {
    // Logout logic here
    alert("Logged out!");
    navigate("/login");
  };

  return (
    <div className="account-root">
      {/* Navbar (reuse home-navbar styles) */}
      <nav className="home-navbar">
        <div className="home-navbar-left">
          <img src={require("../../assets/logo.png")} alt="Logo" className="home-logo" />
        </div>
        <div className="home-navbar-center">
          <a href="/home" className="home-nav-link">Home</a>
          <a href="#" className="home-nav-link" onClick={e => {e.preventDefault(); navigate("/chat");}}>Chat</a>
          <a href="#" className="home-nav-link home-nav-link-active">Account</a>
          <a href="#" className="home-nav-link" onClick={e => {e.preventDefault(); navigate("/contact");}}>Contact</a>
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

      <div className="account-bg">
        <div className="account-card">
          <div className="account-avatar-section">
            <div
              className="account-avatar"
              onClick={() => fileInput.current.click()}
              title="Upload photo"
            >
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" />
              ) : (
                <span className="account-initials">{getInitials(profile.name)}</span>
              )}
              <div className="account-avatar-upload">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path d="M12 16v-8M8 12h8" stroke=" #FF9800" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="10" stroke=" #FF9800" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
          </div>
          <div className="account-name">{profile.name}</div>
          <div className="account-username">@{profile.username}</div>
          <form className="account-form" onSubmit={handleSave}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              required
            />
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              required
            />
            <button className="account-save-btn" type="submit">
              Save Changes
            </button>
          </form>
          <button className="account-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;