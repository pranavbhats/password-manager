// Application constants

// Navigation paths
export const ROUTES = {
     SPLASH: '/',
     LOGIN: '/login',
     SIGNUP: '/signup',
     UNLOCK_VAULT: '/unlock',
     VAULT_HOME: '/vault',
     ADD_ENTRY: '/vault/add',
     EDIT_ENTRY: '/vault/edit/:id',
     VIEW_ENTRY: '/vault/view/:id',
     ANALYSIS: '/analysis',
     SETTINGS: '/settings',
} as const;

// Auto-lock timeout options (in minutes)
export const AUTO_LOCK_TIMEOUTS = [
     { value: 1, label: '1 minute' },
     { value: 5, label: '5 minutes' },
     { value: 15, label: '15 minutes' },
     { value: 30, label: '30 minutes' },
     { value: 60, label: '1 hour' },
     { value: 0, label: 'Never' },
] as const;

// Password categories
export const PASSWORD_CATEGORIES = [
     'Social Media',
     'Email',
     'Banking',
     'Work',
     'Shopping',
     'Entertainment',
     'Education',
     'Healthcare',
     'Travel',
     'Other',
] as const;

// Password strength thresholds
export const PASSWORD_STRENGTH = {
     WEAK: { min: 0, max: 25, label: 'Weak', color: 'red' },
     MEDIUM: { min: 26, max: 50, label: 'Medium', color: 'orange' },
     STRONG: { min: 51, max: 75, label: 'Strong', color: 'yellow' },
     VERY_STRONG: { min: 76, max: 100, label: 'Very Strong', color: 'green' },
} as const;

// App theme colors
export const COLORS = {
     PRIMARY: '#0d6efd',
     SUCCESS: '#4CAF50',
     WARNING: '#ff9800',
     ERROR: '#f44336',
     BACKGROUND: '#f8f9fa',
     SURFACE: '#ffffff',
     TEXT_PRIMARY: '#212529',
     TEXT_SECONDARY: '#6c757d',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
     THEME: 'safevault_theme',
     SETTINGS: 'safevault_settings',
     VAULT_STATE: 'safevault_vault',
     LAST_UNLOCK: 'safevault_last_unlock',
} as const;

// Default settings
export const DEFAULT_SETTINGS = {
     autoLockTimeout: 15,
     biometricEnabled: false,
     darkMode: false,
     autoGeneratePassword: true,
     defaultPasswordLength: 16,
     includeSymbols: true,
     includeNumbers: true,
     includeUppercase: true,
     includeLowercase: true,
} as const;

// Password generation options
export const PASSWORD_OPTIONS = {
     MIN_LENGTH: 8,
     MAX_LENGTH: 64,
     DEFAULT_LENGTH: 16,
     SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?',
     NUMBERS: '0123456789',
     UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
     LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
     { label: 'Home', path: ROUTES.VAULT_HOME, icon: 'home' },
     { label: 'Analysis', path: ROUTES.ANALYSIS, icon: 'chart' },
     { label: 'Settings', path: ROUTES.SETTINGS, icon: 'settings' },
] as const;

// Error messages
export const ERROR_MESSAGES = {
     INVALID_EMAIL: 'Please enter a valid email address',
     WEAK_PASSWORD: 'Password must be at least 8 characters long',
     PASSWORDS_DONT_MATCH: 'Passwords do not match',
     INVALID_CREDENTIALS: 'Invalid email or password',
     NETWORK_ERROR: 'Network error. Please try again.',
     VAULT_LOCKED: 'Vault is locked. Please unlock to continue.',
     ENTRY_NOT_FOUND: 'Password entry not found',
     ENCRYPTION_ERROR: 'Failed to encrypt data',
     DECRYPTION_ERROR: 'Failed to decrypt data',
} as const;