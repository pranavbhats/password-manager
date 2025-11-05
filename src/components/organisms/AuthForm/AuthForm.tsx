// Composable AuthForm using composition pattern

// Main form component
interface AuthFormProps {
     children: React.ReactNode;
     onSubmit: (e: React.FormEvent) => void;
}

// Sub-component interfaces
interface AuthFormFieldsProps {
     children: React.ReactNode;
}

interface AuthFormActionsProps {
     children: React.ReactNode;
}

interface AuthFormExtrasProps {
     children: React.ReactNode;
}

// Sub-components
const AuthFormFields: React.FC<AuthFormFieldsProps> = ({ children }) => {
     return <div className="space-y-6">{children}</div>;
};

const AuthFormActions: React.FC<AuthFormActionsProps> = ({ children }) => {
     return <div className="space-y-4">{children}</div>;
};

const AuthFormExtras: React.FC<AuthFormExtrasProps> = ({ children }) => {
     return <div className="flex items-center justify-between">{children}</div>;
};

// Compound component interface
interface AuthFormComponent extends React.FC<AuthFormProps> {
     Fields: typeof AuthFormFields;
     Actions: typeof AuthFormActions;
     Extras: typeof AuthFormExtras;
}

// Main component with proper typing
const AuthFormBase: React.FC<AuthFormProps> = ({ children, onSubmit }) => {
     return (
          <form className="space-y-6" onSubmit={onSubmit}>
               {children}
          </form>
     );
};

// Cast to compound component type
const AuthForm = AuthFormBase as AuthFormComponent;

// Attach sub-components
AuthForm.Fields = AuthFormFields;
AuthForm.Actions = AuthFormActions;
AuthForm.Extras = AuthFormExtras;

export default AuthForm;