import { api } from './BookingService';


export const fetchServicesAPI = async () => {
    const response = await api.get('/provider/services');
    return response.data;
};


export const updateServiceAPI = async (serviceId, payload) => {
    const response = await api.put(`/provider/services/${serviceId}`, payload);
    return response.data;
};


export const createServiceAPI = async (payload) => {
    const response = await api.post('/provider/services', payload);
    return response.data;
};


export const deleteServiceAPI = async (serviceId) => {
    await api.delete(`/provider/services/${serviceId}`);
};