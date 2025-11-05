import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface GuestGuardProps {
     children: React.ReactNode;
}

// This component protects routes that should only be accessible to non-authenticated users
const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
     // TODO: Replace with actual authentication state from Redux store
     const isAuthenticated = false; // This will be replaced with actual auth state

     if (isAuthenticated) {
          return <Navigate to={ROUTES.VAULT_HOME} replace />;
     }

     return <>{children}</>;
};

export default GuestGuard;