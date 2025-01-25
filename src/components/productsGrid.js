

import React, { useState,useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, Star, Heart ,X, Plus, Minus} from 'lucide-react';
const ImageModal = ({ image, productName, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg max-w-4xl w-full flex">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Modal Content */}
        <div className="flex p-4 w-full">
          {/* Image Section */}
          <div className="w-1/3">
            <img
              src={`http://localhost:3000/${image}`}
              alt={productName}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Details Section */}
          <div className="ml-4 w-2/3">
            <h3 className="text-xl font-semibold mb-2">{productName}</h3>
            <p className="text-gray-600">This is a detailed description of the product. You can add more product information here.</p>
            <p className="text-gray-600 mt-4">Category: <span className="font-semibold">Product Category</span></p>
            <p className="text-gray-600">Price: <span className="font-semibold">$100</span></p>
            <p className="text-gray-600">Size: <span className="font-semibold">M</span></p>
            {/* You can add more details here */}
          </div>
        </div>
      </div>
    </div>
  );
};



// Cart Component
const Cart = ({ items, onUpdateQuantity, onRemove, onClose, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-4">
                <img
                  src={`http://localhost:3000/${item.images.split(',')[0]}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Checkout Modal
const CheckoutModal = ({ total, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded px-3 py-2"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <textarea
              required
              className="w-full border rounded px-3 py-2"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              required
              maxLength="16"
              className="w-full border rounded px-3 py-2"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry</label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                maxLength="5"
                className="w-full border rounded px-3 py-2"
                value={formData.expiry}
                onChange={(e) => setFormData({...formData, expiry: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                required
                maxLength="3"
                className="w-full border rounded px-3 py-2"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Main ProductsGrid Component
const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedProductDetails, setSelectedProductDetails] = useState(null);
    // Define the missing states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // The rest of your code follows...
  
  
    
    const productsPerPage = 8;
  
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
    const fetchProductDetails = async (productId) => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setSelectedProductDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    
  
    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    // Cart functions
    const addToCart = (product) => {
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    };
  
    const updateCartItemQuantity = (id, quantity) => {
      if (quantity < 1) return;
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    };
  
    const removeFromCart = (id) => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    };
  
    const handleCheckout = (formData) => {
      // Here you would typically make an API call to process the payment
      console.log('Processing payment:', formData);
      // Clear cart and close modals after successful payment
      setCartItems([]);
      setShowCheckout(false);
      setShowCart(false);
      // You might want to show a success message here
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      );
    }
  
    return (
      <div className="store-container mx-auto py-8 px-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Our Products</h2>
        <button
          onClick={() => setShowCart(true)}
          className="relative p-2 text-gray-600 hover:text-gray-800"
        >
          <ShoppingCart size={24} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <div
              className="aspect-w-16 aspect-h-9 cursor-pointer relative"
              onClick={() => {
                fetchProductDetails(product.id);
                setSelectedImage({ url: product.images.split(',')[0], name: product.name });
              }}
            >
              {product.images?.split(',')[0] && (
                <img
                  src={`http://localhost:3000/${product.images.split(',')[0]}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
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
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 mt-2">Category: {product.category}</p>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">Size: {product.size}</p>
              <div className="flex items-center mt-2">
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
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-sky-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    
      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === i + 1 ? 'bg-sky-500 text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    
      {/* Modal Rendering */}
      {selectedImage && (
        <ImageModal
          image={selectedImage.url}
          productName={selectedImage.name}
          productDetails={selectedProductDetails}
          onClose={() => {
            setSelectedImage(null);
            setSelectedProductDetails(null);
          }}
        />
      )}
    
      {showCart && (
        <Cart
          items={cartItems}
          onUpdateQuantity={updateCartItemQuantity}
          onRemove={removeFromCart}
          onClose={() => setShowCart(false)}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      )}
    
      {showCheckout && (
        <CheckoutModal
          total={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}
    </div>
      );
  };
  

  export default ProductsGrid;