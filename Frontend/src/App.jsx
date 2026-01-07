import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ServiceProviderPage from './pages/ServiceProviderPage';
import DashboardPage from './pages/Subpages/DashboardPage';
import ProfileDetailPage from './pages/Subpages/ProfileDetailPage';
import BookingsPage from './pages/Subpages/BookingsPage';
import MyServicesPage from './pages/Subpages/MyServicesPage';
import EarningsPage from './pages/Subpages/EarningsPage';
import CustomerPage from './pages/CustomerPage';
import CustomerProfilePage from './pages/CustomerSubpages/ProfilePage';
import FindServicesPage from './pages/CustomerSubpages/FindServicesPage';
import CustomerDashboard from "./pages/CustomerSubpages/Home";
import CustomerBookingsPage from './pages/CustomerSubpages/Bookingspage';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import CustomerSignup from "./pages/CustomerSignup";
import ProviderSignup from "./pages/ProviderSignup";
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/signup/customer" element={<CustomerSignup />} />
          <Route path="/signup/provider" element={<ProviderSignup />} />
          <Route path="/service-provider" element={<ServiceProviderPage />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="profile" element={<ProfileDetailPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="services" element={<MyServicesPage />} />
            <Route path="earnings" element={<EarningsPage />} />
          </Route>
          <Route path="/customer" element={<CustomerPage />}>
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="profile" element={<CustomerProfilePage />} />
            <Route path="bookings" element={<CustomerBookingsPage />} />
            <Route path="search" element={<FindServicesPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
