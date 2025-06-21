import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeLogin.css"; // Make sure this CSS file is created

function EmployeeLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("https://dpdzero-feedback.onrender.com/employee/login", form);
      const employee = res.data.employee;
      localStorage.setItem("employee", JSON.stringify(employee));
      navigate("/employee/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="/7.png" // Or use local asset
          alt="Music"
          className="login-image"
        />
        <h2 className="login-tagline">All Your Feedback.<br />Anytime, anywhere.</h2>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Welcome Back</h2>
          <p>Login as Employee</p>

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

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeLogin;
