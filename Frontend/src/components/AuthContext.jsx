import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../api/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        setUser(userData);

        // Redirect logic if user is already logged in and trying to access public pages
        const publicPaths = ['/login', '/customer/signup', '/provider/signup', '/'];
        if (publicPaths.includes(location.pathname)) {
          if (userData.role === 'PROVIDER') {
            navigate('/service-provider/dashboard');
          } else if (userData.role === 'CUSTOMER') {
            navigate('/customer/dashboard');
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    const data = await AuthService.login({ email, password });
    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        role: data.role,
        email: data.email,
        fullName: data.fullName
      }));
      setUser(data);
    }
    return data;
  };

  const logout = async () => {
    await AuthService.logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);