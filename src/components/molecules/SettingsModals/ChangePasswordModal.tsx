import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordChangeSchema, type PasswordChangeFormData } from '../../../schemas/settings';
import PasswordInput from '../PasswordInput';
import Button from '../../atoms/Button';

interface ChangePasswordModalProps {
     isOpen: boolean;
     isLoading: boolean;
     onClose: () => void;
     onSubmit: (data: PasswordChangeFormData) => Promise<void>;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
     isOpen,
     isLoading,
     onClose,
     onSubmit
}) => {
     const form = useForm<PasswordChangeFormData>({
          resolver: zodResolver(passwordChangeSchema),
          mode: 'onChange',
     });

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <PasswordInput
                              {...form.register('currentPassword')}
                              label="Current Password"
                              placeholder="Enter current password"
                              error={form.formState.errors.currentPassword?.message}
                         />
                         <PasswordInput
                              {...form.register('newPassword')}
                              label="New Password"
                              placeholder="Enter new password"
                              error={form.formState.errors.newPassword?.message}
                         />
                         <PasswordInput
                              {...form.register('confirmPassword')}
                              label="Confirm New Password"
                              placeholder="Confirm new password"
                              error={form.formState.errors.confirmPassword?.message}
                         />
                         <div className="flex space-x-3">
                              <Button
                                   type="button"
                                   variant="secondary"
                                   onClick={onClose}
                                   className="flex-1"
                              >
                                   Cancel
                              </Button>
                              <Button
                                   type="submit"
                                   variant="primary"
                                   isLoading={isLoading}
                                   disabled={!form.formState.isValid || isLoading}
                                   className="flex-1"
                              >
                                   {isLoading ? 'Changing...' : 'Change Password'}
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default ChangePasswordModal;