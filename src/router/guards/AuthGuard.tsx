import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface AuthGuardProps {
     children: React.ReactNode;
}

// This component protects routes that require authentication
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
     // TODO: Replace with actual authentication state from Redux store
     const isAuthenticated = false; // This will be replaced with actual auth state

     if (!isAuthenticated) {
          return <Navigate to={ROUTES.LOGIN} replace />;
     }

     return <>{children}</>;
};

export default AuthGuard;