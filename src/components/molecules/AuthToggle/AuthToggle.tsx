import { Link } from 'react-router-dom';

interface AuthToggleProps {
     mode: 'login' | 'signup';
     loginRoute: string;
     signupRoute: string;
}

const AuthToggle: React.FC<AuthToggleProps> = ({ mode, loginRoute, signupRoute }) => {
     const isSignup = mode === 'signup';

     return (
          <div className="mt-6">
               <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                         <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                         <span className="px-2 bg-white text-gray-500">
                              {isSignup ? 'Already have an account?' : 'New to SafeVault?'}
                         </span>
                    </div>
               </div>

               <div className="mt-6">
                    <Link
                         to={isSignup ? loginRoute : signupRoute}
                         className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md"
                    >
                         {isSignup ? 'Sign in instead' : 'Create an account'}
                    </Link>
               </div>
          </div>
     );
};

export default AuthToggle;