/**
 * API configuration utility for handling base URL
 * 
 * This utility requires VITE_BASE_URL to be defined in the .env file
 * - Local development (using .env files)
 * - Lovable deployment (using environment variables)
 * - No fallback URLs - environment variable is mandatory
 */
import { logout } from './auth';

// Get the base URL from environment variables (required)
export const getBaseUrl = (): string => {
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;
  
  if (!viteBaseUrl) {
    console.warn('VITE_BASE_URL is not defined. Falling back to default DHL base URL.');
    return 'https://dhllucknow.leapmile.com';
  }
  
  return viteBaseUrl;
};

/**
 * Construct a full API URL with the given endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getBaseUrl();
  
  // Ensure the endpoint starts with a slash and doesn't have double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}${cleanEndpoint}`;
};

/**
 * Authenticated Fetch Wrapper
 * Automatically appends the Authorization header to all requests.
 * Detects 401 Unauthorized and automatically purges the local session.
 */
export const authenticatedFetch = async (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
  const token = sessionStorage.getItem("authToken");
  
  const modifiedInit = {
    ...init,
    headers: {
      ...init?.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      'accept': 'application/json', // default standard header
    },
  };

  const response = await fetch(input, modifiedInit);

  if (response.status === 401 || response.status === 403) {
    // If token is invalid/expired, definitively drop the session
    logout();
  }

  return response;
};

/**
 * API configuration object for easy access
 */
export const API_CONFIG = {
  get baseUrl() {
    return getBaseUrl();
  },
  getApiUrl,
  authenticatedFetch,
  
  // Common endpoints for reference
  endpoints: {
    user: {
      validate: '/user/validate',
      users: '/user/users',
      user: '/user/user'
    },
    nanostore: {
      trays: '/nanostore/trays',
      orders: '/nanostore/orders',
      transactions: '/nanostore/transactions',
      transaction: '/nanostore/transaction',
      item: '/nanostore/item',
      ordersComplete: '/nanostore/orders/complete',
      traysForOrder: '/nanostore/trays_for_order'
    },
    robotmanager: {
      slots: '/robotmanager/slots',
      unblock: '/robotmanager/unblock'
    }
  }
} as const;
