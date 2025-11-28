import React from 'react';
import { useRecoilValue } from 'recoil';
import { statsSelector } from '../state/selectors';

const StatsSection = () => {
    const stats = useRecoilValue(statsSelector);

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
                <p className="text-base font-medium">Total Earnings</p>
                <p className="tracking-light text-3xl font-bold text-secondary">₹{stats.totalEarnings.toLocaleString('en-IN')}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
                <p className="text-base font-medium">Upcoming Bookings</p>
                <p className="tracking-light text-3xl font-bold">{stats.upcomingBookings}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
                <p className="text-base font-medium">Pending Requests</p>
                <p className="tracking-light text-3xl font-bold">{stats.pendingRequests}</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
                <p className="text-base font-medium">Service Rating</p>
                <p className="tracking-light text-3xl font-bold">4.8/5</p>
            </div>
        </div>
    );
};

export default StatsSection;

