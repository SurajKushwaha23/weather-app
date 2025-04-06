// src/components/Navbar.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-xl font-bold">
              MyApp
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-500"
                }`
              }
            >
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `block text-white px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `block text-white px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? "bg-indigo-800" : "hover:bg-indigo-600"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Register
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
