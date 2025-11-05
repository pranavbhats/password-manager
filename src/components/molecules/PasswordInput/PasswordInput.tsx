import { useState, forwardRef } from 'react';
import Input from '../../atoms/Input';

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
     label?: string;
     error?: string;
     helperText?: string;
     showToggle?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(({
     label = 'Password',
     error,
     helperText,
     showToggle = true,
     className = '',
     ...props
}, ref) => {
     const [showPassword, setShowPassword] = useState(false);

     return (
          <div className="relative">
               <Input
                    ref={ref}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    error={error}
                    helperText={helperText}
                    className={`${showToggle ? 'pr-10' : ''} ${className}`}
                    {...props}
               />
               {showToggle && (
                    <button
                         type="button"
                         className="absolute right-3 top-9 flex items-center"
                         onClick={() => setShowPassword(!showPassword)}
                    >
                         <span className="text-gray-400 hover:text-gray-600 text-sm">
                              {showPassword ? '🙈' : '👁️'}
                         </span>
                    </button>
               )}
          </div>
     );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;