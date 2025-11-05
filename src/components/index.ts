// Component exports organized by atomic design principles

// Atoms
export { default as Button } from './atoms/Button';
export { default as Input } from './atoms/Input';
export { default as NavItem } from './atoms/NavItem';
// export { default as Icon } from './atoms/Icon';
// export { default as Badge } from './atoms/Badge';
// export { default as Avatar } from './atoms/Avatar';
// export { default as Spinner } from './atoms/Spinner';

// Molecules
// export { default as SearchBar } from './molecules/SearchBar';
// export { default as PasswordCard } from './molecules/PasswordCard';
// export { default as FormField } from './molecules/FormField';
// export { default as NavigationItem } from './molecules/NavigationItem';
// export { default as PasswordStrengthIndicator } from './molecules/PasswordStrengthIndicator';
export { default as PasswordInput } from './molecules/PasswordInput';
export { default as AuthToggle } from './molecules/AuthToggle';
export { default as RememberMe } from './molecules/RememberMe';
export { default as TermsCheckbox } from './molecules/TermsCheckbox';
export { default as SideNavHeader } from './molecules/SideNavHeader';

// Organisms
// export { default as Header } from './organisms/Header';
// export { default as SideNavigation } from './organisms/SideNavigation';
// export { default as PasswordList } from './organisms/PasswordList';
// export { default as PasswordForm } from './organisms/PasswordForm';
export { default as AuthForm } from './organisms/AuthForm/AuthForm';
export { default as SideNav } from './organisms/SideNav';

// Templates
export { default as AuthLayout } from './templates/AuthLayout';
export { default as AppLayout } from './templates/AppLayout';
// export { default as DashboardLayout } from './templates/DashboardLayout';