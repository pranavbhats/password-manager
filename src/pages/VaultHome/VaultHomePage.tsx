import AppLayout from '../../components/templates/AppLayout';

const VaultHomePage = () => {
     return (
          <AppLayout title="Your Vault">
               <div className="max-w-4xl mx-auto">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                         <div className="flex-1">
                              <input
                                   type="text"
                                   placeholder="Search your passwords..."
                                   className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                         </div>
                         <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium">
                              Add Password
                         </button>
                    </div>

                    {/* Recent Passwords */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                         <div className="p-6 border-b border-gray-200">
                              <h2 className="text-lg font-semibold text-gray-900">Recent Passwords</h2>
                         </div>
                         <div className="divide-y divide-gray-200">
                              {[
                                   { name: 'Gmail', username: 'user@gmail.com', lastUsed: '2 hours ago' },
                                   { name: 'GitHub', username: 'developer', lastUsed: '1 day ago' },
                                   { name: 'Netflix', username: 'user@email.com', lastUsed: '3 days ago' },
                              ].map((item, index) => (
                                   <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                       <span className="text-sm font-medium text-gray-600">
                                                            {item.name.charAt(0)}
                                                       </span>
                                                  </div>
                                                  <div>
                                                       <p className="font-medium text-gray-900">{item.name}</p>
                                                       <p className="text-sm text-gray-600">{item.username}</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-center gap-2">
                                                  <span className="text-xs text-gray-500">{item.lastUsed}</span>
                                                  <button className="p-2 text-gray-400 hover:text-gray-600">
                                                       <span>⋯</span>
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </AppLayout>
     );
};

export default VaultHomePage;