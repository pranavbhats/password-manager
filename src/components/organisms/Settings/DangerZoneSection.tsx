import React from 'react';
import Button from '../atoms/Button';

interface DangerZoneSectionProps {
     onLogout: () => Promise<void>;
     onFactoryReset: () => void;
     onDeleteAccount: () => void;
     isLoading: {
          logout: boolean;
     };
}

const DangerZoneSection: React.FC<DangerZoneSectionProps> = ({ 
     onLogout, 
     onFactoryReset, 
     onDeleteAccount, 
     isLoading 
}) => {
     return (
          <div className="bg-white shadow rounded-lg border-red-200">
               <div className="px-6 py-4 border-b border-red-200 bg-red-50">
                    <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
                    <p className="text-sm text-red-600">Irreversible actions for your account</p>
               </div>
               <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                              <div className="text-center">
                                   <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-xl">👋</span>
                                   </div>
                                   <h3 className="font-medium text-gray-900 mb-2">Logout</h3>
                                   <p className="text-sm text-gray-600 mb-4">Sign out of your account</p>
                                   <Button
                                        onClick={onLogout}
                                        variant="secondary"
                                        isLoading={isLoading.logout}
                                        className="w-full"
                                   >
                                        {isLoading.logout ? 'Signing out...' : 'Logout'}
                                   </Button>
                              </div>
                         </div>

                         <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                              <div className="text-center">
                                   <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-xl">🔄</span>
                                   </div>
                                   <h3 className="font-medium text-orange-900 mb-2">Factory Reset</h3>
                                   <p className="text-sm text-orange-700 mb-4">Reset all settings to default values</p>
                                   <Button
                                        onClick={onFactoryReset}
                                        variant="danger"
                                        className="w-full"
                                   >
                                        Factory Reset
                                   </Button>
                              </div>
                         </div>

                         <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                              <div className="text-center">
                                   <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <span className="text-xl">🗑️</span>
                                   </div>
                                   <h3 className="font-medium text-red-900 mb-2">Delete Account</h3>
                                   <p className="text-sm text-red-700 mb-4">Permanently delete your account and all data</p>
                                   <Button
                                        onClick={onDeleteAccount}
                                        variant="danger"
                                        className="w-full"
                                   >
                                        Delete Account
                                   </Button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default DangerZoneSection;