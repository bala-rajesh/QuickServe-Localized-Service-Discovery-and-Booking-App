import React, { useState } from 'react'; 
import BookingTabs from './BookingTabs';
import SearchFilters from './SearchFilters';
import BookingCard from './BookingCard';
import { useAuth } from './AuthContext';

function Dashboard({ bookings, loading, onRescheduleClick, activeTab, onTabChange, searchFilters, onFilterChange }) {
    const { user } = useAuth();
    const [viewingBooking, setViewingBooking] = useState(null);

    // Filtering is now handled by the parent component via API

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${day}-${month}-${year}`;
        }
        return dateString;
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px' }}>Welcome back, {user?.fullName || 'User'}!</h1>
                
                <BookingTabs activeTab={activeTab} onTabChange={onTabChange} /> 
                
                <div style={{ margin: '24px 0', width: '100%' }}>
                    <SearchFilters filters={searchFilters} onFilterChange={onFilterChange} />
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading bookings...</div>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(3, 1fr)', 
                        gap: '24px', 
                        width: '100%' 
                    }}>
                        {bookings.map(booking => (
                            <BookingCard 
                                key={booking.id} 
                                {...booking} 
                                providerImage={booking.image} 
                                onDetailsClick={() => setViewingBooking(booking)}
                                onRescheduleClick={() => onRescheduleClick(booking)} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* --- DETAILS MODAL OVERLAY --- */}
            {viewingBooking && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', 
                    alignItems: 'center', zIndex: 1000, padding: '20px'
                }}>
                    <div style={{ 
                        backgroundColor: 'white', padding: '30px', borderRadius: '16px', 
                        maxWidth: '500px', width: '100%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 style={{ margin: 0, color: '#007bff' }}>Booking Details</h2>
                            <button onClick={() => setViewingBooking(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
                        </div>
                        
                        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <p><strong>Provider:</strong> {viewingBooking.providerName}</p>
                            <p><strong>Service:</strong> {viewingBooking.serviceType}</p>
                            <p><strong>Cost:</strong> ₹{viewingBooking.price}</p>
                            <p><strong>Status:</strong> <span style={{ color: viewingBooking.status === 'Booked' ? 'green' : 'orange' }}>{viewingBooking.status}</span></p>
                            <p><strong>Date:</strong> {formatDate(viewingBooking.date)}</p>
                            <p><strong>Time:</strong> {formatTime(viewingBooking.time)}</p>
                            <div style={{ backgroundColor: '#f9fafb', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
                                <p style={{ margin: 0, fontWeight: '600', marginBottom: '5px' }}>Description:</p>
                                <p style={{ margin: 0, color: '#555', fontSize: '0.9rem' }}>{viewingBooking.description}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => setViewingBooking(null)}
                            style={{ 
                                width: '100%', marginTop: '25px', padding: '12px', 
                                backgroundColor: '#007bff', color: 'white', border: 'none', 
                                borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
                            }}
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;