import { z } from 'zod';

// Password validation with security requirements
const passwordSchema = z
     .string()
     .min(8, 'Password must be at least 8 characters long')
     .max(128, 'Password must not exceed 128 characters')
     .refine(
          (password: string) => /[a-z]/.test(password),
          'Password must contain at least one lowercase letter'
     )
     .refine(
          (password: string) => /[A-Z]/.test(password),
          'Password must contain at least one uppercase letter'
     )
     .refine(
          (password: string) => /[0-9]/.test(password),
          'Password must contain at least one number'
     )
     .refine(
          (password: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
          'Password must contain at least one special character'
     );

// Email validation schema
const emailSchema = z
     .string()
     .min(1, 'Email is required')
     .email('Please enter a valid email address')
     .max(254, 'Email must not exceed 254 characters');

// Login form schema
export const loginSchema = z.object({
     email: emailSchema,
     password: z
          .string()
          .min(1, 'Password is required')
          .max(128, 'Password must not exceed 128 characters'),
});

// Signup form schema with password confirmation
export const signupSchema = z
     .object({
          email: emailSchema,
          password: passwordSchema,
          confirmPassword: z
               .string()
               .min(1, 'Password confirmation is required'),
          agreeToTerms: z
               .boolean()
               .refine((val: boolean) => val === true, 'You must agree to the terms and conditions'),
     })
     .refine(
          (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
          {
               message: 'Passwords do not match',
               path: ['confirmPassword'],
          }
     );

// Forgot password schema
export const forgotPasswordSchema = z.object({
     email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = z
     .object({
          password: passwordSchema,
          confirmPassword: z
               .string()
               .min(1, 'Password confirmation is required'),
     })
     .refine(
          (data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword,
          {
               message: 'Passwords do not match',
               path: ['confirmPassword'],
          }
     );

// Master password schema (for vault unlock)
export const masterPasswordSchema = z.object({
     masterPassword: z
          .string()
          .min(1, 'Master password is required')
          .max(128, 'Master password must not exceed 128 characters'),
});

// Export types for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type MasterPasswordFormData = z.infer<typeof masterPasswordSchema>;

// Password strength checker
export const getPasswordStrength = (password: string): {
     score: number;
     feedback: string[];
     color: 'red' | 'orange' | 'yellow' | 'green';
} => {
     const feedback: string[] = [];
     let score = 0;

     // Length check
     if (password.length >= 8) score += 1;
     else feedback.push('Use at least 8 characters');

     if (password.length >= 12) score += 1;
     else if (password.length >= 8) feedback.push('Use 12+ characters for better security');

     // Character variety checks
     if (/[a-z]/.test(password)) score += 1;
     else feedback.push('Add lowercase letters');

     if (/[A-Z]/.test(password)) score += 1;
     else feedback.push('Add uppercase letters');

     if (/[0-9]/.test(password)) score += 1;
     else feedback.push('Add numbers');

     if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 1;
     else feedback.push('Add special characters');

     // Avoid common patterns
     if (/(.)\1{2,}/.test(password)) {
          score -= 1;
          feedback.push('Avoid repeating characters');
     }

     if (/123|abc|qwe|password|admin/i.test(password)) {
          score -= 1;
          feedback.push('Avoid common patterns');
     }

     // Determine color and overall feedback
     const normalizedScore = Math.max(0, Math.min(6, score));

     let color: 'red' | 'orange' | 'yellow' | 'green';
     if (normalizedScore <= 2) color = 'red';
     else if (normalizedScore <= 3) color = 'orange';
     else if (normalizedScore <= 4) color = 'yellow';
     else color = 'green';

     return { score: normalizedScore, feedback, color };
};