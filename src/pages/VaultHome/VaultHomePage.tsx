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
               <div className="max-w-4xl mx-auto px-4 md:px-0">
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                                   />
                              ))}
                         </div>
                    </div>
               </div>
          </AppLayout>
     );
};

export default VaultHomePage;