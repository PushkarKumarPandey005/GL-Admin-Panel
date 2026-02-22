import { useEffect, useState } from "react";
import BlogForm from "./BlogForm.jsx";
import { getBlogById } from "../../api/blogApi.js";
import BlogUpdate from "../components/blog/BlogUpdate.jsx";

export default function BlogUpdate({ id, onSuccess }) {
const [loading, setLoading] = useState(true);
const [blogData, setBlogData] = useState(null);
const [error, setError] = useState("");

// 🔹 fetch blog by id
const fetchBlog = async () => {
if (!id) return;


try {
  setLoading(true);
  setError("");

  const res = await getBlogById(id);

  // backend response flexible handling
  setBlogData(res?.blog || res);
} catch (err) {
  console.error(err);
  setError("Failed to load blog");
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchBlog();
}, [id]);

// 🔹 loading state
if (loading) {
return ( <div className="w-full py-20 text-center text-gray-400">
Loading blog data... </div>
);
}

// 🔹 error state
if (error) {
return ( <div className="w-full py-20 text-center text-red-400">
{error} </div>
);
}

// 🔹 no data
if (!blogData) {
return ( <div className="w-full py-20 text-center text-gray-400">
Blog not found </div>
);
}

// 🔹 render form in edit mode
{view === "edit" && (
  <BlogUpdate
    id={selectedId}
    onSuccess={() => setView("list")}
  />
)}

}
