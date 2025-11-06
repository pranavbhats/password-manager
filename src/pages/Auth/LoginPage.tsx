import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '../../constants';
import { loginSchema, type LoginFormData } from '../../schemas/auth/authSchemas';
import { authService } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess, setError, setLoading } from '../../store/slices/authSlice';

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
     const dispatch = useAppDispatch();
     const [isLoading, setIsLoading] = useState(false);
     const [rememberMe, setRememberMe] = useState(false);
     const [authError, setAuthError] = useState<string>('');

     const {
          register,
          handleSubmit,
          formState: { errors, isValid },
     } = useForm<LoginFormData>({
          resolver: zodResolver(loginSchema),
          mode: 'onChange',
     });

     const onSubmit = async (data: LoginFormData) => {
          setIsLoading(true);
          setAuthError('');
          dispatch(setLoading(true));

          try {
               const userCredential = await authService.signIn(data.email, data.password);

               // Update Redux store with user data
               dispatch(loginSuccess(userCredential.user));

               // Navigate to vault home after successful login
               navigate(ROUTES.VAULT_HOME);
          } catch (error) {
               console.error('Login error:', error);
               const errorMessage = error instanceof Error
                    ? error.message
                    : 'Failed to sign in. Please check your credentials.';
               setAuthError(errorMessage);
               dispatch(setError(errorMessage));
          } finally {
               setIsLoading(false);
               dispatch(setLoading(false));
          }
     }; return (
          <AuthLayout
               title="Welcome back"
               subtitle="Sign in to access your vault"
          >
               {authError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                         <p className="text-sm text-red-600">{authError}</p>
                    </div>
               )}

               <AuthForm onSubmit={handleSubmit(onSubmit)}>
                    <AuthForm.Fields>
                         <Input
                              {...register('email')}
                              type="email"
                              label="Email address"
                              placeholder="Enter your email"
                              autoComplete="email"
                              error={errors.email?.message}
                              required
                         />

                         <PasswordInput
                              {...register('password')}
                              label="Password"
                              placeholder="Enter your password"
                              autoComplete="current-password"
                              error={errors.password?.message}
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
                              disabled={!isValid || isLoading}
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