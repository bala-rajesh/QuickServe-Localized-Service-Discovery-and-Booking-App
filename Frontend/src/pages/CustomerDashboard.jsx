import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PageTransition, StaggerContainer, StaggerItem, CardHover } from '../components/AnimationWrapper';

const CustomerDashboard = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (user?.id) {
                    const data = await api.bookings.getByCustomer(user.id);
                    setBookings(data);
                }
            } catch (err) {
                console.error('Failed to load bookings', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' && new Date(b.bookingDate) > new Date());
    const pendingBookings = bookings.filter(b => b.status === 'PENDING');

    if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

    return (
        <PageTransition className="flex flex-col gap-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Customer'}!</h1>
                    <p className="text-white/90 mb-6 max-w-xl">Ready to find your next service? Browse our top-rated professionals or check your upcoming appointments.</p>
                    <Link to="/services" className="px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-md hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                        <span className="material-symbols-outlined">search</span>
                        Find a Service
                    </Link>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                    <span className="material-symbols-outlined text-[300px]">handyman</span>
                </div>
            </div>

            {/* Stats Grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StaggerItem>
                    <CardHover className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm flex items-center gap-4 cursor-default">
                        <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">calendar_month</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Upcoming Bookings</p>
                            <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                        </div>
                    </CardHover>
                </StaggerItem>
                <StaggerItem>
                    <CardHover className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm flex items-center gap-4 cursor-default">
                        <div className="h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">pending</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Requests</p>
                            <p className="text-2xl font-bold">{pendingBookings.length}</p>
                        </div>
                    </CardHover>
                </StaggerItem>
                <StaggerItem>
                    <CardHover className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm flex items-center gap-4 cursor-default">
                        <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Completed</p>
                            <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'COMPLETED').length}</p>
                        </div>
                    </CardHover>
                </StaggerItem>
            </StaggerContainer>

            {/* Recent Activity */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Bookings</h2>
                    <Link to="/customer/bookings" className="text-primary font-medium hover:underline">View All</Link>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm overflow-hidden">
                    {bookings.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            You haven't made any bookings yet.
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Service</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Provider</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {bookings.slice(0, 5).map(booking => (
                                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4 font-medium">{booking.serviceName || 'Service'}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{booking.providerName || 'Provider'}</td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium">${booking.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default CustomerDashboard;
