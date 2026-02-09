import React, { useState, useMemo } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import { useProducts, useDeleteProduct } from "../hooks/useProduct.js";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useNavigate } from 'react-router-dom'

const columnHelper = createColumnHelper();



const ProductManagement = () => {

  //states for checkbox selection and open form in view and form mode for updates 
  const navigate = useNavigate();

  const { mutate: deleteProduct } = useDeleteProduct();
  const [rowSelection, setRowSelection] = useState({});
  const [openActions, setOpenActions] = useState(false);

  const { data, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const products = data || [];


  // memoized filter
 const filteredProducts = useMemo(() => {
  return (data || []).filter((p) => {
    const matchesSearch = p.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter ? p.type === typeFilter : true;
    return matchesSearch && matchesType;
  });
}, [data, search, typeFilter]);


  //count the product by categories all types of products.
  const counts = useMemo(() => {
    return {
      stationery: products.filter(p => p.type === "stationery").length,
      property: products.filter(p => p.type === "property").length,
      machinery: products.filter(p => p.type === "machinery").length,
    }
  }, [products]);

  //count the total all types of products.
  const totalCountProducts = useMemo(() => {
    return products.length;
  }, [products]);


  //memoized columns (IMPORTANT)
  const columns = useMemo(
    () => [
      //Checkbox column
      columnHelper.display({
        id: "select",
        header: () => (
          <span className="text-xl tracking-wider">Select</span>
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"

            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className='w-20 h-5 rounded-2xl'
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
            "/upload/w_80,h_80,c_fill,q_auto/"
          );
          return (
            <img
              src={thumb}
              alt="product"
              className="w-14 h-14 object-cover rounded"
              loading="lazy"
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

  const selectedRows = table.getSelectedRowModel().rows;
  const selectedProduct = selectedRows[0]?.original;

  if (isLoading) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="flex">
      <div className="fixed left-0 shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]">
        <VerticalNavbar />
      </div>

      <div className="bg-[#012032] ml-85 w-full min-h-screen p-10 text-white ">
        {/* Filters */}
        <div className="flex gap-8 mb-30 ml-6">



          <div className="
    bg-[#012032]
    text-white
    text-2xl
    flex
    justify-center
    items-center
    opacity-75
    px-2 py-1
    rounded
    cursor-pointer
    shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
    
   
  ">
            <input
              type="text"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-15 w-140 outline-none rounded px-3  ml-2"
            />
          </div>

          <button onClick={() => setTypeFilter("stationery")} className="
    bg-[#012032]
    text-white
    text-2xl
    px-7 py-1
    opacity-75
    rounded
    cursor-pointer
    shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
    transition-all duration-200
    hover:scale-105
    active:scale-95
  ">
            Total Products<br /><span className="g-white  px-2 rounded text-[white] font-bold">{totalCountProducts}</span>
          </button>


          <button onClick={() => setTypeFilter("stationery")}

            className="
    bg-[#012032]
    text-white
    text-2xl
    px-7 py-1
    opacity-75
    rounded
    cursor-pointer
    shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
    transition-all duration-200
    hover:scale-105
    active:scale-95
  ">



            Stationery<br /> <span className="g-white  px-2 rounded text-[white] font-bold">{counts.stationery}</span>
          </button>



          <button onClick={() => setTypeFilter("property")}
            className="
    bg-[#012032]
    text-white
    text-2xl
    px-7 py-1
    opacity-75
    rounded
    cursor-pointer
    shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
    transition-all duration-200
    hover:scale-105
    active:scale-95
  ">
            Properties<br /><span className="g-white  px-2 rounded text-[white] font-bold">{counts.property}</span>
          </button>
          <button
            onClick={() => setTypeFilter("machinery")}
            className="
    bg-[#012032]
    text-white
    text-2xl
    px-7 py-1
    opacity-75
    rounded
    cursor-pointer
    shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]
    transition-all duration-200
    hover:scale-105
    active:scale-95
  "
          >
            Machinery<br />
            <span className="px-2 font-bold">{counts.machinery}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setOpenActions(!openActions)}
              className="bg-[#012032] text-white text-xl px-6 py-2 rounded shadow-[0_-6px_10px_-6px_black,0_6px_10px_-6px_black,6px_0_10px_-6px_black,-6px_0_10px_-6px_black]"
            >
              Actions ▾
            </button>

            {openActions && (
              <div className="absolute mt-2 w-44 bg-[#012032] rounded-xl shadow-lg z-50">
                <button
                  onClick={() => {
                    if (!selectedProduct) return alert("Select a row first");
                    navigate(`/product/view/${selectedProduct._id}`);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    if (!selectedProduct) return alert("Select a row first");
                    navigate(`/product/update/${selectedProduct._id}`);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-white/10"
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
>
  Delete
</button>


              </div>
            )}
          </div>

        </div>



        <div className="mt-10  pl-5 h-160">

          {/* HEADER TABLE */}
          <table className="w-full" style={{ tableLayout: "fixed" }}>
            <thead className="bg-[#012032] shadow-[0_-8px_4px_-6px_black,0_8px_8px_-6px_black] ">
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 h-20 text-xl tracking-wider opacity-60"
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

          {/* print row deta */}
          <div className="h-145 overflow-y-auto hide-scrollbar ">
            <table
              className="w-full border-separate border-spacing-y-3"
              style={{ tableLayout: "fixed" }}
            >
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-white/6">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="p-3 pl-22 opacity-75 first:rounded-l-xl last:rounded-r-xl text-xl shadow-[0_4px_3px_-4px_black]"
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
