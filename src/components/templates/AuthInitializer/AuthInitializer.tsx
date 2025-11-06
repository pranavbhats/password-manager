import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { useAppDispatch } from '../../../store';
import { setInitialized, loginSuccess, logout } from '../../../store/slices/authSlice';

interface AuthInitializerProps {
     children: React.ReactNode;
}

/**
 * AuthInitializer component that handles Firebase auth state initialization
 * This component listens for Firebase auth state changes and updates Redux store
 */
const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
     const dispatch = useAppDispatch();

     useEffect(() => {
          // Set up Firebase auth state listener
          const unsubscribe = onAuthStateChanged(auth, (user) => {
               if (user) {
                    // User is signed in
                    dispatch(loginSuccess(user));
               } else {
                    // User is signed out
                    dispatch(logout());
               }

               // Mark auth as initialized
               dispatch(setInitialized(true));
          });

          // Cleanup subscription on unmount
          return () => unsubscribe();
     }, [dispatch]);

     return <>{children}</>;
};

export default AuthInitializer;