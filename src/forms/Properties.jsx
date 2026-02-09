import { useState } from "react";
import { useAddProduct } from "../hooks/useProduct.js";

const Properties = () => {
  const { mutate, isPending } = useAddProduct();

  const [form, setForm] = useState({
    title: "",
    description: "",
    area: "",
    parking: "",
    furnished: "",
    location: "",
    price: "",
    ownerContact: "",
    priceNegotiable: "",
    images: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImages = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (k !== "images") formData.append(k, v);
    });

    formData.append("type", "property");
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }

    mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-6">
      {/* LEFT */}
      <div className="bg-white/2 mt-6 ml-6 rounded-xl w-150 h-220">

        {[
          ["title", "Property Title"],
          ["description", "Description", "textarea"],
          ["area", "Area"],
          ["parking", "Parking"],
          ["furnished", "Furnished"],
          ["location", "Location"],
          ["price", "Price"],
          ["ownerContact", "Owner Contact"],
        ].map(([name, label, type]) => (
          <div key={name}>
            <label className="text-white ml-6 block mt-4 text-lg">
              {label}
            </label>

            {type === "textarea" ? (
              <textarea
                name={name}
                onChange={handleChange}
                className="w-110 h-24 mt-2 rounded bg-white/5 text-white ml-6 p-2"
              />
            ) : (
              <input
                name={name}
                onChange={handleChange}
                className="w-90 h-10 mt-2 rounded bg-white/5 text-white ml-6 p-2"
              />
            )}
          </div>
        ))}

        <label className="text-white ml-6 block mt-4 text-lg">
          Price Negotiable
        </label>
        <input
          type="checkbox"
          onChange={(e) =>
            setForm({ ...form, priceNegotiable: e.target.checked })
          }
          className="ml-6 mt-2 w-5 h-5"
        />
      </div>

      {/* RIGHT */}
      <div className="w-130 mt-6 rounded-xl bg-white/2 h-260">

        <label className="text-white ml-6 block mt-4 text-lg">
          Property Images
        </label>
        <input
          type="file"
          multiple
          onChange={handleImages}
          className="w-110 mt-2 ml-6"
        />

        {form.images.length > 0 && (
          <p className="text-white ml-6 mt-2 text-sm">
            {form.images.length} image(s) selected
          </p>
        )}

        <button
          type="submit"
          className="text-white mt-10 ml-30 px-12 border py-2 text-lg rounded-xl"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default Properties;
