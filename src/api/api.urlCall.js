import axios from "axios";
import { VITE_API_BASE_URL } from "../config/config.js";

// ===============================
// AXIOS INSTANCE
// ===============================
const api = axios.create({
  baseURL: VITE_API_BASE_URL,
  timeout: 30000, // 30s safety
 
});

// ===============================
// REQUEST INTERCEPTOR (token)
// ===============================
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Token read error:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR (optional but pro)
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    //  Auto logout on 401 (optional)
    if (error?.response?.status === 401) {
      console.warn("Unauthorized — possible token expiry");
      // localStorage.removeItem("token"); // enable if needed
      // window.location.href = "/login";  // enable if needed
    }

    return Promise.reject(error);
  }
);

export default api;