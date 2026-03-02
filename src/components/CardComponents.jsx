import React from 'react';

const CardComponents = ({ title, value, icon, gradient }) => {
  return (
    <div
      className={`p-[1.5px] rounded-xl ${gradient}
                  w-full transition-transform duration-200
                  will-change-transform hover:scale-[1.02]`}
    >
      <div className="bg-[#0b1020]/90 backdrop-blur-lg rounded-xl
                      px-3 py-3 sm:px-4 sm:py-3 text-white shadow-md h-full">

        {/* Icon + Title */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center
                          rounded-lg bg-white/10 text-sm">
            {icon}
          </div>
          <p className="text-[11px] sm:text-xs text-gray-300 tracking-wide truncate">
            {title}
          </p>
        </div>

        {/* Value */}
        <p className="text-base sm:text-lg font-semibold mt-2 tracking-wide truncate">
          {value}
        </p>

      </div>
    </div>
  );
};

export default CardComponents;