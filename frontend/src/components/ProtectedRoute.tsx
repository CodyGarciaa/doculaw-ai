import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/dataService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const currentUser = authService.getCurrentUser();

  if (!currentUser) {
    // Redirect to auth page with current location as redirect parameter
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 