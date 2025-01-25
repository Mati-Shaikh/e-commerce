// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Manufacturer Store Title - Now clickable */}
        <Link to="/ManufacturerStore" className="text-2xl font-bold text-blue-600">
          ManufacturerStore
        </Link>

        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center space-x-6">
          <a href="/add-product" className="text-blue-600">Add Product</a>
          <a href="/order-tracking" className="text-blue-600">Order Tracking</a>
        </div>

        {/* Hamburger Menu Button */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          <svg
            className="w-6 h-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md w-48 p-4 space-y-4 md:hidden">
          <a href="/add-product" className="block text-blue-600">Add Product</a>
          <a href="/order-tracking" className="block text-blue-600">Order Tracking</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
