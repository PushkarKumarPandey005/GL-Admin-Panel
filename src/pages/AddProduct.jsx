import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import Properties from "../forms/Properties";
import Stationaries from "../forms/Stationaries";

const AddProduct = () => {
  const [form, setForm] = useState("");

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen">
        <VerticalNavbar />
      </div>

      {/* Main */}
      <div className="bg-[#021d2d] ml-64 w-full min-h-screen">

        {/* Top Buttons Bar */}
        <div className="w-full h-20 pl-40 flex items-center gap-8">

          <button
            onClick={() => setForm("stationary")}
            className="text-white h-10 px-4 font-bold tracking-wide text-sm
              bg-blue-600/20 cursor-pointer opacity-80 border
              border-b-blue-500 border-t-amber-300 rounded-xl border-x-emerald-400"
          >
            Stationary Items
          </button>

          <button
            onClick={() => setForm("stationary")}
            className="text-white h-10 px-4 font-bold tracking-wide text-sm
              bg-blue-600/20 cursor-pointer opacity-80 border
              border-b-blue-500 border-t-amber-300 border-yellow-700 rounded-xl"
          >
            Machinery Items
          </button>

          <button
            onClick={() => setForm("properties")}
            className="text-white h-10 px-4 font-bold tracking-wide text-sm
              bg-blue-600/20 cursor-pointer opacity-80 border
              border-b-blue-500 border-t-amber-300 rounded-xl border-x-emerald-400"
          >
            Properties
          </button>

        </div>

        {/* Forms */}
        <div className="w-full px-10 pb-10">
          {form === "stationary" && <Stationaries />}
          {form === "properties" && <Properties />}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
