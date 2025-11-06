import { z } from 'zod';

// Profile update schema
export const profileUpdateSchema = z.object({
     displayName: z
          .string()
          .min(1, 'Display name is required')
          .max(50, 'Display name must not exceed 50 characters')
          .regex(/^[a-zA-Z0-9\s\-_.]+$/, 'Display name contains invalid characters'),
     email: z
          .string()
          .min(1, 'Email is required')
          .email('Please enter a valid email address')
          .max(254, 'Email must not exceed 254 characters'),
});

// Password change schema
export const passwordChangeSchema = z
     .object({
          currentPassword: z
               .string()
               .min(1, 'Current password is required')
               .max(128, 'Password must not exceed 128 characters'),
          newPassword: z
               .string()
               .min(8, 'New password must be at least 8 characters long')
               .max(128, 'New password must not exceed 128 characters')
               .refine(
                    (password: string) => /[a-z]/.test(password),
                    'New password must contain at least one lowercase letter'
               )
               .refine(
                    (password: string) => /[A-Z]/.test(password),
                    'New password must contain at least one uppercase letter'
               )
               .refine(
                    (password: string) => /[0-9]/.test(password),
                    'New password must contain at least one number'
               )
               .refine(
                    (password: string) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
                    'New password must contain at least one special character'
               ),
          confirmPassword: z
               .string()
               .min(1, 'Password confirmation is required'),
     })
     .refine(
          (data: { newPassword: string; confirmPassword: string }) =>
               data.newPassword === data.confirmPassword,
          {
               message: 'New passwords do not match',
               path: ['confirmPassword'],
          }
     )
     .refine(
          (data: { currentPassword: string; newPassword: string }) =>
               data.currentPassword !== data.newPassword,
          {
               message: 'New password must be different from current password',
               path: ['newPassword'],
          }
     );

// Settings preferences schema
export const preferencesSchema = z.object({
     theme: z.enum(['light', 'dark', 'system']),
     language: z.string().min(2).max(5),
     autoLockTimeout: z
          .number()
          .min(0.1, 'Auto-lock timeout must be at least 0.1 minutes')
          .max(1440, 'Auto-lock timeout must not exceed 24 hours'),
     biometricEnabled: z.boolean(),
     securityNotifications: z.boolean(),
});

// Delete account confirmation schema
export const deleteAccountSchema = z.object({
     confirmationText: z
          .string()
          .min(1, 'Please type DELETE to confirm')
          .refine(
               (text: string) => text === 'DELETE',
               'Please type DELETE exactly to confirm account deletion'
          ),
     currentPassword: z
          .string()
          .min(1, 'Current password is required for account deletion'),
});

// Factory reset confirmation schema
export const factoryResetSchema = z.object({
     confirmationText: z
          .string()
          .min(1, 'Please type RESET to confirm')
          .refine(
               (text: string) => text === 'RESET',
               'Please type RESET exactly to confirm factory reset'
          ),
     masterPassword: z
          .string()
          .min(1, 'Master password is required for factory reset'),
});

// Export types
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type PreferencesFormData = z.infer<typeof preferencesSchema>;
export type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;
export type FactoryResetFormData = z.infer<typeof factoryResetSchema>;