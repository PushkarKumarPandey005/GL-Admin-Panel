import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { TbLayoutDashboard } from "react-icons/tb";
import { MdAddShoppingCart, MdInventory2, MdPerson, MdSettings, MdLogout } from "react-icons/md";
import { FaBoxOpen, FaBlog } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
import AdminProfile from '../sub-components/AdmiProfile'

const navItems = [
  { to: '/',                   icon: <TbLayoutDashboard size={20} />, label: 'Dashboard' },
  { to: '/add-product',        icon: <MdAddShoppingCart size={20} />, label: 'Add Product' },
  { to: '/product-management', icon: <MdInventory2 size={20} />,      label: 'Products Management' },
  { to: '/orders',             icon: <FaBoxOpen size={20} />,         label: 'Customer Orders' },
  { to: '/blog',               icon: <FaBlog size={20} />,            label: 'Blogs' },
  { to: '/profile',            icon: <MdPerson size={20} />,          label: 'Profile' },
  { to: '/settings',           icon: <MdSettings size={20} />,        label: 'Settings' },
  { to: '/logout',             icon: <MdLogout size={20} />,          label: 'Logout' },
];

export const VerticalNavbar = ({ onToggle }) => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const handleToggle = () => {
    setExpanded((prev) => {
      onToggle?.(!prev);
      return !prev;
    });
  };

  return (
    <div
      className={`
        relative flex flex-col h-screen bg-[#052030]
        shadow-[4px_0_15px_-4px_rgba(0,0,0,0.5)]
        transition-all duration-300 ease-in-out
        ${expanded ? 'w-64' : 'w-16'}
      `}
    >
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="absolute -right-3 top-20 z-50 w-6 h-6 bg-[#0a4060] border border-white/10
                   rounded-full flex items-center justify-center text-white shadow-md
                   hover:bg-[#0d5070] transition"
      >
        <MdChevronRight
          size={16}
          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Profile */}
      <div className={`pt-3 transition-all duration-300 ${expanded ? 'h-40 opacity-100' : 'h-16 opacity-0 pointer-events-none overflow-hidden'}`}>
        <AdminProfile />
      </div>

      {/* Collapsed avatar placeholder */}
      {!expanded && (
        <div className="flex justify-center items-center h-16 mt-1">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
        </div>
      )}

      {/* Nav Links */}
      <nav className="flex flex-col gap-1 mt-4 px-2 overflow-y-auto flex-1 hide-scrollbar">
        {navItems.map(({ to, icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <div key={to} className="relative group">
              <Link
                to={to}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl
                  font-medium text-sm tracking-wide transition-all duration-200
                  ${isActive
                    ? 'bg-white/15 text-white'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }
                  ${!expanded ? 'justify-center' : ''}
                `}
              >
                {/* Icon */}
                <span className={`flex-shrink-0 ${isActive ? 'text-orange-400' : ''}`}>
                  {icon}
                </span>

                {/* Label */}
                {expanded && (
                  <span className="truncate transition-all duration-200">
                    {label}
                  </span>
                )}

                {/* Active indicator */}
                {isActive && expanded && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                )}
              </Link>

              {/* Tooltip — only when collapsed */}
              {!expanded && (
                <div className="
                  absolute left-full top-1/2 -translate-y-1/2 ml-3
                  bg-[#0a3050] text-white text-xs font-medium
                  px-3 py-1.5 rounded-lg shadow-lg border border-white/10
                  whitespace-nowrap
                  opacity-0 pointer-events-none
                  group-hover:opacity-100 group-hover:pointer-events-auto
                  transition-opacity duration-200 z-50
                ">
                  {label}
                  {/* Arrow */}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#0a3050]" />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom version text */}
      {expanded && (
        <div className="px-4 py-3 text-[10px] text-gray-600 border-t border-white/5">
          Admin Panel v1.0
        </div>
      )}
    </div>
  );
};