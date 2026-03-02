import { useState, useRef, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const AdminProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("Admin Name");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const savedImage = localStorage.getItem("adminImage");
    const savedName  = localStorage.getItem("adminName");
    if (savedImage) setImage(savedImage);
    if (savedName)  setName(savedName);
  }, []);

  const handleImageClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    localStorage.setItem("adminImage", imageUrl);
  };

  const handleNameSave = () => {
    setIsEditing(false);
    localStorage.setItem("adminName", name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleNameSave();
    if (e.key === "Escape") setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center gap-2 px-2 py-3">

      {/* Profile Image */}
      <div
        onClick={handleImageClick}
        className="relative w-16 h-16 rounded-full bg-gray-700 cursor-pointer overflow-hidden
                   flex items-center justify-center group flex-shrink-0
                   border-2 border-white/20 hover:border-white/40 transition"
      >
        {image ? (
          <img src={image} alt="Admin" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-[9px] text-center leading-tight px-1">
            Add Photo
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Name Section */}
      {isEditing ? (
        <div className="flex items-center gap-1.5 w-full px-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 min-w-0 text-center py-1 px-2 text-white text-sm bg-white/10
                       border border-white/20 rounded-lg outline-none focus:border-blue-400 transition"
          />
          <button
            onClick={handleNameSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg text-xs transition flex-shrink-0"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 max-w-full px-2">
          <span className="font-semibold text-sm text-white truncate max-w-[140px]">
            {name}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-white transition flex-shrink-0"
          >
            <MdOutlineModeEdit size={14} />
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default AdminProfile;