import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from 'firebase/auth';

// User profile interface extending Firebase User
export interface UserProfile {
     uid: string;
     email: string;
     displayName?: string;
     photoURL?: string;
     emailVerified: boolean;
     createdAt?: string;
     lastLoginAt?: string;
     providerData?: {
          providerId: string;
          uid: string;
          email?: string;
     }[];
}

// Auth state interface
export interface AuthState {
     user: UserProfile | null;
     isAuthenticated: boolean;
     isLoading: boolean;
     isInitialized: boolean;
     error: string | null;
     preferences: {
          theme: 'light' | 'dark' | 'system';
          language: string;
          autoLockTimeout: number; // minutes
          biometricEnabled: boolean;
          securityNotifications: boolean;
     };
}

// Initial state
const initialState: AuthState = {
     user: null,
     isAuthenticated: false,
     isLoading: false,
     isInitialized: false,
     error: null,
     preferences: {
          theme: 'system',
          language: 'en',
          autoLockTimeout: 15,
          biometricEnabled: false,
          securityNotifications: true,
     },
};

// Auth slice
const authSlice = createSlice({
     name: 'auth',
     initialState,
     reducers: {
          // Authentication actions
          setLoading: (state, action: PayloadAction<boolean>) => {
               state.isLoading = action.payload;
          },

          setInitialized: (state, action: PayloadAction<boolean>) => {
               state.isInitialized = action.payload;
          },

          loginSuccess: (state, action: PayloadAction<User>) => {
               const firebaseUser = action.payload;
               state.user = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || undefined,
                    photoURL: firebaseUser.photoURL || undefined,
                    emailVerified: firebaseUser.emailVerified,
                    createdAt: firebaseUser.metadata.creationTime,
                    lastLoginAt: firebaseUser.metadata.lastSignInTime,
                    providerData: firebaseUser.providerData.map(provider => ({
                         providerId: provider.providerId,
                         uid: provider.uid,
                         email: provider.email || undefined,
                    })),
               };
               state.isAuthenticated = true;
               state.isLoading = false;
               state.error = null;
          },

          logout: (state) => {
               state.user = null;
               state.isAuthenticated = false;
               state.isLoading = false;
               state.error = null;
               // Keep preferences on logout
          },

          setError: (state, action: PayloadAction<string>) => {
               state.error = action.payload;
               state.isLoading = false;
          },

          clearError: (state) => {
               state.error = null;
          },

          // User profile actions
          updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
               if (state.user) {
                    state.user = { ...state.user, ...action.payload };
               }
          },

          updateEmail: (state, action: PayloadAction<string>) => {
               if (state.user) {
                    state.user.email = action.payload;
                    state.user.emailVerified = false; // Reset verification status
               }
          },

          setEmailVerified: (state, action: PayloadAction<boolean>) => {
               if (state.user) {
                    state.user.emailVerified = action.payload;
               }
          },

          // Preferences actions
          updatePreferences: (state, action: PayloadAction<Partial<AuthState['preferences']>>) => {
               state.preferences = { ...state.preferences, ...action.payload };
          },

          updateTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
               state.preferences.theme = action.payload;
          },

          updateAutoLockTimeout: (state, action: PayloadAction<number>) => {
               state.preferences.autoLockTimeout = action.payload;
          },

          toggleBiometric: (state) => {
               state.preferences.biometricEnabled = !state.preferences.biometricEnabled;
          },

          toggleSecurityNotifications: (state) => {
               state.preferences.securityNotifications = !state.preferences.securityNotifications;
          },

          // Factory reset - clear all user data except auth state
          factoryReset: (state) => {
               // Reset preferences to defaults
               state.preferences = initialState.preferences;
               // Keep user authenticated but reset all preferences
          },
     },
});

// Export actions
export const {
     setLoading,
     setInitialized,
     loginSuccess,
     logout,
     setError,
     clearError,
     updateProfile,
     updateEmail,
     setEmailVerified,
     updatePreferences,
     updateTheme,
     updateAutoLockTimeout,
     toggleBiometric,
     toggleSecurityNotifications,
     factoryReset,
} = authSlice.actions;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectIsInitialized = (state: { auth: AuthState }) => state.auth.isInitialized;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
export const selectPreferences = (state: { auth: AuthState }) => state.auth.preferences;

// Export reducer
export default authSlice.reducer;