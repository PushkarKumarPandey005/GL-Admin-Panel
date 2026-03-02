import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { ordersApi } from "../api/ordersApi";
import { FaSearch, FaEye, FaCheck, FaTruck, FaBox } from "react-icons/fa";

const getStatusColor = (status) => {
  const map = {
    pending:    "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped:    "bg-purple-100 text-purple-800",
    delivered:  "bg-green-100 text-green-800",
    cancelled:  "bg-red-100 text-red-800",
  };
  return map[status] || "bg-gray-100 text-gray-800";
};

const getStatusIcon = (status) => {
  const map = {
    pending:    <FaBox className="inline mr-1.5" />,
    processing: <FaCheck className="inline mr-1.5" />,
    shipped:    <FaTruck className="inline mr-1.5" />,
    delivered:  <FaCheck className="inline mr-1.5 text-green-600" />,
  };
  return map[status] || null;
};

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getAllOrders();
      setOrders(response.orders || []);
      setError("");
    } catch (err) {
      setError("Failed to load orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Total Orders",  value: orders.length,                                          gradient: "from-blue-500 to-blue-600",     textColor: "text-blue-100" },
    { label: "Pending",       value: orders.filter(o => o.orderStatus === "pending").length,  gradient: "from-yellow-500 to-yellow-600", textColor: "text-yellow-100" },
    { label: "Shipped",       value: orders.filter(o => o.orderStatus === "shipped").length,  gradient: "from-purple-500 to-purple-600", textColor: "text-purple-100" },
    { label: "Delivered",     value: orders.filter(o => o.orderStatus === "delivered").length, gradient: "from-green-500 to-green-600",   textColor: "text-green-100" },
  ];

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

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}`}>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Customer Orders</h1>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto hide-scrollbar">

          {/* Page Header — desktop */}
          <div className="hidden lg:block mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">Customer Orders</h1>
            <p className="text-gray-400 text-sm">Manage and track all customer orders</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {stats.map(({ label, value, gradient, textColor }) => (
              <div key={label} className={`bg-gradient-to-br ${gradient} rounded-xl p-3 sm:p-4 shadow-lg`}>
                <p className={`${textColor} text-xs sm:text-sm font-semibold`}>{label}</p>
                <p className="text-white text-2xl sm:text-3xl font-bold mt-1">{value}</p>
              </div>
            ))}
          </div>

          {/* Filters & Search */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-5 mb-5 shadow-lg border border-white/5">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Email, or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#021d2d] text-white pl-9 pr-4 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm transition"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#021d2d] text-white px-4 py-2.5 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm transition sm:min-w-36"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Refresh */}
              <button
                onClick={fetchOrders}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-lg transition text-sm font-medium whitespace-nowrap"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-52 gap-3">
              <svg className="animate-spin w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-gray-400">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 text-red-300">{error}</div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-[#052030] rounded-xl p-10 text-center border border-white/5">
              <p className="text-gray-400">No orders found</p>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block bg-[#052030] rounded-xl shadow-lg overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#021d2d] border-b border-gray-700">
                      <tr>
                        {["Order ID", "Customer", "Email", "Total", "Items", "Status", "Date", "Action"].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-gray-300 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order._id} className="border-b border-gray-700/50 hover:bg-[#073a4f] transition">
                          <td className="px-4 py-3 text-white font-semibold text-xs">{order.orderId}</td>
                          <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{order.customer?.fullName}</td>
                          <td className="px-4 py-3 text-gray-300 max-w-[160px] truncate">{order.customer?.email}</td>
                          <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">
                            ₹{order.pricing?.total?.toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{order.items?.length} items</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                              {getStatusIcon(order.orderStatus)}
                              {capitalize(order.orderStatus)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => navigate(`/order-detail/${order._id}`)}
                              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap"
                            >
                              <FaEye size={12} /> View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* MOBILE CARDS */}
              <div className="md:hidden space-y-3">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="bg-[#052030] rounded-xl p-4 border border-white/5 shadow">
                    {/* Top row */}
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div className="min-w-0">
                        <p className="text-white font-bold text-xs truncate">{order.orderId}</p>
                        <p className="text-gray-300 text-sm font-medium mt-0.5">{order.customer?.fullName}</p>
                        <p className="text-gray-500 text-xs truncate">{order.customer?.email}</p>
                      </div>
                      <span className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                        {getStatusIcon(order.orderStatus)}
                        {capitalize(order.orderStatus)}
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div className="flex justify-between items-center pt-3 border-t border-white/10">
                      <div className="flex gap-4 text-xs text-gray-400">
                        <span>
                          <span className="text-white font-semibold">₹{order.pricing?.total?.toLocaleString("en-IN")}</span>
                        </span>
                        <span>{order.items?.length} items</span>
                        <span>{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "N/A"}</span>
                      </div>
                      <button
                        onClick={() => navigate(`/order-detail/${order._id}`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition flex-shrink-0"
                      >
                        <FaEye size={11} /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;