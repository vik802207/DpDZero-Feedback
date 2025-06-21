import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerSignup.css";

function ManagerSignup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://127.0.0.1:8000/manager/signup", form);
      setSuccess("Signup successful. Redirecting to login...");
      setTimeout(() => navigate("/manager/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img src="/7.png" alt="Visual" className="signup-image" />
        <h2 className="signup-tagline">
          Manage your team. <br /> Share feedback with ease.
        </h2>
      </div>

      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Create Manager Account</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit" className="primary-btn">Sign Up</button>

          <button type="button" className="google-btn">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" />
            Sign up with Google
          </button>

          <p className="login-link">
            Already have an account? <a href="/manager/login">Log in</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ManagerSignup;
