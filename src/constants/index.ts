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

