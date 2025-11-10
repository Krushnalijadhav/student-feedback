import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await API.post("/users/login", { email, password });
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.role === "admin") navigate("/admin");
      else navigate("/student");
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {err && <div className="error">{err}</div>}
      <form onSubmit={submit}>
        <label>Email</label>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button className="btn" type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
}
