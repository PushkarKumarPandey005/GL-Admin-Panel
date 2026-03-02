import React, { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";

const Profile = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="flex min-h-screen bg-[#021d2d] text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>

      {/* Main */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}`}>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Admin Profile</h1>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto">

          <h1 className="hidden lg:block text-2xl font-semibold mb-6">Admin Profile</h1>

          {/* Top Section — Profile Card + Personal Info */}
          <div className="flex flex-col lg:flex-row gap-5 mb-5">

            {/* Profile Card */}
            <div className="w-full lg:w-72 xl:w-80 rounded-2xl p-6 flex flex-col items-center
                            shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
                            bg-[#031c2e] border border-white/5">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="profile"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white/20"
              />
              <h2 className="mt-4 text-lg sm:text-xl font-semibold">
                {form.name || "Admin"}
              </h2>
              <p className="opacity-60 text-sm mt-0.5">Administrator</p>

              {form.email && (
                <p className="text-gray-400 text-xs mt-1 truncate max-w-full px-2">{form.email}</p>
              )}

              <button className="mt-5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-5 py-2 text-sm rounded-lg transition w-full sm:w-auto">
                Change Photo
              </button>
            </div>

            {/* Personal Info Form */}
            <div className="flex-1 rounded-2xl p-5 sm:p-6
                            shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
                            bg-[#031c2e] border border-white/5">
              <h2 className="text-lg sm:text-xl mb-4 font-bold tracking-wider opacity-80">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { field: "name",    label: "Full Name",     type: "text" },
                  { field: "email",   label: "Email Address", type: "email" },
                  { field: "phone",   label: "Phone Number",  type: "tel" },
                  { field: "address", label: "Address",       type: "text" },
                ].map(({ field, label, type }) => (
                  <div key={field} className={field === "address" ? "sm:col-span-2" : ""}>
                    <label className="text-sm text-gray-400 font-medium block mb-1.5">{label}</label>
                    <input
                      type={type}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={`Enter ${label.toLowerCase()}...`}
                      className="w-full p-2.5 h-10 rounded-lg outline-none bg-[#021d2d] text-white text-sm
                                 border border-white/10 focus:border-blue-500 transition placeholder-gray-600
                                 shadow-[0_-3px_6px_-3px_black,0_3px_6px_-3px_black]"
                    />
                  </div>
                ))}
              </div>

              <button className="mt-5 bg-green-600 hover:bg-green-700 active:bg-green-800 px-6 py-2.5 text-sm rounded-lg transition font-medium">
                💾 Save Changes
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="rounded-2xl p-5 sm:p-6
                          shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
                          bg-[#031c2e] border border-white/5">
            <h2 className="text-lg sm:text-xl mb-4 font-bold tracking-wider">
              🔒 Security Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { key: "current", placeholder: "Current Password" },
                { key: "newPass", placeholder: "New Password" },
                { key: "confirm", placeholder: "Confirm Password" },
              ].map(({ key, placeholder }) => (
                <div key={key}>
                  <label className="text-sm text-gray-400 font-medium block mb-1.5">{placeholder}</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwords[key]}
                    onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                    className="w-full p-2.5 h-10 rounded-lg outline-none bg-[#021d2d] text-white text-sm
                               border border-white/10 focus:border-red-500 transition placeholder-gray-600
                               shadow-[0_-3px_6px_-3px_black,0_3px_6px_-3px_black]"
                  />
                </div>
              ))}
            </div>

            <button className="mt-5 bg-red-600 hover:bg-red-700 active:bg-red-800 px-6 py-2.5 text-sm rounded-lg transition font-medium">
              🔑 Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;