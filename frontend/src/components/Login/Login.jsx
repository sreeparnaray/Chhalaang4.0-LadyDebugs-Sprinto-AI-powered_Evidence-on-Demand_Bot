import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add real authentication here
    navigate("/home");
  };

  const handleGuest = () => {
    navigate("/home");
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-logo-row" style={{ justifyContent: "center" }}>
          <img src={require("../../assets/logo.png")} alt="Logo" className="login-logo" />
        </div>
        <div className="login-subtitle">Your Voice. Your Rights. Your Saathi.</div>
        <label className="login-label">Email or Phone</label>
        <input
          className="login-input"
          type="text"
          placeholder="name@example.com or +1234567890"
          value={emailOrPhone}
          onChange={e => setEmailOrPhone(e.target.value)}
          required
        />
        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <div className="login-forgot">
          <a href="#">Forgot Password?</a>
        </div>
        <button className="login-btn-main" type="submit">Login</button>
        <button className="login-btn-secondary" type="button" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className="login-btn-secondary" type="button" onClick={handleGuest}>
          Continue as Guest
        </button>
      </form>
    </div>
  );
}