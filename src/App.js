import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './components/store';
import LoginPage from './components/login';
import SignupPage from './components/signUp';
import ManufacturerStoreDashboard from './components/manufacturerStore';
import RetailerStore from './components/retailerStore';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
