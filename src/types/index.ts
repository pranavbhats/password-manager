// Application-wide type definitions

// User types
export interface User {
     id: string;
     email: string;
     createdAt: Date;
     lastLogin: Date;
}

// Password entry types
export interface PasswordEntry {
     id: string;
     title: string;
     username: string;
     password: string;
     url?: string;
     notes?: string;
     category: string;
     tags: string[];
     createdAt: Date;
     updatedAt: Date;
     lastUsed?: Date;
     strength: PasswordStrength;
}

export type PasswordStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

// Vault types
export interface Vault {
     id: string;
     userId: string;
     entries: PasswordEntry[];
     isLocked: boolean;
     lastUnlocked?: Date;
}

// Authentication types
export interface AuthState {
     user: User | null;
     isAuthenticated: boolean;
     isLoading: boolean;
     error: string | null;
}

// Navigation types
export interface NavigationItem {
     label: string;
     path: string;
     icon: string;
     isActive?: boolean;
}

// Form types
export interface LoginForm {
     email: string;
     password: string;
}

export interface SignupForm {
     email: string;
     password: string;
     confirmPassword: string;
}

export interface PasswordEntryForm {
     title: string;
     username: string;
     password: string;
     url?: string;
     notes?: string;
     category: string;
     tags: string[];
     lastUsed?: string;
}

// Settings types
export interface AppSettings {
     autoLockTimeout: number; // minutes
     biometricEnabled: boolean;
     darkMode: boolean;
     autoGeneratePassword: boolean;
     defaultPasswordLength: number;
     includeSymbols: boolean;
     includeNumbers: boolean;
     includeUppercase: boolean;
     includeLowercase: boolean;
}

// API response types
export interface ApiResponse<T = unknown> {
     success: boolean;
     data?: T;
     error?: string;
     message?: string;
}

// Encryption types
export interface EncryptedData {
     data: string;
     iv: string;
     salt: string;
}