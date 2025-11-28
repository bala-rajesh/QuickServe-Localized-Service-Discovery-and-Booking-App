import { selector } from 'recoil';
import { bookingsState, earningsState } from './atoms';

export const pendingRequestsSelector = selector({
    key: 'pendingRequestsSelector',
    get: ({ get }) => {
        const bookings = get(bookingsState);
        return bookings.filter(booking => booking.status === 'pending').slice(0, 4);
    },
});

export const upcomingBookingsSelector = selector({
    key: 'upcomingBookingsSelector',
    get: ({ get }) => {
        const bookings = get(bookingsState);
        const now = new Date();
        const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        return bookings
            .filter(booking => {
                const bookingDate = new Date(booking.datetime);
                return booking.status === 'confirmed' && bookingDate >= now && bookingDate <= oneWeekFromNow;
            })
            .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    },
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
        const pending = get(pendingRequestsSelector);
        const upcoming = get(upcomingBookingsSelector);
        const earnings = get(totalEarningsSelector);

        return {
            pendingRequests: pending.length,
            upcomingBookings: upcoming.length,
            totalEarnings: earnings,
        };
    },
});
