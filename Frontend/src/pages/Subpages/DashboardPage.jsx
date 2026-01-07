import React from 'react';
import StatsSection from '../../components/StatsSection';
import BookingRequestsTable from '../../components/BookingRequestsTable';
import EarningsChart from '../../components/EarningsChart';
import Schedule from '../../components/Schedule';
import { useLoadInitialData, useUpdateBooking } from '../../hooks/useBookings';

// --- Loading and Error Components ---
const LoadingSpinner = () => <div className="text-center p-10">Loading Dashboard...</div>;
const ErrorDisplay = ({ error }) => <div className="text-center p-10 text-red-500">Error loading dashboard: {error.message}</div>;

const DashboardPage = () => {
  const { loading, error } = useLoadInitialData();
  const updateBookingStatus = useUpdateBooking();

  const handleAccept = (bookingId) => updateBookingStatus(bookingId, 'CONFIRMED').catch(err => console.error("Failed to accept booking:", err));
  const handleDecline = (bookingId) => updateBookingStatus(bookingId, 'REJECTED').catch(err => console.error("Failed to decline booking:", err));

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <StatsSection />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <BookingRequestsTable onAccept={handleAccept} onDecline={handleDecline} />
          <EarningsChart />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-8">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;