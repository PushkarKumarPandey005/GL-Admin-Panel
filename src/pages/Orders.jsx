import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { ordersApi } from "../api/ordersApi";
import { FaSearch, FaEye, FaEdit, FaCheck, FaTruck, FaBox } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

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

    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaBox className="inline mr-2" />;
      case "processing":
        return <FaCheck className="inline mr-2" />;
      case "shipped":
        return <FaTruck className="inline mr-2" />;
      case "delivered":
        return <FaCheck className="inline mr-2 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#021d2d]">
      {/* Sidebar */}
      <div className="w-85 shrink-0">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Customer Orders</h1>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 shadow-lg">
            <p className="text-blue-100 text-sm font-semibold">Total Orders</p>
            <p className="text-white text-3xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg p-4 shadow-lg">
            <p className="text-yellow-100 text-sm font-semibold">Pending</p>
            <p className="text-white text-3xl font-bold">
              {orders.filter((o) => o.orderStatus === "pending").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 shadow-lg">
            <p className="text-purple-100 text-sm font-semibold">Shipped</p>
            <p className="text-white text-3xl font-bold">
              {orders.filter((o) => o.orderStatus === "shipped").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 shadow-lg">
            <p className="text-green-100 text-sm font-semibold">Delivered</p>
            <p className="text-white text-3xl font-bold">
              {orders.filter((o) => o.orderStatus === "delivered").length}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-[#052030] rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Email, or Customer Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#021d2d] text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#021d2d] text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none min-w-40"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchOrders}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400 text-lg">Loading orders...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-200">
            {error}
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-[#052030] rounded-lg p-8 text-center">
            <p className="text-gray-400 text-lg">No orders found</p>
          </div>
        ) : (
          <div className="bg-[#052030] rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#021d2d] border-b border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-700 hover:bg-[#073a4f] transition"
                    >
                      <td className="px-6 py-4 text-white font-semibold">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {order.customer?.fullName}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {order.customer?.email}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        ₹{order.pricing?.total?.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {order.items?.length} items
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {getStatusIcon(order.orderStatus)}
                          {order.orderStatus?.charAt(0).toUpperCase() +
                            order.orderStatus?.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-IN"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => navigate(`/order-detail/${order._id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition inline-flex items-center gap-2"
                        >
                          <FaEye size={14} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
