import { useState } from "react";
import { createBlog } from "../../api/blogApi.js";

export default function BlogForm({
mode = "create",
initialData = {},
onSuccess,
}) {
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
...initialData,
});

// 🔹 slug generator
const generateSlug = (title) =>
title
.toLowerCase()
.replace(/[^a-z0-9\s-]/g, "")
.replace(/\s+/g, "-")
.replace(/-+/g, "-");

// 🔹 input change
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

// 🔹 image upload (preview only)
const handleImageUpload = (e) => {
const file = e.target.files?.[0];
if (!file) return;


const previewUrl = URL.createObjectURL(file);

setForm((prev) => ({
  ...prev,
  featuredImage: previewUrl,
}));

};

// 🔹 add tag
const addTag = () => {
const tag = tagInput.trim();
if (!tag) return;
if (form.tags.includes(tag)) return;


setForm((prev) => ({
  ...prev,
  tags: [...prev.tags, tag],
}));

setTagInput("");


};

// 🔹 remove tag
const removeTag = (tag) => {
setForm((prev) => ({
...prev,
tags: prev.tags.filter((t) => t !== tag),
}));
};

// 🔹 submit
const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);

try {
  if (mode === "create") {
    await createBlog(form);
  } else {
    // 🔮 future updateBlog(form)
    console.log("Update mode");
  }

  alert(
    `Blog ${mode === "create" ? "created" : "updated"} successfully`
  );

  onSuccess?.();
} catch (err) {
  alert(err?.message || "Operation failed");
} finally {
  setLoading(false);
}


};

return ( <div className="w-full min-h-screen text-white px-3 sm:px-6 lg:px-10 overflow-x-hidden"> <div className="bg-[#052030] border border-[#042848] shadow-xl p-4 sm:p-6 lg:p-8 text-gray-200 rounded-xl max-w-6xl mx-auto">


    <h1 className="text-xl sm:text-2xl font-bold mb-6 text-white">
      {mode === "create" ? "Write Blog" : "Update Blog"}
    </h1>

    <form onSubmit={handleSubmit} className="space-y-6">
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
        <p className="text-xs text-gray-400 mt-1 break-all">
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

      {/* IMAGE */}
      <div>
        <label className="font-medium text-gray-300">
          Featured Image
        </label>

        {/* URL */}
        <input
          type="text"
          name="featuredImage"
          value={form.featuredImage}
          onChange={handleChange}
          placeholder="Paste image URL..."
          className="w-full mt-2 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white"
        />

        <p className="text-center text-gray-400 my-2 text-sm">OR</p>

        {/* FILE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm text-gray-300"
        />

        {/* PREVIEW */}
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

        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white"
            placeholder="Enter tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {form.tags.map((tag) => (
            <span
              key={tag}
              onClick={() => removeTag(tag)}
              className="bg-blue-900/40 border border-blue-600 px-3 py-1 rounded-full text-sm cursor-pointer"
            >
              {tag} ✕
            </span>
          ))}
        </div>
      </div>

      {/* SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <button
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold text-white transition disabled:opacity-60"
      >
        {loading
          ? "Processing..."
          : mode === "create"
          ? "Create Blog"
          : "Update Blog"}
      </button>
    </form>
  </div>
</div>


);
}

/* ---------- SMALL FIELDS ---------- */

function InputField({ label, ...props }) {
return ( <div> <label className="font-medium text-gray-300">{label}</label>
<input
{...props}
className="w-full mt-2 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white"
/> </div>
);
}

function TextAreaField({ label, ...props }) {
return ( <div> <label className="font-medium text-gray-300">{label}</label>
<textarea
{...props}
className="w-full mt-2 bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white"
/> </div>
);
}

function SelectField({ options, ...props }) {
return (
<select
{...props}
className="w-full bg-[#071a2b] border border-[#1e4d72] rounded-lg px-3 py-2 text-white"
>
{options.map((opt) => ( <option key={opt.value} value={opt.value}>
{opt.label} </option>
))} </select>
);
}
