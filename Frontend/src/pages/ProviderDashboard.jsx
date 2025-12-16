import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PageTransition, StaggerContainer, StaggerItem, CardHover, ButtonTap } from '../components/AnimationWrapper';

const ProviderDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        earnings: 0,
        upcoming: 0,
        pending: 0,
        rating: 4.8 // Hardcoded for now as there's no reviews API yet
    });
    const [recentRequests, setRecentRequests] = useState([]);
    const [upcomingSchedule, setUpcomingSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.id) {
                    const bookings = await api.bookings.getByProvider(user.id);

                    // Calculate Stats
                    const earnings = bookings
                        .filter(b => b.status === 'COMPLETED')
                        .reduce((acc, curr) => acc + (curr.amount || 0), 0);

                    const upcoming = bookings.filter(b => b.status === 'CONFIRMED' && new Date(b.bookingDate) > new Date()).length;
                    const pending = bookings.filter(b => b.status === 'PENDING').length;

                    setStats(prev => ({ ...prev, earnings, upcoming, pending }));

                    // Recent Requests (Pending)
                    setRecentRequests(bookings
                        .filter(b => b.status === 'PENDING')
                        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
                        .slice(0, 5)
                    );

                    // Upcoming Schedule
                    setUpcomingSchedule(bookings
                        .filter(b => b.status === 'CONFIRMED' && new Date(b.bookingDate) > new Date())
                        .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
                        .slice(0, 5)
                    );
                }
            } catch (err) {
                console.error('Failed to load dashboard data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleAccept = async (bookingId) => {
        try {
            await api.bookings.updateStatus(bookingId, 'CONFIRMED');
            // Optimistic update or refetch could go here, for simplicity we'll reload the page or trigger a refetch
            window.location.reload();
        } catch (err) {
            alert('Failed to accept booking');
        }
    };

    const handleDecline = async (bookingId) => {
        try {
            await api.bookings.updateStatus(bookingId, 'CANCELLED');
            window.location.reload();
        } catch (err) {
            alert('Failed to decline booking');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <PageTransition className="flex flex-col gap-8">
            {/* Stats Section */}
            <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                    <CardHover className="flex flex-col gap-2 rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-200/20 dark:border-gray-700 shadow-sm cursor-default">
                        <p className="text-base font-medium">Total Earnings</p>
                        <p className="tracking-light text-3xl font-bold text-secondary">${stats.earnings.toFixed(2)}</p>
                    </CardHover>
                </StaggerItem>
                <StaggerItem>
                    <CardHover className="flex flex-col gap-2 rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-200/20 dark:border-gray-700 shadow-sm cursor-default">
                        <p className="text-base font-medium">Upcoming Bookings</p>
                        <p className="tracking-light text-3xl font-bold">{stats.upcoming}</p>
                    </CardHover>
                </StaggerItem>
                <StaggerItem>
                    <CardHover className="flex flex-col gap-2 rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-200/20 dark:border-gray-700 shadow-sm cursor-default">
                        <p className="text-base font-medium">Pending Requests</p>
                        <p className="tracking-light text-3xl font-bold">{stats.pending}</p>
                    </CardHover>
                </StaggerItem>
                <StaggerItem>
                    <CardHover className="flex flex-col gap-2 rounded-lg bg-white dark:bg-gray-800 p-6 border border-gray-200/20 dark:border-gray-700 shadow-sm cursor-default">
                        <p className="text-base font-medium">Service Rating</p>
                        <p className="tracking-light text-3xl font-bold">{stats.rating}/5</p>
                    </CardHover>
                </StaggerItem>
            </StaggerContainer>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column */}
                <div className="col-span-1 lg:col-span-2 flex flex-col gap-8">
                    {/* Booking Requests Table */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center pb-3">
                            <h2 className="text-xl font-bold">New Booking Requests</h2>
                            <a className="text-sm font-medium text-primary hover:underline" href="/provider/bookings">View All</a>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-gray-200/20 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-gray-900">
                                        <th className="w-2/6 px-4 py-3 text-left text-sm font-medium">Customer</th>
                                        <th className="w-2/6 px-4 py-3 text-left text-sm font-medium">Service</th>
                                        <th className="w-1/6 px-4 py-3 text-left text-sm font-medium">Date/Time</th>
                                        <th className="w-1/6 px-4 py-3 text-left text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-4 py-4 text-center text-sm text-gray-500">No new requests.</td>
                                        </tr>
                                    ) : (
                                        recentRequests.map(booking => (
                                            <tr key={booking.id} className="border-t border-gray-200/20 dark:border-gray-700">
                                                <td className="h-[72px] px-4 py-2 text-sm">{booking.customerName || 'Customer'}</td>
                                                <td className="h-[72px] px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{booking.serviceName || 'Service'}</td>
                                                <td className="h-[72px] px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{new Date(booking.bookingDate).toLocaleString()}</td>
                                                <td className="h-[72px] px-4 py-2 text-sm">
                                                    <div className="flex gap-2">
                                                        <ButtonTap onClick={() => handleAccept(booking.id)} className="flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-bold text-gray-800">Accept</ButtonTap>
                                                        <ButtonTap onClick={() => handleDecline(booking.id)} className="flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-bold text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600">Decline</ButtonTap>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Earnings Chart */}
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold pb-3">Earnings Overview</h2>
                        <div className="rounded-lg border border-gray-200/20 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
                                <p className="text-2xl font-bold text-secondary">${stats.earnings.toFixed(2)}</p>
                            </div>
                            <div className="mt-4 h-60 flex items-end justify-center bg-gray-50 dark:bg-gray-900 rounded-md">
                                <p className="text-gray-400">Chart Placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="col-span-1 lg:col-span-1 flex flex-col gap-8">
                    {/* Schedule */}
                    <div>
                        <h2 className="text-xl font-bold pb-3">Your Week Ahead</h2>
                        <div className="rounded-lg border border-gray-200/20 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 flex flex-col gap-4 shadow-sm">
                            {upcomingSchedule.length === 0 ? (
                                <p className="text-sm text-gray-500">No upcoming bookings.</p>
                            ) : (
                                upcomingSchedule.map(booking => {
                                    const date = new Date(booking.bookingDate);
                                    return (
                                        <div key={booking.id} className="flex items-center gap-4">
                                            <div className="flex flex-col items-center justify-center rounded-md bg-primary/10 dark:bg-primary/20 p-2 w-14">
                                                <span className="text-xs font-bold uppercase text-primary">{date.toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-xl font-bold text-primary">{date.getDate()}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium">{booking.serviceName || 'Service'}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {booking.customerName}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <ButtonTap className="mt-2 w-full flex items-center justify-center h-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">View Full Calendar</ButtonTap>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProviderDashboard;
