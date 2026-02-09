import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/api.auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (res) => {
      const { accessToken, data } = res.data;

      localStorage.setItem("token", accessToken);

      if (data.role === "admin") {
        navigate("/");
      } else {
        alert("You are not admin");
      }
    },
  });
};

// ✅ YE MISSING THA — isi ki wajah se UI crash
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert("Registered Successfully");
      navigate("/login");
    },
  });
};
