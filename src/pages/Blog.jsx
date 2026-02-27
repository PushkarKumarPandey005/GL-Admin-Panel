import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import BlogForm from "../components/blog/BlogForm.jsx";
import BlogTable from "../components/blog/BlogTable.jsx";
import BlogView from "../components/blog/BlogView.jsx";
import BlogUpdate from "../components/blog/BlogUpdate.jsx";

export default function Blog() {
    const [view, setView] = useState("list"); // list | create | edit | view
    const [selectedSlug, setSelectedSlug] = useState(null);

    return (
        <div className="flex bg-[#021d2d] min-h-screen text-white overflow-hidden">
            {/* SIDEBAR */}
            <div className="fixed left-0 top-0 h-full z-40">
                <VerticalNavbar />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 ml-64 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">

                {/* ================= LIST VIEW ================= */}
                {view === "list" && (
                    <BlogTable
                        onCreate={() => setView("create")}
                        onEdit={(slug) => {
                            setSelectedSlug(slug);
                            setView("edit");
                        }}
                        onView={(slug) => {
                            setSelectedSlug(slug);
                            setView("view");
                        }}
                    />
                )}

                {/* ================= CREATE VIEW ================= */}
                {view === "create" && (
                    <BlogForm
                        mode="create"
                        onSuccess={() => setView("list")}
                    />
                )}

                {/* ================= EDIT VIEW ================= */}
                {view === "edit" && selectedSlug && (
                    <BlogUpdate
                        slug={selectedSlug}
                        onSuccess={() => {
                            setView("list");
                            setSelectedSlug(null);
                        }}
                    />
                )}

                {/* ================= VIEW VIEW ================= */}
                {view === "view" && selectedSlug && (
                    <BlogView
                        slug={selectedSlug}   // ✅ pass slug
                        onBack={() => {
                            setView("list");
                            setSelectedSlug(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
}