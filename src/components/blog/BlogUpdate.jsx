import { useEffect, useState } from "react";
import BlogForm from "./BlogForm.jsx";
import { getBlogBySlug } from "../../api/blogApi.js";

export default function BlogUpdate({ slug, onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState("");

  // 🔹 fetch blog by slug
  const fetchBlog = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getBlogBySlug(slug);

      const blog =
        res?.blog ||
        res?.data?.blog ||
        res?.data ||
        res;

      setBlogData(blog || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  // 🔹 loading state
  if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-400">
        Loading blog data...
      </div>
    );
  }

  // 🔹 error state
  if (error) {
    return (
      <div className="w-full py-20 text-center text-red-400">
        {error}
      </div>
    );
  }

  // 🔹 no data
  if (!blogData) {
    return (
      <div className="w-full py-20 text-center text-gray-400">
        Blog not found
      </div>
    );
  }

  // 🔹 render edit form (FINAL RETURN ✅)
  return (
    <BlogForm
      mode="edit"
      initialData={blogData}
      onSuccess={onSuccess}
    />
  );
}