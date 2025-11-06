import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/templates/AppLayout';
import PasswordCard from '../../components/molecules/PasswordCard';
import Button from '../../components/atoms/Button';
import { ROUTES } from '../../constants';
import type { PasswordEntry } from '../../types';

const VaultHomePage = () => {
     const navigate = useNavigate();

     const handleAddPassword = () => {
          navigate(ROUTES.ADD_ENTRY);
     };

     const handleEditPassword = (entry: PasswordEntry) => {
          // Navigate to edit page with entry ID
          navigate(`${ROUTES.EDIT_ENTRY}/${entry.id}`);
     };

     const handleDeletePassword = (entry: PasswordEntry) => {
          // TODO: Implement delete confirmation dialog and delete logic
          console.log('Delete password:', entry.title);
          // You can implement a confirmation modal here
     };

     // Mock password entries for demonstration
     const mockPasswordEntries: PasswordEntry[] = [
          {
               id: '1',
               title: 'Gmail',
               username: 'user@gmail.com',
               password: 'SecurePassword123!',
               url: 'https://gmail.com',
               notes: 'Primary email account for work and personal use',
               category: 'email',
               tags: ['work', 'important'],
               createdAt: new Date('2024-01-15'),
               updatedAt: new Date('2024-11-01'),
               lastUsed: new Date('2024-11-05'),
               strength: 'very-strong'
          },
          {
               id: '2',
               title: 'GitHub',
               username: 'developer',
               password: 'GitPass456#',
               url: 'https://github.com',
               notes: 'Development repositories and projects',
               category: 'work',
               tags: ['development', 'code', 'important'],
               createdAt: new Date('2024-02-10'),
               updatedAt: new Date('2024-10-28'),
               lastUsed: new Date('2024-11-04'),
               strength: 'strong'
          },
          {
               id: '3',
               title: 'Netflix',
               username: 'user@email.com',
               password: 'NetflixPass789',
               url: 'https://netflix.com',
               notes: 'Family subscription for streaming',
               category: 'entertainment',
               tags: ['streaming', 'family'],
               createdAt: new Date('2024-03-05'),
               updatedAt: new Date('2024-10-15'),
               lastUsed: new Date('2024-11-02'),
               strength: 'medium'
          }
     ];

     return (
          <AppLayout title="Your Vault">
               {/* Mobile Layout */}
               <div className="lg:hidden px-4">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                         <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                              <div className="flex items-center gap-3 md:gap-4">
                                   <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">🔐</span>
                                   </div>
                                   <div>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">24</p>
                                        <p className="text-xs md:text-sm text-gray-600">Passwords</p>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                              <div className="flex items-center gap-3 md:gap-4">
                                   <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">🛡️</span>
                                   </div>
                                   <div>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">18</p>
                                        <p className="text-xs md:text-sm text-gray-600">Strong</p>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                              <div className="flex items-center gap-3 md:gap-4">
                                   <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                        <span className="text-lg md:text-2xl">⚠️</span>
                                   </div>
                                   <div>
                                        <p className="text-xl md:text-2xl font-bold text-gray-900">6</p>
                                        <p className="text-xs md:text-sm text-gray-600">Weak</p>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Search and Add Button */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="Search your passwords..."
                                   className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                         </div>
                         <Button
                              variant="primary"
                              onClick={handleAddPassword}
                         >
                              Add Password
                         </Button>
                    </div>

                    {/* Recent Passwords */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                         <div className="p-4 md:p-6 border-b border-gray-200">
                              <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Passwords</h2>
                         </div>
                         <div className="divide-y divide-gray-200">
                              {mockPasswordEntries.map((entry) => (
                                   <PasswordCard
                                        key={entry.id}
                                        entry={entry}
                                        onClick={() => console.log('Password clicked:', entry.title)}
                                        onMenuClick={() => console.log('Menu clicked:', entry.title)}
                                        onEdit={handleEditPassword}
                                        onDelete={handleDeletePassword}
                                   />
                              ))}
                         </div>
                    </div>

                    {/* Mobile: Quick Actions */}
                    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 mb-6">
                         <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                         <div className="space-y-3">
                              <button
                                   onClick={handleAddPassword}
                                   className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                              >
                                   <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">+</span>
                                   </div>
                                   <div>
                                        <p className="font-medium text-gray-900">Add New Password</p>
                                        <p className="text-sm text-gray-600">Create a new password entry</p>
                                   </div>
                              </button>

                              <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                   <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">🔄</span>
                                   </div>
                                   <div>
                                        <p className="font-medium text-gray-900">Generate Password</p>
                                        <p className="text-sm text-gray-600">Create a secure password</p>
                                   </div>
                              </button>

                              <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                   <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white text-lg">📊</span>
                                   </div>
                                   <div>
                                        <p className="font-medium text-gray-900">Security Analysis</p>
                                        <p className="text-sm text-gray-600">Check password strength</p>
                                   </div>
                              </button>
                         </div>
                    </div>

                    {/* Mobile: Security Tips */}
                    <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-blue-200 mb-6">
                         <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">🛡️ Security Tips</h3>
                         <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                   <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                   <p className="text-sm text-gray-700">Use unique passwords for each account</p>
                              </div>
                              <div className="flex items-start gap-3">
                                   <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                                   <p className="text-sm text-gray-700">Enable two-factor authentication when possible</p>
                              </div>
                              <div className="flex items-start gap-3">
                                   <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                                   <p className="text-sm text-gray-700">Regularly update your passwords</p>
                              </div>
                              <div className="flex items-start gap-3">
                                   <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                                   <p className="text-sm text-gray-700">Use passwords with 12+ characters</p>
                              </div>
                         </div>
                    </div>

                    {/* Mobile: Vault Health */}
                    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
                         <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Vault Health</h3>
                         <div className="space-y-4">
                              <div>
                                   <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Overall Score</span>
                                        <span className="text-sm font-bold text-green-600">85%</span>
                                   </div>
                                   <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                   </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 pt-2">
                                   <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">18</p>
                                        <p className="text-xs text-gray-600">Strong</p>
                                   </div>
                                   <div className="text-center">
                                        <p className="text-2xl font-bold text-red-600">6</p>
                                        <p className="text-xs text-gray-600">Weak</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Desktop Layout with Sidebar */}
               <div className="hidden lg:block">
                    <div className="w-full max-w-none">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Main Content Area */}
                              <div className="lg:col-span-2">
                                   {/* Quick Stats */}
                                   <div className="grid grid-cols-3 gap-6 mb-6">
                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                             <div className="flex items-center gap-4">
                                                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                       <span className="text-2xl">🔐</span>
                                                  </div>
                                                  <div>
                                                       <p className="text-2xl font-bold text-gray-900">24</p>
                                                       <p className="text-sm text-gray-600">Passwords</p>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                             <div className="flex items-center gap-4">
                                                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                                       <span className="text-2xl">🛡️</span>
                                                  </div>
                                                  <div>
                                                       <p className="text-2xl font-bold text-gray-900">18</p>
                                                       <p className="text-sm text-gray-600">Strong</p>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                             <div className="flex items-center gap-4">
                                                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                                       <span className="text-2xl">⚠️</span>
                                                  </div>
                                                  <div>
                                                       <p className="text-2xl font-bold text-gray-900">6</p>
                                                       <p className="text-sm text-gray-600">Weak</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Search and Add Button */}
                                   <div className="flex gap-4 mb-6">
                                        <div className="flex-1">
                                             <input
                                                  type="text"
                                                  placeholder="Search your passwords..."
                                                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                             />
                                        </div>
                                        <Button
                                             variant="primary"
                                             onClick={handleAddPassword}
                                        >
                                             Add Password
                                        </Button>
                                   </div>

                                   {/* Recent Passwords */}
                                   <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                                        <div className="p-6 border-b border-gray-200">
                                             <h2 className="text-lg font-semibold text-gray-900">Recent Passwords</h2>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                             {mockPasswordEntries.map((entry) => (
                                                  <PasswordCard
                                                       key={entry.id}
                                                       entry={entry}
                                                       onClick={() => console.log('Password clicked:', entry.title)}
                                                       onMenuClick={() => console.log('Menu clicked:', entry.title)}
                                                       onEdit={handleEditPassword}
                                                       onDelete={handleDeletePassword}
                                                  />
                                             ))}
                                        </div>
                                   </div>
                              </div>

                              {/* Right Sidebar */}
                              <div className="lg:col-span-1 space-y-6">
                                   {/* Quick Actions */}
                                   <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                        <div className="space-y-3">
                                             <button
                                                  onClick={handleAddPassword}
                                                  className="w-full flex items-center gap-3 p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                                             >
                                                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                                       <span className="text-white text-lg">+</span>
                                                  </div>
                                                  <div>
                                                       <p className="font-medium text-gray-900">Add New Password</p>
                                                       <p className="text-sm text-gray-600">Create a new password entry</p>
                                                  </div>
                                             </button>

                                             <button className="w-full flex items-center gap-3 p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                                                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                                       <span className="text-white text-lg">🔄</span>
                                                  </div>
                                                  <div>
                                                       <p className="font-medium text-gray-900">Generate Password</p>
                                                       <p className="text-sm text-gray-600">Create a secure password</p>
                                                  </div>
                                             </button>

                                             <button className="w-full flex items-center gap-3 p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                                                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                                       <span className="text-white text-lg">📊</span>
                                                  </div>
                                                  <div>
                                                       <p className="font-medium text-gray-900">Security Analysis</p>
                                                       <p className="text-sm text-gray-600">Check password strength</p>
                                                  </div>
                                             </button>
                                        </div>
                                   </div>

                                   {/* Security Tips */}
                                   <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🛡️ Security Tips</h3>
                                        <div className="space-y-3">
                                             <div className="flex items-start gap-3">
                                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                                  <p className="text-sm text-gray-700">Use unique passwords for each account</p>
                                             </div>
                                             <div className="flex items-start gap-3">
                                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                                                  <p className="text-sm text-gray-700">Enable two-factor authentication when possible</p>
                                             </div>
                                             <div className="flex items-start gap-3">
                                                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 shrink-0"></div>
                                                  <p className="text-sm text-gray-700">Regularly update your passwords</p>
                                             </div>
                                             <div className="flex items-start gap-3">
                                                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 shrink-0"></div>
                                                  <p className="text-sm text-gray-700">Use passwords with 12+ characters</p>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Recent Activity */}
                                   <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                                        <div className="space-y-4">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                       <span className="text-green-600 text-sm">✓</span>
                                                  </div>
                                                  <div className="flex-1">
                                                       <p className="text-sm font-medium text-gray-900">Password updated</p>
                                                       <p className="text-xs text-gray-500">Gmail • 2 hours ago</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                       <span className="text-blue-600 text-sm">+</span>
                                                  </div>
                                                  <div className="flex-1">
                                                       <p className="text-sm font-medium text-gray-900">New entry added</p>
                                                       <p className="text-xs text-gray-500">GitHub • 1 day ago</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-center gap-3">
                                                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                       <span className="text-purple-600 text-sm">🔍</span>
                                                  </div>
                                                  <div className="flex-1">
                                                       <p className="text-sm font-medium text-gray-900">Security scan completed</p>
                                                       <p className="text-xs text-gray-500">3 days ago</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   {/* Vault Health */}
                                   <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vault Health</h3>
                                        <div className="space-y-4">
                                             <div>
                                                  <div className="flex justify-between items-center mb-2">
                                                       <span className="text-sm font-medium text-gray-700">Overall Score</span>
                                                       <span className="text-sm font-bold text-green-600">85%</span>
                                                  </div>
                                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                                       <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                                  </div>
                                             </div>
                                             <div className="grid grid-cols-2 gap-4 pt-2">
                                                  <div className="text-center">
                                                       <p className="text-2xl font-bold text-green-600">18</p>
                                                       <p className="text-xs text-gray-600">Strong</p>
                                                  </div>
                                                  <div className="text-center">
                                                       <p className="text-2xl font-bold text-red-600">6</p>
                                                       <p className="text-xs text-gray-600">Weak</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </AppLayout>
     );
};

export default VaultHomePage;