interface SideNavHeaderProps {
     onClose?: () => void;
     showCloseButton?: boolean;
}

const SideNavHeader: React.FC<SideNavHeaderProps> = ({
     onClose,
     showCloseButton = false
}) => {
     return (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
               {/* Logo and Brand */}
               <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                         <span className="text-lg">🔒</span>
                    </div>
                    <div>
                         <h1 className="text-lg font-bold text-gray-900">SafeVault</h1>
                         <p className="text-xs text-gray-500">Password Manager</p>
                    </div>
               </div>

               {/* Close Button (for mobile) */}
               {showCloseButton && (
                    <button
                         onClick={onClose}
                         className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
                         aria-label="Close navigation"
                    >
                         <span className="text-gray-500 text-xl">✕</span>
                    </button>
               )}
          </div>
     );
};

export default SideNavHeader;