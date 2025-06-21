import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ManagerLogin.css";

function ManagerLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/manager/login", form);
      const manager = res.data.manager;
      localStorage.setItem("manager", JSON.stringify(manager));
      navigate("/manager/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h3 style={{color:"white"}}>Welcome back</h3>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label>Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

         <div className="form-options">
  <label className="checkbox-container">
    <input type="checkbox" />
    <span>Remember for 30 days</span>
  </label>
  <a href="#">Forgot password?</a>
</div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="primary-btn">Sign in</button>
          <button type="button" className="google-btn">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" />
            Sign in with Google
          </button>

          <p className="signup-link">
            Don’t have an account? <a href="#">Sign up</a>
          </p>
        </form>
      </div>

      <div className="login-right">
        <img src="/7.png" alt="Login Visual" />
      </div>
    </div>
  );
}

export default ManagerLogin;
