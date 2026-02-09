
import React, { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";

const Profile = () => {
  const [form, setForm] = useState({
   
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen bg-[#021d2d] overflow-hidden">
      {/* Sidebar */}
      <div className="w-85 shrink-0">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-10 text-white">

        <h1 className="text-3xl font-semibold ml-20 mb-8">Admin Profile</h1>

        <div className=" flex gap-10">

          {/* LEFT PROFILE CARD */}
          <div className=" ml-20 w-143  h-165 rounded-xl  p-8 flex flex-col items-center shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-66 h-66 rounded-full object-cover border-4 border-white/20"
            />
            <h2 className="mt-6 text-2xl font-semibold">{form.name}</h2>
            <p className="opacity-70">Admin</p>

            <button className="mt-6 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700">
              Change Photo
            </button>
          </div>

          {/* RIGHT DETAILS FORM */}
          <div className="lg:col-span-2  w-180 rounded-xl  p-8 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
            <h2 className="text-2xl mb-6 opacity-80 font-bold tracking-wider">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-1  gap-6">
              <div>
                <label className='text-2xl sh  '>Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded h-15 outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
                />
              </div>

              <div>
                <label className='text-2xl sh  '>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 h-15 rounde outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
                />
              </div>

              <div>
                <label className='text-2xl sh  '>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 h-15 rounded  outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
                />
              </div>

              <div>
                <label >Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 h-15 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black] outline-none"
                />
              </div>
            </div>

            <button className="mt-8 bg-green-600 px-8 py-3 rounded hover:bg-green-700">
              Save Changes
            </button>
          </div>

          
        </div>

        
      </div>

      {/* SECURITY SECTION */}
        <div className="lg:col-span-2  w-130 mt-27 h-165 rounded-xl mr-20 p-8 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
          <h2 className="text-2xl mb-6 sh text-[white] font-bold tracking-wider">Security Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full mt-2 p-3 h-15 rounded text-[#ffffff] outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full mt-2 p-3 h-15 rounded text-[#ffffff] outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
            />
            <input
              type="password"
              placeholder="Confirm Password"
             className="w-full mt-2 p-3 h-15 rounded text-[#ffffff] outline-none shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
            />
          </div>

          <button className="mt-6 bg-red-600 px-8 py-3 rounded hover:bg-red-700">
            Update Password
          </button>
        </div>
    </div>
  );
};

export default Profile;