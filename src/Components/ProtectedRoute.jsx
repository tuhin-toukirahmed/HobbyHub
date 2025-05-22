import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../Provider/useAuth';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

   if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

   if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

   return children;
};

export default ProtectedRoute;