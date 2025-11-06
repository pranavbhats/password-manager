import React from 'react';
import { useAutoLogout } from '../../../hooks/useAutoLogout';
import InactivityWarningModal from '../../molecules/InactivityWarningModal';

/**
 * InactivityManager component that provides global auto-logout functionality.
 * This component should be placed at the app root level to monitor user activity
 * across the entire application and show warning dialogs when needed.
 */
const InactivityManager: React.FC = () => {
     const { isWarningVisible, continueSession, forceLogout } = useAutoLogout();

     return (
          <InactivityWarningModal
               isOpen={isWarningVisible}
               onContinueSession={continueSession}
               onLogout={forceLogout}
          />
     );
};

export default InactivityManager;