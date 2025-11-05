import { useState, useEffect } from 'react';
import type { PasswordEntry } from '../../../types';

interface PasswordCardProps {
     entry: PasswordEntry;
     onMenuClick?: () => void;
     onClick?: () => void;
}

const PasswordCard: React.FC<PasswordCardProps> = ({
     entry,
     onMenuClick,
     onClick
}) => {
     const [isExpanded, setIsExpanded] = useState(false);
     const [isMobile, setIsMobile] = useState(false);

     useEffect(() => {
          const checkIsMobile = () => {
               setIsMobile(window.innerWidth < 768);
          };

          // Check on mount
          checkIsMobile();

          // Add listener for window resize
          window.addEventListener('resize', checkIsMobile);

          // Cleanup
          return () => window.removeEventListener('resize', checkIsMobile);
     }, []);

     const handleCardClick = () => {
          // On mobile, toggle expansion first, then call onClick
          if (isMobile) {
               setIsExpanded(!isExpanded);
          }
          onClick?.();
     };
     const getStrengthColor = (strength: PasswordEntry['strength']) => {
          switch (strength) {
               case 'weak': return 'bg-red-100 text-red-700 border-red-200';
               case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
               case 'strong': return 'bg-green-100 text-green-700 border-green-200';
               case 'very-strong': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
               default: return 'bg-gray-100 text-gray-700 border-gray-200';
          }
     };

     const getCategoryIcon = (category: string) => {
          const icons: Record<string, string> = {
               'social': '👥',
               'work': '💼',
               'finance': '💳',
               'shopping': '🛒',
               'entertainment': '🎬',
               'email': '📧',
               'utilities': '⚡',
               'health': '🏥',
               'education': '🎓',
               'travel': '✈️',
               'other': '🔐'
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
                              <div className="w-10 h-10 bg-linear-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center shrink-0 border border-blue-200">
                                   <span className="text-sm">
                                        {getCategoryIcon(entry.category)}
                                   </span>
                              </div>
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
                              <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStrengthColor(entry.strength)}`}>
                                   {entry.strength === 'very-strong' ? 'strong' : entry.strength}
                              </span>
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
                              <div className="flex items-center gap-2 flex-wrap">
                                   <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                                        {entry.category}
                                   </span>
                                   {entry.tags.slice(0, 3).map((tag, index) => (
                                        <span
                                             key={index}
                                             className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"
                                        >
                                             {tag}
                                        </span>
                                   ))}
                                   {entry.tags.length > 3 && (
                                        <span className="text-xs text-gray-400">
                                             +{entry.tags.length - 3} more
                                        </span>
                                   )}
                              </div>

                              {/* Last Used */}
                              <div className="text-xs text-gray-500">
                                   Last used: {formatDate(entry.lastUsed)}
                              </div>

                              {/* Notes */}
                              {entry.notes && (
                                   <div className="pt-2 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 line-clamp-3">
                                             📝 {entry.notes}
                                        </p>
                                   </div>
                              )}

                              {/* Mobile Menu Button */}
                              <div className="flex justify-end pt-2">
                                   <button
                                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             onMenuClick?.();
                                        }}
                                        aria-label="More options"
                                   >
                                        <span className="text-lg">⋯</span>
                                   </button>
                              </div>
                         </div>
                    )}
               </div>

               {/* Desktop View (unchanged) */}
               <div className="hidden md:block">
                    <div className="flex items-start justify-between gap-4">
                         {/* Left side - Main info */}
                         <div className="flex items-start gap-4 flex-1 min-w-0">
                              {/* Icon */}
                              <div className="w-12 h-12 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center shrink-0 border border-blue-200">
                                   <span className="text-lg">
                                        {getCategoryIcon(entry.category)}
                                   </span>
                              </div>

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
                                   <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                                             {entry.category}
                                        </span>
                                        {entry.tags.slice(0, 2).map((tag, index) => (
                                             <span
                                                  key={index}
                                                  className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"
                                             >
                                                  {tag}
                                             </span>
                                        ))}
                                        {entry.tags.length > 2 && (
                                             <span className="text-xs text-gray-400">
                                                  +{entry.tags.length - 2} more
                                             </span>
                                        )}
                                   </div>
                              </div>
                         </div>

                         {/* Right side - Meta info and actions */}
                         <div className="flex flex-col items-end gap-2 shrink-0">
                              {/* Password strength */}
                              <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStrengthColor(entry.strength)}`}>
                                   {entry.strength.replace('-', ' ')}
                              </span>

                              {/* Last used */}
                              <span className="text-xs text-gray-500">
                                   {formatDate(entry.lastUsed)}
                              </span>

                              {/* Menu button */}
                              <button
                                   className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                   onClick={(e) => {
                                        e.stopPropagation();
                                        onMenuClick?.();
                                   }}
                                   aria-label="More options"
                              >
                                   <span className="text-lg">⋯</span>
                              </button>
                         </div>
                    </div>

                    {/* Desktop Notes preview (if available) */}
                    {entry.notes && (
                         <div className="mt-3 pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-500 line-clamp-2">
                                   📝 {entry.notes}
                              </p>
                         </div>
                    )}
               </div>
          </div>
     );
};

export default PasswordCard;