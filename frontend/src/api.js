import axios from "axios";

const API = axios.create({
  baseURL: "https://student-feedback-2-dox9.onrender.com/api", // ✅ Backend URL
});

// Attach token automatically for every request
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
