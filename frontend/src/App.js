import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import StudentDashboard from "./Components/StudentDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";

import "./App.css"; // ✅ Import your CSS file here

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
