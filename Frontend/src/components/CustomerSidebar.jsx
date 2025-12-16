import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const isActive = (path) => {
        return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800';
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-screen sticky top-0">
            <div className="p-6 flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">bolt</span>
                </div>
                <span className="text-xl font-bold tracking-tight">QuickServe</span>
            </div>

            <nav className="flex-1 px-4 py-4 flex flex-col gap-1">
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Menu</p>

                <Link to="/customer/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive('/customer/dashboard')}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    Dashboard
                </Link>

                <Link to="/customer/bookings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive('/customer/bookings')}`}>
                    <span className="material-symbols-outlined">calendar_month</span>
                    My Bookings
                </Link>

                <Link to="/services" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive('/services')}`}>
                    <span className="material-symbols-outlined">search</span>
                    Find Services
                </Link>

                <div className="my-4 border-t border-gray-100 dark:border-gray-800"></div>
                <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Account</p>

                <Link to="/customer/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive('/customer/profile')}`}>
                    <span className="material-symbols-outlined">person</span>
                    Profile
                </Link>

                <Link to="/customer/settings" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive('/customer/settings')}`}>
                    <span className="material-symbols-outlined">settings</span>
                    Settings
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 w-full">
                    <span className="material-symbols-outlined">logout</span>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default CustomerSidebar;
