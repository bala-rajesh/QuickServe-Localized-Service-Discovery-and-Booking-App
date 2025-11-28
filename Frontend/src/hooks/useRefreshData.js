import { useSetRecoilState } from 'recoil';
import { bookingsState, earningsState, fetchAllData } from '../state/atoms';

export const useRefreshData = () => {
    const setBookings = useSetRecoilState(bookingsState);
    const setEarnings = useSetRecoilState(earningsState);

    const refreshData = async () => {
        const data = await fetchAllData();
        setBookings(data.bookings);
        setEarnings(data.earnings);
    };

    return refreshData;
};
