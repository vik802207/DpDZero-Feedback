import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">🌟 Welcome to the Feedback Portal</h1>
      <p className="home-subtitle">Please choose your role to get started</p>

      <div className="card-wrapper">
        <div className="card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
            alt="Manager"
            className="card-image"
          />
          <h2>Manager</h2>
          <p className="card-desc">Manage your team and give constructive feedback.</p>
          <div className="card-buttons">
            <button onClick={() => navigate("/manager/login")}>Login</button>
            <button onClick={() => navigate("/manager/signup")}>Sign Up</button>
          </div>
        </div>

        <div className="card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/706/706830.png"
            alt="Employee"
            className="card-image"
          />
          <h2>Employee</h2>
          <p className="card-desc">View feedback from your manager and acknowledge.</p>
          <div className="card-buttons">
            <button onClick={() => navigate("/employee/login")}>Login</button>
            <button onClick={() => navigate("/employee/signup")}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
