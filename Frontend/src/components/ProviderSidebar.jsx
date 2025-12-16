import React from 'react';
import { Link } from 'react-router-dom';

const ProviderSidebar = () => {
    return (
        <aside className="flex w-64 flex-col border-r border-gray-200/20 dark:border-gray-700 bg-white dark:bg-gray-800 hidden lg:flex">
            <div className="flex h-16 items-center gap-3 border-b border-gray-200/20 dark:border-gray-700 px-6">
                <div className="h-7 w-7 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                    </svg>
                </div>
                <h2 className="text-xl font-bold">Quick Serve</h2>
            </div>
            <div className="flex flex-1 flex-col justify-between p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDXZ77yi52dAlwyhaD0gqhBumC0iwbc4BvLknN5D3Tt4-7QFZK9y5GpMD3tgMULftzIhOeLHp9XE2Ho3YqO4X7HQ-h9J1PTDPaNcptntJ8TGT7PUj4nEO05Lyr6qoc6Q-c5QLsk2t49GfDj9tvG9dY8KkPgPlp-W71LI7CdaWJp1I4d8KJCdLB7tDakfFcynH89uJ9A7DEbpwfdfqKmf3atgI5SibQOhwkNkyWqjHqz4LW8DFgcIapgdTWbpYiK4zCcOGhsOau92jA")' }}></div>
                        <div className="flex flex-col">
                            <h1 className="text-base font-medium">John Doe</h1>
                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Service Provider</p>
                        </div>
                    </div>
                    <nav className="flex flex-col gap-2 pt-4">
                        <Link className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-primary dark:bg-primary/20" to="/provider/dashboard">
                            <span className="material-symbols-outlined !text-2xl">dashboard</span>
                            <p className="text-sm font-medium">Dashboard</p>
                        </Link>
                        <Link className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20" to="/provider/bookings">
                            <span className="material-symbols-outlined !text-2xl">book_online</span>
                            <p className="text-sm font-medium">Bookings</p>
                        </Link>
                        <Link className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20" to="/provider/services">
                            <span className="material-symbols-outlined !text-2xl">inventory_2</span>
                            <p className="text-sm font-medium">My Services</p>
                        </Link>
                        <Link className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20" to="/provider/calendar">
                            <span className="material-symbols-outlined !text-2xl">calendar_month</span>
                            <p className="text-sm font-medium">Calendar</p>
                        </Link>
                        <Link className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20" to="/provider/earnings">
                            <span className="material-symbols-outlined !text-2xl">payments</span>
                            <p className="text-sm font-medium">Earnings</p>
                        </Link>
                        <Link className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary/10 dark:hover:bg-primary/20" to="/provider/settings">
                            <span className="material-symbols-outlined !text-2xl">settings</span>
                            <p className="text-sm font-medium">Settings</p>
                        </Link>
                    </nav>
                </div>
                <button className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:opacity-90 transition-opacity">
                    <span className="truncate">Add New Service</span>
                </button>
            </div>
        </aside>
    );
};

export default ProviderSidebar;
