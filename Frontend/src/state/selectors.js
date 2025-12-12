import { selector } from 'recoil';
import { bookingsState, earningsState, statusFilterState, dateFilterState, earningsFilterState, earningsDateContextState, dashboardListsState, dashboardStatsState, dashboardChartsState } from './atoms';

export const pendingRequestsSelector = selector({
    key: 'pendingRequestsSelector',
    get: ({ get }) => {
        const lists = get(dashboardListsState);
        return lists.newRequests;
    },
});

export const upcomingBookingsSelector = selector({
    key: 'upcomingBookingsSelector',
    get: ({ get }) => {
        const lists = get(dashboardListsState);
        return lists.upcomingBookings;
    },
});

export const filteredBookingsSelector = selector({
    key: 'filteredBookingsSelector',
    get: ({ get }) => {
        const bookings = get(bookingsState);
        const status = get(statusFilterState);
        const dateFilter = get(dateFilterState);

        const now = new Date();
        const startOfToday = new Date(now.setHours(0, 0, 0, 0));
        const endOfToday = new Date(now.setHours(23, 59, 59, 999));
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return bookings
            .filter(booking => {
                // Status filter
                if (status !== 'all' && booking.status !== status) return false;

                // Special case for cancelled, which includes declined
                if (status === 'cancelled' && !['cancelled', 'declined'].includes(booking.status)) return false;

                // Date filter
                if (Array.isArray(dateFilter)) {
                    const bookingDate = new Date(booking.datetime);
                    const startDate = new Date(dateFilter[0]);
                    const endDate = new Date(dateFilter[1]);
                    if (bookingDate < startDate || bookingDate > endDate) return false;
                }
                return true;
            })
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime)); // Sort by oldest first
    }
});

export const totalEarningsSelector = selector({
    key: 'totalEarningsSelector',
    get: ({ get }) => {
        const earnings = get(earningsState);
        return earnings.total;
    },
});

export const earningsOverviewSelector = selector({
    key: 'earningsOverviewSelector',
    get: ({ get }) => {
        const earnings = get(earningsState);
        return earnings.overview;
    },
});

export const statsSelector = selector({
    key: 'statsSelector',
    get: ({ get }) => {
        // Directly return the pre-calculated stats from the API.
        const stats = get(dashboardStatsState);
        return {
            pendingRequests: stats.pendingRequestsCount,
            upcomingBookings: stats.upcomingCount,
            totalEarnings: stats.todayEarnings,
            averageRating: stats.averageRating,
        };
    },
});

export const earningsPageStatsSelector = selector({
    key: 'earningsPageStatsSelector',
    get: ({ get }) => {
        const filter = get(earningsFilterState);
        const dateContext = get(earningsDateContextState);
        const bookings = get(bookingsState);
        const completedBookings = bookings.filter(b => b.status === 'completed' && b.amount);

        if (filter === 'day') {
            const startOfWeek = new Date(dateContext);
            startOfWeek.setDate(dateContext.getDate() - dateContext.getDay());
            startOfWeek.setHours(0, 0, 0, 0);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            const weekBookings = completedBookings.filter(b => new Date(b.datetime) >= startOfWeek && new Date(b.datetime) <= endOfWeek);

            const totalRevenue = weekBookings.reduce((sum, b) => sum + b.amount, 0);
            const averagePerBooking = weekBookings.length > 0 ? totalRevenue / weekBookings.length : 0;

            return { totalRevenue, averagePerBooking, totalCompletedBookings: weekBookings.length };

        } else if (filter === 'week') {
            const startOfMonth = new Date(dateContext.getFullYear(), dateContext.getMonth(), 1);
            const endOfMonth = new Date(dateContext.getFullYear(), dateContext.getMonth() + 1, 0);
            endOfMonth.setHours(23, 59, 59, 999);

            const monthBookings = completedBookings.filter(b => new Date(b.datetime) >= startOfMonth && new Date(b.datetime) <= endOfMonth);

            const totalRevenue = monthBookings.reduce((sum, b) => sum + b.amount, 0);
            const averagePerBooking = monthBookings.length > 0 ? totalRevenue / monthBookings.length : 0;

            return { totalRevenue, averagePerBooking, totalCompletedBookings: monthBookings.length };

        } else { // month
            const year = dateContext.getFullYear();

            const yearBookings = completedBookings.filter(b => new Date(b.datetime).getFullYear() === year);

            const totalRevenue = yearBookings.reduce((sum, b) => sum + b.amount, 0);
            const averagePerBooking = yearBookings.length > 0 ? totalRevenue / yearBookings.length : 0;

            return { totalRevenue, averagePerBooking, totalCompletedBookings: yearBookings.length };
        }
    }
});

export const filteredEarningsChartSelector = selector({
    key: 'filteredEarningsChartSelector',
    get: ({ get }) => {
        const bookings = get(bookingsState);
        const filter = get(earningsFilterState);
        const dateContext = get(earningsDateContextState);
        const completedBookings = bookings.filter(b => b.status === 'completed' && b.amount);

        if (filter === 'day') {
            const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const startOfWeek = new Date(dateContext);
            startOfWeek.setDate(dateContext.getDate() - dateContext.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);

            const weekData = Array(7).fill(null).map((_, i) => ({
                label: dayLabels[(startOfWeek.getDay() + i) % 7],
                earnings: 0,
            }));

            completedBookings
                .filter(b => new Date(b.datetime) >= startOfWeek && new Date(b.datetime) <= endOfWeek)
                .forEach(b => {
                    const dayIndex = new Date(b.datetime).getDay();
                    if (weekData[dayIndex]) weekData[dayIndex].earnings += b.amount;
                });
            return weekData;

        } else if (filter === 'week') {
            const startOfMonth = new Date(dateContext.getFullYear(), dateContext.getMonth(), 1);
            const endOfMonth = new Date(dateContext.getFullYear(), dateContext.getMonth() + 1, 0);
            const numWeeks = Math.ceil((endOfMonth.getDate() + startOfMonth.getDay()) / 7);

            const monthData = Array(numWeeks).fill(null).map((_, i) => ({
                label: `Week ${i + 1}`,
                earnings: 0,
            }));

            completedBookings
                .filter(b => new Date(b.datetime) >= startOfMonth && new Date(b.datetime) <= endOfMonth)
                .forEach(b => {
                    const date = new Date(b.datetime);
                    // Corrected calculation to prevent negative index
                    const weekOfMonth = Math.floor((date.getDate() - 1 + startOfMonth.getDay()) / 7);
                    if (monthData[weekOfMonth]) {
                        monthData[weekOfMonth].earnings += b.amount;
                    }
                });
            return monthData;

        } else { // month
            const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // Using acronyms
            const yearData = monthLabels.map(label => ({ label, earnings: 0 }));
            const year = dateContext.getFullYear();

            completedBookings
                .filter(b => new Date(b.datetime).getFullYear() === year)
                .forEach(b => {
                    const monthIndex = new Date(b.datetime).getMonth();
                    yearData[monthIndex].earnings += b.amount;
                });
            return yearData;
            }
    }
});

export const dashboardEarningsChartSelector = selector({
    key: 'dashboardEarningsChartSelector',
    get: ({ get }) => {
        // Directly return the pre-calculated chart data from the API.
        const chartData = get(dashboardChartsState);
        // Map the 'day' property to 'label' for the chart component
        return chartData.map(item => ({ label: item.day, earnings: item.earnings }));
    }
});
