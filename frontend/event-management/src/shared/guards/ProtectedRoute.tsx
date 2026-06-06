import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('access_token');
 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userString = localStorage.getItem('user');
    let userRole = 'PARTICIPANT';
   
    if (userString) {
      try {
        const user = JSON.parse(userString);
        userRole = user.role || 'PARTICIPANT';
      } catch {
        userRole = 'PARTICIPANT';
      }
    }

    const isAuthorized = allowedRoles.map(r => r.toUpperCase()).includes(userRole.toUpperCase());
   
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};
