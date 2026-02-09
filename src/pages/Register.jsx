import { useState } from "react";
import { useRegister } from "../hooks/useAuth";

const Register = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const { mutate: register, isPending } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#021d2d] text-white">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 p-10 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-6 text-center">Register</h2>

        <input
          placeholder="Username"
          onChange={(e) =>
            setForm({ ...form, userName: e.target.value })
          }
          className="p-3 mb-4 w-full bg-white/20 rounded outline-none"
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="p-3 mb-4 w-full bg-white/20 rounded outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="p-3 mb-6 w-full bg-white/20 rounded outline-none"
        />

        <button
          disabled={isPending}
          className="bg-green-600 w-full py-3 rounded"
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
