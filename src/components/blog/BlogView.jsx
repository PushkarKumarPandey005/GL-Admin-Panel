import { useEffect, useState } from "react";
import { getBlogBySlug } from "../../api/blogApi.js";

export default function BlogView({ slug, onBack }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    if (!slug) { setLoading(false); return; }
    try {
      setLoading(true);
      setError("");
      const res = await getBlogBySlug(slug);
      const blogData = res?.blog || res?.data?.blog || res?.data || res;
      setBlog(blogData || null);
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
        <p className="text-gray-400 text-sm sm:text-base">Loading blog...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="bg-red-900/20 border border-red-600/40 rounded-xl px-6 py-5 max-w-sm w-full">
          <p className="text-red-400 text-sm sm:text-base font-medium">{error}</p>
          <div className="flex gap-2 justify-center mt-3">
            <button
              onClick={fetchBlog}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!blog) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="bg-[#031c2e] border border-[#1e4d72] rounded-xl px-6 py-8 max-w-sm w-full">
          <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-sm sm:text-base mb-3">Blog not found</p>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#011826] px-3 sm:px-6 lg:px-10 py-5 sm:py-8 text-white">
      <div className="max-w-4xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={onBack}
          className="mb-5 flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-lg text-sm font-medium transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* CARD */}
        <div className="bg-[#052030] border border-[#042848] rounded-2xl overflow-hidden shadow-2xl">

          {/* FEATURED IMAGE */}
          {blog.featuredImage && (
            <div className="w-full aspect-video sm:aspect-[21/9] overflow-hidden">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          )}

          {/* CONTENT AREA */}
          <div className="p-4 sm:p-6 lg:p-8">

            {/* STATUS + CATEGORY BADGES */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.category && (
                <span className="px-3 py-1 bg-blue-900/40 border border-blue-600/50 text-blue-300 rounded-full text-xs font-medium">
                  {blog.category}
                </span>
              )}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  blog.status === "published"
                    ? "bg-green-900/30 border-green-600/40 text-green-400"
                    : "bg-yellow-900/30 border-yellow-600/40 text-yellow-400"
                }`}
              >
                {blog.status}
              </span>
            </div>

            {/* TITLE */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug mb-3">
              {blog.title}
            </h1>

            {/* META */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-400 mb-6 pb-6 border-b border-white/10">
              {blog.author && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {blog.author}
                </span>
              )}
              {blog.author && blog.createdAt && <span className="text-gray-600">•</span>}
              {blog.createdAt && (
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </span>
              )}
              {blog.views !== undefined && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>{blog.views} views</span>
                </>
              )}
            </div>

            {/* EXCERPT */}
            {blog.excerpt && (
              <p className="text-gray-300 text-sm sm:text-base italic border-l-4 border-blue-500 pl-4 mb-6 leading-relaxed">
                {blog.excerpt}
              </p>
            )}

            {/* CONTENT */}
            <div className="text-gray-200 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>

            {/* TAGS */}
            {blog.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-900/30 border border-blue-600/50 hover:border-blue-400 text-blue-300 rounded-full text-xs transition cursor-default"
                    >
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}