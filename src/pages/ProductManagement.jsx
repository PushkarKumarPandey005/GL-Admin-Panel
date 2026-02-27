import React, { useState, useMemo, useCallback, useEffect } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProducts, useDeleteProduct } from "../hooks/useProduct.js";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

const ProductManagement = () => {
  const navigate = useNavigate();
  const { mutate: deleteProduct } = useDeleteProduct();

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isFetching } = useProducts(page, limit);

  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [openActions, setOpenActions] = useState(false);


  // ⭐ reset selection when page changes
useEffect(() => {
  setRowSelection({});
}, [page]);
  // ✅ UI lock when loading - prevent clicking while fetching
  const isPaginationLoading = isLoading || (isFetching && !data);

  // ✅ safe defaults
  const products = data?.data ?? [];
  const totalPages = data?.totalPages ?? 1;
  const totalProducts = data?.totalProducts ?? 0;

  // ✅ filtering
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];

    const lowerSearch = search.toLowerCase();

    return products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const matchesSearch = title.includes(lowerSearch);
      const matchesType = typeFilter ? p.type === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [products, search, typeFilter]);

  // ✅ counts (page based)
  const counts = useMemo(() => {
    return {
      stationery: products.filter((p) => p.type === "stationery").length,
      property: products.filter((p) => p.type === "property").length,
      machinery: products.filter((p) => p.type === "machinery").length,
    };
  }, [products]);

// ✅ ProductImage component
const ProductImage = React.memo(({ url }) => {
  if (!url) return null;

  const thumb = url.includes("/upload/")
    ? url.replace("/upload/", "/upload/w_60,h_60,c_fill,q_auto,f_auto/")
    : url;

  return (
    <img
      src={thumb}
      alt="product"
      loading="lazy"
      decoding="async"
      className="w-12 h-12 object-cover rounded"
    />
  );
});

