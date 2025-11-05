import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface TagChipsProps {
     tags: string[];
     onChange: (tags: string[]) => void;
     placeholder?: string;
     className?: string;
     required?: boolean;
     label?: string;
}

const TagChips: React.FC<TagChipsProps> = ({
     tags,
     onChange,
     placeholder = "Add tags...",
     className = "",
     required = false,
     label = "Tags"
}) => {
     const [inputValue, setInputValue] = useState('');

     const addTag = (tag: string) => {
          const trimmedTag = tag.trim();
          if (trimmedTag && !tags.includes(trimmedTag)) {
               onChange([...tags, trimmedTag]);
          }
          setInputValue('');
     };

     const removeTag = (tagToRemove: string) => {
          onChange(tags.filter(tag => tag !== tagToRemove));
     };

     const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.key === ',') {
               e.preventDefault();
               addTag(inputValue);
          } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
               // Remove last tag when backspace is pressed on empty input
               removeTag(tags[tags.length - 1]);
          }
     };

     const handleInputBlur = () => {
          if (inputValue.trim()) {
               addTag(inputValue);
          }
     };

     return (
          <div className={`space-y-2 ${className}`}>
               <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required ? (
                         <span className="text-red-500 ml-1">*</span>
                    ) : (
                         <span className="text-gray-500 ml-1">(Optional)</span>
                    )}
               </label>

               <div className="w-full min-h-12 px-4 py-3 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent bg-white">
                    <div className="flex flex-wrap gap-2 items-center">
                         {/* Existing Tags */}
                         {tags.map((tag, index) => (
                              <span
                                   key={index}
                                   className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                              >
                                   {tag}
                                   <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                                        aria-label={`Remove ${tag} tag`}
                                   >
                                        <span className="text-xs">×</span>
                                   </button>
                              </span>
                         ))}

                         {/* Input for new tags */}
                         <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onKeyDown={handleKeyDown}
                              onBlur={handleInputBlur}
                              placeholder={tags.length === 0 ? placeholder : ""}
                              className="min-w-32 max-w-xs bg-transparent border-none outline-none text-sm"
                              style={{ width: `${Math.max(inputValue.length + 1, 8)}ch` }}
                         />
                    </div>
               </div>

               <p className="text-xs text-gray-500">
                    Press Enter or comma to add tags. Click × to remove.
               </p>
          </div>
     );
};

export default TagChips;