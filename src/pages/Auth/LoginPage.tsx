import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

// Composable components
import AuthLayout from '../../components/templates/AuthLayout';
import AuthForm from '../../components/organisms/AuthForm/AuthForm';
import Input from '../../components/atoms/Input';
import PasswordInput from '../../components/molecules/PasswordInput';
import Button from '../../components/atoms/Button';
import RememberMe from '../../components/molecules/RememberMe';
import AuthToggle from '../../components/molecules/AuthToggle';

const LoginPage = () => {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({
          email: '',
          password: '',
     });
     const [isLoading, setIsLoading] = useState(false);
     const [rememberMe, setRememberMe] = useState(false);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value,
          }));
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          try {
               // TODO: Implement Firebase authentication
               console.log('Login attempt:', { ...formData, rememberMe });

               // Simulate API call
               await new Promise(resolve => setTimeout(resolve, 1000));

               // Navigate to vault home for testing
               navigate(ROUTES.VAULT_HOME);
          } catch (error) {
               console.error('Login error:', error);
          } finally {
               setIsLoading(false);
          }
     };

     const isFormValid = formData.email && formData.password;

     return (
          <AuthLayout
               title="Welcome back"
               subtitle="Sign in to access your vault"
          >
               <AuthForm onSubmit={handleSubmit}>
                    <AuthForm.Fields>
                         <Input
                              name="email"
                              type="email"
                              label="Email address"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={handleInputChange}
                              autoComplete="email"
                              required
                         />

                         <PasswordInput
                              name="password"
                              label="Password"
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={handleInputChange}
                              autoComplete="current-password"
                              required
                         />
                    </AuthForm.Fields>

                    <AuthForm.Extras>
                         <RememberMe
                              checked={rememberMe}
                              onChange={setRememberMe}
                         />
                         <button
                              type="button"
                              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                         >
                              Forgot password?
                         </button>
                    </AuthForm.Extras>

                    <AuthForm.Actions>
                         <Button
                              type="submit"
                              variant="primary"
                              size="lg"
                              isLoading={isLoading}
                              disabled={!isFormValid}
                              className="w-full"
                         >
                              {isLoading ? 'Signing in...' : 'Sign in'}
                         </Button>
                    </AuthForm.Actions>
               </AuthForm>

               <AuthToggle
                    mode="login"
                    loginRoute={ROUTES.LOGIN}
                    signupRoute={ROUTES.SIGNUP}
               />
          </AuthLayout>
     );
};

export default LoginPage;