import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavItem from '../../atoms/NavItem';
import SideNavHeader from '../../molecules/SideNavHeader';

// Navigation items configuration
const NAV_ITEMS = [
     {
          id: 'home',
          label: 'Home',
          icon: '🏠',
          path: '/vault'
     },
     {
          id: 'analysis',
          label: 'Analysis',
          icon: '📊',
          path: '/analysis'
     },
     {
          id: 'settings',
          label: 'Settings',
          icon: '⚙️',
          path: '/settings'
     }
];

interface SideNavProps {
     isOpen?: boolean;
     onClose?: () => void;
     className?: string;
}

const SideNav: React.FC<SideNavProps> = ({
     isOpen = true,
     onClose,
     className = ''
}) => {
     const location = useLocation();
     const navigate = useNavigate();
     const [activeItem, setActiveItem] = useState('home');

     // Update active item based on current route
     useEffect(() => {
          const currentItem = NAV_ITEMS.find(item => location.pathname.startsWith(item.path));
          if (currentItem) {
               setActiveItem(currentItem.id);
          }
     }, [location.pathname]);

     const handleNavItemClick = (item: typeof NAV_ITEMS[0]) => {
          setActiveItem(item.id);
          navigate(item.path);

          // Close mobile menu after navigation
          if (onClose) {
               onClose();
          }
     };

     return (
          <>
               {/* Mobile Overlay */}
               {isOpen && (
                    <div
                         className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                         onClick={onClose}
                    />
               )}

               {/* Side Navigation */}
               <div className={`
                    fixed top-0 left-0 h-screen bg-white shadow-xl z-50
                    transform transition-transform duration-300 ease-in-out
                    w-80 md:w-72 flex flex-col
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static md:z-auto md:shadow-none
                    ${className}
               `}>
                    {/* Header */}
                    <div className="shrink-0">
                         <SideNavHeader
                              onClose={onClose}
                              showCloseButton={true}
                         />
                    </div>

                    {/* Navigation Items - Scrollable content */}
                    <div className="flex-1 overflow-y-auto min-h-0 h-full">
                         <nav className="p-4 h-full flex flex-col">
                              <div className="space-y-2 grow">
                                   {NAV_ITEMS.map((item) => (
                                        <NavItem
                                             key={item.id}
                                             icon={item.icon}
                                             label={item.label}
                                             isActive={activeItem === item.id}
                                             onClick={() => handleNavItemClick(item)}
                                        />
                                   ))}
                              </div>
                         </nav>
                    </div>

                    {/* Footer/User Section - Always at bottom */}
                    <div className="shrink-0 p-4 border-t border-gray-200 bg-white">
                         <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                   <span className="text-white text-sm font-semibold">U</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                   <p className="text-sm font-medium text-gray-900 truncate">
                                        User Account
                                   </p>
                                   <p className="text-xs text-gray-500 truncate">
                                        user@example.com
                                   </p>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600 p-1">
                                   <span>⚡</span>
                              </button>
                         </div>
                    </div>
               </div>
          </>
     );
};

export default SideNav;