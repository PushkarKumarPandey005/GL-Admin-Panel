import { useEffect, useMemo, useState } from "react";
import { BACKEND_URL } from "../../config/config.js";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { getAllBlogs, deleteBlog } from "../../api/blogApi";

export default function BlogTable({ onCreate, onEdit, onView }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowSelection, setRowSelection] = useState({});

  // ================= FETCH =================
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllBlogs();
      const blogs =
        res?.blogs || res?.data?.blogs || res?.data || (Array.isArray(res) ? res : []);
      setData(Array.isArray(blogs) ? blogs : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  // ================= DELETE =================
  const handleDelete = async (slug) => {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(slug);
      fetchBlogs();
    } catch {
      alert("Delete failed");
    }
  };

  // ================= COLUMNS =================
  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
          className="w-4 h-4 accent-blue-500 cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 accent-blue-500 cursor-pointer"
        />
      ),
    },
    {
      header: "Image",
      accessorKey: "featuredImage",
      cell: ({ row }) => {
        const img = row.original.featuredImage;
        if (!img) return <span className="text-gray-500 text-xs">No image</span>;
        if (img.startsWith("blob:")) return <span className="text-yellow-400 text-xs">Invalid</span>;
        const imageUrl = img.startsWith("http") ? img : `${BACKEND_URL}${img}`;
        return (
          <img
            src={imageUrl}
            alt="blog"
            className="w-12 h-9 sm:w-14 sm:h-10 object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.src = "https://dummyimage.com/80x60/1e293b/ffffff&text=No+Image";
            }}
          />
        );
      },
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => (
        <span className="font-semibold text-white text-sm line-clamp-2 max-w-[150px] sm:max-w-[200px] block">
          {row.original.title}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <span className="text-gray-300 text-xs sm:text-sm whitespace-nowrap">
          {row.original.category || "—"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            row.original.status === "published"
              ? "bg-green-600/30 text-green-400 border border-green-600/40"
              : "bg-yellow-600/30 text-yellow-400 border border-yellow-600/40"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString("en-IN")
          : "—",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => onView?.(row.original.slug)}
            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg text-xs font-medium transition whitespace-nowrap"
          >
            View
          </button>
          <button
            onClick={() => onEdit?.(row.original.slug)}
            className="px-2.5 py-1.5 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 rounded-lg text-xs font-medium transition whitespace-nowrap"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original.slug)}
            className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg text-xs font-medium transition whitespace-nowrap"
          >
            Delete
          </button>
        </div>
      ),
    },
  ], [onEdit, onView]);

  // ================= TABLE =================
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // ================= BULK DELETE =================
  const handleBulkDelete = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    if (!selectedRows.length) return alert("Select at least one blog");
    if (!confirm(`Delete ${selectedRows.length} blogs?`)) return;
    try {
      await Promise.all(selectedRows.map((row) => deleteBlog(row.original.slug)));
      setRowSelection({});
      fetchBlogs();
    } catch {
      alert("Bulk delete failed");
    }
  };

  const selectedCount = Object.keys(rowSelection).length;

  // ================= MOBILE CARD VIEW =================
  const MobileCard = ({ row }) => {
    const img = row.original.featuredImage;
    let imageUrl = null;
    if (img && !img.startsWith("blob:")) {
      imageUrl = img.startsWith("http") ? img : `${BACKEND_URL}${img}`;
    }

    return (
      <div className="bg-[#031c2e] border border-[#1e4d72] rounded-xl p-4 space-y-3">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="w-4 h-4 mt-1 accent-blue-500 cursor-pointer flex-shrink-0"
          />

          {/* Image */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="blog"
              className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
              onError={(e) => {
                e.currentTarget.src = "https://dummyimage.com/80x60/1e293b/ffffff&text=No+Image";
              }}
            />
          ) : (
            <div className="w-16 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-gray-500 text-xs">No img</span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm line-clamp-2">
              {row.original.title}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              {row.original.category || "Uncategorized"}
            </p>
          </div>

          {/* Status */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${
              row.original.status === "published"
                ? "bg-green-600/30 text-green-400 border border-green-600/40"
                : "bg-yellow-600/30 text-yellow-400 border border-yellow-600/40"
            }`}
          >
            {row.original.status}
          </span>
        </div>

        {/* Date + Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-gray-500 text-xs">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleDateString("en-IN")
              : "—"}
          </span>

          <div className="flex gap-1.5">
            <button
              onClick={() => onView?.(row.original.slug)}
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs font-medium transition"
            >
              View
            </button>
            <button
              onClick={() => onEdit?.(row.original.slug)}
              className="px-2.5 py-1.5 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-xs font-medium transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.slug)}
              className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ================= UI =================
  return (
    <div className="w-full text-white">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Blogs</h1>
          {selectedCount > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">{selectedCount} selected</p>
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          {selectedCount > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5"
            >
              🗑️ Delete ({selectedCount})
            </button>
          )}
          <button
            onClick={onCreate}
            className="bg-green-600 hover:bg-green-700 active:bg-green-800 px-4 py-2 rounded-lg font-semibold text-sm transition flex items-center gap-1.5"
          >
            + Create Blog
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <svg className="animate-spin w-8 h-8 mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading blogs...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-[#1e4d72] rounded-xl">
          No blogs found
        </div>
      ) : (
        <>
          {/* MOBILE: Card View */}
          <div className="sm:hidden space-y-3">
            {/* Select All mobile */}
            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
                className="w-4 h-4 accent-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-400">Select All</span>
            </div>
            {table.getRowModel().rows.map((row) => (
              <MobileCard key={row.id} row={row} />
            ))}
          </div>

          {/* TABLET/DESKTOP: Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-[#1e4d72]">
            <table className="w-full text-sm">
              <thead className="bg-[#021d2d]">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-gray-300 font-medium text-xs uppercase tracking-wider whitespace-nowrap"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-t border-gray-700/50 hover:bg-[#073a4f] transition ${
                      row.getIsSelected() ? "bg-blue-900/20" : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}