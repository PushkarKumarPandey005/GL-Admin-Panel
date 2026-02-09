import React from 'react'
import { FaTags, FaClipboardList, FaUsers, FaClock } from "react-icons/fa";
import { VerticalNavbar } from '../components/VerticalNavbar'
import CardComponents from '../components/CardComponents'
import RevenuCard from '../components/RevenuCard'
import VisitorAnalytics from '../components/VisitorAnalytics'
import TopSellingProducts from '../components/TopSellingProducts'
import LowStockItems from '../components/LowStockItems'

export const Home = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#021d2d]">

      {/* Sidebar */}
      <div className="w-85 shrink-0 ">
        <VerticalNavbar />
      </div>

      {/* Main Content (Y scroll only) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar p-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
          <CardComponents title="Total Sales" value="₹5,340,000" icon={<FaTags />} gradient="bg-gradient-to-br from-pink-500 to-red-500" />
          <CardComponents title="Total Orders" value="12,450" icon={<FaClipboardList />} gradient="bg-gradient-to-br from-orange-400 to-yellow-500" />
          <CardComponents title="Total Customers" value="1,280" icon={<FaUsers />} gradient="bg-gradient-to-br from-purple-500 to-blue-600" />
          <CardComponents title="Pending Orders" value="245" icon={<FaClock />} gradient="bg-gradient-to-br from-blue-400 to-indigo-600" />
        </div>

        <div className="flex gap-6 mt-8">
          <div className="flex-1 h-75 shadow-xl rounded-xl">
            <RevenuCard />
          </div>
          <div className="flex-1 h-75  shadow-xl rounded-xl">
            <VisitorAnalytics />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="h-75 shadow-xl rounded-xl">
            <TopSellingProducts />
          </div>
          <div className="h-75 shadow-xl rounded-xl">
            <LowStockItems />
          </div>
        </div>

      </div>
    </div>
  );
};
