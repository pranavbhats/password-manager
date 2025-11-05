import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const SplashPage = () => {
     const navigate = useNavigate();

     const handleContinue = () => {
          navigate(ROUTES.LOGIN);
     };

     return (
          <div className="min-h-screen bg-linear-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center px-4">
               {/* Logo and Branding */}
               <div className="text-center mb-6">
                    <div className="mb-3">
                         {/* Logo Icon */}
                         <div className="mx-auto w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-3">
                              <span className="text-3xl">🔒</span>
                         </div>
                    </div>

                    {/* App Name */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                         SafeVault
                    </h1>

                    {/* Tagline */}
                    <p className="text-base md:text-lg text-blue-100 font-light max-w-md mx-auto leading-relaxed">
                         Your passwords, secured and simplified. One vault, endless protection.
                    </p>
               </div>

               {/* Features */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6">
                    <div className="text-center text-white">
                         <div className="mb-2">
                              <span className="text-xl">🛡️</span>
                         </div>
                         <h3 className="font-semibold mb-1 text-sm">Military-Grade Encryption</h3>
                         <p className="text-xs text-blue-100">
                              Your data is protected with AES-256 encryption
                         </p>
                    </div>

                    <div className="text-center text-white">
                         <div className="mb-2">
                              <span className="text-xl">📱</span>
                         </div>
                         <h3 className="font-semibold mb-1 text-sm">Cross-Platform Sync</h3>
                         <p className="text-xs text-blue-100">
                              Access your passwords anywhere, anytime
                         </p>
                    </div>

                    <div className="text-center text-white">
                         <div className="mb-2">
                              <span className="text-xl">🎯</span>
                         </div>
                         <h3 className="font-semibold mb-1 text-sm">Zero-Knowledge</h3>
                         <p className="text-xs text-blue-100">
                              We never see your passwords, ever
                         </p>
                    </div>
               </div>

               {/* Continue Button */}
               <div className="w-full max-w-sm mb-4">
                    <button
                         onClick={handleContinue}
                         className="w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95"
                    >
                         Get Started
                    </button>
               </div>

               {/* Footer */}
               <div className="text-center">
                    <p className="text-blue-200 text-xs">
                         Trusted by thousands of users worldwide
                    </p>
               </div>
          </div>
     );
};

export default SplashPage;