import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add signup logic here
    // On success, you can navigate to login or home
    navigate("/login");
  };

  return (
    <div className="signup-bg">
      <div className="signup-container">
        <div className="signup-left">
          <img src={require("../../assets/logo.png")} alt="Logo" className="signup-logo" />
          <h1 className="signup-title">
            Unlock Seamless Logistics<br />with Porter Saathi
          </h1>
          <div className="signup-desc">
            Your dependable partner for efficient, real-time deliveries and robust supply chain management.
          </div>
          <img
            src={require("../../assets/handshake.png")}
            alt="Handshake"
            className="signup-hero-img"
            style={{ marginTop: 32, width: 320, maxWidth: "90%" }}
          />
        </div>
        <div className="signup-right">
          <div className="signup-form-title">Create Your Porter Saathi Account</div>
          <div className="signup-form-desc">
            Join us to simplify your delivery operations and expand your reach.
          </div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Email or Phone Number</label>
            <input
              type="text"
              name="email"
              placeholder="e.g., email@example.com or +91 9876543210"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirm"
              placeholder="********"
              value={form.confirm}
              onChange={handleChange}
              required
            />
            <button className="signup-btn" type="submit">Sign Up</button>
          </form>
          <div className="signup-or">OR</div>
          <div className="signup-login-link">
            Already have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/login")}>Log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;