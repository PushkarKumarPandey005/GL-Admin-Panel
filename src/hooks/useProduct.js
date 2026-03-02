import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct, fetchProductById, updateProduct, deleteProduct,
            } from "../api/api.product.js";

// All products
export const useProducts = (page = 1, limit = 10) =>
  useQuery({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await fetchProducts(page, limit);
      return res.data;
    },
    placeholderData: (previousData) => previousData, // ✅ TanStack v5 way (replaces keepPreviousData)
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

// Add product
export const useAddProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

// Single product by ID
export const useProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetchProductById(id);
      return res.data.data;
    },
    enabled: !!id,
  });

// Update product
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

// Delete product
export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      // ✅ Just invalidate — no need to also manually refetch, invalidate triggers it
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
};