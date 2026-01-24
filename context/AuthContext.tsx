'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types/user';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'restaurant-auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const { user, token } = JSON.parse(savedAuth);
        setUser(user);
        // You can validate token here
      } catch (error) {
        console.error('Error loading auth:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      // Call API to login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: AuthResponse = await response.json();
      
      setUser(data.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      // Call API to register
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const authData: AuthResponse = await response.json();
      
      setUser(authData.user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // Call API to logout
    fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      authData.user = updatedUser;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
