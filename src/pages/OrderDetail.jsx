import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { ordersApi } from "../api/ordersApi";
import {
  FaArrowLeft, FaBox, FaMapMarkerAlt, FaPhone,
  FaEnvelope, FaTruck, FaCheckCircle,
} from "react-icons/fa";

const statusColors = {
  pending:    "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped:    "bg-purple-100 text-purple-800",
  delivered:  "bg-green-100 text-green-800",
  cancelled:  "bg-red-100 text-red-800",
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => { fetchOrderDetail(); }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const response = await ordersApi.getOrderById(orderId);
      setOrder(response.order || response);
      setError("");
    } catch (err) {
      setError("Failed to load order details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      await ordersApi.updateOrderStatus(orderId, newStatus);
      fetchOrderDetail();
      setUpdateMessage(`Order status updated to ${newStatus}`);
      setTimeout(() => setUpdateMessage(""), 3000);
    } catch (err) {
      setError("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusTimeline = () => {
    const statuses = [
      { label: "Pending",    icon: FaBox,         color: "yellow" },
      { label: "Processing", icon: FaCheckCircle, color: "blue" },
      { label: "Shipped",    icon: FaTruck,        color: "purple" },
      { label: "Delivered",  icon: FaCheckCircle, color: "green" },
    ];
    const currentIndex = Math.max(0,
      statuses.findIndex((s) => s.label.toLowerCase() === order?.orderStatus?.toLowerCase())
    );
    return statuses.map((status, index) => ({
      ...status,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  // Shared layout wrapper
  const Layout = ({ children }) => (
    <div className="flex min-h-screen bg-[#021d2d] text-white">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed left-0 top-0 h-screen z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>
      <div className={`flex-1 min-h-screen transition-all duration-300 ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}`}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-white font-semibold">Order Detail</span>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto hide-scrollbar">{children}</div>
      </div>
    </div>
  );

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <svg className="animate-spin w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-gray-400">Loading order details...</p>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <button onClick={() => navigate("/orders")} className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition">
        <FaArrowLeft /> Back to Orders
      </button>
      <div className="bg-red-900/40 border border-red-700 rounded-xl p-4 text-red-300 mb-4">{error}</div>
      <button onClick={fetchOrderDetail} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition">
        Try Again
      </button>
    </Layout>
  );

  return (
    <Layout>
      {/* Back Button */}
      <button
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-5 transition text-sm sm:text-base"
      >
        <FaArrowLeft /> Back to Orders
      </button>

      {/* Success Message */}
      {updateMessage && (
        <div className="bg-green-900/40 border border-green-700 rounded-xl p-3 text-green-300 mb-5 text-sm">
          {updateMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* ===== LEFT COLUMN ===== */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* Order Header */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white break-all">
                  {order?.orderId}
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Placed on{" "}
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
              <span className={`self-start px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm whitespace-nowrap ${statusColors[order?.orderStatus] || "bg-gray-100 text-gray-800"}`}>
                {capitalize(order?.orderStatus)}
              </span>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-xl font-bold text-white mb-5">Order Timeline</h2>
            <div className="flex justify-between items-start gap-1">
              {getStatusTimeline().map((status, index) => {
                const Icon = status.icon;
                const timeline = getStatusTimeline();
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    {/* Circle */}
                    <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 transition-colors ${
                      status.completed ? `bg-${status.color}-500` : "bg-gray-600"
                    }`}>
                      <Icon className="text-white text-sm sm:text-lg" />
                    </div>
                    <p className={`text-[10px] sm:text-sm font-medium text-center ${status.completed ? "text-white" : "text-gray-500"}`}>
                      {status.label}
                    </p>
                    {/* Connector line */}
                    {index < timeline.length - 1 && (
                      <div className={`absolute hidden`} />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Horizontal connector */}
            <div className="flex items-center mt-2 px-4 sm:px-7 gap-0">
              {getStatusTimeline().map((status, index) => (
                index < getStatusTimeline().length - 1 && (
                  <div key={index} className={`flex-1 h-0.5 ${getStatusTimeline()[index + 1].completed ? "bg-green-500" : "bg-gray-600"}`} />
                )
              ))}
            </div>
          </div>

          {/* Update Status */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4">Update Status</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusUpdate(status)}
                  disabled={updating}
                  className={`px-3 py-2 rounded-lg font-semibold text-xs sm:text-sm transition ${
                    order?.orderStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {capitalize(status)}
                </button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4">
              Items Ordered ({order?.items?.length || 0})
            </h2>
            <div className="space-y-4">
              {order?.items?.map((item, index) => (
                <div key={index} className="flex gap-3 sm:gap-4 pb-4 border-b border-gray-700/50 last:border-0 last:pb-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm sm:text-base truncate">{item.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                      {item.category}{item.brand && ` • ${item.brand}`}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-gray-400 text-xs sm:text-sm">Qty: {item.quantity}</p>
                      <p className="text-white font-semibold text-sm sm:text-base">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        <div className="space-y-4 sm:space-y-6">

          {/* Customer Info */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4">Customer Information</h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="text-white font-semibold text-sm sm:text-base">{order?.customer?.fullName}</p>
              </div>
              <div className="flex items-start gap-2">
                <FaEnvelope className="text-blue-400 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-xs">Email</p>
                  <a href={`mailto:${order?.customer?.email}`} className="text-blue-400 hover:text-blue-300 text-sm break-all">
                    {order?.customer?.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaPhone className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <a href={`tel:${order?.customer?.phone}`} className="text-green-400 hover:text-green-300 text-sm">
                    {order?.customer?.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> Delivery Address
            </h2>
            <div className="space-y-1 text-gray-300 text-sm">
              <p className="font-semibold text-white">{order?.address?.fullAddress}</p>
              <p>{order?.address?.city}</p>
              <p>{order?.address?.state} - {order?.address?.pincode}</p>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4">Price Summary</h2>
            <div className="space-y-3">
              {[
                { label: "Subtotal", value: `₹${order?.pricing?.subtotal?.toLocaleString("en-IN")}` },
                { label: "Shipping", value: order?.pricing?.shipping === 0 ? "FREE" : `₹${order?.pricing?.shipping?.toLocaleString("en-IN")}` },
                { label: "Tax (18% GST)", value: `₹${order?.pricing?.tax?.toLocaleString("en-IN")}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-gray-300 text-sm">
                  <span>{label}</span>
                  <span className="text-white font-semibold">{value}</span>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
                <span className="text-white font-bold text-sm sm:text-base">Total</span>
                <span className="text-red-400 text-xl sm:text-2xl font-bold">
                  ₹{order?.pricing?.total?.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-[#052030] rounded-xl p-4 sm:p-6 shadow-lg border border-white/5">
            <h2 className="text-base sm:text-lg font-bold text-white mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-xs">Method</p>
                <p className="text-white font-semibold text-sm sm:text-base">{order?.payment?.method?.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                  order?.payment?.status === "completed" ? "bg-green-100 text-green-800"
                  : order?.payment?.status === "pending" ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
                }`}>
                  {capitalize(order?.payment?.status)}
                </span>
              </div>
              {order?.payment?.transactionId && (
                <div>
                  <p className="text-gray-400 text-xs">Transaction ID</p>
                  <p className="text-white font-mono text-xs break-all mt-0.5">{order.payment.transactionId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;