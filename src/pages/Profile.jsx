import React, { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";

const Profile = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-[#021d2d] overflow-hidden">
      {/* Sidebar */}
      <div className="w-70 shrink-0">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 text-white">

        <h1 className="text-2xl font-semibold ml-14 mb-6">Admin Profile</h1>

        <div className="flex gap-6">

          {/* LEFT PROFILE CARD */}
          <div className="ml-14 w-110 h-130 rounded-xl p-6 flex flex-col items-center shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-white/20"
            />
            <h2 className="mt-4 text-xl font-semibold">{form.name}</h2>
            <p className="opacity-70 text-sm">Admin</p>

            <button className="mt-4 bg-blue-600 px-5 py-2 text-sm rounded hover:bg-blue-700">
              Change Photo
            </button>
          </div>

          {/* RIGHT DETAILS FORM */}
          <div className="w-150 rounded-xl p-6 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
            <h2 className="text-xl mb-4 opacity-80 font-bold tracking-wider">
              Personal Information
            </h2>

            <div className="grid gap-4">
              {["name", "email", "phone", "address"].map((field) => (
                <div key={field}>
                  <label className="text-lg capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 h-10 rounded outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
                  />
                </div>
              ))}
            </div>

            <button className="mt-6 bg-green-600 px-6 py-2 text-sm rounded hover:bg-green-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* SECURITY SECTION */}
      <div className="w-110 mt-20 h-130 rounded-xl mr-14 p-6 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black] text-white">
        <h2 className="text-xl mb-4 font-bold tracking-wider">
          Security Settings
        </h2>

        <div className="grid gap-4">
          {[
            "Current Password",
            "New Password",
            "Confirm Password",
          ].map((ph) => (
            <input
              key={ph}
              type="password"
              placeholder={ph}
              className="w-full p-2 h-10 rounded outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
            />
          ))}
        </div>

        <button className="mt-4 bg-red-600 px-6 py-2 text-sm rounded hover:bg-red-700">
          Update Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
