import axios from "axios";

const API = axios.create({
  baseURL: process.env.VITE_BACKEND_UR || "http://localhost:5000/api"
});

// attach token
API.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
