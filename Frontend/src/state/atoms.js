import { atom } from 'recoil';

// --- Dashboard Atoms ---
// These atoms hold the pre-calculated data fetched from the /provider/dashboard endpoint.

export const dashboardStatsState = atom({
    key: 'dashboardStatsState',
    default: { todayEarnings: 0, upcomingCount: 0, pendingRequestsCount: 0, averageRating: 0 },
});

export const dashboardChartsState = atom({
    key: 'dashboardChartsState',
    default: [], 
});

export const dashboardListsState = atom({
    key: 'dashboardListsState',
    default: { newRequests: [], upcomingBookings: [] },
});

export const paginatedBookingsState = atom({
    key: 'paginatedBookingsState',
    default: {
        content: [],
        totalPages: 0,
        currentPage: 0,
        totalElements: 0,
    },
});

export const bookingsState = atom({
    key: 'bookingsState',
    default: [],
});

export const earningsState = atom({
    key: 'earningsState',
    default: {
        total: 0,
        overview: [],
    },
});

export const profileState = atom({
    key: 'profileState',
    default: {
        businessName: '', personalName: '', serviceCategory: '', serviceArea: '',
        tagline: '', about: '', phone: '', email: '', pincode: '', avatarUrl: '', workingHours: []
    },
});

export const servicesState = atom({
    key: 'servicesState',
    default: [],
});

export const statusFilterState = atom({
    key: 'statusFilterState',
    default: 'all',
});

export const dateFilterState = atom({
    key: 'dateFilterState',
    default: 'all', // Can be 'all' or an array [startDate, endDate]
});

export const earningsFilterState = atom({
    key: 'earningsFilterState',
    default: 'week', // 'week', 'month','Year'
});

export const earningsDateContextState = atom({
    key: 'earningsDateContextState',
    default: new Date(), // Defaults to today, used for calculating current week/month/year
});
