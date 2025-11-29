import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { bookingsState, earningsState, fetchAllData } from '../state/atoms'; // Use mock fetch

/**
 * A custom hook that provides a function to load all initial data from the API
 * and populate the Recoil state.
 */
export const useLoadInitialData = () => {
    const setBookings = useSetRecoilState(bookingsState);
    const setEarnings = useSetRecoilState(earningsState);

    // useCallback ensures the function reference doesn't change on every render
    const loadData = useCallback(async () => {
        try {
            const data = await fetchAllData(); // Changed to use the mock data function
            setBookings(data.bookings);
            setEarnings(data.earnings);
        } catch (error) {
            console.error("Failed to fetch initial data:", error);
            // You could set a global error state here
        }
    }, [setBookings, setEarnings]);

    return loadData;
};

/**
 * A custom hook that provides a function to update a booking.
 * It handles the API call and updates the Recoil state on success.
 * @returns {Function} A function `updateBooking(bookingId, dataToUpdate)`
 */
export const useUpdateBooking = () => {
    const setBookings = useSetRecoilState(bookingsState);

    const updateBooking = useCallback((bookingId, dataToUpdate) => {
        // This function now directly updates the Recoil state for the mock data.
        setBookings(prevBookings =>
            prevBookings.map(booking =>
                booking.id === bookingId
                    ? { ...booking, ...dataToUpdate } // Find the booking and merge the updates
                    : booking
            )
        );
    }, [setBookings]);

    return updateBooking;
};