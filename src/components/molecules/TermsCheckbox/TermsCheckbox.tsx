interface TermsCheckboxProps {
     checked?: boolean;
     onChange?: (checked: boolean) => void;
     required?: boolean;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
     checked,
     onChange,
     required = true
}) => {
     return (
          <div className="flex items-center">
               <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    required={required}
                    checked={checked}
                    onChange={(e) => onChange?.(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
               />
               <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                         Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                         Privacy Policy
                    </button>
               </label>
          </div>
     );
};

export default TermsCheckbox;