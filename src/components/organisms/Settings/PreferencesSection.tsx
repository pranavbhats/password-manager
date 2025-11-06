import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { preferencesSchema, type PreferencesFormData } from '../../../schemas/settings';
import Button from '../../atoms/Button';

interface PreferencesSectionProps {
     preferences: PreferencesFormData;
     isLoading: boolean;
     onSubmit: (data: PreferencesFormData) => Promise<void>;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ preferences, isLoading, onSubmit }) => {
     const form = useForm<PreferencesFormData>({
          resolver: zodResolver(preferencesSchema),
          defaultValues: preferences,
          mode: 'onChange',
     });

     return (
          <div className="bg-white shadow rounded-lg">
               <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                    <p className="text-sm text-gray-600">Customize your app experience</p>
               </div>
               <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                              <Controller
                                   name="theme"
                                   control={form.control}
                                   render={({ field }) => (
                                        <select
                                             {...field}
                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                             <option value="light">Light</option>
                                             <option value="dark">Dark</option>
                                             <option value="system">System</option>
                                        </select>
                                   )}
                              />
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                   Auto-lock Timeout (minutes)
                              </label>
                              <Controller
                                   name="autoLockTimeout"
                                   control={form.control}
                                   render={({ field }) => (
                                        <input
                                             {...field}
                                             type="number"
                                             min="1"
                                             max="1440"
                                             onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                   )}
                              />
                         </div>
                    </div>

                    <div className="mt-6">
                         <div className="flex items-center">
                              <Controller
                                   name="securityNotifications"
                                   control={form.control}
                                   render={({ field }) => (
                                        <input
                                             type="checkbox"
                                             checked={field.value}
                                             onChange={(e) => field.onChange(e.target.checked)}
                                             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                   )}
                              />
                              <label className="ml-2 block text-sm text-gray-900">
                                   Enable security notifications
                              </label>
                         </div>
                    </div>

                    <div className="flex justify-end mt-6">
                         <Button
                              type="submit"
                              variant="primary"
                              isLoading={isLoading}
                              disabled={!form.formState.isValid || isLoading}
                         >
                              {isLoading ? 'Saving...' : 'Save Preferences'}
                         </Button>
                    </div>
               </form>
          </div>
     );
};

export default PreferencesSection;