import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeSignup.css"; // Create this file for custom styles

function EmployeeSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:8000/employee/signup", form);
      setSuccess("Signup successful. Redirecting to login...");
      setTimeout(() => navigate("/employee/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="/7.png"
          alt="Music"
          className="signup-image"
        />
        <h2 className="signup-tagline">
          All Your Feedback. <br /> Anytime, anywhere.
        </h2>
      </div>

      <div className="signup-right">
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Join as Employee</h2>

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeSignup;
