import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileUpdateSchema, type ProfileUpdateFormData } from '../../../schemas/settings';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

interface ProfileSectionProps {
     user: {
          displayName?: string;
          email?: string;
     } | null;
     isLoading: boolean;
     onSubmit: (data: ProfileUpdateFormData) => Promise<void>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ user, isLoading, onSubmit }) => {
     const form = useForm<ProfileUpdateFormData>({
          resolver: zodResolver(profileUpdateSchema),
          defaultValues: {
               displayName: user?.displayName || '',
               email: user?.email || '',
          },
          mode: 'onChange',
     });

     return (
          <div className="bg-white shadow rounded-lg">
               <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                    <p className="text-sm text-gray-600">Update your personal information</p>
               </div>
               <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <Input
                              {...form.register('displayName')}
                              label="Display Name"
                              placeholder="Enter your display name"
                              error={form.formState.errors.displayName?.message}
                         />
                         <Input
                              {...form.register('email')}
                              type="email"
                              label="Email Address"
                              placeholder="Enter your email"
                              error={form.formState.errors.email?.message}
                         />
                    </div>
                    <div className="flex justify-end mt-6">
                         <Button
                              type="submit"
                              variant="primary"
                              isLoading={isLoading}
                              disabled={!form.formState.isValid || isLoading}
                         >
                              {isLoading ? 'Updating...' : 'Update Profile'}
                         </Button>
                    </div>
               </form>
          </div>
     );
};

export default ProfileSection;