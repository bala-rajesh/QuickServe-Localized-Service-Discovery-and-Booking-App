import { api } from './BookingService';

const AuthService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  },

  registerCustomer: async (data) => {
    try {
      const response = await api.post('/auth/customer/signup', data);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Signup failed. Please try again.");
    }
  },

  registerProvider: async (data) => {
    try {
      const response = await api.post('/auth/provider/signup', data);
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Provider signup failed.");
    }
  },
};

export default AuthService;