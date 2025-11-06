import { useEffect, useRef, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectPreferences, selectIsAuthenticated } from '../store/slices/authSlice';
import { authService } from '../services/auth/authService';

interface UseAutoLogoutReturn {
     isWarningVisible: boolean;
     continueSession: () => void;
     forceLogout: () => void;
}

export const useAutoLogout = (): UseAutoLogoutReturn => {
     const dispatch = useDispatch();
     const preferences = useSelector(selectPreferences);
     const isAuthenticated = useSelector(selectIsAuthenticated);

     const [isWarningVisible, setIsWarningVisible] = useState(false);

     // Single timer ref for the main inactivity timer
     const inactivityTimerRef = useRef<number | null>(null);
     const lastActivityRef = useRef<number>(Date.now());

     // Convert autoLockTimeout from minutes to milliseconds
     const inactivityTimeoutMs = preferences.autoLockTimeout * 60 * 1000;
     const warningTimeoutMs = 30 * 1000; // 30 seconds warning period

     // Clear inactivity timer
     const clearInactivityTimer = useCallback(() => {
          if (inactivityTimerRef.current) {
               clearTimeout(inactivityTimerRef.current);
               inactivityTimerRef.current = null;
          }
     }, []);

     // Force logout function
     const forceLogout = useCallback(async () => {
          try {
               clearInactivityTimer();
               setIsWarningVisible(false);
               await authService.signOut();
               dispatch(logout());
          } catch (error) {
               console.error('Error during forced logout:', error);
               dispatch(logout());
          }
     }, [clearInactivityTimer, dispatch]);

     // Show warning dialog
     const showWarningDialog = useCallback(() => {
          setIsWarningVisible(true);
     }, []);

     // Reset inactivity timer
     const resetInactivityTimer = useCallback(() => {
          if (!isAuthenticated) return;

          lastActivityRef.current = Date.now();
          clearInactivityTimer();
          setIsWarningVisible(false);

          // Set main inactivity timer (triggers warning)
          inactivityTimerRef.current = setTimeout(() => {
               showWarningDialog();
          }, inactivityTimeoutMs - warningTimeoutMs) as unknown as number;
     }, [isAuthenticated, inactivityTimeoutMs, warningTimeoutMs, showWarningDialog, clearInactivityTimer]);

     // Continue session function - resets timer and hides warning
     const continueSession = useCallback(() => {
          resetInactivityTimer();
     }, [resetInactivityTimer]);

     // Activity detection event handler
     const handleActivity = useCallback(() => {
          // Don't reset timer if warning is visible (let modal handle the countdown)
          if (isWarningVisible) return;

          // Throttle activity detection to avoid excessive timer resets
          const now = Date.now();
          if (now - lastActivityRef.current > 1000) {
               resetInactivityTimer();
          }
     }, [resetInactivityTimer, isWarningVisible]);

     // Set up activity listeners and initial timer
     useEffect(() => {
          if (!isAuthenticated) {
               clearInactivityTimer();
               setIsWarningVisible(false);
               return;
          }

          // Don't set up listeners if warning is already visible
          if (isWarningVisible) {
               return;
          }

          const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];

          // Add event listeners for activity detection
          activityEvents.forEach((event) => {
               document.addEventListener(event, handleActivity, { passive: true });
          });

          // Start the inactivity timer
          resetInactivityTimer();

          // Cleanup function
          return () => {
               activityEvents.forEach((event) => {
                    document.removeEventListener(event, handleActivity);
               });
               clearInactivityTimer();
          };
     }, [isAuthenticated, isWarningVisible, handleActivity, resetInactivityTimer, clearInactivityTimer]);

     // Handle Escape key when warning is visible
     useEffect(() => {
          if (!isWarningVisible) return;

          const handleEscapeKey = (event: KeyboardEvent) => {
               if (event.key === 'Escape') {
                    resetInactivityTimer();
               }
          };

          document.addEventListener('keydown', handleEscapeKey);
          return () => {
               document.removeEventListener('keydown', handleEscapeKey);
          };
     }, [isWarningVisible, resetInactivityTimer]);

     // Handle visibility change (background/foreground)
     useEffect(() => {
          const handleVisibilityChange = () => {
               if (!document.hidden && isAuthenticated && !isWarningVisible) {
                    resetInactivityTimer();
               }
          };

          document.addEventListener('visibilitychange', handleVisibilityChange);
          return () => {
               document.removeEventListener('visibilitychange', handleVisibilityChange);
          };
     }, [isAuthenticated, isWarningVisible, resetInactivityTimer]);

     // Update timer when timeout preference changes
     useEffect(() => {
          if (isAuthenticated && !isWarningVisible) {
               resetInactivityTimer();
          }
     }, [preferences.autoLockTimeout, isAuthenticated, isWarningVisible, resetInactivityTimer]);

     return {
          isWarningVisible,
          continueSession,
          forceLogout,
     };
};