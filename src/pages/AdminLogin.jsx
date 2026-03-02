import { useState } from "react";
import { useLogin } from "../hooks/useAuth";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#021d2d] text-white px-4 py-8">

      <div className="w-full max-w-sm sm:max-w-md">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-wider">Admin Login</h2>
          <p className="text-gray-400 text-sm mt-1">Sign in to your admin panel</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="bg-[#031c2e] rounded-2xl p-6 sm:p-8 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black] border border-white/5"
        >

          {/* Email */}
          <div className="mb-4">
            <label className="text-xs sm:text-sm text-gray-400 font-medium block mb-1.5">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="p-3 w-full rounded-xl outline-none bg-[#021d2d] text-white text-sm
                         border border-white/10 focus:border-blue-500 transition
                         placeholder-gray-600
                         shadow-[0_-3px_6px_-3px_black,0_3px_6px_-3px_black,3px_0_6px_-3px_black,-3px_0_6px_-3px_black]"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-xs sm:text-sm text-gray-400 font-medium block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="p-3 pr-10 w-full rounded-xl outline-none bg-[#021d2d] text-white text-sm
                           border border-white/10 focus:border-blue-500 transition
                           placeholder-gray-600
                           shadow-[0_-3px_6px_-3px_black,0_3px_6px_-3px_black,3px_0_6px_-3px_black,-3px_0_6px_-3px_black]"
              />
              {/* Show/Hide toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl text-base sm:text-lg font-semibold tracking-wider
                       bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition duration-200 shadow-lg
                       flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;