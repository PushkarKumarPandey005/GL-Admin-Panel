import React, { useState } from 'react'
import { FaTags, FaClipboardList, FaUsers, FaClock } from "react-icons/fa";
import { VerticalNavbar } from '../components/VerticalNavbar'
import CardComponents from '../components/CardComponents'
import RevenuCard from '../components/RevenuCard'
import VisitorAnalytics from '../components/VisitorAnalytics'
import TopSellingProducts from '../components/TopSellingProducts'
import LowStockItems from '../components/LowStockItems'

export const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#021d2d]">

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

      {/* Main Content */}
      <div
        className={`
          flex-1 min-h-screen overflow-y-auto overflow-x-hidden hide-scrollbar
          transition-all duration-300
          ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}
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
          <h1 className="text-white font-semibold text-lg">Dashboard</h1>
        </div>

        {/* Dashboard Content */}
        <div className="p-4 ml-20 sm:p-5 lg:p-6 space-y-5 sm:space-y-6">

          {/* Page Title — desktop only */}
          <h1 className="hidden lg:block text-white text-xl font-bold">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <CardComponents
              title="Total Sales"
              value="₹53,40,000"
              icon={<FaTags />}
              gradient="bg-gradient-to-br from-pink-500 to-red-500"
            />
            <CardComponents
              title="Total Orders"
              value="12,450"
              icon={<FaClipboardList />}
              gradient="bg-gradient-to-br from-orange-400 to-yellow-500"
            />
            <CardComponents
              title="Total Customers"
              value="1,280"
              icon={<FaUsers />}
              gradient="bg-gradient-to-br from-purple-500 to-blue-600"
            />
            <CardComponents
              title="Pending Orders"
              value="245"
              icon={<FaClock />}
              gradient="bg-gradient-to-br from-blue-400 to-indigo-600"
            />
          </div>

          {/* Revenue + Visitor Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="shadow-xl rounded-xl">
              <RevenuCard />
            </div>
            <div className="shadow-xl rounded-xl">
              <VisitorAnalytics />
            </div>
          </div>

          {/* Top Selling + Low Stock */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <div className="shadow-xl rounded-xl">
              <TopSellingProducts />
            </div>
            <div className="shadow-xl rounded-xl">
              <LowStockItems />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};