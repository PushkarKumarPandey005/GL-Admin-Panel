import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";

export default function CreateBlog() {
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    category: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    language: "en",
    status: "published",
    author: "GL Technology Team",
  });

  // slug generator
  const generateSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !prev.slug
        ? { slug: generateSlug(value) }
        : {}),
    }));
  };

  // add tag
  const addTag = () => {
    if (!tagInput.trim()) return;
    if (form.tags.includes(tagInput.trim())) return;

    setForm((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));
    setTagInput("");
  };

  // remove tag
  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/blogs`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("✅ Blog created successfully");

      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        category: "",
        tags: [],
        metaTitle: "",
        metaDescription: "",
        language: "en",
        status: "published",
        author: "GL Technology Team",
      });
    } catch (err) {
      alert(err.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="flex">
        <div className="fixed left-0 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
          <VerticalNavbar />
        </div>
    <div className="max-w-8xl ml-65 pt-00 w-full min-h-screen  text-white">
      {/* DARK CARD */}
      <div className="bg-[#052030] border border-[#042848]  shadow-xl p-8 text-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-white">
           Write Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 ml-20 mr-20">
          {/* TITLE */}
          <InputField
            label="Blog Title *"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          {/* SLUG */}
          <div>
            <InputField
              label="Slug"
              name="slug"
              value={form.slug}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-400 mt-1">
              URL: /blog/{form.slug || "your-slug"}
            </p>
          </div>

          {/* EXCERPT */}
          <TextAreaField
            label="Excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
          />

          {/* CONTENT */}
          <TextAreaField
            label="Content *"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            required
          />

          {/* FEATURED IMAGE */}
          <div>
            <InputField
              label="Featured Image URL"
              name="featuredImage"
              value={form.featuredImage}
              onChange={handleChange}
            />

            {form.featuredImage && (
              <img
                src={form.featuredImage}
                alt="preview"
                className="mt-3 h-32 rounded-lg object-cover border border-[#1e4d72]"
              />
            )}
          </div>

          {/* CATEGORY */}
          <InputField
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />

          {/* TAGS */}
          <div>
            <label className="font-medium text-gray-300">Tags</label>

            <div className="flex gap-2 mt-2">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter tag"
              />
              <button
                type="button"
                onClick={addTag}
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg font-medium"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => removeTag(tag)}
                  className="bg-blue-900/40 border border-blue-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-800 transition"
                >
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label={`Meta Title (${form.metaTitle.length}/60)`}
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
            />

            <TextAreaField
              label={`Meta Description (${form.metaDescription.length}/160)`}
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* LANGUAGE + STATUS */}
          <div className="grid md:grid-cols-2 gap-4">
            <SelectField
              name="language"
              value={form.language}
              onChange={handleChange}
              options={[
                { label: "English", value: "en" },
                { label: "Hindi", value: "hi" },
              ]}
            />

            <SelectField
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                { label: "Published", value: "published" },
                { label: "Draft", value: "draft" },
              ]}
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold text-white transition disabled:opacity-60"
          >
            {loading ? "Creating..." : " Create Blog"}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

/* ---------- SMALL REUSABLE FIELDS ---------- */

function InputField({ label, ...props }) {
  return (
    <div>
      <label className="font-medium text-gray-300">{label}</label>
      <input
        {...props}
        className="w-full mt-2 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function TextAreaField({ label, ...props }) {
  return (
    <div>
      <label className="font-medium text-gray-300">{label}</label>
      <textarea
        {...props}
        className="w-full mt-2 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

function SelectField({ options, ...props }) {
  return (
    <select
      {...props}
      className="w-full bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}