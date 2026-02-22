import { useState } from "react";
import { VerticalNavbar } from "../components/VerticalNavbar";
import BlogForm from "../components/blog/BlogForm.jsx";
import BlogTable from "../components/blog/BlogTable.jsx";
import BlogView from "../components/blog/BlogView.jsx";
export default function Blog() {
    const [view, setView] = useState("list"); // list | create | edit | view
    const [selectedId, setSelectedId] = useState(null);

    return (
        <div className="flex bg-[#021d2d] min-h-screen text-white overflow-hidden">
            {/* SIDEBAR */}
            <div className="fixed left-0 top-0 h-full z-40">
                <VerticalNavbar />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 ml-64 w-full p-4 sm:p-6 lg:p-8 overflow-y-auto">

                {/* LIST VIEW */}
                {view === "list" && (
                    <BlogTable
                        onCreate={() => setView("create")}
                        onEdit={(id) => {
                            setSelectedId(id);
                            setView("edit");
                        }}
                        onView={(id) => {
                            setSelectedId(id);
                            setView("view");
                        }}
                    />
                )}

                {/* CREATE VIEW */}
                {view === "create" && (
                    <BlogForm
                        mode="create"
                        onSuccess={() => setView("list")}
                    />
                )}

                {/* EDIT VIEW (future ready) */}
                {view === "edit" && (
                    <BlogForm
                        mode="edit"
                        initialData={{ _id: selectedId }}
                        onSuccess={() => setView("list")}
                    />
                )}

                {/* VIEW VIEW */}
                {view === "view" && selectedId && (
                    <BlogView
                        Id={selectedId}
                        onBack={() => setView("list")}
                    />
                )}

            </div>
        </div>
    );
}