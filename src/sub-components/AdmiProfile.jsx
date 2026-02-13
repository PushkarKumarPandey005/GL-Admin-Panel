
import { useState, useRef, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const AdminProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("Admin Name");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef();

  // Load saved data
  useEffect(() => {
    const savedImage = localStorage.getItem("adminImage");
    const savedName = localStorage.getItem("adminName");

    if (savedImage) setImage(savedImage);
    if (savedName) setName(savedName);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      localStorage.setItem("adminImage", imageUrl);
    }
  };

  const handleNameSave = () => {
    setIsEditing(false);
    localStorage.setItem("adminName", name);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      
      {/* Profile Image */}
      <div
        onClick={handleImageClick}
        className="w-23 h-23 rounded-full bg-gray-300 cursor-pointer overflow-hidden flex items-center justify-center"
      >
        {image ? (
          <img
            src={image}
            alt="Admin"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-black font-bold text-[10px] pt-12 text-center  ">Select Profile Picture</span>
        )}
      </div>

      {/* Name Section */}
      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" text-center py-1 text-white  outline-none "
          />
          <button
            onClick={handleNameSave}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-bold text-[20px] text-white pl-8">{name}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-white text-2xl ml-2"
          >
            <MdOutlineModeEdit />
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
