import React from 'react';
import { getPasswordStrength } from '../../schemas/auth/authSchemas';

interface PasswordStrengthProps {
     password: string;
     showStrength?: boolean;
     className?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
     password,
     showStrength = true,
     className = ''
}) => {
     if (!showStrength || !password) return null;

     const { score, feedback, color } = getPasswordStrength(password);

     const strengthLabels = {
          0: 'Very Weak',
          1: 'Very Weak',
          2: 'Weak',
          3: 'Fair',
          4: 'Good',
          5: 'Strong',
          6: 'Very Strong'
     };

     const strengthColors = {
          red: 'bg-red-500',
          orange: 'bg-orange-500',
          yellow: 'bg-yellow-500',
          green: 'bg-green-500'
     };

     const strengthTextColors = {
          red: 'text-red-600',
          orange: 'text-orange-600',
          yellow: 'text-yellow-600',
          green: 'text-green-600'
     };

     return (
          <div className={`space-y-2 ${className}`}>
               {/* Strength bar */}
               <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                         <div
                              className={`h-full transition-all duration-300 ${strengthColors[color]}`}
                              style={{ width: `${(score / 6) * 100}%` }}
                         />
                    </div>
                    <span className={`text-sm font-medium ${strengthTextColors[color]}`}>
                         {strengthLabels[score as keyof typeof strengthLabels]}
                    </span>
               </div>

               {/* Feedback */}
               {feedback.length > 0 && (
                    <ul className="text-xs text-gray-600 space-y-1">
                         {feedback.map((item, index) => (
                              <li key={index} className="flex items-center space-x-1">
                                   <span className="text-gray-400">•</span>
                                   <span>{item}</span>
                              </li>
                         ))}
                    </ul>
               )}
          </div>
     );
};

export default PasswordStrength;