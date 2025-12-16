import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProviderSidebar from './ProviderSidebar';

const ProviderLayout = () => {
    const location = useLocation();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('bookings')) return 'Bookings';
        if (path.includes('services')) return 'My Services';
        if (path.includes('calendar')) return 'Calendar';
        if (path.includes('earnings')) return 'Earnings';
        if (path.includes('settings')) return 'Settings';
        return 'Dashboard';
    };

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark overflow-hidden">
            <ProviderSidebar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* TopNavBar */}
                <header className="flex h-16 items-center justify-between whitespace-nowrap border-b border-gray-200/20 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 shrink-0">
                    <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
                    <button className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400 gap-2 text-sm font-bold">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 p-1 text-xs text-white"></span>
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ProviderLayout;
