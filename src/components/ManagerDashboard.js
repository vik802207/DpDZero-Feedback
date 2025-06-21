import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagerDashboard.css";

export default function ManagerDashboard() {
  const [manager, setManager] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form, setForm] = useState({
    strengths: "",
    improvements: "",
    sentiment: "positive",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const managerData = JSON.parse(localStorage.getItem("manager"));
    if (managerData) {
      setManager(managerData);
      fetchEmployees();
      fetchFeedbacks(managerData.id);
    }
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/manager/team");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  const fetchFeedbacks = async (managerId) => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/feedback");
      const filtered = res.data.filter((f) => f.from_manager === managerId);
      setFeedbacks(filtered);
    } catch (err) {
      console.error("Failed to fetch feedbacks", err);
    }
  };

  const handleOpenModal = (employee, feedback = null) => {
    setSelectedEmployee(employee);
    if (feedback) {
      setForm({
        strengths: feedback.strengths,
        improvements: feedback.improvements,
        sentiment: feedback.sentiment,
      });
      setIsEditing(true);
      setEditId(feedback.id);
    } else {
      setForm({ strengths: "", improvements: "", sentiment: "positive" });
      setIsEditing(false);
      setEditId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm({ strengths: "", improvements: "", sentiment: "positive" });
    setIsEditing(false);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      from_manager: manager.id,
      to_employee: selectedEmployee.id,
      strengths: form.strengths,
      improvement: form.improvements,
      sentiment: form.sentiment,
    };

    try {
      if (isEditing) {
        await axios.patch(`http://127.0.0.1:8000/feedback/${editId}`, payload);
        alert("Feedback updated!");
      } else {
        await axios.post("http://127.0.0.1:8000/feedback", payload);
        alert("Feedback submitted!");
      }
      handleCloseModal();
      fetchFeedbacks(manager.id);
    } catch (err) {
      console.error("Error submitting feedback", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">👨‍💼 Manager Dashboard</h2>

      <div className="section">
        <h3 className="section-title">👋 Your Employees</h3>
        <div className="cards">
          {employees.map((emp) => (
            <div key={emp.id} className="card">
              <p className="card-name">{emp.name}</p>
              <p className="card-email">{emp.email}</p>
              <button
                className="btn-feedback"
                onClick={() => handleOpenModal(emp)}
              >
                Give Feedback
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">📋 Your Feedbacks</h3>
        <ul className="feedback-list">
          {feedbacks.map((fb) => {
            const emp = employees.find((e) => e.id === fb.to_employee);
            return (
              <li key={fb.id} className="feedback-card">
                <div>
                  <p className="feedback-to">
                    To: {emp?.name || "Unknown"} <span className={`sentiment ${fb.sentiment}`}>{fb.sentiment}</span>
                  </p>
                  <p>Strengths: {fb.strengths}</p>
                  <p>Improvements: {fb.improvements}</p>
                </div>
                <button
                  className="btn-edit"
                  onClick={() => handleOpenModal(emp, fb)}
                >
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{isEditing ? "Edit Feedback" : `Feedback for ${selectedEmployee.name}`}</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <input
                type="text"
                placeholder="Strengths"
                value={form.strengths}
                onChange={(e) => setForm({ ...form, strengths: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Improvements"
                value={form.improvements}
                onChange={(e) => setForm({ ...form, improvements: e.target.value })}
                required
              />
              <select
                value={form.sentiment}
                onChange={(e) => setForm({ ...form, sentiment: e.target.value })}
              >
                <option value="positive">👍 Positive</option>
                <option value="neutral">😐 Neutral</option>
                <option value="negative">👎 Negative</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-submit">
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
