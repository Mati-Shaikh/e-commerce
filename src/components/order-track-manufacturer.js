import React, { useState, useEffect } from 'react';
import { Eye, Download, Printer } from 'lucide-react';
import Navbar from './manufacturerNavbar';
import Footer from './footer';

const OrderTrackingTable = () => {
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch orders from the API
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/orders');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleViewInvoice = (invoiceUrl) => {
        window.open(invoiceUrl, '_blank');
    };

    const handleDownloadInvoice = (invoiceUrl) => {
        const link = document.createElement('a');
        link.href = invoiceUrl;
        link.download = 'invoice.pdf';
        link.click();
    };

    const handlePrintInvoice = (invoiceUrl) => {
        const iframe = document.createElement('iframe');
        iframe.src = invoiceUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe);
        };
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Navbar cartItems={cartItems} />
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Tracking</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer_name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.customer_address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer_phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer_email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total_price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div className="flex justify-center space-x-2">
                                        <button 
                                            onClick={() => handleViewInvoice(order.invoiceUrl)}
                                            className="text-blue-600 hover:text-blue-900 focus:outline-none"
                                            title="View Invoice"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDownloadInvoice(order.invoiceUrl)}
                                            className="text-green-600 hover:text-green-900 focus:outline-none"
                                            title="Download Invoice"
                                        >
                                            <Download size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handlePrintInvoice(order.invoiceUrl)}
                                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                            title="Print Invoice"
                                        >
                                            <Printer size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
};

export default OrderTrackingTable;