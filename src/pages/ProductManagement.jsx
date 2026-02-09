import React, { useState, useMemo } from "react";
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
  const { data, isLoading } = useProducts();

  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [openActions, setOpenActions] = useState(false);

  const products = data || [];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesType = typeFilter ? p.type === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [products, search, typeFilter]);

  const counts = useMemo(() => {
    return {
      stationery: products.filter((p) => p.type === "stationery").length,
      property: products.filter((p) => p.type === "property").length,
      machinery: products.filter((p) => p.type === "machinery").length,
    };
  }, [products]);

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
      columnHelper.accessor("productImg", {
        header: "Image",
        cell: (info) => {
          const url = info.getValue()?.[0];
          if (!url) return null;
          const thumb = url.replace(
            "/upload/",
            "/upload/w_60,h_60,c_fill,q_auto/"
          );
          return (
            <img
              src={thumb}
              alt="product"
              className="w-12 h-12 object-cover rounded"
            />
          );
        },
      }),
      columnHelper.accessor("title", { header: "Title" }),
      columnHelper.accessor("price", { header: "Price" }),
      columnHelper.accessor("stock", { header: "Stock" }),
      columnHelper.accessor("type", { header: "Type" }),
      columnHelper.accessor("brand", { header: "Brand" }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const selectedProduct =
    table.getSelectedRowModel().rows[0]?.original;

  if (isLoading)
    return <p className="text-white p-10">Loading...</p>;

 
return (
  <div className="flex">
    <div className="fixed left-0 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
      <VerticalNavbar />
    </div>

    
    <div className="bg-[#012032] ml-65 w-full min-h-screen p-6 text-white">
      
      {/* Filters (tight spacing) */}
      <div className="flex gap-4 mb-12 ml-4">

        <div className="bg-[#012032] text-white flex items-center opacity-75 px-2 py-1 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-80 outline-none rounded px-3 ml-2 text-sm"
          />
        </div>

        {/* Buttons compact */}
        {[ 
          {label:"Total Products", val:"", count: products.length},
          {label:"Stationery", val:"stationery", count: counts.stationery},
          {label:"Properties", val:"property", count: counts.property},
          {label:"Machinery", val:"machinery", count: counts.machinery},
        ].map(btn => (
          <button
            key={btn.label}
            onClick={() => setTypeFilter(btn.val)}
            className="bg-[#012032] text-white text-sm px-5 py-1 opacity-75 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
          >
            {btn.label}<br/>
            <span className="font-bold">{btn.count}</span>
          </button>
        ))}

        {/* Actions */}
        <div className="relative">
          <button
            onClick={() => setOpenActions(!openActions)}
            className="bg-[#012032] text-white text-sm px-4 py-2 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
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

      {/* 🔽 TABLE SECTION */}
      <div className="mt-6 pl-4 h-[520px]">

        {/* Header */}
        <table className="w-full" style={{ tableLayout: "fixed" }}>
          <thead className="bg-[#012032] shadow-[0_-8px_4px_-6px_black,0_8px_8px_-6px_black]">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 h-12 text-sm tracking-wider opacity-60"
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
        <div className="h-[440px] overflow-y-auto hide-scrollbar">
          <table
            className="w-full border-separate border-spacing-y-2"
            style={{ tableLayout: "fixed" }}
          >
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-white/6">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2 pl-10 opacity-75 first:rounded-l-xl last:rounded-r-xl text-sm shadow-[0_4px_3px_-4px_black]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProductManagement;
