import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import DashboardIcon from './icons/DashboardIcon';
import BookOnlineIcon from './icons/BookOnlineIcon';
import InventoryIcon from './icons/InventoryIcon';
import PaymentsIcon from './icons/PaymentsIcon';
import PersonIcon from './icons/PersonIcon';
import LogoutIcon from './icons/LogoutIcon';
import { useAuth } from './AuthContext';

const SideNavBar = ({ isSideNavOpen }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const providerNavItems = [
        { id: 'profile', icon: <PersonIcon />, label: 'Profile Details' },
        { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { id: 'bookings', icon: <BookOnlineIcon />, label: 'Bookings' },
        { id: 'services', icon: <InventoryIcon />, label: 'My Services' },
        { id: 'earnings', icon: <PaymentsIcon />, label: 'Earnings' },
    ];

    const customerNavItems = [
        { id: 'dashboard', icon: <DashboardIcon />, label: 'Home' },
        { id: 'profile', icon: <PersonIcon />, label: 'Profile' },
        { id: 'bookings', icon: <BookOnlineIcon />, label: 'Bookings' },
        { id: 'search', icon: <InventoryIcon />, label: 'Find Services' },
    ];

    // Determine view based on user role OR current path (fallback if user state is loading/null)
    const isCustomerView = user?.role === 'CUSTOMER' || location.pathname.startsWith('/customer');
    const navItems = isCustomerView ? customerNavItems : providerNavItems;

    return (
        <aside
            className={`flex flex-col border-r border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark pt-4 transition-all duration-300 ease-in-out ${
                isSideNavOpen ? 'w-64' : 'w-0'
            }`}
        >
            <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="A profile picture of XYZ" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXZ77yi52dAlwyhaD0gqhBumC0iwbc4BvLknN5D3Tt4-7QFZK9y5GpMD3tgMULftzIhOeLHp9XE2Ho3YqO4X7HQ-h9J1PTDPaNcptntJ8TGT7PUj4nEO05Lyr6qoc6Q-c5QLsk2t49GfDj9tvG9dY8KkPgPlp-W71LI7CdaWJp1I4d8KJCdLB7tDakfFcynH89uJ9A7DEbpwfdfqKmf3atgI5SibQOhwkNkyWqjHqz4LW8DFgcIapgdTWbpYiK4zCcOGhsOau92jA")' }}></div>
                        <div className="flex flex-col">
                            <h1 className="text-base font-medium">{user?.fullName || 'User'}</h1>
                            <p className="text-sm font-normal text-text-light/70 dark:text-text-dark/70">{isCustomerView ? 'Customer' : 'Service Provider'}</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2 pt-4">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.id}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'hover:bg-primary/10 dark:hover:bg-primary/20'}`
                                }
                            >
                                {item.icon}
                                <p>{item.label}</p>
                            </NavLink>
                        ))}
                    </nav>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 mt-4"
                    >
                        <LogoutIcon />
                        <p>Logout</p>
                    </button>
                </div>
                {!isCustomerView && (
                    <Link to="/service-provider/services?action=create" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">
                        <span className="truncate">Add New Service</span>
                    </Link>
                )}
            </div>
        </aside>
    );
};

export default SideNavBar;
