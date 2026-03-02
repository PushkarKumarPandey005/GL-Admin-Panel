import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import Properties from "../forms/Properties";
import Stationaries from "../forms/Stationaries";

const tabs = [
  { key: "stationary", label: "Stationary Items" },
  { key: "machinery", label: "Machinery Items" },
  { key: "properties", label: "Properties" },
];

const AddProduct = () => {
  const [form, setForm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex ml-13 min-h-screen bg-[#021d2d]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen z-30 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>

      {/* Main */}
      <div
        className={`
          flex-1 min-h-screen transition-all duration-300 overflow-x-hidden
          lg:${sidebarExpanded ? "ml-64" : "ml-16"}
          ml-0
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Add Product</h1>
        </div>

        {/* Tab Buttons Bar */}
        <div className="w-full px-4 sm:px-8 lg:px-10 py-5 sm:py-6 border-b border-white/10">
          <h1 className="hidden lg:block text-white text-xl font-bold mb-4">Add Product</h1>

          <div className="flex flex-wrap gap-3">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setForm(key)}
                className={`
                  h-10 px-4 sm:px-5 font-semibold tracking-wide text-sm rounded-xl
                  border transition-all duration-200 cursor-pointer
                  ${form === key
                    ? "bg-blue-600/40 text-white border-blue-400 opacity-100 shadow-lg shadow-blue-900/30"
                    : "text-white bg-blue-600/20 opacity-70 border-b-blue-500 border-t-amber-300 border-x-emerald-400 hover:opacity-100 hover:bg-blue-600/30"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Area */}
        <div className="w-full px-4 sm:px-8 lg:px-10 py-6 pb-10">
          {!form && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm sm:text-base font-medium">Select a product type to get started</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">Choose from Stationary, Machinery, or Properties</p>
            </div>
          )}

          {form === "stationary" && <Stationaries />}
          {form === "machinery" && <Stationaries />}
          {form === "properties" && <Properties />}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;