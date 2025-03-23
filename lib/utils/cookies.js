/**
 * Set a cookie in the browser
 * 
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {Object} options - Cookie options
 * @param {number} options.maxAge - Maximum age of the cookie in seconds
 * @param {string} options.path - Path for the cookie (default: '/')
 * @param {boolean} options.secure - Whether the cookie is secure (HTTPS only)
 * @param {string} options.sameSite - SameSite policy ('Lax', 'Strict', 'None')
 */
export function setCookie(name, value, options = {}) {
  // Only run in browser environment
  if (typeof document === 'undefined') return;

  const {
    maxAge = 86400 * 7, // 7 days in seconds
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'Lax',
  } = options;

  try {
    const cookie = [
      `${name}=${encodeURIComponent(value)}`,
      `path=${path}`,
      `max-age=${maxAge}`,
      `SameSite=${sameSite}`,
    ];

    if (secure) {
      cookie.push('Secure');
    }

    document.cookie = cookie.join('; ');
    
    // Verify the cookie was set properly
    if (!getCookie(name)) {
      console.warn(`Warning: Cookie '${name}' may not have been set correctly.`);
    }
  } catch (error) {
    console.error('Error setting cookie:', error);
  }
}

/**
 * Get a cookie value by name
 * 
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The cookie value or null if not found
 */
export function getCookie(name) {
  // Only run in browser environment
  if (typeof document === 'undefined') return null;

  try {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(`${name}=`));
    
    if (!cookie) {
      return null;
    }
    
    return decodeURIComponent(cookie.split('=')[1]);
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
}

/**
 * Delete a cookie by name
 * 
 * @param {string} name - The name of the cookie to delete
 * @param {string} path - The path of the cookie (must match the path used when setting)
 */
export function deleteCookie(name, path = '/') {
  // Only run in browser environment
  if (typeof document === 'undefined') return;

  try {
    // Set expiration to the past to delete the cookie
    document.cookie = `${name}=; path=${path}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
} 