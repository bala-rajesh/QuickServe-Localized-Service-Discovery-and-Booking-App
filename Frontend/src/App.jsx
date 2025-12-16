import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProviderDashboard from './pages/ProviderDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ServiceListings from './pages/ServiceListings';
import ProfileSetup from './pages/ProfileSetup';
import AuthPage from './pages/auth/AuthPage';
import ProviderLayout from './components/ProviderLayout';
import ProviderBookings from './pages/ProviderBookings';
import ProviderServices from './pages/ProviderServices';
import ProviderCalendar from './pages/ProviderCalendar';
import ProviderEarnings from './pages/ProviderEarnings';
import ProviderSettings from './pages/ProviderSettings';
import CustomerLayout from './components/CustomerLayout';
import CustomerBookings from './pages/CustomerBookings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/provider/signup" element={<AuthPage role="PROVIDER" initialView="signup" />} />
            <Route path="/provider/login" element={<AuthPage role="PROVIDER" initialView="login" />} />
            <Route path="/seeker/signup" element={<AuthPage role="SEEKER" initialView="signup" />} />
            <Route path="/seeker/login" element={<AuthPage role="SEEKER" initialView="login" />} />
            <Route path="/provider" element={
              <ProtectedRoute allowedRoles={['PROVIDER']}>
                <ProviderLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<ProviderDashboard />} />
              <Route path="bookings" element={<ProviderBookings />} />
              <Route path="services" element={<ProviderServices />} />
              <Route path="calendar" element={<ProviderCalendar />} />
              <Route path="earnings" element={<ProviderEarnings />} />
              <Route path="settings" element={<ProviderSettings />} />
            </Route>
            <Route path="/customer" element={
              <ProtectedRoute allowedRoles={['SEEKER']}>
                <CustomerLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="bookings" element={<CustomerBookings />} />
            </Route>
            <Route path="/services" element={<ServiceListings />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
