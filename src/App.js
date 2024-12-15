import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Store from './components/store';
import LoginPage from './components/login';
import SignupPage from './components/signUp';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
