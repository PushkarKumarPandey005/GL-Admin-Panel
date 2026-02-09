import { useState, useEffect } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Stationaries = () => {
  const { mutate, isPending } = useAddProduct();

  const [preview, setPreview] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    size: "",
    material: "",
    weight: "",
    color: "",
    brand: "",
    images: [],
  });

  // ✅ Input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ File change + preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setForm((prev) => ({ ...prev, images: files }));

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  // ✅ IMPORTANT: cleanup blob URLs (fix console error + memory leak)
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", Number(form.price));
    formData.append("discountPrice", Number(form.discountPrice));
    formData.append("stock", Number(form.stock));
    formData.append("size", form.size);
    formData.append("material", form.material);
    formData.append("weight", form.weight);
    formData.append("color", form.color);
    formData.append("brand", form.brand);
    formData.append("type", "stationery");

    form.images.forEach((img) => {
      formData.append("images", img);
    });

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-10">
      {/* LEFT SIDE */}
      <div className="bg-white/2 mt-10 ml-10 rounded-xl w-200 h-300">

        {[
          ["title", "Product Title", "text"],
          ["description", "Description", "textarea"],
          ["price", "Price", "number"],
          ["discountPrice", "Discount Price", "number"],
          ["stock", "Stock", "number"],
          ["size", "Size", "text"],
          ["material", "Material", "text"],
          ["weight", "Weight", "text"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label className="text-white ml-10 block mt-5 text-2xl">
              {label}
            </label>

            {type === "textarea" ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-150 h-40 mt-3 rounded bg-white/5 text-white ml-9 p-2"
              />
            ) : (
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="w-160 mt-10 rounded-xl bg-white/2 h-400">
        <label className="text-white ml-10 block mt-5 text-2xl">
          Product Images
        </label>

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-140 mt-3 ml-9"
        />

        {/* Preview */}
        {preview.length > 0 && (
          <div className="flex gap-3 ml-9 mt-3 flex-wrap">
            {preview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="preview"
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <label className="text-white ml-10 block mt-10 text-2xl">
          Color
        </label>
        <input
          name="color"
          value={form.color}
          onChange={handleChange}
          className="w-70 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2"
        />

        <label className="text-white ml-10 block mt-5 text-2xl">
          Brand
        </label>
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-70 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2"
        />

        <button
          type="submit"
          className="text-white mt-20 ml-50 px-20 border py-4 text-2xl rounded-xl"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Stationaries;
