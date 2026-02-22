import axios from "axios";
import { VITE_API_BASE_URL } from "../config/config.js";

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
