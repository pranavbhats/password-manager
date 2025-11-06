import React from 'react';
import Button from '../../atoms/Button';

interface SecuritySectionProps {
     onChangePassword: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({ onChangePassword }) => {
     return (
          <div className="bg-white shadow rounded-lg">
               <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                    <p className="text-sm text-gray-600">Manage your password and security settings</p>
               </div>
               <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                   <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="text-lg">🔑</span>
                                   </div>
                                   <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-1">Account Password</h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                             Change your account password to keep your data secure
                                        </p>
                                        <Button
                                             onClick={onChangePassword}
                                             variant="secondary"
                                             className="w-full sm:w-auto"
                                        >
                                             Change Password
                                        </Button>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-start gap-3">
                                   <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="text-lg">🛡️</span>
                                   </div>
                                   <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 mb-1">Two-Factor Authentication</h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                             Add an extra layer of security to your account
                                        </p>
                                        <Button
                                             variant="secondary"
                                             disabled
                                             className="w-full sm:w-auto opacity-50"
                                        >
                                             Coming Soon
                                        </Button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default SecuritySection;