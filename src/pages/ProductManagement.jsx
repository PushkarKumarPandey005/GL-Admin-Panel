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

const columns = [
  columnHelper.display({
    id: "select",
    header: "✓",
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />
    ),
  }),
  columnHelper.accessor("title",  { header: "Title" }),
  columnHelper.accessor("price",  { header: "Price" }),
  columnHelper.accessor("stock",  { header: "Stock" }),
  columnHelper.accessor("type",   { header: "Type" }),
  columnHelper.accessor("brand",  { header: "Brand" }),
];

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => { setRowSelection({}); }, [page]);

  // Close actions dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#actions-dropdown")) setOpenActions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const products      = data?.data         ?? [];
  const totalPages    = data?.totalPages    ?? 1;
  const totalProducts = data?.totalProducts ?? 0;

  const filteredProducts = useMemo(() => products.filter((p) => {
    const matchesSearch = p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesType   = typeFilter ? p.type === typeFilter : true;
    return matchesSearch && matchesType;
  }), [products, search, typeFilter]);

  const counts = useMemo(() => ({
    stationery: products.filter((p) => p.type === "stationery").length,
    property:   products.filter((p) => p.type === "property").length,
    machinery:  products.filter((p) => p.type === "machinery").length,
  }), [products]);

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row._id,
  });

  const selectedProduct = table.getSelectedRowModel().rows[0]?.original;

  const handlePrev = useCallback(() => { if (page > 1) setPage((p) => p - 1); }, [page]);
  const handleNext = useCallback(() => { if (page < totalPages) setPage((p) => p + 1); }, [page, totalPages]);
  const handleTypeFilter = useCallback((val) => { setTypeFilter(val); setPage(1); }, []);

  const filterBtns = [
    { label: "All",        val: "",           count: totalProducts },
    { label: "Stationery", val: "stationery", count: counts.stationery },
    { label: "Properties", val: "property",   count: counts.property },
    { label: "Machinery",  val: "machinery",  count: counts.machinery },
  ];

  return (
    <div className="flex min-h-screen bg-[#012032] text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>

      {/* Main */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}`}>

        {/* Loading overlay — first load only */}
        {isLoading && !data && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
            <svg className="animate-spin w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-white font-semibold text-lg">Products</h1>
        </div>

        <div className="p-4 sm:p-6">

          {/* Page Title */}
          <h1 className="ml-15 hidden lg:block text-2xl font-bold mb-5">Product Management</h1>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">

            {/* Search */}
            <div className=" ml-25 flex items-center bg-white/10 px-3 py-1 rounded-lg shadow flex-1 min-w-0 sm:max-w-xs">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full outline-none bg-transparent text-sm text-white placeholder-gray-400"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className=" ml-10 flex gap-2 flex-wrap">
              {filterBtns.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => handleTypeFilter(btn.val)}
                  className={`text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-lg shadow transition flex flex-col items-center leading-tight ${
                    typeFilter === btn.val ? "bg-white/25" : "bg-white/10 hover:bg-white/20"
                  }`}
                >
                  <span>{btn.label}</span>
                  <span className="font-bold text-sm">{btn.count}</span>
                </button>
              ))}
            </div>

            {/* Actions Dropdown */}
            <div className="relative" id="actions-dropdown">
              <button
                onClick={() => setOpenActions((s) => !s)}
                className="bg-white/10 text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-white/20 transition flex items-center gap-1.5"
              >
                Actions
                <svg className={`w-3 h-3 transition-transform ${openActions ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {openActions && (
                <div className="absolute right-0 sm:left-0 mt-2 w-40 bg-[#023a57] rounded-xl shadow-xl z-50 border border-white/10 overflow-hidden">
                  <button
                    onClick={() => {
                      if (!selectedProduct) return alert("Select a row first");
                      navigate(`/product/view/${selectedProduct._id}`);
                      setOpenActions(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm transition"
                  >
                    👁 View
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedProduct) return alert("Select a row first");
                      navigate(`/product/update/${selectedProduct._id}`);
                      setOpenActions(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm transition"
                  >
                    ✏️ Update
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedProduct) return alert("Select a row first");
                      if (window.confirm("Delete this product?")) {
                        deleteProduct(selectedProduct._id);
                        setOpenActions(false);
                      }
                    }}
                    className="block w-full text-left px-4 py-2.5 hover:bg-white/10 text-sm text-red-400 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Fetch indicator */}
          {isFetching && (
            <div className="h-0.5 bg-blue-400 animate-pulse rounded mb-3" />
          )}

          {/* DESKTOP TABLE */}
          <div className=" ml-20 hidden sm:block overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full" style={{ tableLayout: "fixed" }}>
              <thead className="bg-[#011826] border-b border-white/10">
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th key={header.id} className="p-3 text-xs sm:text-sm text-gray-400 font-semibold uppercase tracking-wider text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            </table>

            <div
              className="max-h-[520px] overflow-y-auto hide-scrollbar"
              style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}
            >
              <table className="w-full border-separate border-spacing-y-1" style={{ tableLayout: "fixed" }}>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                        No products found
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className={`hover:bg-white/5 transition rounded-lg ${row.getIsSelected() ? "bg-blue-900/20" : ""}`}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="p-2 px-3 text-sm text-gray-300">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE CARDS */}
          <div className="sm:hidden space-y-2" style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}>
            {/* Select All mobile */}
            <div className="flex items-center gap-2 px-1 mb-2">
              <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                className="w-4 h-4 accent-blue-500"
              />
              <span className="text-xs text-gray-400">Select All</span>
            </div>

            {table.getRowModel().rows.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No products found</p>
            ) : (
              table.getRowModel().rows.map((row) => {
                const p = row.original;
                return (
                  <div
                    key={row.id}
                    className={`bg-[#011826] rounded-xl p-3 border transition ${row.getIsSelected() ? "border-blue-500/50 bg-blue-900/20" : "border-white/10"}`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={row.getIsSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        className="w-4 h-4 accent-blue-500 mt-0.5 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{p.title}</p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-400">
                          <span>₹{p.price?.toLocaleString("en-IN")}</span>
                          <span>Stock: {p.stock ?? "—"}</span>
                          <span className="capitalize">{p.type}</span>
                          {p.brand && <span>{p.brand}</span>}
                        </div>
                      </div>
                      {/* Quick actions */}
                      <div className="flex gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => navigate(`/product/view/${p._id}`)}
                          className="px-2 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() => navigate(`/product/update/${p._id}`)}
                          className="px-2 py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-xs transition"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-6 pb-4">
            <button
              disabled={page === 1}
              onClick={handlePrev}
              className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
            >
              ← Prev
            </button>

            <span className="text-sm flex items-center gap-2 text-gray-300">
              Page <span className="text-white font-semibold">{page}</span> of <span className="text-white font-semibold">{totalPages}</span>
              {isFetching && <span className="animate-spin text-blue-400">⟳</span>}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={handleNext}
              className="px-4 py-2 bg-white/10 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition text-sm"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;