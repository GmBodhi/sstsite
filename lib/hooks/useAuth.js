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
  const [authInitialized, setAuthInitialized] = useState(false);

  // Initialize auth state from storage
  useEffect(() => {
    const initAuth = () => {
      try {
        // Try to get token from cookies first (for SSR compatibility)
        let storedToken = null;
        
        // In client-side code, document is available
        if (typeof document !== 'undefined') {
          storedToken = getCookie('token');
        }
        
        // Fallback to localStorage if no cookie found
        if (!storedToken && typeof window !== 'undefined') {
          storedToken = localStorage.getItem('token');
          
          // If found in localStorage but not in cookies, sync them
          if (storedToken) {
            setCookie('token', storedToken, { maxAge: 86400 * 7 }); // 7 days
          }
        }
        
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
        setAuthInitialized(true);
      }
    };

    initAuth();
  }, []);

  /**
   * Set authentication token in both localStorage and cookies
   * @param {string} newToken - The token to store
   */
  const setAuthToken = useCallback((newToken) => {
    if (newToken) {
      try {
        // Store in localStorage (for backward compatibility)
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', newToken);
        }
        
        // Store in cookies (for middleware)
        setCookie('token', newToken, { 
          maxAge: 86400 * 7, // 7 days
          path: '/',
          sameSite: 'Lax'
        });
        
        setToken(newToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error setting auth token:', error);
      }
    }
  }, []);

  /**
   * Clear authentication token from storage
   */
  const logout = useCallback(() => {
    try {
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      
      // Clear from cookies
      deleteCookie('token');
      
      setToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
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
    authInitialized,
    setAuthToken,
    logout,
    getAuthHeaders,
    authFetch
  };
} 