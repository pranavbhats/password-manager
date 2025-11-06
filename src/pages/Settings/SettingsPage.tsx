import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import {
     selectUser,
     selectPreferences,
     updateProfile,
     updatePreferences,
     logout,
     factoryReset
} from '../../store/slices/authSlice';
import {
     openModal,
     closeModal,
     selectModals,
     addNotification
} from '../../store/slices/uiSlice';
import { authService } from '../../services/auth';
import {
     type ProfileUpdateFormData,
     type PasswordChangeFormData,
     type DeleteAccountFormData,
     type PreferencesFormData
} from '../../schemas/settings';

// Components
import AppLayout from '../../components/templates/AppLayout';
import ProfileSection from '../../components/organisms/Settings/ProfileSection';
import SecuritySection from '../../components/organisms/Settings/SecuritySection';
import PreferencesSection from '../../components/organisms/Settings/PreferencesSection';
import DangerZoneSection from '../../components/organisms/Settings/DangerZoneSection';
import SettingsSidebar, { type TabType } from '../../components/organisms/Settings/SettingsSidebar';
import ChangePasswordModal from '../../components/molecules/SettingsModals/ChangePasswordModal';
import DeleteAccountModal from '../../components/molecules/SettingsModals/DeleteAccountModal';
import FactoryResetModal from '../../components/molecules/SettingsModals/FactoryResetModal';

const SettingsPage: React.FC = () => {
     const dispatch = useAppDispatch();
     const user = useAppSelector(selectUser);
     const preferences = useAppSelector(selectPreferences);
     const modals = useAppSelector(selectModals);

     const [isLoading, setIsLoading] = useState({
          profile: false,
          password: false,
          preferences: false,
          deleteAccount: false,
          factoryReset: false,
          logout: false,
     });

     // Tab management for desktop
     const [activeTab, setActiveTab] = useState<TabType>('profile');

     // Handlers
     const handleProfileUpdate = async (data: ProfileUpdateFormData) => {
          setIsLoading(prev => ({ ...prev, profile: true }));
          try {
               await authService.updateProfile(data.displayName);
               if (data.email !== user?.email) {
                    await authService.updateEmail(data.email);
               }
               dispatch(updateProfile(data));
               dispatch(addNotification({
                    type: 'success',
                    title: 'Profile Updated',
                    message: 'Your profile has been updated successfully.',
               }));
          } catch (error) {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Update Failed',
                    message: error instanceof Error ? error.message : 'Failed to update profile.',
               }));
          } finally {
               setIsLoading(prev => ({ ...prev, profile: false }));
          }
     };

     const handlePasswordChange = async (data: PasswordChangeFormData) => {
          setIsLoading(prev => ({ ...prev, password: true }));
          try {
               await authService.updatePassword(data.newPassword);
               dispatch(addNotification({
                    type: 'success',
                    title: 'Password Changed',
                    message: 'Your password has been changed successfully.',
               }));
               dispatch(closeModal('changePassword'));
          } catch (error) {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Password Change Failed',
                    message: error instanceof Error ? error.message : 'Failed to change password.',
               }));
          } finally {
               setIsLoading(prev => ({ ...prev, password: false }));
          }
     };

     const handlePreferencesUpdate = async (data: PreferencesFormData) => {
          setIsLoading(prev => ({ ...prev, preferences: true }));
          try {
               dispatch(updatePreferences(data));
               dispatch(addNotification({
                    type: 'success',
                    title: 'Preferences Updated',
                    message: 'Your preferences have been saved.',
               }));
          } catch {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Update Failed',
                    message: 'Failed to update preferences.',
               }));
          } finally {
               setIsLoading(prev => ({ ...prev, preferences: false }));
          }
     };

     const handleLogout = async () => {
          setIsLoading(prev => ({ ...prev, logout: true }));
          try {
               await authService.signOut();
               dispatch(logout());
          } catch {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Logout Failed',
                    message: 'Failed to logout. Please try again.',
               }));
               setIsLoading(prev => ({ ...prev, logout: false }));
          }
     };

     const handleDeleteAccount = async (data: DeleteAccountFormData) => {
          setIsLoading(prev => ({ ...prev, deleteAccount: true }));
          try {
               await authService.deleteAccount(data.currentPassword);
               dispatch(addNotification({
                    type: 'success',
                    title: 'Account Deleted',
                    message: 'Your account has been permanently deleted.',
               }));
          } catch (error) {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Deletion Failed',
                    message: error instanceof Error ? error.message : 'Failed to delete account.',
               }));
               setIsLoading(prev => ({ ...prev, deleteAccount: false }));
          }
     };

     const handleFactoryReset = async () => {
          setIsLoading(prev => ({ ...prev, factoryReset: true }));
          try {
               dispatch(factoryReset());
               dispatch(addNotification({
                    type: 'success',
                    title: 'Factory Reset Complete',
                    message: 'All settings and preferences have been reset to defaults.',
               }));
               dispatch(closeModal('factoryReset'));
          } catch {
               dispatch(addNotification({
                    type: 'error',
                    title: 'Reset Failed',
                    message: 'Failed to perform factory reset.',
               }));
          } finally {
               setIsLoading(prev => ({ ...prev, factoryReset: false }));
          }
     };

     // Render profile section
     const renderProfileSection = () => (
          <ProfileSection
               user={user}
               isLoading={isLoading.profile}
               onSubmit={handleProfileUpdate}
          />
     );

     // Render security section
     const renderSecuritySection = () => (
          <SecuritySection
               onChangePassword={() => dispatch(openModal('changePassword'))}
          />
     );

     // Render preferences section
     const renderPreferencesSection = () => (
          <PreferencesSection
               preferences={preferences}
               isLoading={isLoading.preferences}
               onSubmit={handlePreferencesUpdate}
          />
     );

     // Render danger zone section
     const renderDangerZoneSection = () => (
          <DangerZoneSection
               onLogout={handleLogout}
               onFactoryReset={() => dispatch(openModal('factoryReset'))}
               onDeleteAccount={() => dispatch(openModal('deleteAccount'))}
               isLoading={{ logout: isLoading.logout }}
          />
     );

     if (!user) {
          return (
               <AppLayout title="Settings">
                    <div className="flex items-center justify-center h-full">
                         <div className="text-center">
                              <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
                              <p className="text-gray-600">Please log in to access settings.</p>
                         </div>
                    </div>
               </AppLayout>
          );
     }

     return (
          <AppLayout title="Settings">
               <div className="h-full overflow-y-auto">
                    {/* Desktop Layout (lg and up) */}
                    <div className="hidden lg:block h-full">
                         <div className="h-full flex">
                              {/* Left Sidebar - Tab Navigation */}
                              <SettingsSidebar
                                   activeTab={activeTab}
                                   onTabChange={setActiveTab}
                              />

                              {/* Right Content Area */}
                              <div className="flex-1 bg-gray-50">
                                   <div className="h-full overflow-y-auto">
                                        <div className="max-w-4xl mx-auto p-8">
                                             <div className="space-y-8">
                                                  {activeTab === 'profile' && renderProfileSection()}
                                                  {activeTab === 'security' && renderSecuritySection()}
                                                  {activeTab === 'preferences' && renderPreferencesSection()}
                                                  {activeTab === 'danger' && renderDangerZoneSection()}
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Mobile Layout (below lg) */}
                    <div className="lg:hidden">
                         <div className="p-4 sm:p-6">
                              <div className="space-y-8">
                                   {renderProfileSection()}
                                   {renderSecuritySection()}
                                   {renderPreferencesSection()}
                                   {renderDangerZoneSection()}
                              </div>
                         </div>
                    </div>
               </div>

               {/* Modals */}
               <ChangePasswordModal
                    isOpen={modals.changePassword}
                    isLoading={isLoading.password}
                    onClose={() => dispatch(closeModal('changePassword'))}
                    onSubmit={handlePasswordChange}
               />

               <DeleteAccountModal
                    isOpen={modals.deleteAccount}
                    isLoading={isLoading.deleteAccount}
                    onClose={() => dispatch(closeModal('deleteAccount'))}
                    onSubmit={handleDeleteAccount}
               />

               <FactoryResetModal
                    isOpen={modals.factoryReset}
                    isLoading={isLoading.factoryReset}
                    onClose={() => dispatch(closeModal('factoryReset'))}
                    onSubmit={handleFactoryReset}
               />
          </AppLayout>
     );
};

export default SettingsPage;