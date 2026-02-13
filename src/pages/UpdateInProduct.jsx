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

  useEffect(() => {
    if (product) {
      setForm(product);
      setImages(product.productImg || []);
    }
  }, [product]);

  if (isLoading) return <p className="text-white p-6">Loading...</p>;

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
      if (!["_id", "__v", "productImg", "createdAt", "updatedAt"].includes(key)) {
        formData.append(key, value);
      }
    });

    images.forEach((img) => {
      formData.append("existingImages", img);
    });

    newImages.forEach((file) => {
      formData.append("newImages", file);
    });

    updateProduct({ id, data: formData });
    alert("Product Updated Successfully!");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen">
        <VerticalNavbar />
      </div>

      {/* Main Content */}
      <div className="bg-[#012032] ml-72 w-full min-h-screen p-6 text-white">
        <h1 className="text-2xl mb-6">Update Product</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

          {/* Existing Images */}
          <div className="col-span-2">
            <label className="text-lg">Existing Images</label>
            <div className="flex gap-3 mt-3 flex-wrap">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="w-24 h-24 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(img)}
                    className="absolute top-0 right-0 bg-red-600 px-2 rounded text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Images */}
          <div className="col-span-2 mt-4">
            <label className="text-lg">Add New Images</label>
            <input
              type="file"
              multiple
              onChange={handleNewImages}
              className="mt-2"
            />

            <div className="flex gap-3 mt-3 flex-wrap">
              {newImages.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Text Fields */}
          {Object.entries(form).map(([key, value]) => {
            if (
              ["_id", "__v", "productImg", "createdAt", "updatedAt"].includes(key)
            )
              return null;

            return (
              <div key={key} className="flex flex-col">
                <label className="mb-1 capitalize text-sm">{key}</label>
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="p-2 rounded bg-white/10 outline-none text-sm"
                />
              </div>
            );
          })}

          <button
            type="submit"
            className="col-span-2 mt-6 bg-green-600 p-3 rounded text-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInProduct;
