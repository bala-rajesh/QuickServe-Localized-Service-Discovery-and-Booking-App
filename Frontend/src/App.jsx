import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceProviderPage from './pages/ServiceProviderPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ServiceProviderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
