import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const CustomerBookings = () => {
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

    if (loading) return <div className="p-8 text-center">Loading bookings...</div>;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">All</button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-gray-700">Upcoming</button>
                    <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-gray-700">Past</button>
                </div>
            </div>

            <div className="grid gap-4">
                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
                        <a href="/services" className="text-primary font-bold hover:underline">Find a Service</a>
                    </div>
                ) : (
                    bookings.map(booking => (
                        <div key={booking.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/20 dark:border-gray-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-gray-400">cleaning_services</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{booking.serviceName || 'Service Name'}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Provider: {booking.providerName || 'Provider Name'}</p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">{new Date(booking.bookingDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                                        booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                    }`}>
                                    {booking.status}
                                </span>
                                <p className="font-bold text-lg">${booking.amount}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomerBookings;
