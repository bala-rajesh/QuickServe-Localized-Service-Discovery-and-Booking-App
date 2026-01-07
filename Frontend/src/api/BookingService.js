import axios from 'axios';

// Use import.meta.env for Vite projects to access environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Fetches the main dashboard data for a provider.
 */
export const fetchDashboardAPI = async () => {
    const response = await api.get('/provider/dashboard');
    return response.data;
};


export const updateBookingStatusAPI = async (bookingId, payload) => {
    const response = await api.patch(`/provider/bookings/${bookingId}/status`, payload);
    return response.data;
};


export const fetchBookingsAPI = async (status, page = 0, dateRange = null) => {
    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const params = {
        status: status === 'all' ? null : status.toUpperCase(),
        page,
        startDate: dateRange ? formatDate(dateRange[0]) : null,
        endDate: dateRange ? formatDate(dateRange[1]) : null,
    };
    const response = await api.get('/provider/bookings', {
        params
    });
    return response.data;
};

export const fetchEarningsAPI = async (filter, date) => {
    const response = await api.get('/provider/earnings', {
        params: { filter, date }
    });
    return response.data;
};
