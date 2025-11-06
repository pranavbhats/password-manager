import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { factoryResetSchema, type FactoryResetFormData } from '../../../schemas/settings';
import Input from '../../atoms/Input';
import PasswordInput from '../PasswordInput';
import Button from '../../atoms/Button';

interface FactoryResetModalProps {
     isOpen: boolean;
     isLoading: boolean;
     onClose: () => void;
     onSubmit: () => Promise<void>;
}

const FactoryResetModal: React.FC<FactoryResetModalProps> = ({
     isOpen,
     isLoading,
     onClose,
     onSubmit
}) => {
     const form = useForm<FactoryResetFormData>({
          resolver: zodResolver(factoryResetSchema),
          mode: 'onChange',
     });

     if (!isOpen) return null;

     return (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
               <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Factory Reset</h3>
                    <p className="text-sm text-gray-600 mb-4">
                         This will reset all settings and preferences to their default values. Your vault data will remain intact.
                    </p>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <Input
                              {...form.register('confirmationText')}
                              label="Type RESET to confirm"
                              placeholder="RESET"
                              error={form.formState.errors.confirmationText?.message}
                         />
                         <PasswordInput
                              {...form.register('masterPassword')}
                              label="Master Password"
                              placeholder="Enter your master password"
                              error={form.formState.errors.masterPassword?.message}
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
                                   {isLoading ? 'Resetting...' : 'Factory Reset'}
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
};

export default FactoryResetModal;