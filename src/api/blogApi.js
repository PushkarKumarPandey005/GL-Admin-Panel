import api from "./api.urlCall.js";

// ===============================
//  CREATE BLOG
// ===============================
export const createBlog = async (payload) => {
  const { data } = await api.post("/blogs", payload);
  return data;
};

// ===============================
//  GET ALL BLOGS (admin)
// ===============================
export const getAllBlogs = async (params = {}) => {
  const { data } = await api.get("/blogs", { params });
  return data;
};

// ===============================
//  GET BLOG BY SLUG   FIXED
// ===============================
export const getBlogBySlug = async (slug) => {
  const { data } = await api.get(`/blogs/${slug}`);
  return data;
};

// ===============================
//  UPDATE BLOG
// ===============================
export const updateBlog = async ({ id, payload }) => {
  const { data } = await api.put(`/blogs/${id}`, payload);
  return data;
};

// ===============================
//  DELETE BLOG
// ===============================
export const deleteBlog = async (id) => {
  const { data } = await api.delete(`/blogs/${id}`);
  return data;
};