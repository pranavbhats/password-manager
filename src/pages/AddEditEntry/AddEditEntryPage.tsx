import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../../components/templates/AppLayout';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import PasswordInput from '../../components/molecules/PasswordInput';
import TagChips from '../../components/molecules/TagChips';
import type { PasswordEntryForm } from '../../types';
import { ROUTES } from '../../constants';

const AddEditEntryPage = () => {
     const navigate = useNavigate();
     const { id } = useParams<{ id: string }>();
     const isEditMode = Boolean(id);
     const [isLoading, setIsLoading] = useState(false);
     const [formData, setFormData] = useState<PasswordEntryForm>({
          title: '',
          username: '',
          password: '',
          url: '',
          notes: '',
          category: 'General',
          tags: []
     });

     // Load existing entry data in edit mode
     useEffect(() => {
          if (isEditMode && id) {
               // TODO: Load existing password entry data
               console.log('Loading password entry for edit:', id);
               // Simulate loading existing data
               // setFormData(existingData);
          }
     }, [isEditMode, id]);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value
          }));
     };

     const handleTagsChange = (tags: string[]) => {
          setFormData(prev => ({
               ...prev,
               tags
          }));
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true);

          try {
               if (isEditMode) {
                    // TODO: Implement password entry update
                    console.log('Updating password entry:', id, formData);
               } else {
                    // TODO: Implement password entry creation
                    console.log('Creating password entry:', formData);
               }

               // Simulate API call
               await new Promise(resolve => setTimeout(resolve, 1000));

               // Navigate back to vault
               navigate(ROUTES.VAULT_HOME);
          } catch (error) {
               console.error(`Error ${isEditMode ? 'updating' : 'creating'} password entry:`, error);
          } finally {
               setIsLoading(false);
          }
     };

     const handleCancel = () => {
          navigate(ROUTES.VAULT_HOME);
     };

     const generatePassword = () => {
          // Simple password generator for demo
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
          let password = '';
          for (let i = 0; i < 16; i++) {
               password += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          setFormData(prev => ({
               ...prev,
               password
          }));
     };

     const isFormValid = formData.title.trim() &&
          formData.username.trim() &&
          formData.password.trim() &&
          formData.category.trim();

     return (
          <AppLayout title={isEditMode ? "Edit Password" : "Add New Password"}>
               <div className="w-full max-w-none">
                    {/* Header Section */}
                    <div className="mb-6">
                         <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                              {isEditMode ? 'Edit Password' : 'Add New Password'}
                         </h1>
                         <p className="text-gray-600 mt-2 lg:text-lg">
                              {isEditMode
                                   ? 'Update your password entry details'
                                   : 'Create a new password entry for your vault'
                              }
                         </p>
                    </div>

                    {/* Form Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                         {/* Main Form - Takes 2/3 on desktop */}
                         <div className="lg:col-span-2">
                              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                   <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Title */}
                                        <Input
                                             name="title"
                                             label="Title"
                                             placeholder="e.g., Gmail, Facebook, Work Email"
                                             value={formData.title}
                                             onChange={handleInputChange}
                                             required
                                        />

                                        {/* Username and URL in a row on desktop */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <Input
                                                  name="username"
                                                  label="Username/Email"
                                                  placeholder="Enter username or email"
                                                  value={formData.username}
                                                  onChange={handleInputChange}
                                                  required
                                             />

                                             <Input
                                                  name="url"
                                                  label="Website URL (Optional)"
                                                  placeholder="https://example.com"
                                                  value={formData.url}
                                                  onChange={handleInputChange}
                                                  type="url"
                                             />
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-2">
                                             <PasswordInput
                                                  name="password"
                                                  label="Password"
                                                  placeholder="Enter password"
                                                  value={formData.password}
                                                  onChange={handleInputChange}
                                                  required
                                             />
                                             <Button
                                                  type="button"
                                                  variant="secondary"
                                                  size="sm"
                                                  onClick={generatePassword}
                                                  className="w-full sm:w-auto"
                                             >
                                                  Generate Strong Password
                                             </Button>
                                        </div>

                                        {/* Category and Tags in a row on desktop */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <div className="space-y-2">
                                                  <label className="block text-sm font-medium text-gray-700">
                                                       Category <span className="text-red-500">*</span>
                                                  </label>
                                                  <select
                                                       name="category"
                                                       value={formData.category}
                                                       onChange={handleInputChange}
                                                       className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                       required
                                                  >
                                                       <option value="General">General</option>
                                                       <option value="Social Media">Social Media</option>
                                                       <option value="Work">Work</option>
                                                       <option value="Banking">Banking</option>
                                                       <option value="Shopping">Shopping</option>
                                                       <option value="Entertainment">Entertainment</option>
                                                       <option value="Education">Education</option>
                                                       <option value="Other">Other</option>
                                                  </select>
                                             </div>

                                             <TagChips
                                                  tags={formData.tags}
                                                  onChange={handleTagsChange}
                                                  placeholder="Add tags like work, important..."
                                                  label="Tags"
                                                  required={false}
                                             />
                                        </div>

                                        {/* Notes */}
                                        <div className="space-y-2">
                                             <label className="block text-sm font-medium text-gray-700">
                                                  Notes (Optional)
                                             </label>
                                             <textarea
                                                  name="notes"
                                                  placeholder="Add any additional notes..."
                                                  value={formData.notes}
                                                  onChange={handleInputChange}
                                                  rows={4}
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                             />
                                        </div>

                                        {/* Form Actions */}
                                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 sm:justify-end">
                                             <Button
                                                  type="button"
                                                  variant="secondary"
                                                  size="lg"
                                                  onClick={handleCancel}
                                                  disabled={isLoading}
                                                  className="flex-1 sm:flex-none"
                                             >
                                                  Cancel
                                             </Button>
                                             <Button
                                                  type="submit"
                                                  variant="primary"
                                                  size="lg"
                                                  isLoading={isLoading}
                                                  disabled={!isFormValid}
                                                  className="flex-1 sm:flex-none"
                                             >
                                                  {isLoading
                                                       ? (isEditMode ? 'Updating...' : 'Saving...')
                                                       : (isEditMode ? 'Update Password' : 'Save Password')
                                                  }
                                             </Button>
                                        </div>
                                   </form>
                              </div>
                         </div>

                         {/* Sidebar - Takes 1/3 on desktop */}
                         <div className="lg:col-span-1">
                              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
                                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Tips</h3>

                                   <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                             <span className="text-green-500 text-xl">🔒</span>
                                             <div>
                                                  <h4 className="font-medium text-gray-900">Strong Password</h4>
                                                  <p className="text-sm text-gray-600">Use a mix of letters, numbers, and symbols</p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                             <span className="text-blue-500 text-xl">🔄</span>
                                             <div>
                                                  <h4 className="font-medium text-gray-900">Unique Passwords</h4>
                                                  <p className="text-sm text-gray-600">Don't reuse passwords across sites</p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                             <span className="text-purple-500 text-xl">🛡️</span>
                                             <div>
                                                  <h4 className="font-medium text-gray-900">Two-Factor Auth</h4>
                                                  <p className="text-sm text-gray-600">Enable 2FA when available</p>
                                             </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                             <span className="text-orange-500 text-xl">📝</span>
                                             <div>
                                                  <h4 className="font-medium text-gray-900">Tags & Notes</h4>
                                                  <p className="text-sm text-gray-600">Add tags and notes for easy organization</p>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="font-medium text-blue-900 mb-2">Security Score</h4>
                                        <div className="flex items-center gap-2">
                                             <div className="flex-1 bg-blue-200 rounded-full h-2">
                                                  <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                                             </div>
                                             <span className="text-sm font-medium text-blue-900">Strong</span>
                                        </div>
                                        <p className="text-xs text-blue-700 mt-1">Based on password complexity</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </AppLayout>
     );
};

export default AddEditEntryPage;