import { useState } from "react";
import { useLogin } from "../hooks/useAuth";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#021d2d] text-white">
      <form onSubmit={handleLogin} className=" p-10 rounded-xl w-126 h-90 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black] ">
        <h2 className="text-2xl mb-6 text-center font-bold tracking-wider">Admin Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 mb-4 w-full  rounded outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="p-3 mb-6 w-full  rounded outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
        />

        <button
          disabled={isPending}
          className="text-xl tracking-wider w-full py-3 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
