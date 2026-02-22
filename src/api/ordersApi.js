import { API_BASE_URL } from "../config/config.js";
const BACKEND_URL = API_BASE_URL;

export const ordersApi = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch order");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  // Get orders by email
  getOrdersByEmail: async (email) => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/email/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: status }),
      });
      if (!response.ok) throw new Error("Failed to update order status");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Update payment status
  updatePaymentStatus: async (orderId, paymentStatus, transactionId = "") => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/payment/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          paymentStatus, 
          transactionId 
        }),
      });
      if (!response.ok) throw new Error("Failed to update payment status");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating payment status:", error);
      throw error;
    }
  },

  // Get order statistics
  getOrderStats: async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch order stats");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching order stats:", error);
      throw error;
    }
  },
};
