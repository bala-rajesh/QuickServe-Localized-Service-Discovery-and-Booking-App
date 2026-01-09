import { api } from './BookingService';

const CustomerService = {
  getProfile: async () => {
    try {
      const response = await api.get('/customer/profile');
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to fetch profile.");
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/customer/profile', profileData);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to update profile.");
    }
  },
  
  searchProviders: async (query) => {
    try {
      const params = new URLSearchParams({ query: query || '' });
      // Calls GET /api/customer/search?query=...
      const response = await api.get(`/customer/search?${params}`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch providers:", err);
      throw new Error(err.response?.data?.message || "Failed to search for providers.");
    }
  },

  searchServices: async ({ query, category }) => {
    try {
      const params = new URLSearchParams({
        query: query || '',
        category: category || 'all',
      });
      // Calls GET /api/customer/services/search?query=...&category=...
      const response = await api.get(`/customer/services/search?${params}`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch services:", err);
      throw new Error(err.response?.data?.message || "Failed to search for services.");
    }
  },

  createReview: async (reviewData) => {
    const response = await api.post('/customer/reviews', reviewData);
    return response.data;
  }
};

export default CustomerService;