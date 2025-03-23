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
  const {
    maxAge = 86400, // 1 day in seconds
    path = '/',
    secure = process.env.NODE_ENV === 'production',
    sameSite = 'Lax',
  } = options;

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
}

/**
 * Get a cookie value by name
 * 
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string|null} The cookie value or null if not found
 */
export function getCookie(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(c => c.startsWith(`${name}=`));
  
  if (!cookie) {
    return null;
  }
  
  return decodeURIComponent(cookie.split('=')[1]);
}

/**
 * Delete a cookie by name
 * 
 * @param {string} name - The name of the cookie to delete
 * @param {string} path - The path of the cookie (must match the path used when setting)
 */
export function deleteCookie(name, path = '/') {
  document.cookie = `${name}=; path=${path}; max-age=0`;
} 