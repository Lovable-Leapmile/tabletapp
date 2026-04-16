/**
 * Centralized authentication and session management utilities.
 */

/**
 * Securely terminates the current user session by wiping all 
 * authentication tokens and user identifying information from 
 * sessionStorage to prevent hijacking.
 */
export const logout = (): void => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("userRole");
  sessionStorage.removeItem("userEmail");
  sessionStorage.removeItem("userPhone");
  
  // Hard redirect to login page causing a fresh state reset
  window.location.href = "/";
};
