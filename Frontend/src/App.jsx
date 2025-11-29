import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ServiceProviderPage from './pages/ServiceProviderPage';
import DashboardPage from './pages/Subpages/DashboardPage';
import ProfileDetailPage from './pages/Subpages/ProfileDetailPage';
import BookingsPage from './pages/Subpages/BookingsPage';
import MyServicesPage from './pages/Subpages/MyServicesPage';
import EarningsPage from './pages/Subpages/EarningsPage';
import { useLoadInitialData } from './hooks/useBookings';
import './index.css';

function App() {
  const loadInitialData = useLoadInitialData();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/service-provider/dashboard" />} />
          <Route path="/service-provider" element={<ServiceProviderPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfileDetailPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="services" element={<MyServicesPage />} />
            <Route path="earnings" element={<EarningsPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
