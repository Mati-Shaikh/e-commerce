import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Footer from './footer';
import ManufacturerNavbar from './manufacturerNavbar';

const AddProductComponent = () => {
  const [categories, setCategories] = useState([]);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    size: '',
    category_id: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories/tree');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const ImagePreview = () => {
    return (
      <div className="flex gap-4 mt-2 flex-wrap">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded"
            />
            <button 
              onClick={() => removeFile(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    );
  };

  const renderCategoryOptions = (categories, prefix = '') => {
    return categories.map((category) => (
      <>
        <option key={category.id} value={category.id}>
          {prefix + category.name}
        </option>
        {category.subcategories.length > 0 &&
          renderCategoryOptions(category.subcategories, prefix + '-- ')}
      </>
    ));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const categoryId = Number(productForm.category_id);
    
    if (!categoryId) {
      alert('Please select a valid category');
      setLoading(false);
      return;
    }
  
    const formData = new FormData();
    formData.append('name', productForm.name);
    formData.append('price', productForm.price);
    formData.append('description', productForm.description || '');
    formData.append('size', productForm.size || '');
    formData.append('category_id', categoryId.toString());
    
    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        body: formData,
      });
  
      const responseText = await response.text();
      
      try {
        const responseData = JSON.parse(responseText);
        if (response.ok) {
          setProductForm({ name: '', description: '', price: '', size: '', category_id: '' });
          setSelectedFiles([]);
          fetchProducts();
          alert('Product created successfully!');
        } else {
          alert(`Failed to create product: ${responseData.message || 'Unknown error'}`);
        }
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Raw response:', responseText);
        alert('Unexpected server response');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
        alert('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };


  return (
    <>
    <ManufacturerNavbar/>
  
    <div className="container mx-auto p-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={productForm.category_id}
                onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {renderCategoryOptions(categories)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size</label>
              <input
                type="text"
                value={productForm.size}
                onChange={(e) => setProductForm({ ...productForm, size: e.target.value })}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded px-4 py-2"
              />
              <ImagePreview />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} /> {loading ? 'Creating...' : 'Add Product'}
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Product List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-100 rounded-lg p-4 relative">
                {product.images && (
                  <img
                    src={`http://localhost:3000/${product.images.split(',')[0]}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AddProductComponent;