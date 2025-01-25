import React, { useState } from 'react';
import { Plus, Save, X } from 'lucide-react';
import Navbar from './manufacturerNavbar';

const categoryData = [
  {
    name: 'Electronics',
    subcategories: [
      {
        name: 'Computers',
        subSubcategories: ['Laptops', 'Desktops', 'Tablets']
      },
      {
        name: 'Mobile Devices',
        subSubcategories: ['Smartphones', 'Smartwatches', 'Accessories']
      }
    ]
  },
  {
    name: 'Clothing',
    subcategories: [
      {
        name: 'Men\'s Wear',
        subSubcategories: ['Shirts', 'Pants', 'Jackets']
      },
      {
        name: 'Women\'s Wear',
        subSubcategories: ['Dresses', 'Tops', 'Skirts']
      }
    ]
  }
];

const ProductManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems ] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    if (!selectedCategory || !selectedSubcategory || !productName || !productPrice) {
      alert('Please fill in all required fields');
      return;
    }

    const newProduct = {
      id: Date.now(),
      category: selectedCategory,
      subcategory: selectedSubcategory,
      subSubcategory: selectedSubSubcategory,
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      image: productImage
    };

    setProducts([...products, newProduct]);
    resetForm();
  };

  const resetForm = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSelectedSubSubcategory('');
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
         <Navbar cartItems={cartItems} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Input Form */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Product</h2>
          
          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('');
                setSelectedSubSubcategory('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Category</option>
              {categoryData.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Subcategory Selection */}
          {selectedCategory && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Subcategory</label>
              <select
                value={selectedSubcategory}
                onChange={(e) => {
                  setSelectedSubcategory(e.target.value);
                  setSelectedSubSubcategory('');
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Subcategory</option>
                {categoryData
                  .find(cat => cat.name === selectedCategory)
                  ?.subcategories.map((subCat) => (
                    <option key={subCat.name} value={subCat.name}>{subCat.name}</option>
                  ))}
              </select>
            </div>
          )}

          {/* Sub-Subcategory Selection */}
          {selectedSubcategory && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Sub-Subcategory</label>
              <select
                value={selectedSubSubcategory}
                onChange={(e) => setSelectedSubSubcategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select Sub-Subcategory</option>
                {categoryData
                  .find(cat => cat.name === selectedCategory)
                  ?.subcategories.find(subCat => subCat.name === selectedSubcategory)
                  ?.subSubcategories.map((subSubCat) => (
                    <option key={subSubCat} value={subSubCat}>{subSubCat}</option>
                  ))}
              </select>
            </div>
          )}

          {/* Product Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter product name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter product price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-indigo-100"
            />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleAddProduct}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <Plus className="mr-2" size={18} /> Add Product
            </button>
            <button
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Product List</h2>
          {products.length === 0 ? (
            <p className="text-gray-500 text-center">No products added yet</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {product.image && (
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category} / {product.subcategory}</p>
                    <p className="text-indigo-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{product.description}</span>
                      <button 
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;