import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [studentName, setStudentName] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || userInfo.role !== "student") {
      alert("Please login as a student");
      navigate("/login");
      return;
    }
    setStudentName(userInfo.name);
    setToken(userInfo.token);
  }, [navigate]);

  const teachers = [
    { name: "Prof. Yadav", subject: "APL II" },
    { name: "Dr. Kadam", subject: "CPP" },
    { name: "Dr. S. B. Patil", subject: "DSA" },
    { name: "Prof. Dhannal", subject: "Automata Theory" },
    { name: "Dr. Mohite", subject: "Java" },
    { name: "Prof. Gavali", subject: "Machine Learning" },
    { name: "Prof. Pardeshi", subject: "Cyber Security" },
    { name: "Prof. Joshi", subject: "Statistics" },
    { name: "Dr. Pawar", subject: "Data Science" },
  ];

  const handleTeacherChange = (e) => {
    const selected = e.target.value;
    setTeacher(selected);
    const found = teachers.find((t) => t.name === selected);
    setSubject(found ? found.subject : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!teacher || !subject || !rating || !comment) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/feedback",
        {
          teacher,
          subject,
          rating: Number(rating),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Feedback submitted successfully!");
      setTeacher("");
      setSubject("");
      setRating("");
      setComment("");
    } catch (err) {
      console.error("Feedback error:", err.response || err);
      alert(err.response?.data?.message || "Error submitting feedback!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {studentName}</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        <label>Teacher:</label>
        <select value={teacher} onChange={handleTeacherChange} required>
          <option value="">-- Select Teacher --</option>
          {teachers.map((t, i) => (
            <option key={i} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <label>Subject:</label>
        <input type="text" value={subject} readOnly placeholder="Subject auto-filled" />

        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
