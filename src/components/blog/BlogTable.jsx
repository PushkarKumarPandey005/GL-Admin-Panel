import { useEffect, useMemo, useState } from "react";
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

// ================= FETCH BLOGS =================
const fetchBlogs = async () => {
try {
setLoading(true);
const res = await getAllBlogs();


  //  universal extractor (fix for most backends)
  const blogs =
    res?.blogs ||
    res?.data ||
    res?.data?.blogs ||
    (Array.isArray(res) ? res : []);

  setData(blogs);
} catch (err) {
  console.error(err);
  alert("Failed to load blogs");
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchBlogs();
}, []);

// ================= SINGLE DELETE =================
const handleDelete = async (id) => {
if (!confirm("Delete this blog?")) return;


try {
  await deleteBlog(id);
  fetchBlogs();
} catch {
  alert("Delete failed");
}


};

// ================= BULK DELETE =================
const handleBulkDelete = async () => {
const selectedRows = table.getSelectedRowModel().rows;
if (!selectedRows.length) return alert("Select at least one blog");


if (!confirm(`Delete ${selectedRows.length} blogs?`)) return;

try {
  await Promise.all(
    selectedRows.map((row) => deleteBlog(row.original._id))
  );
  setRowSelection({});
  fetchBlogs();
} catch {
  alert("Bulk delete failed");
}


};

// ================= COLUMNS =================
const columns = useMemo(
() => [
// CHECKBOX COLUMN
{
id: "select",
header: ({ table }) => ( <input
         type="checkbox"
         checked={table.getIsAllRowsSelected()}
         onChange={table.getToggleAllRowsSelectedHandler()}
       />
),
cell: ({ row }) => ( <input
         type="checkbox"
         checked={row.getIsSelected()}
         onChange={row.getToggleSelectedHandler()}
       />
),
},


  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <span className="font-semibold text-white">
        {row.original.title}
      </span>
    ),
  },
  {
    header: "Category",
    accessorKey: "category",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          row.original.status === "published"
            ? "bg-green-600"
            : "bg-yellow-600"
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
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onView?.(row.original._id)}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
        >
          View
        </button>

        <button
          onClick={() => onEdit?.(row.original._id)}
          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(row.original._id)}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
        >
          Delete
        </button>
      </div>
    ),
  },
],
[onEdit, onView]


);

// ================= TABLE =================
const table = useReactTable({
data,
columns,
state: { rowSelection },
onRowSelectionChange: setRowSelection,
enableRowSelection: true,
getCoreRowModel: getCoreRowModel(),
});

// ================= UI =================
return ( <div className="w-full text-white">
{/* HEADER */} <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"> <h1 className="text-2xl font-bold">Blogs</h1>

```
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={handleBulkDelete}
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
      >
        Delete Selected
      </button>

      <button
        onClick={onCreate}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold"
      >
        + Create Blog
      </button>
    </div>
  </div>

  {/* TABLE */}
  <div className="overflow-x-auto rounded-xl border border-[#1e4d72]">
    {loading ? (
      <div className="p-10 text-center text-gray-400">
        Loading blogs...
      </div>
    ) : (
      <table className="w-full text-sm">
        <thead className="bg-[#021d2d]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-gray-300"
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

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t border-gray-700 hover:bg-[#073a4f]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-10">
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
  </div>
</div>

);
}
