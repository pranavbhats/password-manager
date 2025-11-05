interface PasswordCardProps {
     name: string;
     username: string;
     lastUsed: string;
     onMenuClick?: () => void;
     onClick?: () => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({
     name,
     username,
     lastUsed,
     onMenuClick,
     onClick
}) => {
     return (
          <div
               className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
               onClick={onClick}
          >
               <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-600">
                                   {name.charAt(0)}
                              </span>
                         </div>
                         <div>
                              <p className="font-medium text-gray-900">{name}</p>
                              <p className="text-sm text-gray-600">{username}</p>
                         </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <span className="text-xs text-gray-500">{lastUsed}</span>
                         <button
                              className="p-2 text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                   e.stopPropagation();
                                   onMenuClick?.();
                              }}
                         >
                              <span>⋯</span>
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default PasswordCard;