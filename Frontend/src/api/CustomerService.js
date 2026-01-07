import { api } from './BookingService';

const CustomerService = {
  getProfile: async () => {
    const response = await api.get('/customer/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/customer/profile', profileData);
    return response.data;
  },

  searchServices: async (query) => {
    const response = await api.get(`/customer/search`, {
      params: { query }
    });
    return response.data;
  }
};

export default CustomerService;