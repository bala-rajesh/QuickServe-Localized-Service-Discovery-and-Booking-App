import React from 'react';
import { useRecoilState } from 'recoil';
import EarningsChart from '../../components/EarningsChart';
import { useEarnings } from '../../hooks/useBookings';
import { earningsFilterState, earningsDateContextState } from '../../state/atoms';

const EarningsPage = () => {
    const [filter, setFilter] = useRecoilState(earningsFilterState);
    const [date, setDate] = useRecoilState(earningsDateContextState);

    const { loading, error, data } = useEarnings(filter, date);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setDate(new Date()); // Reset to today when changing filter type
    };

    const handlePrev = () => {
        const newDate = new Date(date);
        if (filter === 'week') newDate.setDate(date.getDate() - 7);
        if (filter === 'month') newDate.setMonth(date.getMonth() - 1);
        if (filter === 'year') newDate.setFullYear(date.getFullYear() - 1);
        setDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(date);
        if (filter === 'week') newDate.setDate(date.getDate() + 7);
        if (filter === 'month') newDate.setMonth(date.getMonth() + 1);
        if (filter === 'year') newDate.setFullYear(date.getFullYear() + 1);
        setDate(newDate);
    };

    const getDateLabel = () => {
        if (filter === 'week') {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
            const start = new Date(d.setDate(diff));
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
        }
        if (filter === 'month') return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (filter === 'year') return date.getFullYear().toString();
    };

    if (loading && !data) return <div className="p-10 text-center">Loading earnings...</div>;

    return (
        <div className="flex flex-col gap-8">
            {error && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">Unable to load live earnings data. Showing default values.</p>
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings & Analytics</h1>
                
                <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                    {['week', 'month', 'year'].map(f => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`px-4 py-2 text-sm font-medium rounded-md capitalize ${filter === f ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 py-2">
                <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">&lt;</button>
                <span className="text-lg font-semibold min-w-[200px] text-center">{getDateLabel()}</span>
                <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">&gt;</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                    <p className="text-3xl font-bold text-secondary mt-2">₹{data?.totalRevenue?.toLocaleString('en-IN') || 0}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{data?.totalCompletedBookings || 0}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avg. per Booking</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">₹{data?.averagePerBooking?.toFixed(0) || 0}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <EarningsChart data={data?.chartData} title="Revenue Breakdown" showLink={false} />
            </div>
        </div>
    );
};

export default EarningsPage;