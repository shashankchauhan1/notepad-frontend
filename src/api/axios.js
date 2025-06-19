import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7000/api", // ✅ Update as needed for production
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
