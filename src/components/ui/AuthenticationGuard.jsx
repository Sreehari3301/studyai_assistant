import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthenticationGuard');
  }
  return context;
};

const AuthenticationGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const publicRoutes = ['/user-authentication', '/login', '/register', '/forgot-password'];

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = publicRoutes?.includes(location.pathname);
      
      if (!isAuthenticated && !isPublicRoute) {
        navigate('/user-authentication', { 
          state: { from: location.pathname } 
        });
      } else if (isAuthenticated && location.pathname === '/user-authentication') {
        const redirectTo = location.state?.from || '/chat-interface';
        navigate(redirectTo, { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        // Validate token with backend if needed
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: credentials.email.split('@')[0],
              email: credentials.email,
              avatar: null
            }
          });
        }, 1000);
      });

      localStorage.setItem('authToken', response?.token);
      localStorage.setItem('userData', JSON.stringify(response?.user));
      
      setUser(response?.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error?.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/user-authentication');
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            token: 'mock-jwt-token',
            user: {
              id: '1',
              name: userData.name,
              email: userData.email,
              avatar: null
            }
          });
        }, 1000);
      });

      localStorage.setItem('authToken', response?.token);
      localStorage.setItem('userData', JSON.stringify(response?.user));
      
      setUser(response?.user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error?.message };
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    register,
    checkAuthStatus
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 bg-white rounded"></div>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationGuard;