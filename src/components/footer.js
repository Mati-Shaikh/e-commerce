import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      {/* Newsletter Section */}
      <div className="bg-sky-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-gray-800">Subscribe to our Newsletter</h3>
              <p className="text-gray-600">Stay updated with our latest offers and products</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full md:w-64 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="px-6 py-2 bg-sky-500 text-white rounded-r hover:bg-sky-600 flex items-center">
                <Send size={18} className="mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-sky-600 mb-4">SportHub</h2>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for all your needs. Quality products at the best prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-500">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-500">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sky-500">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sky-500">My Account</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Order Tracking</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Wishlist</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Customer Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sky-500">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="text-sky-500 mt-1 mr-2" size={20} />
                <span className="text-gray-600">
                  123 Commerce Street,
                  <br />
                  Business District,
                  <br />
                  City, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-sky-500 mr-2" size={20} />
                <span className="text-gray-600">+51 4352 7637</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-sky-500 mr-2" size={20} />
                <span className="text-gray-600">support@sportshub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} sportshub. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;