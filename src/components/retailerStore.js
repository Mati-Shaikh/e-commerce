import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { Package, DollarSign, Users, TrendingUp, Search, ShoppingCart, Heart, Star, ChevronDown } from 'lucide-react';
import Footer from './footer';
import Navbar from './retailerNavbar';

const ManufacturerStoreDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 }
  ];

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

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar cartItems={cartItems} />

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500 mr-4" />
              <div>
                <p className="text-gray-600">Products</p>
                <h3 className="text-2xl font-bold">45</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-500 mr-4" />
              <div>
                <p className="text-gray-600">Revenue</p>
                <h3 className="text-2xl font-bold">₹250,000</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-4" />
              <div>
                <p className="text-gray-600">Retailers</p>
                <h3 className="text-2xl font-bold">28</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mr-4" />
              <div>
                <p className="text-gray-600">Growth</p>
                <h3 className="text-2xl font-bold">15%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
            <BarChart width={500} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
            <LineChart width={500} height={300} data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            </LineChart>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-105 transition"
                />
                <button 
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowModal(true);
                  }}
                  className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4" 
                        fill={i < product.rating ? "currentColor" : "none"} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                  <p className="text-gray-600 mt-1">₹{selectedProduct.price}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedProduct.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-semibold">{selectedProduct.stock} units</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4" 
                          fill={i < selectedProduct.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">({selectedProduct.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ManufacturerStoreDashboard;