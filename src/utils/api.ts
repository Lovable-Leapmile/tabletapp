// This will be replaced at build time by Vite
const BUILD_TIME_BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Get the base URL for API requests
 * In production, this uses the value set at build time
 * In development, it falls back to the environment variable
 */
export const getBaseUrl = (): string => {
  // Use build-time URL if available
  if (BUILD_TIME_BASE_URL) {
    return BUILD_TIME_BASE_URL.endsWith('/') 
      ? BUILD_TIME_BASE_URL 
      : `${BUILD_TIME_BASE_URL}/`;
  }

  // Fallback for development
  const devUrl = import.meta.env.VITE_BASE_URL || 'https://sudarshan.leapmile.com';
  return devUrl.endsWith('/') ? devUrl : `${devUrl}/`;
};

/**
 * Construct a full API URL with the given endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${baseUrl}${cleanEndpoint}`;
};

/**
 * API configuration object for easy access
 */
export const API_CONFIG = {
  get baseUrl() {
    return getBaseUrl();
  },
  getApiUrl,
  
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
    }
  }
} as const;
