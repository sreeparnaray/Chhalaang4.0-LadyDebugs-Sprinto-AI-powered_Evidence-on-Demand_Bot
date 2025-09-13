import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add form submission logic here
    alert("Message sent!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const goToChat = (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  const goToContact = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <div className="contact-root">
      {/* Navbar (same as Home) */}
      <nav className="home-navbar">
        <div className="home-navbar-left">
          <img src={require("../../assets/logo.png")} alt="Logo" className="home-logo" />
        </div>
        <div className="home-navbar-center">
          <a href="/home" className="home-nav-link">Home</a>
          <a href="#" className="home-nav-link" onClick={goToChat}>Chat</a>
          <a href="#" className="home-nav-link">Account</a>
          <a href="#" className="home-nav-link home-nav-link-active" onClick={goToContact}>Contact</a>
        </div>
        <div className="home-navbar-right">
          <span className="home-lang">EN</span>
          <button className="home-login-btn">Log In</button>
          <button className="home-signup-btn">Sign Up</button>
        </div>
      </nav>

      <div className="contact-bg">
        <div className="contact-container">
          <h1 className="contact-title">Get In Touch With Us</h1>
          <div className="contact-subtitle">
            We're here to help and answer any question you might have. We look forward to hearing from you!
          </div>
          <div className="contact-content">
            <div className="contact-form-card">
              <div className="contact-form-title">Send Us a Message</div>
              <div className="contact-form-desc">
                Have a question or want to work with us? Fill out the form below.
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
                <label>Your Message</label>
                <textarea
                  name="message"
                  placeholder="Type your message here..."
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
                <button className="contact-send-btn" type="submit">
                  Send Message
                </button>
              </form>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-title">Contact Information</div>
              <div className="contact-info-desc">
                Reach out to us directly through the following channels.
              </div>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4z" fill="none"/><path d="M4 4l8 8 8-8" stroke="#FF9800" strokeWidth="2" fill="none"/></svg>
                  </span>
                  <div>
                    <div className="contact-info-label">Email Address</div>
                    <div className="contact-info-value">support@portersaathi.com</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.29 21 3 13.71 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z" stroke="#FF9800" strokeWidth="2" fill="none"/></svg>
                  </span>
                  <div>
                    <div className="contact-info-label">Phone Number</div>
                    <div className="contact-info-value">+91 98765 43210</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" stroke="#FF9800" strokeWidth="2" fill="none"/></svg>
                  </span>
                  <div>
                    <div className="contact-info-label">Office Address</div>
                    <div className="contact-info-value">
                      Porter Saathi Headquarters<br />
                      123 Innovation Drive<br />
                      Bengaluru, Karnataka 560001<br />
                      India
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;