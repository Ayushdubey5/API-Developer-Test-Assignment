'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const token = Cookies.get('authToken');
    const userData = Cookies.get('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        Cookies.remove('authToken');
        Cookies.remove('userData');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - replace with actual API call
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        role: email.includes('celebrity') ? 'celebrity' : 'fan',
        avatar: null
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in cookies
      Cookies.set('authToken', mockToken, { expires: 7 });
      Cookies.set('userData', JSON.stringify(mockUser), { expires: 7 });
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const signup = async (name, email, password, role = 'fan') => {
    try {
      // Mock signup - replace with actual API call
      const mockUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        role: role,
        avatar: null
      };

      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Store in cookies
      Cookies.set('authToken', mockToken, { expires: 7 });
      Cookies.set('userData', JSON.stringify(mockUser), { expires: 7 });
      
      setUser(mockUser);
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed' };
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userData');
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}