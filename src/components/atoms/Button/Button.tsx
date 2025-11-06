interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
     size?: 'sm' | 'md' | 'lg';
     isLoading?: boolean;
     children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
     variant = 'primary',
     size = 'md',
     isLoading = false,
     children,
     disabled,
     className = '',
     ...props
}) => {
     const baseClasses = 'font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

     const variantClasses = {
          primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 hover:shadow-lg transform hover:scale-105 active:scale-95',
          secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 hover:shadow-md',
          ghost: 'text-blue-600 hover:text-blue-500',
          danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-lg transform hover:scale-105 active:scale-95'
     };

     const sizeClasses = {
          sm: 'px-3 py-2 text-sm',
          md: 'px-4 py-3 text-sm',
          lg: 'px-6 py-4 text-base'
     };

     const disabledClasses = 'bg-gray-300 cursor-not-allowed hover:bg-gray-300 hover:scale-100';

     return (
          <button
               className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${(disabled || isLoading) ? disabledClasses : ''
                    } ${className}`}
               disabled={disabled || isLoading}
               {...props}
          >
               {isLoading ? (
                    <div className="flex items-center justify-center">
                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                         {children}
                    </div>
               ) : (
                    children
               )}
          </button>
     );
};

export default Button;