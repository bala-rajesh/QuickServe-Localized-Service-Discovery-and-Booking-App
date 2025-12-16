import React from 'react';

const ProviderEarnings = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Earnings</p>
                    <h3 className="text-3xl font-bold mt-2">$12,450.00</h3>
                    <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        +12% from last month
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pending Payouts</p>
                    <h3 className="text-3xl font-bold mt-2">$850.00</h3>
                    <p className="text-sm text-gray-500 mt-2">Next payout: Oct 31</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Completed Jobs</p>
                    <h3 className="text-3xl font-bold mt-2">142</h3>
                    <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        +5 this week
                    </p>
                </div>
            </div>

            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Revenue Analytics</h3>
                <div className="h-64 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center text-gray-400">
                    Chart Placeholder
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">Recent Transactions</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 24, 2023</td>
                                <td className="px-6 py-4 font-medium">Payout to Bank Account</td>
                                <td className="px-6 py-4"><span className="text-green-600 text-sm font-medium">Completed</span></td>
                                <td className="px-6 py-4 text-right font-medium">-$1,200.00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-gray-500">Oct 22, 2023</td>
                                <td className="px-6 py-4 font-medium">Payment for Job #1234</td>
                                <td className="px-6 py-4"><span className="text-green-600 text-sm font-medium">Received</span></td>
                                <td className="px-6 py-4 text-right font-medium text-green-600">+$150.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProviderEarnings;
