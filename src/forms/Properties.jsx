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

        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("area", form.area);
        formData.append("parking", form.parking);
        formData.append("furnished", form.furnished);
        formData.append("location", form.location);
        formData.append("price", Number(form.price));
        formData.append("ownerContact", form.ownerContact);
        formData.append("priceNegotiable", form.priceNegotiable);
        formData.append("type", "property");

        // images inserting
        for (let i = 0; i < form.images.length; i++) {
            formData.append("images", form.images[i]);
        }




        mutate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-10">
            <div className="bg-white/2 mt-10 ml-10 rounded-xl w-200 h-300">

                <label className="text-white ml-10 block mt-5 text-2xl">Property Title</label>
                <input name="title" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Description</label>
                <textarea name="description" onChange={handleChange}
                    className="w-150 h-40 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Area</label>
                <input name="area" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Parking</label>
                <input name="parking" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Furnished</label>
                <input name="furnished" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Location</label>
                <input name="location" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Price</label>
                <input name="price" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Owner Contact</label>
                <input name="ownerContact" onChange={handleChange}
                    className="w-100 h-13 mt-3 rounded bg-white/5 text-white ml-9 p-2" />

                <label className="text-white ml-10 block mt-5 text-2xl">Price Negotiable</label>
                <input name="priceNegotiable" type="checkbox" onChange={(e) =>
                    setForm({ ...form, priceNegotiable: e.target.checked })
                }
                    className="w-10 h-13 ml-13  mt-3 rounded-xl " />
            </div>


            <div className="w-160 mt-10 rounded-xl bg-white/2 h-400">

                <label className="text-white ml-10 block mt-5 text-2xl">Property Images</label>
                <input type="file" multiple onChange={handleImages}
                    className="w-140 mt-3 ml-9" />

                {form.images.length > 0 && (
                    <p className="text-white ml-9 mt-2">
                        {form.images.length} image(s) selected
                    </p>
                )}



                <button type="submit"
                    className="text-white mt-20 ml-50 px-20 border py-4 text-2xl rounded-xl">
                    {isPending ? "Saving..." : "Save"}
                </button>
            </div>
        </form>
    );
};

export default Properties;
