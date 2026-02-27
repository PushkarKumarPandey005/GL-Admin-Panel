import { useEffect, useState } from "react";
import { getBlogBySlug } from "../../api/blogApi.js";

export default function BlogView({ slug, onBack }) {
  console.log("BlogView received slug:", slug);

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  // 🔹 fetch blog
  const fetchBlog = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getBlogBySlug(slug);

      // handle multiple backend shapes safely
      const blogData =
        res?.blog ||
        res?.data?.blog ||
        res?.data ||
        res;

      setBlog(blogData || null);
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

  // 🔹 loading
  if (loading) {
    return (
      <div className="w-full py-20 text-center text-gray-400">
        Loading blog...
      </div>
    );
  }

  // 🔹 error
  if (error) {
    return (
      <div className="w-full py-20 text-center text-red-400">
        {error}
      </div>
    );
  }

  // 🔹 no data
  if (!blog) {
    return (
      <div className="w-full py-20 text-center text-gray-400">
        Blog not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-white px-3 sm:px-6">
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm"
      >
        ← Back
      </button>

      {/* CARD */}
      <div className="bg-[#052030] border border-[#042848] rounded-xl p-4 sm:p-6 lg:p-8">
        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {blog.title}
        </h1>

        {/* META */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-6">
          <span>{blog.category || "—"}</span>
          <span>•</span>
          <span className="capitalize">{blog.status}</span>
          <span>•</span>
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-IN")
              : "—"}
          </span>
        </div>

        {/* IMAGE */}
        {blog.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full max-h-96 object-cover rounded-lg mb-6"
          />
        )}

        {/* EXCERPT */}
        {blog.excerpt && (
          <p className="text-gray-300 mb-6 italic">
            {blog.excerpt}
          </p>
        )}

        {/* CONTENT */}
        <div className="prose prose-invert max-w-none">
          <p className="whitespace-pre-line text-gray-200">
            {blog.content}
          </p>
        </div>

        {/* TAGS */}
        {blog.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-900/40 border border-blue-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}