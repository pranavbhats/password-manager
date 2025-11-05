# 🔒 SafeVault Password Manager - Project Structure

This document outlines the comprehensive folder structure for the SafeVault password manager application, built with React, TypeScript, and Tailwind CSS.

## 📁 Folder Structure Overview

```
src/
├── components/          # UI Components (Atomic Design)
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple combinations of atoms
│   ├── organisms/      # Complex UI components
│   ├── templates/      # Page layouts
│   └── index.ts        # Component exports
├── pages/              # Page components
│   ├── Splash/         # Initial loading screen
│   ├── Auth/           # Login/Signup pages
│   ├── UnlockVault/    # Master password entry
│   ├── VaultHome/      # Main password list
│   ├── AddEditEntry/   # Add/Edit password form
│   ├── ViewEntry/      # Password detail view
│   ├── Analysis/       # Security analysis dashboard
│   └── Settings/       # App preferences
├── store/              # Redux Toolkit state management
│   ├── slices/         # RTK slices
│   ├── middleware/     # Custom middleware
│   ├── api/           # RTK Query API endpoints
│   └── index.ts       # Store configuration
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── constants/          # Application constants
├── schemas/            # Zod validation schemas
│   ├── auth/          # Authentication schemas
│   └── vault/         # Vault entry schemas
├── services/           # External service integrations
│   ├── auth/          # Authentication services
│   ├── vault/         # Vault data services
│   └── encryption/    # Encryption utilities
├── lib/               # External library configurations
│   └── firebase/      # Firebase configuration
├── router/            # React Router configuration
│   ├── guards/        # Route protection components
│   └── index.ts       # Router exports
├── context/           # React Context providers
├── styles/            # Global styles and Tailwind config
└── assets/            # Static assets (images, icons)
```

## 🧱 Component Architecture (Atomic Design)

### Atoms (`/src/components/atoms/`)

Basic UI building blocks that can't be broken down further:

- **Button/** - Reusable button component with variants
- **Input/** - Form input components (text, password, search)
- **Icon/** - Icon component with SVG assets
- **Badge/** - Status badges and labels
- **Avatar/** - User avatar component
- **Spinner/** - Loading spinner component

### Molecules (`/src/components/molecules/`)

Simple combinations of atoms functioning together:

- **SearchBar/** - Search input with icon and clear button
- **PasswordCard/** - Password entry display card
- **FormField/** - Input with label and validation
- **NavigationItem/** - Side navigation menu item
- **PasswordStrengthIndicator/** - Password strength visual indicator

### Organisms (`/src/components/organisms/`)

Complex UI components made of atoms and molecules:

- **Header/** - App header with navigation and actions
- **SideNavigation/** - Side navigation menu
- **PasswordList/** - List of password entries with search
- **PasswordForm/** - Add/Edit password form
- **AuthForm/** - Login/Signup form components

### Templates (`/src/components/templates/`)

Page layouts that define structure:

- **AuthLayout/** - Layout for authentication pages
- **DashboardLayout/** - Main app layout with sidebar

## 📄 Pages Structure (`/src/pages/`)

Each page follows the application flow:

1. **Splash/** - Initial app loading screen
2. **Auth/** - Email-based authentication (Login/Signup)
3. **UnlockVault/** - Master password entry with biometric option
4. **VaultHome/** - Main password vault with search and quick actions
5. **AddEditEntry/** - Form for creating/modifying password entries
6. **ViewEntry/** - Detailed password view with copy functionality
7. **Analysis/** - Security analysis (weak passwords, duplicates)
8. **Settings/** - App preferences and security settings

## 🏪 State Management (`/src/store/`)

Redux Toolkit with encrypted persistence:

- **slices/** - Modular state slices (auth, vault, settings, UI)
- **middleware/** - Custom middleware for encryption and auto-lock
- **api/** - RTK Query endpoints for Firebase integration

## 🔐 Security & Services (`/src/services/`)

- **auth/** - Firebase Authentication integration
- **vault/** - Encrypted password vault operations
- **encryption/** - Client-side encryption utilities
- **firebase/** - Firebase configuration and security rules

## 🎯 Key Features by Folder

### Mobile-First Responsive Design

- All components in `/components/` use Tailwind CSS
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interface elements

### Security-First Architecture

- Zero-knowledge encryption in `/services/encryption/`
- Auto-lock functionality in `/hooks/useAutoLock`
- Biometric authentication support in `/hooks/useBiometric`

### Type Safety

- Comprehensive TypeScript types in `/types/`
- Zod validation schemas in `/schemas/`
- Form validation with React Hook Form integration

### Performance Optimization

- Lazy loading for route components
- Virtualization for large password lists
- Optimistic updates with React Query

## 🚀 Getting Started

1. **Component Development**: Start with atoms, build up to organisms
2. **Page Development**: Use templates for consistent layouts
3. **State Management**: Use RTK slices for feature-specific state
4. **API Integration**: Implement RTK Query endpoints for Firebase
5. **Security**: Implement encryption before data storage

## 📝 Development Guidelines

- **Components**: Use functional components with React hooks
- **Styling**: Tailwind CSS only, avoid custom CSS unless necessary
- **Forms**: React Hook Form with Zod validation
- **State**: Redux Toolkit for global state, React Query for server state
- **Security**: Client-side encryption, zero-knowledge architecture
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

This structure ensures scalability, maintainability, and security while providing an excellent user experience across all devices.
