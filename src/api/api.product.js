import api from "../api/api.urlCall.js";


export const fetchProducts = () => api.get("/products");


//creating new product in DB
export const createProduct = (data) => api.post("/products", data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

//fetiching all details of product by their ID
export const fetchProductById = (id) => api.get(`/products/${id}`);


//Update product details
export const updateProduct = (id, data) => api.put(`/products/${id}`, data, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});


//Delete product
export const deleteProduct = (id) => api.delete(`/products/${id}`);
