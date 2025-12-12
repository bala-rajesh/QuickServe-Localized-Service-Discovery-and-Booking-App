import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { statusFilterState } from '../../state/atoms';
import CustomDateFilter from '../../components/CustomDateFilter';
import { usePaginatedBookings } from '../../hooks/useBookings';
import { updateBookingStatusAPI } from '../../api/BookingService';
import Pagination from '../../components/Pagination';

const BookingsPage = () => {
    const [statusFilter, setStatusFilter] = useRecoilState(statusFilterState);
    const { loading, error, bookingsData, fetchBookings } = usePaginatedBookings();
    const [editingAmountId, setEditingAmountId] = useState(null);
    const [amountValue, setAmountValue] = useState('');

    const handleUpdateAndRefresh = async (bookingId, newStatus) => {
        await updateBookingStatusAPI(bookingId, { status: newStatus });
        fetchBookings(bookingsData.currentPage ?? 0); // Refresh the current page
    };

    const handleSaveAmount = (bookingId) => {
        const newAmount = parseFloat(amountValue);
        if (isNaN(newAmount)) return; // Or show an error
        // updateBooking(bookingId, { amount: newAmount, providerChanges: true });
        // Note: Amount update API is not yet available in backend.
        setEditingAmountId(null);
        setAmountValue('');
    };

    const statusFilters = [
        { key: 'all', label: 'All' },
        { key: 'pending', label: 'New' },
        { key: 'confirmed', label: 'Confirmed' },
        { key: 'completed', label: 'Completed' },
        { key: 'cancelled', label: 'Cancelled' },
    ];

    const formatDate = (dateString, timeString) => {
        const date = new Date(dateString);
        if (timeString) {
            const [hours, minutes] = timeString.split(':');
            date.setHours(hours, minutes);
        }
        return date.toLocaleDateString('en-US', {
            month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    // Render loading or error states
    if (loading && !(bookingsData.content && bookingsData.content.length > 0)) return <div className="p-8 text-center">Loading bookings...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error loading bookings.</div>;

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bookings</h1>
            {/* Filters */}
            <div className="flex flex-wrap gap-6 justify-between items-center">
                <div>
                    <span className="text-sm font-medium mr-3">Status:</span>
                    <div className="inline-flex rounded-lg shadow-sm">
                        {statusFilters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setStatusFilter(filter.key)}
                                className={`px-4 py-2 text-sm font-medium capitalize border border-gray-200 dark:border-gray-700 ${statusFilter === filter.key
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    } first:rounded-l-lg last:rounded-r-lg`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">Date:</span>
                    <CustomDateFilter />
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {bookingsData.content.map((booking) => (
                                <tr
                                    key={booking.bookingId} className={(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && new Date(booking.scheduledDate) < new Date() ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div>
                                            <div className="font-bold text-text-light dark:text-text-dark">{booking.customerName}</div>
                                            <div className="text-xs text-gray-500">{booking.customerContactPhone || 'Hidden'}</div>
                                            <div className="text-xs text-gray-500">{booking.jobLocationAddress || 'Hidden'}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.serviceTitle}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-secondary">
                                        {editingAmountId === booking.bookingId ? ( // In edit mode
                                            <div className="flex items-center gap-2">
                                                <input type="number" placeholder="Amount" defaultValue={booking.agreedPrice || ''} onChange={(e) => setAmountValue(e.target.value)} className="w-24 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm sm:text-xs" />
                                                <button onClick={() => handleSaveAmount(booking.bookingId)} className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">Save</button>
                                                <button onClick={() => setEditingAmountId(null)} className="text-xs text-gray-500 hover:underline">Cancel</button>
                                            </div>
                                        ) : ( // Not in edit mode
                                            <div onClick={() => { if (booking.status === 'PENDING') { setEditingAmountId(booking.bookingId); setAmountValue(booking.agreedPrice || ''); } }} className={booking.status === 'PENDING' ? 'cursor-pointer p-2 -m-2' : 'p-2 -m-2'}>
                                                {booking.agreedPrice ? `₹${booking.agreedPrice.toLocaleString('en-IN')}` : (
                                                    booking.status === 'PENDING' ? <span className="text-gray-400 font-normal">Add Amount</span> : '-'
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(booking.scheduledDate, booking.scheduledTime)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                    booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800' // Cancelled or Declined
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {booking.status === 'PENDING' && (
                                            <div className="flex items-center gap-2">
                                                {booking.agreedPrice && editingAmountId !== booking.bookingId ? (
                                                    <button onClick={() => handleUpdateAndRefresh(booking.bookingId, 'CONFIRMED')} className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">Accept</button>
                                                ) : null}
                                                <button onClick={() => handleUpdateAndRefresh(booking.bookingId, 'REJECTED')} className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">Decline</button>
                                            </div>
                                        )}
                                        {booking.status === 'CONFIRMED' && (
                                            <div className="flex items-center gap-4">
                                                <button onClick={() => handleUpdateAndRefresh(booking.bookingId, 'COMPLETED')} className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200">
                                                    Complete
                                                </button>
                                                <button onClick={() => handleUpdateAndRefresh(booking.bookingId, 'CANCELLED')} className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <Pagination
                    currentPage={bookingsData.currentPage ?? 0}
                    totalPages={bookingsData.totalPages}
                    totalElements={bookingsData.totalElements}
                    onPageChange={fetchBookings}
                />
            </div>
        </div>
    );
};

export default BookingsPage;