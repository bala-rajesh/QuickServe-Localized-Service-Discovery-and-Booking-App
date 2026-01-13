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
  
  searchProviders: async ({ query, pincode }) => {
    try {
      const params = new URLSearchParams({
        query: query || '',
        pincode: pincode || ''
      });
      const response = await api.get(`/customer/search?${params}`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch providers:", err);
      throw new Error(err.response?.data?.message || "Failed to search for providers.");
    }
  },

  searchServices: async ({ query, category, pincode }) => {
    try {
      const params = new URLSearchParams({
        query: query || '',
        category: category || 'all',
        pincode: pincode || '',
      });
      // Calls GET /api/customer/services/search?query=...&category=...
      const response = await api.get(`/customer/services/search?${params}`);
      // The backend now returns an object { services: [], pincodeUsed: "" }
      return response.data;
    } catch (err) {
      console.error("Failed to fetch services:", err);
      throw new Error(err.response?.data?.message || "Failed to search for services.");
    }
  },

  getLatestReviewsForService: async (serviceId) => {
    try {
      // Calls GET /api/customer/services/{serviceId}/reviews
      const response = await api.get(`/customer/services/${serviceId}/reviews`);
      return response.data;
    } catch (err) {
      console.error(`Failed to fetch reviews for service ${serviceId}:`, err);
      throw new Error(err.response?.data?.message || "Failed to fetch reviews.");
    }
  },
  createReview: async (reviewData) => {
    const response = await api.post('/customer/reviews', reviewData);
    return response.data;
  },

  getBookings: async ({ status, query, serviceType }) => {
    try {
      const params = new URLSearchParams({
        status: status || 'All',
        query: query || '',
        serviceType: serviceType || ''
      });
      const response = await api.get(`/customer/bookings?${params}`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      throw new Error(err.response?.data?.message || "Failed to fetch bookings.");
    }
  },

  getBookingStats: async () => {
    try {
      const response = await api.get('/customer/booking-stats');
      return response.data;
    } catch (err) {
      console.error("Failed to fetch booking stats:", err);
      throw new Error(err.response?.data?.message || "Failed to fetch stats.");
    }
  },

  rescheduleBooking: async (bookingId, payload) => {
    try {
      const response = await api.put(`/customer/book/${bookingId}`, payload);
      return response.data;
    } catch (err) {
      console.error(`Failed to reschedule booking ${bookingId}:`, err);
      throw new Error(err.response?.data?.message || "Failed to reschedule booking.");
    }
  },

  cancelBooking: async (bookingId) => {
    try {
      await api.put(`/customer/bookings/${bookingId}/cancel`);
    } catch (err) {
      console.error(`Failed to cancel booking ${bookingId}:`, err);
      throw new Error(err.response?.data?.message || "Failed to cancel booking.");
    }
  }
};

export default CustomerService;