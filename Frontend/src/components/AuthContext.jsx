import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../api/AuthService';
import { useRecoilState } from 'recoil';
import { userProfileState } from '../state/atoms';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // The user state is now managed by Recoil, making it globally accessible.
  const [user, setUser] = useRecoilState(userProfileState);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      // If user is already in Recoil state, no need to fetch again.
      if (user) {
        setLoading(false);
        return;
      }
      try {
        const userData = await AuthService.getCurrentUser();
        setUser(userData);
        const publicPaths = ['/login', '/customer/signup', '/provider/signup', '/'];
        if (publicPaths.includes(location.pathname)) {
          if (userData.role === 'PROVIDER') {
            navigate('/service-provider/dashboard');
          } else if (userData.role === 'CUSTOMER') {
            navigate('/customer/dashboard');
          }
        }
      } catch (error) {
        // If there's an error (e.g., no valid token), ensure user state is null.
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
    // This effect should only run once on initial load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const logout = async () => {
    await AuthService.logout();
    setUser(null); // This now clears the global Recoil state.
    navigate('/');
  };

  return (
    // We pass down the Recoil-managed user state and its setter.
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);