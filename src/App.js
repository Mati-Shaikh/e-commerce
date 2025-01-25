import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './components/store';
import LoginPage from './components/login';
import SignupPage from './components/signUp';
import ManufacturerStoreDashboard from './components/manufacturerStore';
import RetailerStore from './components/retailerStore';
import Vendor from './Admin/Vendor'; 
import SuperAdmin from './pages/SuperAdmin';
import OrderTrackingTable from './components/order-tracking';
import AddProduct from './components/add-product';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default route to Store */}
          <Route path="/" element={<Store />} />
          {/* Login route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Signup route */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/manufacturerStore" element={<ManufacturerStoreDashboard/>} />
          <Route path="/retailerStore" element={<RetailerStore/>} />
          <Route path="/order-tracking" element={<OrderTrackingTable/>} />
          <Route path="/add-product" element={<AddProduct/>} />

          <Route path="/Admin" element={<Vendor/>} />

          <Route path="/SuperAdmin" element={<SuperAdmin/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
