import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  requireRole?: string;
  redirectTo?: string;
}

/**
 * A wrapper component that strictly enforces authentication 
 * for any nested child routes. Prevents unauthorized URL manipulation.
 */
export const ProtectedRoute = ({ requireRole, redirectTo = "/" }: ProtectedRouteProps) => {
  const authToken = sessionStorage.getItem("authToken");
  const userRole = sessionStorage.getItem("userRole");

  // 1. If not authenticated at all, kick to login.
  if (!authToken) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. If a specific role is required (like "admin") and user does not match,
  // kick them back to a safe authenticated root (dashboard).
  if (requireRole && userRole !== requireRole) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Authenticated and authorized: render the target route.
  return <Outlet />;
};
