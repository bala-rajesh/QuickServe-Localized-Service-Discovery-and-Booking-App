import React, { useState, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import Summary from '../../components/Summary';
import BookingForm from '../../components/BookingForm';
import { useAlert } from '../../components/CustomAlert';
import CustomerService from '../../api/CustomerService';
import RatingModal from '../../components/RatingModal'; // Assuming this new component is created


import ConfirmationModal from '../../components/ConfirmationModal';

function CustomerBookingsPage() {
    const { showAlert } = useAlert();
    const [currentView, setCurrentView] = useState('dashboard');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rescheduleData, setRescheduleData] = useState(null);

    // Modal State
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [bookingToCancel, setBookingToCancel] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    // Rating Modal State
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [bookingToRate, setBookingToRate] = useState(null);
    const [ratingLoading, setRatingLoading] = useState(false);

    // ... existing filter states ...
    const [activeTab, setActiveTab] = useState('All');
    const [searchFilters, setSearchFilters] = useState({ searchTerm: '', serviceType: '', dateRange: '' });
    const [stats, setStats] = useState({ totalBooked: 0, thisWeek: 0 });

    // ... fetchBookings and fetchStats ...
    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await CustomerService.getBookings({
                status: activeTab,
                query: searchFilters.searchTerm,
                serviceType: searchFilters.serviceType
            });
            setBookings(data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
            showAlert("Failed to fetch bookings.", "error");
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await CustomerService.getBookingStats();
            setStats(data);
        } catch (error) {
            console.error("Error fetching stats:", error);
            // Optionally show an alert if stats are critical
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [activeTab, searchFilters.searchTerm, searchFilters.serviceType]);

    useEffect(() => {
        fetchStats();
    }, []);

    const handleFilterUpdate = (key, value) => {
        setSearchFilters(prev => ({ ...prev, [key]: value }));
    };

    const switchToDashboard = () => {
        setCurrentView('dashboard');
        setRescheduleData(null);
    };

    const switchToBooking = () => {
        setRescheduleData(null);
        setCurrentView('booking');
    };

    const handleRescheduleStart = (booking) => {
        setRescheduleData(booking);
        setCurrentView('booking');
    };

    const handleRescheduleSubmit = async (formData) => {
        if (!rescheduleData) return;

        const payload = {
            ...formData,
            serviceTitle: formData.category
        };

        try {
            await CustomerService.rescheduleBooking(rescheduleData.id, payload);
            showAlert("Booking rescheduled successfully!", "success");
            switchToDashboard();
            fetchBookings(); // Refresh list
            fetchStats(); // Refresh stats
        } catch (error) {
            console.error("Reschedule error:", error);
            showAlert(error.message || "An error occurred during reschedule.", "error");
        }
    };

    const openCancelModal = (bookingId) => {
        setBookingToCancel(bookingId);
        setCancelModalOpen(true);
    };

    const closeCancelModal = () => {
        setCancelModalOpen(false);
        setBookingToCancel(null);
    };

    const confirmCancel = async () => {
        if (!bookingToCancel) return;

        setCancelLoading(true);
        try {
            await CustomerService.cancelBooking(bookingToCancel);
            showAlert('Booking cancelled successfully', 'success');
            fetchBookings();  // Refresh list
            fetchStats();  // Update stats
            closeCancelModal();
        } catch (error) {
            console.error('Cancel error:', error);
            showAlert(error.message || 'An error occurred while canceling', 'error');
        } finally {
            setCancelLoading(false);
        }
    };

    const openRatingModal = (booking) => {
        setBookingToRate(booking);
        setRatingModalOpen(true);
    };

    const closeRatingModal = () => {
        setRatingModalOpen(false);
        setBookingToRate(null);
    };

    const handleRatingSubmit = async ({ rating, comment }) => {
        if (!bookingToRate) return;
        if (rating === 0) {
            showAlert("Please select a rating.", "warning");
            return;
        }

        setRatingLoading(true);
        try {
            await CustomerService.createReview({
                bookingId: bookingToRate.id, // This is the booking ID
                serviceId: bookingToRate.serviceId, // Pass the service ID for service-specific rating update
                rating,
                comment
            });
            showAlert('Thank you for your review!', 'success');
            fetchBookings(); // Refresh list to show it's reviewed
            closeRatingModal();
        } catch (error) {
            showAlert(error.message || 'Failed to submit review.', 'error');
        } finally {
            setRatingLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div style={{ width: '100%', boxSizing: 'border-box' }}>
                {currentView === 'dashboard' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        <Dashboard
                            bookings={bookings}
                            loading={loading}
                            onRescheduleClick={handleRescheduleStart}
                            onCancelClick={openCancelModal}
                            onRateClick={openRatingModal}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            searchFilters={searchFilters}
                            onFilterChange={handleFilterUpdate}
                        />
                        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '30px', marginBottom: '50px' }}>
                            <Summary stats={stats} />
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <BookingForm
                            onCancel={switchToDashboard}
                            initialCategory={rescheduleData ? rescheduleData.serviceType : ''}
                            initialData={rescheduleData}
                            onSubmit={handleRescheduleSubmit}
                        />
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={cancelModalOpen}
                onClose={closeCancelModal}
                onConfirm={confirmCancel}
                title="Cancel Booking"
                message="Are you sure you want to cancel this booking? This action cannot be undone."
                confirmText="Yes, Cancel Booking"
                cancelText="No, Keep It"
                loading={cancelLoading}
                danger={true}
            />

            <RatingModal
                isOpen={ratingModalOpen}
                onClose={closeRatingModal}
                onSubmit={handleRatingSubmit}
                booking={bookingToRate}
                loading={ratingLoading}
            />
        </div>
    );
}

export default CustomerBookingsPage;