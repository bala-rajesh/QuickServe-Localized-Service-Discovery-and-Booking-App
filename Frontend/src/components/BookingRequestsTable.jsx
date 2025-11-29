import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { pendingRequestsSelector } from '../state/selectors';
import { bookingsState, statusFilterState } from '../state/atoms';
import { useUpdateBooking } from '../hooks/useBookings';

const BookingRequestsTable = () => {
    const pendingRequests = useRecoilValue(pendingRequestsSelector);
    const [editingAmountId, setEditingAmountId] = useState(null);
    const [amountValue, setAmountValue] = useState('');
    const updateBooking = useUpdateBooking();
    const navigate = useNavigate();
    const setStatusFilter = useSetRecoilState(statusFilterState);

    const handleViewAllClick = () => {
        // Set the filter state for the BookingsPage
        setStatusFilter('pending');
        // Navigate to the bookings page
        navigate('/service-provider/bookings');
    };
    const handleSaveAmount = (bookingId) => {
        const newAmount = parseFloat(amountValue);
        if (isNaN(newAmount)) return;
        updateBooking(bookingId, { amount: newAmount, providerChanges: true });
        setEditingAmountId(null);
        setAmountValue('');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${month} ${day}, ${time}`;
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center pb-3">
                <h2 className="text-xl font-bold">New Booking Requests</h2>
                <button onClick={handleViewAllClick} className="text-sm font-medium text-primary hover:underline">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark">
                <table className="w-full">
                    <thead>
                        <tr className="bg-background-light dark:bg-background-dark">
                            <th className="w-3/12 px-4 py-3 text-left text-sm font-medium">Customer</th>
                            <th className="w-2/12 px-4 py-3 text-left text-sm font-medium">Service</th>
                            <th className="w-2/12 px-4 py-3 text-left text-sm font-medium">Amount</th>
                            <th className="w-2/12 px-4 py-3 text-left text-sm font-medium">Date/Time</th>
                            <th className="w-1/6 px-4 py-3 text-left text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.map(request => (
                            <tr
                                key={request.id}
                                className={`border-t border-border-light/20 dark:border-border-dark ${new Date(request.datetime) < new Date() ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}
                            >
                                <td className="px-4 py-3 text-sm">
                                    <div>
                                        <div className="font-bold text-text-light dark:text-text-dark">{request.customer}</div>
                                        <div className="text-xs text-gray-500">{request.phone}</div>
                                        <div className="text-xs text-gray-500">{request.address}</div>
                                    </div>
                                </td>
                                <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">
                                    {request.service}
                                </td>
                                <td className="h-[72px] px-4 py-2 text-sm font-semibold text-secondary">
                                    {editingAmountId === request.id ? ( // In edit mode
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                defaultValue={request.amount || ''}
                                                onChange={(e) => setAmountValue(e.target.value)}
                                                className="w-20 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm sm:text-xs"
                                            />
                                            <button onClick={() => handleSaveAmount(request.id)} className="flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-bold text-white hover:brightness-90">Save</button>
                                            <button onClick={() => setEditingAmountId(null)} className="text-xs text-gray-500 hover:underline">Cancel</button>
                                        </div>
                                    ) : ( // Not in edit mode
                                        <div onClick={() => { setEditingAmountId(request.id); setAmountValue(request.amount || ''); }} className="cursor-pointer p-2 -m-2">
                                            {request.amount ? `₹${request.amount.toLocaleString('en-IN')}` : <span className="text-gray-400 font-normal">Add Amount</span>}
                                        </div>
                                    )}
                                </td>
                                <td className="h-[72px] px-4 py-2 text-sm text-text-light/70 dark:text-text-dark/70">
                                    {formatDate(request.datetime)}
                                </td>
                                <td className="h-[72px] px-4 py-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        {request.amount && editingAmountId !== request.id && !request.providerChanges && (
                                            <button onClick={() => updateBooking(request.id, { status: 'confirmed' })} className="flex h-8 items-center justify-center rounded-md bg-secondary px-3 text-xs font-bold text-text-light hover:brightness-90">Accept</button>
                                        )}

                                        <button
                                            onClick={() => updateBooking(request.id, { status: 'declined' })}
                                            className="flex h-8 items-center justify-center rounded-md bg-transparent px-3 text-xs font-bold text-text-light/70 hover:text-text-light dark:text-text-dark/70 hover:bg-Decline ring-1 ring-inset ring-border-light dark:ring-border-dark"
                                        >Decline</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingRequestsTable;
