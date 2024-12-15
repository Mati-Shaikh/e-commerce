import React, { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Star, Heart } from 'lucide-react';
import Footer from './footer';

// Navbar Component
const Navbar = () => {
  const [showVendorRegister, setShowVendorRegister] = useState(false);
  const [showVendorLogin, setShowVendorLogin] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-sky-600">EStore</div>
        
        <div className="space-x-4">
          <div className="relative inline-block">
            <button 
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
              onMouseEnter={() => setShowVendorRegister(true)}
              onMouseLeave={() => setShowVendorRegister(false)}
            >
              Register
            </button>
            {showVendorRegister && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-2">
                <button className="w-full text-left px-4 py-2 hover:bg-sky-50">
                  Register as Vendor
                </button>
              </div>
            )}
          </div>
          
          <div className="relative inline-block">
            <button 
              className="px-4 py-2 border border-sky-500 text-sky-500 rounded hover:bg-sky-50 transition"
              onClick={() => setShowVendorLogin(!showVendorLogin)}
            >
              Login
            </button>
            {showVendorLogin && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-2">
                <button className="w-full text-left px-4 py-2 hover:bg-sky-50">
                  Login as Vendor
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Search and Filter Component
const SearchAndFilter = () => {
  const categories = [
    {
      name: 'Clothing',
      subcategories: ['Shirts', 'Pants', 'Socks']
    },
    {
      name: 'Electronics',
      subcategories: ['Phones', 'Laptops', 'Accessories']
    }
  ];

  return (
    <div className="bg-white px-6 py-4 border-b">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
          </div>
          
          <div className="flex space-x-4">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <button className="px-4 py-2 text-gray-700 hover:text-sky-600 flex items-center">
                  {category.name}
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className="block w-full text-left px-4 py-2 hover:bg-sky-50"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:text-red-500">
          <Heart size={20} />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < product.rating ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">Rs {product.price}</span>
          <button className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition flex items-center">
            <ShoppingCart size={18} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Products Grid Component
const ProductsGrid = () => {
  const products = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 1199.0,
      rating: 4,
      reviews: 128,
      image: "https://media.istockphoto.com/id/1858715138/photo/man-in-different-stylish-socks-indoors-closeup-space-for-text.jpg?s=1024x1024&w=is&k=20&c=nv4b7p6JTeEfJx3eY2-Oh_j3EvCrJq0G6spKcJZwQeI="
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 1599.99,
      rating: 5,
      reviews: 89,
      image: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 3,
        name: "Slim Fit Jeans",
        price: 1899.99,
        rating: 5,
        reviews: 89,
        image: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 4,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "/api/placeholder/300/400"
      },
      {
        id: 5,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "/api/placeholder/300/400"
      },
      {
        id: 6,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 7,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "/api/placeholder/300/400"
      },
      {
        id: 8,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "https://plus.unsplash.com/premium_photo-1682430259342-427ec43ebc38?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      {
        id: 9,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "/api/placeholder/300/400"
      },
      {
        id: 10,
        name: "Slim Fit Jeans",
        price: 1999.99,
        rating: 5,
        reviews: 89,
        image: "https://plus.unsplash.com/premium_photo-1682430259342-427ec43ebc38?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
    // Add more products as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded ${
                page === 1 
                  ? 'bg-sky-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-sky-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const EcommerceStore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchAndFilter />
      <ProductsGrid />
      <Footer/>
    </div>
  );
};

export default EcommerceStore;