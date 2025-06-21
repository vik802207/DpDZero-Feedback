import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeDashboard({ session }) {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await axios.get("http://localhost:8000/feedback");
    const myFeedbacks = res.data.filter(
      (fb) => fb.to_employee === session.user.id
    );
    setFeedbacks(myFeedbacks);
  };

  const handleAcknowledge = async (id) => {
    await axios.patch(`http://localhost:8000/feedback/${id}/acknowledge`);
    fetchFeedbacks(); // refresh after updating
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>👩‍💼 Employee Dashboard</h2>

      <h3>Your Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p>No feedbacks received yet.</p>
      ) : (
        <ul>
          {feedbacks.map((fb) => (
            <li key={fb.id} style={{ marginBottom: "10px" }}>
              <p><strong>Strengths:</strong> {fb.strengths}</p>
              <p><strong>Improvement:</strong> {fb.improvements}</p>
              <p><strong>Sentiment:</strong> {fb.sentiment}</p>
              <p><strong>Status:</strong> {fb.acknowledge ? "✅ Acknowledged" : "❌ Not Acknowledged"}</p>
              {!fb.acknowledge && (
                <button onClick={() => handleAcknowledge(fb.id)}>
                  Acknowledge
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
