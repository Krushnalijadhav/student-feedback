import React, { useEffect, useState } from "react";
import API from "../api";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [feedbacks, setFeedbacks] = useState([]);
  const [err, setErr] = useState("");

  const logout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  const loadAll = async () => {
    try {
      const { data } = await API.get("/feedback");
      setFeedbacks(data);
    } catch (error) {
      console.error(error);
      setErr("Could not load feedbacks");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="card">
      <div className="top">
        <h2>Admin Dashboard — {user.name}</h2>
      </div>

      <h3>All Feedbacks</h3>
      {err && <div className="error">{err}</div>}

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Teacher</th>
              <th>Subject</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id}>
                <td>{f.studentName || f.student?.name}</td>
                <td>{f.teacher}</td>
                <td>{f.subject}</td>
                <td>{f.rating}</td>
                <td>{f.comment}</td>
                <td>
                  {f.createdAt
                    ? new Date(f.createdAt).toLocaleString()
                    : "Invalid Date"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Logout button moved to the bottom */}
      <div className="logout-section">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
