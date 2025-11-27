import React, { useState } from 'react';
import SideNavBar from '../components/SideNavBar';
import TopNavBar from '../components/TopNavBar';
import DashboardPage from './Subpages/DashboardPage';
import ProfileDetailPage from './Subpages/ProfileDetailPage';

const ServiceProviderPage = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const viewToTitle = {
    dashboard: "Dashboard",
    profile: "Profile Details",
    bookings: "Bookings",
    services: "My Services",
    calendar: "Calendar",
    earnings: "Earnings",
    settings: "Settings",
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfileDetailPage />;
      default:
        return <div>Not Found</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavBar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex flex-1 flex-col">
        <TopNavBar title={viewToTitle[activeView] || 'Dashboard'} />
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderPage;