const API_URL = 'http://localhost:8080/api';

const getHeaders = () => {
    return {
        'Content-Type': 'application/json'
    };
};

export const api = {
    auth: {
        providerLogin: async (credentials) => {
            const response = await fetch(`${API_URL}/auth/provider/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Login failed');
            }
            const data = await response.json();
            // Don't store full object with token, just user info if needed
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        },
        providerSignup: async (userData) => {
            const response = await fetch(`${API_URL}/auth/provider/signup`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Registration failed');
            }
            return response.text();
        },
        seekerLogin: async (credentials) => {
            const response = await fetch(`${API_URL}/auth/seeker/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials),
                credentials: 'include'
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Login failed');
            }
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        },
        seekerSignup: async (userData) => {
            const response = await fetch(`${API_URL}/auth/seeker/signup`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(userData),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Registration failed');
            }
            return response.text();
        },
        logout: async () => {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            localStorage.removeItem('user');
        },
        getCurrentUser: () => {
            return JSON.parse(localStorage.getItem('user'));
        }
    },
    services: {
        getAll: async () => {
            const response = await fetch(`${API_URL}/services`, {
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch services');
            return response.json();
        },
        create: async (serviceData) => {
            const response = await fetch(`${API_URL}/services`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(serviceData),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to create service');
            return response.json();
        },
        getByProvider: async (providerId) => {
            const response = await fetch(`${API_URL}/services/provider/${providerId}`, {
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch provider services');
            return response.json();
        },
        update: async (serviceId, serviceData) => {
            const response = await fetch(`${API_URL}/services/${serviceId}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(serviceData),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to update service');
            return response.json();
        },
        delete: async (serviceId) => {
            const response = await fetch(`${API_URL}/services/${serviceId}`, {
                method: 'DELETE',
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to delete service');
        },
    },
    bookings: {
        create: async (bookingData) => {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(bookingData),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to create booking');
            return response.json();
        },
        getByCustomer: async (customerId) => {
            const response = await fetch(`${API_URL}/bookings/customer/${customerId}`, {
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch bookings');
            return response.json();
        },
        getByProvider: async (providerId) => {
            const response = await fetch(`${API_URL}/bookings/provider/${providerId}`, {
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch bookings');
            return response.json();
        },
        updateStatus: async (bookingId, status) => {
            const response = await fetch(`${API_URL}/bookings/${bookingId}/status?status=${status}`, {
                method: 'PUT',
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to update booking status');
            return response.json();
        },
    },
    users: {
        update: async (userId, userData) => {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(userData),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to update profile');
            return response.json();
        },
        get: async (userId) => {
            const response = await fetch(`${API_URL}/users/${userId}`, {
                headers: getHeaders(),
                credentials: 'include'
            });
            if (!response.ok) throw new Error('Failed to fetch user details');
            return response.json();
        }
    },
};
