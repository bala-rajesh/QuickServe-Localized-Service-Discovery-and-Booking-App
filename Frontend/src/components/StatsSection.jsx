import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { statsSelector } from '../state/selectors';
import { statusFilterState } from '../state/atoms';

const StatsSection = () => {
    const stats = useRecoilValue(statsSelector);
    const navigate = useNavigate();
    const setStatusFilter = useSetRecoilState(statusFilterState);

    const handleUpcomingClick = () => {
        setStatusFilter('confirmed');
        navigate('/service-provider/bookings');
    };

    const handlePendingClick = () => {
        setStatusFilter('pending');
        navigate('/service-provider/bookings');
    };

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <button onClick={() => navigate('/service-provider/earnings')} className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark text-left hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                <p className="text-base font-medium">Today's Earnings</p>
                <p className="tracking-light text-3xl font-bold text-secondary">₹{stats.totalEarnings.toLocaleString('en-IN')}</p>
            </button>
            <button onClick={handleUpcomingClick} className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark text-left hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                <p className="text-base font-medium">Upcoming Bookings</p>
                <p className="tracking-light text-3xl font-bold">{stats.upcomingBookings}</p>
            </button>
            <button onClick={handlePendingClick} className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark text-left hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                <p className="text-base font-medium">Pending Requests</p>
                <p className="tracking-light text-3xl font-bold">{stats.pendingRequests}</p>
            </button>
            <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
                <p className="text-base font-medium">Service Rating</p>
                <p className="tracking-light text-3xl font-bold">4.8/5</p>
            </div>
        </div>
    );
};

export default StatsSection;
