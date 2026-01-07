import { useCallback, useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { dashboardStatsState, dashboardChartsState, dashboardListsState, paginatedBookingsState, statusFilterState, dateFilterState } from '../state/atoms';
import { fetchDashboardAPI, updateBookingStatusAPI, fetchBookingsAPI, fetchEarningsAPI } from '../api/BookingService';

/**
 * A custom hook that provides a function to load all initial data from the API
 * and populate the dashboard-specific Recoil atoms.
 */
export const useLoadInitialData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const setStats = useSetRecoilState(dashboardStatsState);
    const setCharts = useSetRecoilState(dashboardChartsState);
    const setLists = useSetRecoilState(dashboardListsState);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDashboardAPI();
            setStats(data.stats);
            setCharts(data.charts.thisWeekEarnings);
            setLists(data.lists);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [setStats, setCharts, setLists]);

    // This effect runs the loadData function once when the hook is first used.
    useEffect(() => {
        loadData();
    }, [loadData]);

    // The hook returns the loading and error state, along with a function to manually reload.
    return { loading, error, reload: loadData };
};


export const useUpdateBooking = () => {
    const [lists, setLists] = useRecoilState(dashboardListsState);

    const updateBookingStatus = useCallback(async (bookingId, newStatus) => {
        // Optimistic UI Update: Remove the booking from the list immediately.
        const originalLists = lists;
        setLists(prev => ({
            ...prev,
            newRequests: prev.newRequests.filter(item => item.bookingId !== bookingId)
        }));

        try {
            await updateBookingStatusAPI(bookingId, { status: newStatus });
        } catch (error) {
            console.error(`Failed to update booking status for ${bookingId}:`, error);
            setLists(originalLists); // Rollback on error
            throw error;
        }
    }, [lists, setLists]);

    return updateBookingStatus;
};

/**
 * Hook to fetch and manage paginated bookings based on filters.
 */
export const usePaginatedBookings = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const statusFilter = useRecoilValue(statusFilterState);
    const dateFilter = useRecoilValue(dateFilterState);
    const [bookingsData, setBookingsData] = useRecoilState(paginatedBookingsState);

    const fetchBookings = useCallback(async (page = 0) => {
        try {
            setLoading(true);
            // dateFilter in atom is 'all' or array. API expects array or null.
            const range = Array.isArray(dateFilter) ? dateFilter : null;
            const data = await fetchBookingsAPI(statusFilter, page, range);
            setBookingsData({
                content: data.content,
                totalPages: data.totalPages,
                currentPage: data.currentPage ?? data.number ?? data.pageNumber ?? page,
                totalElements: data.totalElements,
            });
            setError(null);
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [statusFilter, dateFilter, setBookingsData]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return { loading, error, bookingsData, fetchBookings };
};

/**
 * Hook to fetch earnings analytics.
 */
export const useEarnings = (filter, date) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadEarnings = async () => {
            setLoading(true);
            try {
                const result = await fetchEarningsAPI(filter, date.toISOString().split('T')[0]);
                setData(result);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch earnings:", err);
                setError(err);
                // Set default data on error so UI can render
                setData({
                    totalRevenue: 0,
                    averagePerBooking: 0,
                    totalCompletedBookings: 0,
                    chartData: []
                });
            } finally {
                setLoading(false);
            }
        };
        loadEarnings();
    }, [filter, date]);

    return { loading, error, data };
};