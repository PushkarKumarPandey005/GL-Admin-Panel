import axios from "axios";

export const authApi = axios.create({
  baseURL: "https://gltech-backend.onrender.com",   
});

export const loginUser = (data) =>
  authApi.post("/user/login", data);

export const registerUser = (data) =>
  authApi.post("/user/register", data);
