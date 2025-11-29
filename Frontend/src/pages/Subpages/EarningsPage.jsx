import React from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { earningsPageStatsSelector, filteredEarningsChartSelector } from '../../state/selectors';
import { earningsFilterState, earningsDateContextState } from '../../state/atoms';

const StatCard = ({ title, value, isCurrency = false }) => (
    <div className="flex flex-col gap-2 rounded-lg bg-card-light dark:bg-card-dark p-6 border border-border-light/20 dark:border-border-dark">
        <p className="text-base font-medium">{title}</p>
        <p className="tracking-light text-3xl font-bold text-secondary">
            {isCurrency ? `₹${value.toLocaleString('en-IN')}` : value}
        </p>
    </div>
);

const EarningsPage = () => {
    const stats = useRecoilValue(earningsPageStatsSelector);
    const chartData = useRecoilValue(filteredEarningsChartSelector);
    const [filter, setFilter] = useRecoilState(earningsFilterState);
    const [dateContext, setDateContext] = useRecoilState(earningsDateContextState);

    // Calculate the maximum earning from the currently displayed chart data
    const maxEarningInPeriod = Math.max(0, ...chartData.map(d => d.earnings));

    const getMaxEarningLabel = () => {
        if (filter === 'day') return 'Peak Day Earning';
        if (filter === 'week') return 'Peak Week Earning';
        return 'Peak Month Earning';
    };


    const filters = [
        { key: 'day', label: 'Day' },
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
    ];

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setDateContext(new Date()); // Reset to current date context when filter changes
    };

    const handlePrevious = () => {
        const newDate = new Date(dateContext);
        if (filter === 'day') {
            newDate.setDate(newDate.getDate() - 7);
        } else if (filter === 'week') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else { // month
            newDate.setFullYear(newDate.getFullYear() - 1);
        }
        setDateContext(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(dateContext);
        if (filter === 'day') {
            newDate.setDate(newDate.getDate() + 7);
        } else if (filter === 'week') {
            newDate.setMonth(newDate.getMonth() + 1);
        } else { // month
            newDate.setFullYear(newDate.getFullYear() + 1);
        }
        setDateContext(newDate);
    };

    const isNextDisabled = () => {
        const now = new Date();
        const nextContext = new Date(dateContext);

        if (filter === 'day') {
            // Disable if the start of the next week is after today
            const startOfThisWeek = new Date(dateContext);
            startOfThisWeek.setDate(dateContext.getDate() - dateContext.getDay());
            return startOfThisWeek > now;
        } else if (filter === 'week') {
            // Disable if the next month is after the current month
            const nextMonth = new Date(dateContext.getFullYear(), dateContext.getMonth() + 1, 1);
            return nextMonth > now;
        } else { // month
            // Disable if the next year is after the current year
            const nextYear = dateContext.getFullYear() + 1;
            return nextYear > now.getFullYear();
        }
    };

    const getChartTitle = () => {
        if (filter === 'day') {
            const date = dateContext;
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const weekOfMonth = Math.floor((date.getDate() - 1 + startOfMonth.getDay()) / 7) + 1;
            const monthName = date.toLocaleDateString('en-US', { month: 'long' });
            return `Week ${weekOfMonth} of ${monthName}`;
        } else if (filter === 'week') {
            return dateContext.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        }
        return dateContext.getFullYear().toString();
    };

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Revenue" value={stats.totalRevenue} isCurrency />
                <StatCard title={getMaxEarningLabel()} value={maxEarningInPeriod} isCurrency />
                <StatCard title="Completed Bookings" value={stats.totalCompletedBookings} />
                <StatCard title="Avg. Per Booking" value={Math.round(stats.averagePerBooking)} isCurrency />
            </div>

            {/* Chart Section */}
            <div className="flex flex-col">
                <div className="flex justify-between items-center pb-3">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold">Earnings Breakdown</h2>
                        <div className="flex items-center gap-2">
                            <button onClick={handlePrevious} className="text-sm font-medium p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">&lt; Prev</button>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 w-32 text-center">{getChartTitle()}</span>
                            <button onClick={handleNext} disabled={isNextDisabled()} className="text-sm font-medium p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed">Next &gt;</button>
                        </div>
                    </div>
                    <div className="inline-flex rounded-lg shadow-sm">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                onClick={() => handleFilterChange(f.key)}
                                className={`px-4 py-2 text-sm font-medium capitalize border border-gray-200 dark:border-gray-700 ${filter === f.key
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    } first:rounded-l-lg last:rounded-r-lg`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="rounded-lg border border-border-light/20 dark:border-border-dark bg-card-light dark:bg-card-dark p-6" style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart
                            className="focus:outline-none"
                            data={chartData}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(value) => `₹${value / 1000}k`} tick={{ fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }}
                                contentStyle={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    border: '1px solid #ccc',
                                    backdropFilter: 'blur(5px)',
                                    borderRadius: '0.5rem',
                                }}
                                formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Earnings']}
                            />
                            <Bar dataKey="earnings" fill="#8884d8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default EarningsPage;