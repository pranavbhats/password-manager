import { useState, useEffect, useRef } from 'react';
import type { PasswordEntry } from '../../../types';

interface PasswordCardProps {
     entry: PasswordEntry;
     onMenuClick?: () => void;
     onClick?: () => void;
     onEdit?: (entry: PasswordEntry) => void;
     onDelete?: (entry: PasswordEntry) => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({
     entry,
     onMenuClick,
     onClick,
     onEdit,
     onDelete
}) => {
     const [isExpanded, setIsExpanded] = useState(false);
     const [isMobile, setIsMobile] = useState(false);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const mobileDropdownRef = useRef<HTMLDivElement>(null);
     const desktopDropdownRef = useRef<HTMLDivElement>(null);

     // Mobile detection with resize listener
     useEffect(() => {
          const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
          checkIsMobile();
          window.addEventListener('resize', checkIsMobile);
          return () => window.removeEventListener('resize', checkIsMobile);
     }, []);

     // Close dropdown when clicking outside
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               const target = event.target as Node;
               const isOutsideMobile = mobileDropdownRef.current && !mobileDropdownRef.current.contains(target);
               const isOutsideDesktop = desktopDropdownRef.current && !desktopDropdownRef.current.contains(target);

               if (isOutsideMobile && isOutsideDesktop) {
                    setIsDropdownOpen(false);
               }
          };

