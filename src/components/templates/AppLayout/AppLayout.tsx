import { useState } from 'react';
import SideNav from '../../organisms/SideNav';

interface AppLayoutProps {
     children: React.ReactNode;
     title?: string;
     className?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({
     children,
     title,
     className = ''
}) => {
     const [isSideNavOpen, setIsSideNavOpen] = useState(false);

     const toggleSideNav = () => {
          setIsSideNavOpen(!isSideNavOpen);
     };

     const closeSideNav = () => {
          setIsSideNavOpen(false);
     };

     return (
          <div className="min-h-screen bg-gray-50 flex">
               {/* Side Navigation */}
               <SideNav
                    isOpen={isSideNavOpen}
                    onClose={closeSideNav}
               />

               {/* Main Content Area */}
               <div className="flex-1 flex flex-col md:ml-0">
                    {/* Top Bar */}
                    <header className="bg-white border-b border-gray-200 px-4 py-3 md:px-6">
                         <div className="flex items-center justify-between">
                              {/* Mobile Menu Button */}
                              <button
                                   onClick={toggleSideNav}
                                   className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                                   aria-label="Open navigation menu"
                              >
                                   <span className="text-gray-600 text-xl">☰</span>
                              </button>

                              {/* Page Title */}
                              {title && (
                                   <h1 className="text-xl font-semibold text-gray-900 md:text-2xl">
                                        {title}
                                   </h1>
                              )}

                              {/* Right Side Actions */}
                              <div className="flex items-center gap-2">
                                   {/* Search Button */}
                                   <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-gray-600 text-lg">🔍</span>
                                   </button>

                                   {/* Notifications */}
                                   <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                                        <span className="text-gray-600 text-lg">🔔</span>
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                   </button>
                              </div>
                         </div>
                    </header>

                    {/* Main Content */}
                    <main className={`flex-1 p-4 md:p-6 ${className}`}>
                         {children}
                    </main>
               </div>
          </div>
     );
};

export default AppLayout;