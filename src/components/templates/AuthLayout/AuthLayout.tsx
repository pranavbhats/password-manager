import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants';

interface AuthLayoutProps {
     title: string;
     subtitle: string;
     children: React.ReactNode;
     showBackButton?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
     title,
     subtitle,
     children,
     showBackButton = true
}) => {
     const navigate = useNavigate();

     return (
          <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
               {/* Header */}
               <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center">
                         <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl">🔒</span>
                         </div>
                    </div>

                    {/* Title and Subtitle */}
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                         {title}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                         {subtitle}
                    </p>
               </div>

               {/* Content */}
               <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10">
                         {children}
                    </div>
               </div>

               {/* Back to Splash */}
               {showBackButton && (
                    <div className="mt-8 text-center">
                         <button
                              onClick={() => navigate(ROUTES.SPLASH)}
                              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                         >
                              ← Back to welcome
                         </button>
                    </div>
               )}
          </div>
     );
};

export default AuthLayout;