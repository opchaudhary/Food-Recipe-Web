import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

/**
 * @author omprakash chaudhary
 * Component for guarding routes that require authentication.
 * If the user is not authenticated, redirects to the login page.
 * Otherwise, renders the child routes.
 */
function AuthGuard() {
  const { authenticated } = useAuth();
  
  // Check if the user is authenticated
  if (!authenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render the child routes (Outlet)
  return <Outlet />;
}

export default AuthGuard;
