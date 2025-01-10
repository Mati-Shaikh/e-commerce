import React, { useState, useEffect } from 'react';
import { Home, Package, List, PlusCircle, LogOut, Menu } from 'lucide-react';

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Package size={20} />, label: 'Products', id: 'products' },
    { icon: <List size={20} />, label: 'Categories', id: 'categories' },
    { icon: <List size={20} />, label: 'Admins', id: 'admin' },
    { icon: <List size={20} />, label: 'Users', id: 'users' },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-blue-500 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-blue-700">
        <h1 className={`font-bold ${isOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded hover:bg-blue-700">
          <Menu size={20} />
        </button>
      </div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="flex items-center px-4 py-3 hover:bg-blue-700 transition-colors"
          >
            {item.icon}
            <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
          </a>
        ))}
        <button className="flex items-center w-full px-4 py-3 hover:bg-blue-700 mt-auto">
          <LogOut size={20} />
          <span className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>Logout</span>
        </button>
      </nav>
    </div>
  );
};

// ImagePreview Component
const ImagePreview = ({ files }) => {
  return (
    <div className="flex gap-4 mt-2 flex-wrap">
      {files.map((file, index) => (
        <div key={index} className="relative w-24 h-24">
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onDelete }) => {
    const firstImage = product.images?.split(',')[0];
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          {firstImage && (
            <img
              src={`http://localhost:3000/${firstImage}`} // Construct full URL
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-gray-600">Price: ${product.price}</p>
          <p className="text-gray-600">Size: {product.size}</p>
          <button
            onClick={() => onDelete(product.id)}
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
  
  

// Main Dashboard Component
const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    description: '',
    size: '',
    category_id: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      const data = await response.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Handle product creation
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(productForm).forEach(key => {
      formData.append(key, productForm[key]);
    });
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setProductForm({
          name: '',
          price: '',
          description: '',
          size: '',
          category_id: ''
        });
        setSelectedFiles([]);
        fetchProducts();
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className={`transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Products Management</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Product Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({...productForm, category_id: e.target.value})}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <input
                    type="text"
                    value={productForm.size}
                    onChange={(e) => setProductForm({...productForm, size: e.target.value})}
                    className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Images</label>
                  <input
  type="file"
  multiple
  onChange={handleFileChange}
  className="w-full border rounded px-4 py-2"
  accept="image/*"
/>
                  {selectedFiles.length > 0 && <ImagePreview files={selectedFiles} />}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 
                           disabled:bg-blue-300 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    'Creating...'
                  ) : (
                    <>
                      <PlusCircle size={20} />
                      Create Product
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Product Grid */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Product List</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={handleDeleteProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;