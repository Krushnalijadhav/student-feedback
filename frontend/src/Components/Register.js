import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";
export default function Register(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/users/register", { name, email, password, role });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.role === "admin") navigate("/admin");
      else navigate("/student");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit}>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <label>Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn" type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
