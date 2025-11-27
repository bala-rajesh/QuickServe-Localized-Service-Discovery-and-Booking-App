import React from 'react';
import QuickServeLogo from './icons/QuickServeLogo';
import DashboardIcon from './icons/DashboardIcon';
import BookOnlineIcon from './icons/BookOnlineIcon';
import InventoryIcon from './icons/InventoryIcon';
import CalendarMonthIcon from './icons/CalendarMonthIcon';
import PaymentsIcon from './icons/PaymentsIcon';
import SettingsIcon from './icons/SettingsIcon';
import PersonIcon from './icons/PersonIcon';

const SideNavBar = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'profile', icon: <PersonIcon />, label: 'Profile Details' },
        { id: 'dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { id: 'bookings', icon: <BookOnlineIcon />, label: 'Bookings' },
        { id: 'services', icon: <InventoryIcon />, label: 'My Services' },
        { id: 'calendar', icon: <CalendarMonthIcon />, label: 'Calendar' },
        { id: 'earnings', icon: <PaymentsIcon />, label: 'Earnings' },
        { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
    ];

    return (
        <aside className="flex w-64 flex-col border-r border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark">
            <div className="flex h-16 items-center gap-3 border-b border-border-light/20 dark:border-border-dark px-6">
                <div className="size-7 text-primary">
                    <QuickServeLogo />
                </div>
                <h2 className="text-xl font-bold">Quick Serve</h2>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="A profile picture of XYZ" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXZ77yi52dAlwyhaD0gqhBumC0iwbc4BvLknN5D3Tt4-7QFZK9y5GpMD3tgMULftzIhOeLHp9XE2Ho3YqO4X7HQ-h9J1PTDPaNcptntJ8TGT7PUj4nEO05Lyr6qoc6Q-c5QLsk2t49GfDj9tvG9dY8KkPgPlp-W71LI7CdaWJp1I4d8KJCdLB7tDakfFcynH89uJ9A7DEbpwfdfqKmf3atgI5SibQOhwkNkyWqjHqz4LW8DFgcIapgdTWbpYiK4zCcOGhsOau92jA")' }}></div>
                        <div className="flex flex-col">
                            <h1 className="text-base font-medium">XYZ</h1>
                            <p className="text-sm font-normal text-text-light/70 dark:text-text-dark/70">Service Provider</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2 pt-4">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${activeView === item.id
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                                        : 'hover:bg-primary/10 dark:hover:bg-primary/20'
                                    }`}
                            >
                                {item.icon}
                                <p>{item.label}</p>
                            </button>
                        ))}
                    </nav>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold">
                    <span className="truncate">Add New Service</span>
                </button>
            </div>
        </aside>
    );
};

export default SideNavBar;
