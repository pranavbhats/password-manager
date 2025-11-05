interface NavItemProps {
     icon: React.ReactNode;
     label: string;
     isActive?: boolean;
     onClick?: () => void;
     className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
     icon,
     label,
     isActive = false,
     onClick,
     className = ''
}) => {
     return (
          <button
               onClick={onClick}
               className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    rounded-xl transition-all duration-200
                    ${isActive
                         ? 'bg-blue-50 text-blue-600 border border-blue-200'
                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${className}
               `}
          >
               <span className={`text-xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {icon}
               </span>
               <span className="font-medium">{label}</span>
          </button>
     );
};

export default NavItem;