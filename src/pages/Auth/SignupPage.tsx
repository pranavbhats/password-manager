import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ROUTES } from '../../constants';
import { signupSchema, type SignupFormData } from '../../schemas/auth/authSchemas';
import { authService } from '../../services/auth';
import { useAppDispatch } from '../../store/hooks';
import { loginSuccess, setError, setLoading } from '../../store/slices/authSlice';

// Composable components
import AuthLayout from '../../components/templates/AuthLayout';
import AuthForm from '../../components/organisms/AuthForm/AuthForm';
import Input from '../../components/atoms/Input';
import PasswordInput from '../../components/molecules/PasswordInput';
import Button from '../../components/atoms/Button';
import TermsCheckbox from '../../components/molecules/TermsCheckbox';
import AuthToggle from '../../components/molecules/AuthToggle';
import PasswordStrength from '../../components/molecules/PasswordStrength';

const SignupPage = () => {
     const navigate = useNavigate();
     const dispatch = useAppDispatch();
     const [isLoading, setIsLoading] = useState(false);
     const [authError, setAuthError] = useState<string>('');

     const {
          register,
          handleSubmit,
          watch,
          control,
          formState: { errors, isValid },
     } = useForm<SignupFormData>({
          resolver: zodResolver(signupSchema),
          mode: 'onChange',
     });

     const watchedPassword = watch('password', '');

     const onSubmit = async (data: SignupFormData) => {
          setIsLoading(true);
          setAuthError('');
          dispatch(setLoading(true));

          try {
               const userCredential = await authService.signUp(data.email, data.password);

               // Update Redux store with user data
               dispatch(loginSuccess(userCredential.user));

               // Navigate to vault home after successful signup  
               navigate(ROUTES.VAULT_HOME);
          } catch (error) {
               console.error('Signup error:', error);
               const errorMessage = error instanceof Error
                    ? error.message
                    : 'Failed to create account. Please try again.';
               setAuthError(errorMessage);
               dispatch(setError(errorMessage));
          } finally {
               setIsLoading(false);
               dispatch(setLoading(false));
          }
     }; return (
          <AuthLayout
               title="Create your account"
               subtitle="Start securing your passwords today"
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

                         <div className="space-y-2">
                              <PasswordInput
                                   {...register('password')}
                                   label="Password"
                                   placeholder="Create a strong password"
                                   autoComplete="new-password"
                                   error={errors.password?.message}
                                   required
                              />
                              <PasswordStrength
                                   password={watchedPassword}
                                   showStrength={watchedPassword.length > 0}
                              />
                         </div>

                         <PasswordInput
                              {...register('confirmPassword')}
                              label="Confirm Password"
                              placeholder="Confirm your password"
                              autoComplete="new-password"
                              error={errors.confirmPassword?.message}
                              required
                         />
                    </AuthForm.Fields>

                    <AuthForm.Extras>
                         <div className="space-y-2">
                              <Controller
                                   name="agreeToTerms"
                                   control={control}
                                   render={({ field }) => (
                                        <TermsCheckbox
                                             checked={field.value}
                                             onChange={field.onChange}
                                             required
                                        />
                                   )}
                              />
                              {errors.agreeToTerms && (
                                   <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
                              )}
                         </div>
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
                              {isLoading ? 'Creating account...' : 'Create account'}
                         </Button>
                    </AuthForm.Actions>
               </AuthForm>

               <AuthToggle
                    mode="signup"
                    loginRoute={ROUTES.LOGIN}
                    signupRoute={ROUTES.SIGNUP}
               />
          </AuthLayout>
     );
};

export default SignupPage;