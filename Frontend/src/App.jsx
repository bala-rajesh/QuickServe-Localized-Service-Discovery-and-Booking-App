import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceProviderPage from './pages/ServiceProviderPage';
import DashboardPage from './pages/Subpages/DashboardPage';
import ProfileDetailPage from './pages/Subpages/ProfileDetailPage';
import BookingsPage from './pages/Subpages/BookingsPage';
import MyServicesPage from './pages/Subpages/MyServicesPage';
import EarningsPage from './pages/Subpages/EarningsPage';
import Home from "./pages/Home";
import Login from "./pages/Login";
import CustomerSignup from "./pages/CustomerSignup";
import ProviderSignup from "./pages/ProviderSignup";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/provider" element={<ProviderSignup />} />
          <Route path="/service-provider" element={<ServiceProviderPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfileDetailPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="services" element={<MyServicesPage />} />
            <Route path="earnings" element={<EarningsPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
