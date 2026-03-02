import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import BlogForm from "../components/blog/BlogForm.jsx";
import BlogTable from "../components/blog/BlogTable.jsx";
import BlogView from "../components/blog/BlogView.jsx";
import BlogUpdate from "../components/blog/BlogUpdate.jsx";

const viewTitles = {
  list: "Blogs",
  create: "Write Blog",
  edit: "Edit Blog",
  view: "View Blog",
};

export default function Blog() {
  const [view, setView] = useState("list");
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const goList = () => { setView("list"); setSelectedSlug(null); };

  return (
    <div className="ml-15 flex bg-[#021d2d] min-h-screen text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full z-40 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <VerticalNavbar onToggle={(val) => setSidebarExpanded(val)} />
      </div>

      {/* Main Content */}
      <div
        className={`
          flex-1 min-h-screen flex flex-col transition-all duration-300
          ml-0 lg:${sidebarExpanded ? "ml-64" : "ml-16"}
        `}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 bg-[#011826] px-4 py-3 sticky top-0 z-10 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            {view !== "list" && (
              <>
                <button onClick={goList} className="text-gray-400 hover:text-white transition">
                  Blogs
                </button>
                <span className="text-gray-600">/</span>
              </>
            )}
            <span className="text-white font-semibold">{viewTitles[view]}</span>
          </div>
        </div>

        {/* Desktop Breadcrumb */}
        {view !== "list" && (
          <div className="hidden lg:flex items-center gap-2 px-6 lg:px-8 pt-6 text-sm">
            <button onClick={goList} className="text-gray-400 hover:text-white transition">
              Blogs
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{viewTitles[view]}</span>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">

          {view === "list" && (
            <BlogTable
              onCreate={() => setView("create")}
              onEdit={(slug) => { setSelectedSlug(slug); setView("edit"); }}
              onView={(slug) => { setSelectedSlug(slug); setView("view"); }}
            />
          )}

          {view === "create" && (
            <BlogForm mode="create" onSuccess={goList} />
          )}

          {view === "edit" && selectedSlug && (
            <BlogUpdate slug={selectedSlug} onSuccess={goList} />
          )}

          {view === "view" && selectedSlug && (
            <BlogView slug={selectedSlug} onBack={goList} />
          )}
        </div>
      </div>
    </div>
  );
}