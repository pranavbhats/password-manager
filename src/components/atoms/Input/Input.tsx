import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
     label?: string;
     error?: string;
     helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
     label,
     error,
     helperText,
     className = '',
     id,
     ...props
}, ref) => {
     const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

     return (
          <div className="space-y-1">
               {label && (
                    <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
                         {label}
                    </label>
               )}
               <input
                    ref={ref}
                    id={inputId}
                    className={`appearance-none block w-full px-3 py-3 border rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${error
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                         } ${className}`}
                    {...props}
               />
               {error && (
                    <p className="text-sm text-red-600">{error}</p>
               )}
               {helperText && !error && (
                    <p className="text-sm text-gray-500">{helperText}</p>
               )}
          </div>
     );
});

Input.displayName = 'Input';

export default Input;