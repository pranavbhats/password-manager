import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteAccountSchema, type DeleteAccountFormData } from '../../../schemas/settings';
import Input from '../../atoms/Input';
import PasswordInput from '../PasswordInput';
import Button from '../../atoms/Button';

interface DeleteAccountModalProps {
     isOpen: boolean;
     isLoading: boolean;
     onClose: () => void;
     onSubmit: (data: DeleteAccountFormData) => Promise<void>;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
     isOpen,
     isLoading,
     onClose,
     onSubmit
}) => {
     const form = useForm<DeleteAccountFormData>({
          resolver: zodResolver(deleteAccountSchema),
          mode: 'onChange',
     });

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                         This action cannot be undone. This will permanently delete your account and all associated data.
                    </p>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <Input
                              {...form.register('confirmationText')}
                              label="Type DELETE to confirm"
                              placeholder="DELETE"
                              error={form.formState.errors.confirmationText?.message}
                         />
                         <PasswordInput
                              {...form.register('currentPassword')}
                              label="Current Password"
                              placeholder="Enter your password"
                              error={form.formState.errors.currentPassword?.message}
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
                                   variant="danger"
                                   isLoading={isLoading}
                                   disabled={!form.formState.isValid || isLoading}
                                   className="flex-1"
                              >
                                   {isLoading ? 'Deleting...' : 'Delete Account'}
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default DeleteAccountModal;