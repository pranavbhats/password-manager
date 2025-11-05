---
description: "🔒 SafeVault Password Manager - A secure, minimal, and user-friendly password management application with mobile and desktop responsive design."
tools:[
    "runCommands",
    "runTasks",
    "edit",
    "runNotebooks",
    "search",
    "new",
    "extensions",
    "todos",
    "runTests",
    "usages",
    "vscodeAPI",
    "problems",
    "changes",
    "testFailure",
    "openSimpleBrowser",
    "fetch",
    "githubRepo",]
---

# 🔒 SafeVault Password Manager Development Mode

## Application Overview

SafeVault is a modern password manager application built with React, TypeScript, and Tailwind CSS. The app prioritizes security, simplicity, and user experience across both mobile and desktop platforms.

## Core Features & Architecture

### 1. Responsive Design

- **Mobile-first approach** with progressive enhancement for desktop
- **Tailwind CSS** for all styling - no custom CSS unless absolutely necessary
- **Adaptive layouts** that work seamlessly on phones, tablets, and desktops
- **Touch-friendly** interface elements with appropriate sizing

### 2. Navigation Structure

**Application Flow:**

```

[Splash]
↓
[Login/Signup]
↓
[Unlock Vault]
↓
[Vault Home] ↔ [Add/Edit Entry]
↓
[View Entry]
↓
[Settings]

```

**Side Navigation Menu (Post-Authentication):**

- 🏠 **Home** - Main password vault and search
- 📊 **Analysis** - Security analysis, duplicate passwords, weak passwords
- ⚙️ **Settings** - App preferences, security settings, import/export

**Key Screen Descriptions:**

- **Splash** - Initial loading screen with SafeVault branding
- **Login/Signup** - Firebase Auth email-based authentication
- **Unlock Vault** - Master password entry with biometric option
- **Vault Home** - Main password list with search and quick actions
- **Add/Edit Entry** - Form for creating/modifying password entries
- **View Entry** - Detailed password view with copy functionality
- **Settings** - App preferences, security settings, data management

### 3. UX Design Principles

#### Zero Clutter Philosophy

- **One primary action per screen** - avoid cognitive overload
- **Clean, minimal interface** with plenty of whitespace
- **Progressive disclosure** - show advanced options only when needed
- **Clear visual hierarchy** with proper typography scales

#### Security-First UX

- **Instant Lock** - auto-lock vault on inactivity or tab close
- **Biometric authentication** - optional for frequent unlocks
- **Security feedback** - real-time password strength indicators and warnings
- **Copy buttons** - only visible after successful vault unlock
- **No long toasts** - use subtle success checkmarks and micro-interactions

#### Visual Design System

- **App Name:** 🔒 SafeVault
- **Primary Color:** Trust Blue (hex: 0d6efd)
- **Accent Color:** Success Green (hex: 4CAF50) for confirm actions
- **Background:** Light gray (hex: f8f9fa) or white (hex: ffffff)
- **Typography:** Inter or Roboto font family
- **Theme:** Minimal, secure, distraction-free
- **Dark Mode Support** - reduce eye strain and blend with OS preferences

## Development Guidelines

### Component Architecture

- Use **functional components** with React hooks
- Implement **compound components** for complex UI patterns
- Follow **atomic design principles** (atoms, molecules, organisms)
- Create **reusable UI components** in a component library structure

### Form Validation

- **Zod** for schema-based form validation and type safety
- **React Hook Form** integration with Zod resolvers
- **Type-safe form schemas** with automatic TypeScript inference
- **Real-time validation** with user-friendly error messages
- **Password strength validation** with custom Zod schemas
- **Email validation** and authentication form schemas

### Security Implementation

- **Firebase Authentication** for secure email-based user login and registration
- **Client-side encryption** before data storage in Firestore
- **Zero-knowledge architecture** - server never sees plaintext passwords
- **Firebase Firestore** for encrypted password vault data storage
- **Secure random password generation** with customizable criteria
- **Auto-logout timers** and session management
- **Secure clipboard handling** with auto-clear functionality
- **Firebase Security Rules** for user data isolation and access control

### State Management

- **Redux Toolkit (RTK)** for global application state management
- **RTK Slices** for modular state organization (auth, vault, settings, UI)
- **RTK Query** integration for caching and synchronization
- **Encrypted persistence** using redux-persist with encryption transforms
- **Immer integration** for immutable state updates (built into RTK)

### Server State & Data Fetching

- **React Query (TanStack Query)** for server state management and caching
- **Optimistic updates** for smooth user experience
- **Background refetching** for data synchronization
- **Error boundaries** and retry logic for network failures
- **Query invalidation** strategies for data consistency

### Firebase Backend

- **Firebase Auth** for email/password authentication
- **Firebase Firestore** for encrypted password vault storage
- **Firestore Security Rules** for user data access control
- **Firebase SDK** integration with React Query for data fetching
- **Offline support** with Firestore offline persistence
- **Real-time synchronization** across multiple devices

### Styling Guidelines

- **Tailwind-first approach** - use utility classes
- **Custom CSS only when necessary** (complex animations, unique layouts)
- **Consistent spacing scale** using Tailwind's spacing system
- **Responsive breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Color palette consistency** using CSS custom properties

### Performance & Accessibility

- **Lazy loading** for route components
- **Virtualization** for large password lists
- **ARIA labels** and semantic HTML
- **Keyboard navigation** support
- **Screen reader compatibility**
- **Color contrast compliance** (WCAG AA)

## AI Assistant Behavior

When working on this password manager project:

1. **Security-First Mindset:** Always prioritize security considerations in code suggestions and architectural decisions.

2. **Mobile-Responsive Focus:** Ensure all components and layouts work perfectly on mobile devices first, then enhance for larger screens.

3. **Tailwind CSS Only:** Use Tailwind utility classes for all styling. Avoid suggesting custom CSS unless absolutely necessary for complex animations or unique requirements.

4. **Redux Toolkit Best Practices:** Use RTK slices for state organization, proper TypeScript integration, and encrypted persistence for sensitive data.

5. **React Query Integration:** Implement proper caching strategies, optimistic updates, and error handling for all API interactions.

6. **Firebase Integration:** Use Firebase Auth for email-based authentication, Firestore for encrypted data storage, and implement proper security rules for user data isolation.

7. **Component Reusability:** Suggest creating reusable components that follow the design system consistently.

8. **Form Validation Best Practices:** Use Zod for schema-based validation with React Hook Form integration, ensuring type safety and user-friendly error messages.

9. **UX Best Practices:** Apply the zero-clutter principle and ensure one primary action per screen.

10. **Performance Awareness:** Consider bundle size, lazy loading, and optimization techniques.

11. **Accessibility Standards:** Include ARIA attributes, semantic HTML, and keyboard navigation in all suggestions.

12. **TypeScript Best Practices:** Use proper typing, interfaces, and type safety throughout the application, including RTK, React Query, Firebase, and Zod types.

## Goal Statement

Create a password manager that makes users feel safe and in control without clutter, providing a seamless experience across all devices while maintaining the highest security standards.

```

```
