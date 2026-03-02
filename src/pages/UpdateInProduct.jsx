import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProduct, useUpdateProduct } from "../hooks/useProduct";

const UpdateInProduct = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(id);
  const { mutate: updateProduct } = useUpdateProduct();

  const [form, setForm] = useState({});
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setForm(product);
      setImages(product.productImg || []);
    }
  }, [product]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#012032]">
        <p className="text-white text-lg animate-pulse">Loading...</p>
      </div>
    );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const removeImage = (img) => {
    setImages(images.filter((i) => i !== img));
  };

  const handleNewImages = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (["_id", "__v", "productImg", "createdAt", "updatedAt"].includes(key)) return;
      if (typeof value === "object" && value !== null) return;
      formData.append(key, value ?? "");
    });

    images.forEach((img) => formData.append("existingImages", img));
    newImages.forEach((file) => formData.append("newImages", file));

    updateProduct(
      { id, data: formData },
      {
        onSuccess: () => alert("Product Updated Successfully!"),
        onError: (err) => alert("Update failed: " + err.message),
      }
    );
  };

  const SKIP_FIELDS = ["_id", "__v", "productImg", "createdAt", "updatedAt"];

  return (
    <div className="flex min-h-screen bg-[#012032]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen z-30 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Update Product</h1>
        </div>

        {/* Form Area */}
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="hidden lg:block text-2xl font-bold text-white mb-6">Update Product</h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Existing Images */}
            <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
              <label className="text-base sm:text-lg font-medium text-white block mb-3">
                Existing Images
              </label>
              {images.length === 0 ? (
                <p className="text-gray-400 text-sm">No existing images.</p>
              ) : (
                <div className="flex gap-3 flex-wrap">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={img}
                        alt={`product-${i}`}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center transition shadow"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* New Images */}
            <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
              <label className="text-base sm:text-lg font-medium text-white block mb-3">
                Add New Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleNewImages}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer file:text-sm hover:file:bg-blue-700 transition"
              />
              {newImages.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {newImages.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`new-${i}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-white/20"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Text Fields */}
            <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
              <h2 className="text-base sm:text-lg font-medium text-white mb-4">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(form).map(([key, value]) => {
                  if (SKIP_FIELDS.includes(key)) return null;
                  if (typeof value === "object" && value !== null) return null;

                  return (
                    <div key={key} className="flex flex-col">
                      <label className="mb-1.5 capitalize text-xs sm:text-sm text-gray-400 font-medium">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </label>
                      <input
                        type="text"
                        name={key}
                        value={value ?? ""}
                        onChange={handleChange}
                        className="p-2.5 rounded-lg bg-white/10 border border-white/10 focus:border-blue-400 focus:outline-none text-white text-sm transition placeholder-gray-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 sm:py-4 rounded-xl text-base sm:text-lg transition duration-200 shadow-lg"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInProduct;