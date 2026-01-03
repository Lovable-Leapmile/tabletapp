/**
 * API configuration utility for handling base URL
 * 
 * This utility looks for the base URL in the following order:
 * 1. VITE_BASE_URL environment variable
 * 2. LEAPMILE_HOST_BASEURL environment variable (for backward compatibility)
 * 
 * The base URL should be set during the build process.
 */

// Get the base URL from environment variables
export const getBaseUrl = (): string => {
  // Try to get from VITE_BASE_URL first, then fallback to LEAPMILE_HOST_BASEURL
  const viteBaseUrl = import.meta.env.VITE_BASE_URL || 
                    process.env.LEAPMILE_HOST_BASEURL ||
                    '';
  
  if (!viteBaseUrl) {
    console.error('VITE_BASE_URL is not defined. Please set it in your build process.');
    console.error('Current environment variables:', import.meta.env);
    throw new Error('API base URL is not configured. Please contact support.');
  }
  
  // Ensure the base URL ends with a single slash
  return viteBaseUrl.endsWith('/') ? viteBaseUrl : `${viteBaseUrl}/`;
};

/**
 * Construct a full API URL with the given endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getBaseUrl();
  // Remove leading slash from endpoint to prevent double slashes
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
