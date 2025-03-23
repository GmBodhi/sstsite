import { useState, useEffect, useCallback } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/lib/utils/cookies';

/**
 * Custom hook for authentication management
 * Provides methods for login, logout, and access to authentication state
 */
export function useAuth() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from storage
  useEffect(() => {
    const storedToken = getCookie('token') || localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  /**
   * Set authentication token in both localStorage and cookies
   * @param {string} newToken - The token to store
   */
  const setAuthToken = useCallback((newToken) => {
    if (newToken) {
      // Store in localStorage (for backward compatibility)
      localStorage.setItem('token', newToken);
      
      // Store in cookies (for middleware)
      setCookie('token', newToken, { maxAge: 86400 });
      
      setToken(newToken);
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * Clear authentication token from storage
   */
  const logout = useCallback(() => {
    // Clear from localStorage
    localStorage.removeItem('token');
    
    // Clear from cookies
    deleteCookie('token');
    
    setToken(null);
    setIsAuthenticated(false);
    
    // Reload to reset app state (optional)
    window.location.reload();
  }, []);

  /**
   * Get headers for authenticated API requests
   * @returns {Object} Headers object with Authorization token
   */
  const getAuthHeaders = useCallback(() => {
    if (!token) return {};
    
    return {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }, [token]);

  /**
   * Make an authenticated API request
   * @param {string} url - The API endpoint URL
   * @param {Object} options - Fetch options (method, body, etc.)
   * @returns {Promise} The fetch promise
   */
  const authFetch = useCallback(async (url, options = {}) => {
    const authOptions = {
      ...options,
      headers: {
        ...options.headers,
        ...getAuthHeaders()
      }
    };

    try {
      const response = await fetch(url, authOptions);
      return response;
    } catch (error) {
      console.error('Auth fetch error:', error);
      throw error;
    }
  }, [getAuthHeaders]);

  return {
    token,
    isAuthenticated,
    isLoading,
    setAuthToken,
    logout,
    getAuthHeaders,
    authFetch
  };
} 