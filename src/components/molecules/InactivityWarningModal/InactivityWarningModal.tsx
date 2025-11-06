import React, { useEffect, useState } from 'react';
import Button from '../../atoms/Button';

interface InactivityWarningModalProps {
     isOpen: boolean;
     onContinueSession: () => void;
     onLogout: () => void;
}

const InactivityWarningModal: React.FC<InactivityWarningModalProps> = ({
     isOpen,
     onContinueSession,
     onLogout,
}) => {
     const [localTimeRemaining, setLocalTimeRemaining] = useState(30);

     // Start countdown when modal opens
     useEffect(() => {
          if (!isOpen) return;

          // Initialize local countdown
          setLocalTimeRemaining(30);

          // Start countdown timer
          const countdownInterval = setInterval(() => {
               setLocalTimeRemaining((prev) => {
                    if (prev <= 1) {
                         // Auto logout when countdown reaches 0
                         onLogout();
                         return 0;
                    }
                    return prev - 1;
               });
          }, 1000);

          // Cleanup interval when modal closes or component unmounts
          return () => {
               clearInterval(countdownInterval);
          };
     }, [isOpen, onLogout]);

     if (!isOpen) return null;

     return (
          <>
               {/* Backdrop */}
               <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

               {/* Modal */}
               <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-200">
                         {/* Warning Icon */}
                         <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-yellow-100 rounded-full">
                              <svg
                                   className="w-6 h-6 text-yellow-600"
                                   fill="none"
                                   stroke="currentColor"
                                   viewBox="0 0 24 24"
                                   xmlns="http://www.w3.org/2000/svg"
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z"
                                   />
                              </svg>
                         </div>

                         {/* Title */}
                         <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                              Session Timeout Warning
                         </h3>

                         {/* Message */}
                         <p className="text-sm text-gray-600 text-center mb-6">
                              You will be logged out due to inactivity.
                         </p>

                         {/* Countdown */}
                         <div className="text-center mb-6">
                              <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-2 bg-red-100 rounded-full">
                                   <span className="text-2xl font-bold text-red-600">
                                        {localTimeRemaining}
                                   </span>
                              </div>
                              <p className="text-xs text-gray-500">
                                   {localTimeRemaining === 1 ? 'second' : 'seconds'} remaining
                              </p>
                         </div>

                         {/* Action Buttons */}
                         <div className="flex space-x-3">
                              <Button
                                   type="button"
                                   variant="secondary"
                                   onClick={onLogout}
                                   className="flex-1"
                              >
                                   Logout
                              </Button>
                              <Button
                                   type="button"
                                   variant="primary"
                                   onClick={onContinueSession}
                                   className="flex-1"
                              >
                                   Continue Session
                              </Button>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default InactivityWarningModal;