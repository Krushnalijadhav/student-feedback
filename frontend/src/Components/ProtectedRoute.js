import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) {
    // redirect to their dashboard
    return <Navigate to={user.role === "admin" ? "/admin" : "/student"} replace />;
  }
  return children;
}
