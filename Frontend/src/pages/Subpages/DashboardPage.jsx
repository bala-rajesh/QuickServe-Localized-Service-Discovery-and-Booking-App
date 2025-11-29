import React from 'react';
import StatsSection from '../../components/StatsSection';
import BookingRequestsTable from '../../components/BookingRequestsTable';
import EarningsChart from '../../components/EarningsChart';
import Schedule from '../../components/Schedule';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <StatsSection />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 lg:col-span-2 flex flex-col gap-8">
          <BookingRequestsTable />
          <EarningsChart />
        </div>
        <div className="col-span-3 lg:col-span-1 flex flex-col gap-8">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;