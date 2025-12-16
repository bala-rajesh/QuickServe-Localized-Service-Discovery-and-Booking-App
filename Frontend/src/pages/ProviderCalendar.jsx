import React from 'react';

const ProviderCalendar = () => {
    return (
        <div className="flex flex-col h-full gap-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">October 2023</h2>
                    <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium">Month</button>
                    <button className="px-3 py-1.5 bg-primary text-white rounded-md text-sm font-medium">Week</button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-medium">Day</button>
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm p-6 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-6xl mb-4 opacity-50">calendar_month</span>
                    <p className="text-lg font-medium">Calendar View Placeholder</p>
                    <p className="text-sm">Full calendar functionality coming soon.</p>
                </div>
            </div>
        </div>
    );
};

export default ProviderCalendar;
