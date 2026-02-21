import api from "./api.urlCall.js";

// ===============================
// 🚀 CREATE BLOG
// ===============================
export const createBlog = async (payload) => {
  const { data } = await api.post("/api/blogs", payload);
  return data;
};

// ===============================
// 📥 GET ALL BLOGS (admin)
// ===============================
export const getAllBlogs = async (params = {}) => {
  const { data } = await api.get("/api/blogs", { params });
  return data;
};

// ===============================
// 🔍 GET BLOG BY ID
// ===============================
export const getBlogById = async (id) => {
  const { data } = await api.get(`/api/blogs/${id}`);
  return data;
};

// ===============================
// ✏️ UPDATE BLOG
// ===============================
export const updateBlog = async ({ id, payload }) => {
  const { data } = await api.put(`/api/blogs/${id}`, payload);
  return data;
};

// ===============================
// 🗑 DELETE BLOG
// ===============================
export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/api/blogs/${id}`);
  return data;
};