import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { ordersApi } from "../api/ordersApi";
import {
  FaArrowLeft,
  FaBox,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
 
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";
// FaCalendarAlt,
 // FaIndianRupee,
const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

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
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusTimeline = () => {
    const statuses = [
      { label: "Pending", icon: FaBox, color: "yellow" },
      { label: "Processing", icon: FaCheckCircle, color: "blue" },
      { label: "Shipped", icon: FaTruck, color: "purple" },
      { label: "Delivered", icon: FaCheckCircle, color: "green" },
    ];

    const currentIndex =
      statuses.findIndex(
        (s) => s.label.toLowerCase() === order?.orderStatus?.toLowerCase()
      ) || 0;

    return statuses.map((status, index) => ({
      ...status,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#021d2d]">
        <div className="w-85 shrink-0">
          <VerticalNavbar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#021d2d]">
        <div className="w-85 shrink-0">
          <VerticalNavbar />
        </div>
        <div className="flex-1 p-6">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
          >
            <FaArrowLeft /> Back to Orders
          </button>
          <div className="bg-red-900 border border-red-700 rounded-lg p-4 text-red-200">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#021d2d]">
      {/* Sidebar */}
      <div className="w-85 shrink-0">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition"
        >
          <FaArrowLeft /> Back to Orders
        </button>

        {/* Update Message */}
        {updateMessage && (
          <div className="bg-green-900 border border-green-700 rounded-lg p-4 text-green-200 mb-6">
            {updateMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Info & Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {order?.orderId}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    Placed on{" "}
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold text-sm ${
                    order?.orderStatus === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order?.orderStatus === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : order?.orderStatus === "shipped"
                      ? "bg-purple-100 text-purple-800"
                      : order?.orderStatus === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order?.orderStatus?.charAt(0).toUpperCase() +
                    order?.orderStatus?.slice(1)}
                </span>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-6">
                Order Timeline
              </h2>
              <div className="flex justify-between">
                {getStatusTimeline().map((status, index) => {
                  const Icon = status.icon;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          status.completed
                            ? `bg-${status.color}-500`
                            : "bg-gray-600"
                        }`}
                      >
                        <Icon className="text-white text-lg" />
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          status.completed ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {status.label}
                      </p>
                      {index < getStatusTimeline().length - 1 && (
                        <div
                          className={`w-1 h-4 ${
                            getStatusTimeline()[index + 1].completed
                              ? "bg-green-500"
                              : "bg-gray-600"
                          } mt-2`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Update Status */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Update Status
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  "pending",
                  "processing",
                  "shipped",
                  "delivered",
                  "cancelled",
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updating}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      order?.orderStatus === status
                        ? `bg-blue-600 text-white`
                        : `bg-gray-700 text-gray-300 hover:bg-gray-600`
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Items Ordered ({order?.items?.length || 0})
              </h2>
              <div className="space-y-4">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 pb-4 border-b border-gray-700 last:border-0"
                  >
                    <div className="w-20 h-20 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {item.category}
                        {item.brand && ` • ${item.brand}`}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-400">Qty: {item.quantity}</p>
                        <p className="text-white font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Customer & Pricing */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-white font-semibold">
                    {order?.customer?.fullName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a
                      href={`mailto:${order?.customer?.email}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {order?.customer?.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaPhone className="text-green-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a
                      href={`tel:${order?.customer?.phone}`}
                      className="text-green-400 hover:text-green-300"
                    >
                      {order?.customer?.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FaMapMarkerAlt /> Delivery Address
              </h2>
              <div className="space-y-2 text-gray-300">
                <p className="font-semibold text-white">
                  {order?.address?.fullAddress}
                </p>
                <p>{order?.address?.city}</p>
                <p>
                  {order?.address?.state} - {order?.address?.pincode}
                </p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Price Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">
                    ₹
                    {order?.pricing?.subtotal?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-white font-semibold">
                    {order?.pricing?.shipping === 0
                      ? "FREE"
                      : `₹${order?.pricing?.shipping?.toLocaleString("en-IN")}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax (18% GST)</span>
                  <span className="text-white font-semibold">
                    ₹{order?.pricing?.tax?.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-3 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-red-500 text-2xl font-bold">
                    ₹{order?.pricing?.total?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-[#052030] rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-bold text-white mb-4">
                Payment Information
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-gray-400 text-sm">Method</p>
                  <p className="text-white font-semibold">
                    {order?.payment?.method?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      order?.payment?.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order?.payment?.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order?.payment?.status?.charAt(0).toUpperCase() +
                      order?.payment?.status?.slice(1)}
                  </span>
                </div>
                {order?.payment?.transactionId && (
                  <div>
                    <p className="text-gray-400 text-sm">Transaction ID</p>
                    <p className="text-white font-mono text-xs break-all">
                      {order.payment.transactionId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
