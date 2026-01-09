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

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (err) {
      throw new Error("Not authenticated");
    }
  },

  logout: async () => {
    try {
      
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      await api.post('/auth/logout');
    } catch (err) {
      console.error("Logout failed on the server, but the client session is cleared.", err);
    }
  },

  requestPasswordChange: async (email) => {
    // This function is for an already logged-in user on their profile page.
    // It reuses the 'forgot password' flow by automatically supplying the user's email.
    if (!email) {
      throw new Error("Email is required to request a password change.");
    }

    // Reuse the existing forgotPassword function. It already handles API calls and errors.
    return AuthService.forgotPassword(email);
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to send reset email.");
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to reset password.");
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "OTP verification failed.");
    }
  },

  resendOtp: async (email) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to resend OTP.");
    }
  },
};

export default AuthService;