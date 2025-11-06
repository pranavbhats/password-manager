import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { selectIsAuthenticated, selectIsInitialized } from '../../../store/slices/authSlice';
import { ROUTES } from '../../../constants';
import LoadingScreen from '../../organisms/LoadingScreen';

interface ProtectedRouteProps {
     children: React.ReactNode;
     requireAuth?: boolean;
}

/**
 * ProtectedRoute component that handles authentication-based route protection
 * 
 * @param children - The component(s) to render if access is allowed
 * @param requireAuth - Whether the route requires authentication (default: true)
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
     children,
     requireAuth = true
}) => {
     const location = useLocation();
     const isAuthenticated = useAppSelector(selectIsAuthenticated);
     const isInitialized = useAppSelector(selectIsInitialized);

     // Show loading screen while auth state is being initialized
     if (!isInitialized) {
          return (
               <LoadingScreen
                    isVisible={true}
                    message="Initializing..."
                    duration={800}
                    showLogo={true}
               />
          );
     }

     // If route requires authentication but user is not authenticated
     if (requireAuth && !isAuthenticated) {
          // Save the attempted URL to redirect back after login
          return (
               <Navigate
                    to={ROUTES.LOGIN}
                    state={{ from: location }}
                    replace
               />
          );
     }

     // If route is for non-authenticated users (login/signup) but user is authenticated
     if (!requireAuth && isAuthenticated) {
          // Redirect authenticated users away from auth pages
          return <Navigate to={ROUTES.VAULT_HOME} replace />;
     }

     // Allow access to the route
     return <>{children}</>;
};

export default ProtectedRoute;