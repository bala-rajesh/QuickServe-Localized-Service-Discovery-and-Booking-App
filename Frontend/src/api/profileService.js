import { api } from './BookingService';


export const fetchProfileAPI = async () => {
    const response = await api.get('/provider/profile');
    return response.data;
};


export const updateProfileAPI = async (payload) => {
    const response = await api.put('/provider/profile', payload);
    return response.data;
};