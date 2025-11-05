import { useEffect, useState } from 'react';

interface LoadingScreenProps {
     isVisible: boolean;
     onComplete?: () => void;
     duration?: number;
     showLogo?: boolean;
     message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
     isVisible,
     onComplete,
     duration = 1500,
     showLogo = true,
     message = "Loading..."
}) => {
     const [progress, setProgress] = useState(0);

     useEffect(() => {
          if (!isVisible) return;

          const interval = setInterval(() => {
               setProgress(prev => {
                    if (prev >= 100) {
                         clearInterval(interval);
                         setTimeout(() => {
                              onComplete?.();
                         }, 200);
                         return 100;
                    }
                    return prev + (100 / (duration / 50));
               });
          }, 50);

          return () => clearInterval(interval);
     }, [isVisible, duration, onComplete]);

     useEffect(() => {
          if (!isVisible) {
               setProgress(0);
          }
     }, [isVisible]);

     if (!isVisible) return null;

     return (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
               {/* Background gradient */}
               <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-indigo-100"></div>

               {/* Content */}
               <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
                    {showLogo && (
                         <div className="text-center">
                              {/* App Logo */}
                              <div className="w-24 h-24 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                   <span className="text-4xl text-white">🔒</span>
                              </div>

                              {/* App Name */}
                              <h1 className="text-3xl font-bold text-gray-900 mb-2">SafeVault</h1>
                              <p className="text-gray-600 text-lg">Secure Password Manager</p>
                         </div>
                    )}

                    {/* Loading Animation */}
                    <div className="flex flex-col items-center space-y-4">
                         {/* Spinning loader */}
                         <div className="relative w-12 h-12">
                              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                              <div
                                   className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"
                                   style={{
                                        animationDuration: '1s'
                                   }}
                              ></div>
                         </div>

                         {/* Progress bar */}
                         <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                   className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-100 ease-out"
                                   style={{ width: `${progress}%` }}
                              ></div>
                         </div>

                         {/* Loading message */}
                         <p className="text-gray-600 text-sm font-medium">{message}</p>
                    </div>

                    {/* Tagline */}
                    <div className="text-center text-gray-500 text-sm max-w-md">
                         <p>Protecting your digital life with military-grade encryption</p>
                    </div>
               </div>

               {/* Floating particles animation */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                         <div
                              key={i}
                              className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-pulse"
                              style={{
                                   left: `${Math.random() * 100}%`,
                                   top: `${Math.random() * 100}%`,
                                   animationDelay: `${Math.random() * 3}s`,
                              }}
                         ></div>
                    ))}
               </div>
          </div>
     );
};

export default LoadingScreen;