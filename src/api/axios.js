import axios from "axios";

// ✅ Set this to your deployed backend URL
const api = axios.create({
  baseURL: "https://notepad-backend-dn97.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