// ✅ columns
const columns = useMemo(
  () => [
    columnHelper.display({
      id: "select",
      header: "Select",
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    columnHelper.accessor("title", { header: "Title" }),
    columnHelper.accessor("price", { header: "Price" }),
    columnHelper.accessor("stock", { header: "Stock" }),
    columnHelper.accessor("type", { header: "Type" }),
    columnHelper.accessor("brand", { header: "Brand" }),
  ],
  []
);
console.count("ProductManagement render");
const tableData = useMemo(() => filteredProducts, [filteredProducts]);

const table = useReactTable({
  data: tableData,
  columns,
  state: { rowSelection },
  onRowSelectionChange: setRowSelection,
  enableRowSelection: true,
  getCoreRowModel: getCoreRowModel(),
  getRowId: (row) => row._id, // ⭐⭐⭐ MUST ADD THIS
});

const selectedProduct =
  table.getSelectedRowModel().rows[0]?.original;

// ✅ pagination handlers - BLOCKED while loading to prevent race conditions
const handlePrev = useCallback(() => {
  if (isPaginationLoading || page === 1) return;
  setPage((p) => Math.max(1, p - 1));
}, [isPaginationLoading, page]);

const handleNext = useCallback(() => {
  if (isPaginationLoading || page >= totalPages) return;
  
  setPage((p) => {
    const tp = Number(totalPages);
    if (!Number.isFinite(tp) || tp <= 0) {
      console.warn("handleNext: totalPages invalid", { totalPages, currentPage: p });
      return p + 1;
    }
    const next = Math.min(tp, p + 1);
    if (!Number.isFinite(next) || Number.isNaN(next)) {
      console.error("handleNext invalid page", { next, totalPages, p });
      return p;
    }
    return next;
  });
}, [isPaginationLoading, page, totalPages]);

// ✅ filter handler (IMPORTANT)
const handleTypeFilter = useCallback((val) => {
  setTypeFilter(val);
  setPage(1);
}, []);

const isInitialLoading = isLoading && !data;

return (
  <div className="flex">
    {/* ✅ Navbar */}

    {/* ✅ Main */}
    <div className="relative z-10 bg-[#012032] ml-64 w-full min-h-screen p-6 text-white">
      {isInitialLoading && <p className="text-white p-10">Loading...</p>}
      {/* Filters */}
      <div className="flex gap-4 mb-12 ml-4 flex-wrap">
        {/* Search */}
        <div className="bg-[#012032] flex items-center opacity-75 px-2 py-1 rounded shadow-lg">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-80 outline-none rounded px-3 ml-2 text-sm text-black"
          />
        </div>

        {/* Filter buttons */}
        {[
          { label: "Total Products", val: "", count: totalProducts },
          { label: "Stationery", val: "stationery", count: counts.stationery },
          { label: "Properties", val: "property", count: counts.property },
          { label: "Machinery", val: "machinery", count: counts.machinery },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleTypeFilter(btn.val)}
            className="bg-[#012032] cursor-pointer text-white text-sm px-5 py-1 opacity-75 rounded shadow-lg hover:opacity-100"
          >
            {btn.label}
            <br />
            <span className="font-bold">{btn.count}</span>
          </button>
        ))}




        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setOpenActions((s) => !s)}
            className="bg-[#012032] text-white text-sm px-4 py-2 cursor-pointer rounded shadow-lg"
          >
            Actions ▾
          </button>

          {openActions && (
            <div className="absolute mt-2 w-40 bg-[#012032] rounded-xl shadow-lg z-50">
              <button
                onClick={() => {
                  if (!selectedProduct) return alert("Select a row first");
                  navigate(`/product/view/${selectedProduct._id}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                View
              </button>

              <button
                onClick={() => {
                  if (!selectedProduct) return alert("Select a row first");
                  navigate(`/product/update/${selectedProduct._id}`);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                Update
              </button>

              <button
                onClick={() => {
                  if (!selectedProduct) return alert("Select a row first");
                  if (window.confirm("Delete this product?")) {
                    deleteProduct(selectedProduct._id);
                  }
                }}
                className="block w-full text-left px-4 py-2 hover:bg-white/10 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>


      {/* ================= TABLE ================= */}
      <div className="mt-6 pl-4 relative">
        {/* Loading overlay */}
        {isFetching && (
          <div className="absolute inset-0 bg-black/30 rounded flex items-center justify-center z-20 pointer-events-none">
            <div className="text-white text-center">
              <p className="animate-pulse text-lg font-semibold">Loading products...</p>
            </div>
          </div>
        )}

        {/* Header */}
        <table className="w-full" style={{ tableLayout: "fixed" }}>
          <thead className="bg-[#012032] shadow-md">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 h-12 text-sm opacity-60"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        </table>

        {/* Rows */}
        <div className="max-h-130 overflow-y-auto" style={{ opacity: isFetching ? 0.6 : 1 }}>
          <table
            className="w-full border-separate border-spacing-y-2"
            style={{ tableLayout: "fixed" }}
          >
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td className="p-4 text-center opacity-60">
                    No products found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-white/6">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-2 pl-10 opacity-75 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8 pb-6">
        <button
          disabled={page === 1 || isPaginationLoading}
          onClick={handlePrev}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
          title={isPaginationLoading ? "Loading..." : "Previous page"}
        >
          {isPaginationLoading && page > 1 ? "⏳ Loading" : "Prev"}
        </button>

        <span className="text-sm">
          Page {page} of {totalPages} {isFetching && <span className="ml-2 animate-pulse">⟳</span>}
        </span>

        <button
          disabled={page === totalPages || isPaginationLoading}
          onClick={handleNext}
          className="px-4 py-2 bg-white/10 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
          title={isPaginationLoading ? "Loading..." : "Next page"}
        >
          {isPaginationLoading && page < totalPages ? "⏳ Loading" : "Next"}
        </button>
      </div>
    </div>
  </div>
);
};

export default ProductManagement;