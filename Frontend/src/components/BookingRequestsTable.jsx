import React from 'react';

const BookingRequestsTable = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center pb-3">
                <h2 className="text-xl font-bold">New Booking Requests</h2>
                <a className="text-sm font-medium text-primary hover:underline" href="#">View All</a>
            </div>
            <div className="overflow-hidden rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark">
                <table className="w-full">
                    <thead>
                        <tr className="bg-background-light dark:bg-background-dark">
                            <th className="w-2/6 px-4 py-3 text-left text-sm font-medium">Customer</th>
                            <th className="w-2/6 px-4 py-3 text-left text-sm font-medium">Service</th>
                            <th className="w-1/6 px-4 py-3 text-left text-sm font-medium">Date/Time</th>
                            <th className="w-1/6 px-4 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-border-light/20 dark:border-border-dark">
                            <td className="h-[72px] px-4 py-2 text-sm">Jane Smith</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">House Cleaning</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">Oct 26, 2:00 PM</td>
                            <td className="h-[72px] px-4 py-2 text-sm">
                                <div className="flex gap-2">
                                    <button className="flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-bold text-text-light">Accept</button>
                                    <button className="flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-bold text-text-light/70 dark:text-text-dark/70 ring-1 ring-inset ring-border-light dark:ring-border-dark">Decline</button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t border-border-light/20 dark:border-border-dark">
                            <td className="h-[72px] px-4 py-2 text-sm">Carlos Ray</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">Plumbing Repair</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">Oct 27, 10:00 AM</td>
                            <td className="h-[72px] px-4 py-2 text-sm">
                                <div className="flex gap-2">
                                    <button className="flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-bold text-text-light">Accept</button>
                                    <button className="flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-bold text-text-light/70 dark:text-text-dark/70 ring-1 ring-inset ring-border-light dark:ring-border-dark">Decline</button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t border-border-light/20 dark:border-border-dark">
                            <td className="h-[72px] px-4 py-2 text-sm">Aisha Khan</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">Garden Maintenance</td>
                            <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">Oct 27, 4:00 PM</td>
                            <td className="h-[72px] px-4 py-2 text-sm">
                                <div className="flex gap-2">
                                    <button className="flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-bold text-text-light">Accept</button>
                                    <button className="flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-bold text-text-light/70 dark:text-text-dark/70 ring-1 ring-inset ring-border-light dark:ring-border-dark">Decline</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingRequestsTable;
