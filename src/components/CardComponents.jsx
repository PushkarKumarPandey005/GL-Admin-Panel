import React from 'react';

const CardComponents = ({ title, value, icon, gradient }) => {
  return (
    <div
      className={`p-[1.5px] rounded-xl ${gradient}
                  w-full max-w-[200px] transition-transform duration-200
                  will-change-transform`}
    >
      <div className="bg-[#0b1020]/90 backdrop-blur-lg rounded-xl
                      px-3 py-2 text-white shadow-md">

        {/* Icon + Title */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center
                          rounded-lg bg-white/10 text-sm">
            {icon}
          </div>
          <p className="text-[11px] text-gray-300 tracking-wide">
            {title}
          </p>
        </div>

        {/* Value */}
        <p className="text-lg font-semibold mt-2 tracking-wide">
          {value}
        </p>

      </div>
    </div>
  );
};

export default CardComponents;
