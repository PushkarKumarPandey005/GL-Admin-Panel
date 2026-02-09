import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {fetchProducts,createProduct,fetchProductById,updateProduct, deleteProduct
} from "../api/api.product.js";

// All products
export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetchProducts();
      return res.data.data;
    },
  });

// Add product
export const useAddProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

// Single product by ID  (NEW)
export const useProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetchProductById(id);
      return res.data.data;
    },
    enabled: !!id, // runs only when id exists
  });

//updating products details
export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["product"] });
    },
  });
};

//Deleting products
export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["products"] });
      await qc.refetchQueries({ queryKey: ["products"] }); // 🔥 important
    },
  });
};
