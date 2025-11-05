import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

// Composable components
import AuthLayout from '../../components/templates/AuthLayout';
import AuthForm from '../../components/organisms/AuthForm/AuthForm';
import Input from '../../components/atoms/Input';
import PasswordInput from '../../components/molecules/PasswordInput';
import Button from '../../components/atoms/Button';
import TermsCheckbox from '../../components/molecules/TermsCheckbox';
import AuthToggle from '../../components/molecules/AuthToggle';

const SignupPage = () => {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({
          email: '',
          password: '',
          confirmPassword: '',
     });
     const [isLoading, setIsLoading] = useState(false);
     const [agreeToTerms, setAgreeToTerms] = useState(false);

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
               console.log('Signup attempt:', { ...formData, agreeToTerms });

               // Simulate API call
               await new Promise(resolve => setTimeout(resolve, 1000));

               // Navigate to login after successful signup
               navigate(ROUTES.LOGIN);
          } catch (error) {
               console.error('Signup error:', error);
          } finally {
               setIsLoading(false);
          }
     };

     const isFormValid = formData.email && formData.password && formData.confirmPassword;
     const passwordsMatch = formData.password === formData.confirmPassword;
     const canSubmit = isFormValid && passwordsMatch && agreeToTerms;

     return (
          <AuthLayout
               title="Create your account"
               subtitle="Start securing your passwords today"
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
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={handleInputChange}
                              autoComplete="new-password"
                              required
                         />

                         <PasswordInput
                              name="confirmPassword"
                              label="Confirm Password"
                              placeholder="Confirm your password"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              autoComplete="new-password"
                              error={formData.confirmPassword && !passwordsMatch ? 'Passwords do not match' : undefined}
                              required
                         />
                    </AuthForm.Fields>

                    <AuthForm.Extras>
                         <TermsCheckbox
                              checked={agreeToTerms}
                              onChange={setAgreeToTerms}
                              required
                         />
                    </AuthForm.Extras>

                    <AuthForm.Actions>
                         <Button
                              type="submit"
                              variant="primary"
                              size="lg"
                              isLoading={isLoading}
                              disabled={!canSubmit}
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