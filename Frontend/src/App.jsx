import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceProviderPage from './pages/ServiceProviderPage';
import { useRefreshData } from './hooks/useRefreshData';
import './index.css';

function App() {
  const refreshData = useRefreshData();

  useEffect(() => {
    refreshData();
  }, [refreshData]);

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
