import React from 'react';

export type TabType = 'profile' | 'security' | 'preferences' | 'danger';

interface Tab {
     id: TabType;
     label: string;
     icon: string;
}

interface SettingsSidebarProps {
     activeTab: TabType;
     onTabChange: (tab: TabType) => void;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
     const tabs: Tab[] = [
          { id: 'profile' as TabType, label: 'Profile', icon: '👤' },
          { id: 'security' as TabType, label: 'Security', icon: '🔒' },
          { id: 'preferences' as TabType, label: 'Preferences', icon: '⚙️' },
          { id: 'danger' as TabType, label: 'Danger Zone', icon: '⚠️' },
     ];

     return (
          <div className="w-64 xl:w-80 bg-white border-r border-gray-200 shrink-0">
               <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
                    <p className="text-sm text-gray-600 mt-1">Manage your account and preferences</p>
               </div>
               <nav className="p-4 space-y-2">
                    {tabs.map((tab) => (
                         <button
                              key={tab.id}
                              onClick={() => onTabChange(tab.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                                   activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                         >
                              <span className="text-lg">{tab.icon}</span>
                              <span className="font-medium">{tab.label}</span>
                         </button>
                    ))}
               </nav>
          </div>
     );
};

export default SettingsSidebar;