          if (isDropdownOpen) {
               document.addEventListener('mousedown', handleClickOutside);
               return () => document.removeEventListener('mousedown', handleClickOutside);
          }
     }, [isDropdownOpen]);

     // Utility functions
     const getStrengthColor = (strength: PasswordEntry['strength']) => {
          const colors = {
               'weak': 'bg-red-100 text-red-700 border-red-200',
               'medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
               'strong': 'bg-green-100 text-green-700 border-green-200',
               'very-strong': 'bg-emerald-100 text-emerald-700 border-emerald-200'
          };
          return colors[strength] || 'bg-gray-100 text-gray-700 border-gray-200';
     };

     const getCategoryIcon = (category: string) => {
          const icons: Record<string, string> = {
               'social': '👥', 'work': '💼', 'finance': '💳', 'shopping': '🛒',
               'entertainment': '🎬', 'email': '📧', 'utilities': '⚡', 'health': '🏥',
               'education': '🎓', 'travel': '✈️', 'other': '🔐'
          };
          return icons[category.toLowerCase()] || '🔐';
     };

     const formatDate = (date: Date | undefined) => {
          if (!date) return 'Never used';
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - date.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 0) return 'Today';
          if (diffDays === 1) return 'Yesterday';
          if (diffDays < 7) return `${diffDays} days ago`;
          if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
          return date.toLocaleDateString();
     };

     // Event handlers
     const handleCardClick = () => {
          if (isMobile) setIsExpanded(!isExpanded);
          onClick?.();
     };

     const handleMenuClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
          onMenuClick?.();
     };

     const createClipboardHandler = (text: string, type: string) => async (e: React.MouseEvent) => {
          e.stopPropagation();
          try {
               await navigator.clipboard.writeText(text);
               console.log(`${type} copied to clipboard`);
          } catch (err) {
               console.error(`Failed to copy ${type.toLowerCase()}:`, err);
          }
          setIsDropdownOpen(false);
     };

     const handleCopyPassword = createClipboardHandler(entry.password, 'Password');
     const handleCopyUsername = createClipboardHandler(entry.username, 'Username');

     const handleEdit = (e: React.MouseEvent) => {
          e.stopPropagation();
          onEdit?.(entry);
          setIsDropdownOpen(false);
     };

     const handleDelete = (e: React.MouseEvent) => {
          e.stopPropagation();
          onDelete?.(entry);
          setIsDropdownOpen(false);
     };

     // Reusable components
     const CategoryIcon = ({ size = 'lg', className = '' }: { size?: 'sm' | 'lg'; className?: string }) => (
          <div className={`bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center shrink-0 border border-blue-200 ${size === 'sm' ? 'w-10 h-10 rounded-lg' : 'w-12 h-12 rounded-xl'
               } ${className}`}>
               <span className={size === 'sm' ? 'text-sm' : 'text-lg'}>
                    {getCategoryIcon(entry.category)}
               </span>
          </div>
     );

     const StrengthBadge = ({ mobile = false }: { mobile?: boolean }) => (
          <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStrengthColor(entry.strength)}`}>
               {mobile && entry.strength === 'very-strong' ? 'strong' : entry.strength.replace('-', ' ')}
          </span>
     );

     const TagsList = ({ mobile = false }: { mobile?: boolean }) => {
          const maxTags = mobile ? 3 : 2;
          const visibleTags = entry.tags.slice(0, maxTags);
          const remainingCount = entry.tags.length - maxTags;

          return (
               <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                         {entry.category}
                    </span>
                    {visibleTags.map((tag, index) => (
                         <span
                              key={index}
                              className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"
                         >
                              {tag}
                         </span>
                    ))}
                    {remainingCount > 0 && (
                         <span className="text-xs text-gray-400">
                              +{remainingCount} more
                         </span>
                    )}
               </div>
          );
     };

     const DropdownMenu = ({ dropdownRef }: { dropdownRef: React.RefObject<HTMLDivElement | null> }) => (
          <div className="relative" ref={dropdownRef}>
               <button
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={handleMenuClick}
                    aria-label="More options"
               >
                    <span className="text-lg">⋯</span>
               </button>

               {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                         <button
                              onClick={handleEdit}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                         >
                              <span className="text-blue-500">✏️</span>
                              Edit Password
                         </button>
                         <button
                              onClick={handleCopyPassword}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                         >
                              <span className="text-green-500">🔑</span>
                              Copy Password
                         </button>
                         <button
                              onClick={handleCopyUsername}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                         >
                              <span className="text-purple-500">👤</span>
                              Copy Username
                         </button>
                         <div className="border-t border-gray-100 my-1"></div>
                         <button
                              onClick={handleDelete}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                         >
                              <span className="text-red-500">🗑️</span>
                              Delete
                         </button>
                    </div>
               )}
          </div>
     );

     const NotesSection = ({ mobile = false }: { mobile?: boolean }) => {
          if (!entry.notes) return null;

          return (
               <div className={mobile ? "pt-2 border-t border-gray-100" : "mt-3 pt-3 border-t border-gray-100"}>
                    <p className={`text-xs text-gray-500 ${mobile ? 'line-clamp-3' : 'line-clamp-2'}`}>
                         📝 {entry.notes}
                    </p>
               </div>
          );
     };

     return (
          <div
               className="p-4 md:p-5 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-100 last:border-b-0"
               onClick={handleCardClick}
          >
               {/* Mobile Compact View */}
               <div className="md:hidden">
                    <div className="flex items-center justify-between">
                         {/* Mobile: Icon + Basic Info */}
                         <div className="flex items-center gap-3 flex-1 min-w-0">
                              <CategoryIcon size="sm" />
                              <div className="flex-1 min-w-0">
                                   <h3 className="font-medium text-gray-900 truncate text-sm">
                                        {entry.title}
                                   </h3>
                                   <p className="text-xs text-gray-600 truncate">
                                        {entry.username}
                                   </p>
                              </div>
                         </div>

                         {/* Mobile: Strength + Expand Arrow */}
                         <div className="flex items-center gap-2 shrink-0">
                              <StrengthBadge mobile />
                              <div className="flex items-center">
                                   <span className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                   </span>
                              </div>
                         </div>
                    </div>

                    {/* Mobile: Expanded Details */}
                    {isExpanded && (
                         <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                              {/* URL */}
                              {entry.url && (
                                   <div className="flex items-center gap-2">
                                        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                                             🌐 Website
                                        </span>
                                   </div>
                              )}

                              {/* Tags and Category */}
                              <TagsList mobile />

                              {/* Last Used */}
                              <div className="text-xs text-gray-500">
                                   Last used: {formatDate(entry.lastUsed)}
                              </div>

                              {/* Notes */}
                              <NotesSection mobile />

                              {/* Mobile Menu Button */}
                              <div className="flex justify-end pt-2">
                                   <DropdownMenu dropdownRef={mobileDropdownRef} />
                              </div>
                         </div>
                    )}
               </div>

               {/* Desktop View */}
               <div className="hidden md:block">
                    <div className="flex items-start justify-between gap-4">
                         {/* Left side - Main info */}
                         <div className="flex items-start gap-4 flex-1 min-w-0">
                              <CategoryIcon />

                              {/* Main content */}
                              <div className="flex-1 min-w-0">
                                   {/* Title and URL */}
                                   <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-semibold text-gray-900 truncate">
                                             {entry.title}
                                        </h3>
                                        {entry.url && (
                                             <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                                                  🌐
                                             </span>
                                        )}
                                   </div>

                                   {/* Username */}
                                   <p className="text-sm text-gray-600 mb-2 truncate">
                                        {entry.username}
                                   </p>

                                   {/* Tags and Category */}
                                   <TagsList />
                              </div>
                         </div>

                         {/* Right side - Meta info and actions */}
                         <div className="flex flex-col items-end gap-2 shrink-0">
                              <StrengthBadge />

                              {/* Last used */}
                              <span className="text-xs text-gray-500">
                                   {formatDate(entry.lastUsed)}
                              </span>

                              {/* Menu button */}
                              <DropdownMenu dropdownRef={desktopDropdownRef} />
                         </div>
                    </div>

                    {/* Desktop Notes preview */}
                    <NotesSection />
               </div>
          </div>
     );
};

export default PasswordCard;