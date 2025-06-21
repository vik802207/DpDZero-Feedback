import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employee"));
    if (stored) {
      setEmployee(stored);
      fetchFeedbacks(stored.id);
    }
  }, []);

  const fetchFeedbacks = async (id) => {
    try {
      const res = await axios.get(`https://dpdzero-feedback.onrender.com/employee/feedbacks/${id}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const handleAcknowledge = async (feedbackId) => {
    try {
      await axios.patch(`https://dpdzero-feedback.onrender.com/employee/feedbacks/${feedbackId}/ack`);
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.id === feedbackId ? { ...f, acknowledge: true } : f
        )
      );
    } catch (err) {
      alert("Acknowledgement failed");
    }
  };

  if (!employee) return <p className="loading-text">Loading...</p>;

  return (
    <div className="employee-dashboard">
      <h2 className="dashboard-title">👤 Welcome, {employee.name}</h2>

      <h3 className="section-title">Your Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedbacks yet.</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-card">
              <p><strong>Strengths:</strong> {fb.strengths}</p>
              <p><strong>Improvements:</strong> {fb.improvements}</p>
              <p>
                <strong>Sentiment:</strong>{" "}
                <span className={`sentiment-tag ${fb.sentiment}`}>
                  {fb.sentiment}
                </span>
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {fb.acknowledge ? (
                  <span className="ack acknowledged">Acknowledged</span>
                ) : (
                  <span className="ack pending">Pending</span>
                )}
              </p>
              {!fb.acknowledge && (
                <button
                  onClick={() => handleAcknowledge(fb.id)}
                  className="acknowledge-btn"
                >
                  Acknowledge
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
