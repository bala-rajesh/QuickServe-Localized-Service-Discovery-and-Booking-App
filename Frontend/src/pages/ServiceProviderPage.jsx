import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/SideNavBar';
import TopNavBar from '../components/TopNavBar';

const ServiceProviderPage = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <TopNavBar toggleSideNav={toggleSideNav} isSideNavOpen={isSideNavOpen} />
      <div className="flex flex-1 overflow-hidden">
        <SideNavBar isSideNavOpen={isSideNavOpen} />
        <main className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderPage;