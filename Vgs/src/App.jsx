import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import JoinUs from './pages/JoinUs';
import Home from './pages/Home';
import Service from './pages/Service';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path='/Home' element={<Home />} />
        <Route path="/JoinUs" element={<JoinUs />} />
        <Route path="/Service" element={<Service />} />
      </Routes>
    </div>
  );
}

export default App;
