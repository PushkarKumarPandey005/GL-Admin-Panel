import React from 'react'

const CardComponents = ({title, value, icon, gradient} ) => {
  return (
    <div
      className={`p-0.5 rounded-2xl shadow-xl ${gradient} transition-transform duration-300 hover:scale-[1.03]`}
    >
      {/* INNER CARD WITH GLASS EFFECT */}
      <div className="bg-[#0b1020]/85 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-4  text-white shadow-lg">

        {/* ICON BADGE */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 shadow-inner text-2xl">
          {icon}
        </div>

        {/* TITLE */}
        <p className="text-sm text-gray-300 ml-32   tracking-wide">{title}</p>

        {/* VALUE */}
        <p className="text-3xl font-bold flex ml-15   tracking-widest">{value}</p>
      </div>
    </div>
  );
}

  

export default CardComponents