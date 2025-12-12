import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { PageTransition, StaggerContainer, StaggerItem, ButtonTap } from '../components/AnimationWrapper';

const ProviderBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                if (user?.id) {
                    const data = await api.bookings.getByProvider(user.id);
                    setBookings(data);
                }
            } catch (err) {
                setError('Failed to load bookings');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleStatusUpdate = async (bookingId, newStatus) => {
        try {
            await api.bookings.updateStatus(bookingId, newStatus);
            // Refresh bookings
            const data = await api.bookings.getByProvider(user.id);
            setBookings(data);
        } catch (err) {
            console.error('Failed to update status', err);
            alert('Failed to update status');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading bookings...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <PageTransition className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">All</button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-gray-700">Pending</button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-gray-700">Confirmed</button>
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search bookings..." className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200/20 dark:border-gray-700 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Service</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date & Time</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Amount</th>
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No bookings found.</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">
                                                {booking.customerName ? booking.customerName.charAt(0) : 'C'}
                                            </div>
                                            <span className="font-medium">{booking.customerName || 'Customer'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{booking.serviceName || 'Service'}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{new Date(booking.bookingDate).toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">${booking.amount || '0.00'}</td>
                                    <td className="px-6 py-4 text-right">
                                        {booking.status === 'PENDING' && (
                                            <div className="flex justify-end gap-2">
                                                <ButtonTap
                                                    onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                    className="text-green-600 hover:text-green-800 font-medium text-sm"
                                                >
                                                    Accept
                                                </ButtonTap>
                                                <ButtonTap
                                                    onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                >
                                                    Decline
                                                </ButtonTap>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </PageTransition>
    );
};

export default ProviderBookings;
