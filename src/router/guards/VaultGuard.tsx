import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

interface VaultGuardProps {
     children: React.ReactNode;
}

// This component protects routes that require vault to be unlocked
const VaultGuard: React.FC<VaultGuardProps> = ({ children }) => {
     // TODO: Replace with actual vault state from Redux store
     const isAuthenticated = false; // This will be replaced with actual auth state
     const isVaultUnlocked = false; // This will be replaced with actual vault state

     if (!isAuthenticated) {
          return <Navigate to={ROUTES.LOGIN} replace />;
     }

     if (!isVaultUnlocked) {
          return <Navigate to={ROUTES.UNLOCK_VAULT} replace />;
     }

     return <>{children}</>;
};

export default VaultGuard;