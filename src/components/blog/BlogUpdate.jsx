import { useEffect, useState } from "react";
import BlogForm from "./BlogForm.jsx";
import { getBlogBySlug } from "../../api/blogApi.js";

export default function BlogUpdate({ slug, onSuccess }) {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    if (!slug) { setLoading(false); return; }

    try {
      setLoading(true);
      setError("");
      const res = await getBlogBySlug(slug);
      const blog = res?.blog || res?.data?.blog || res?.data || res;
      setBlogData(blog || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlog(); }, [slug]);

  // Loading
  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4">
        <svg className="animate-spin w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="text-gray-400 text-sm sm:text-base">Loading blog data...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="bg-red-900/20 border border-red-600/40 rounded-xl px-6 py-5 max-w-sm w-full">
          <p className="text-red-400 text-sm sm:text-base font-medium">{error}</p>
          <button
            onClick={fetchBlog}
            className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not found
  if (!blogData) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="bg-[#031c2e] border border-[#1e4d72] rounded-xl px-6 py-8 max-w-sm w-full">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-sm sm:text-base">Blog not found</p>
        </div>
      </div>
    );
  }

  return (
    <BlogForm
      mode="edit"
      initialData={blogData}
      onSuccess={onSuccess}
    />
  );
}