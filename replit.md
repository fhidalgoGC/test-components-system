# Overview

This project is a frontend-only React component library built with React, TypeScript, and Vite. Its primary purpose is to provide a comprehensive UI component library, featuring custom components built on shadcn/ui, a complete theming system, internationalization support, and a responsive design. This is a standalone frontend library with no backend dependencies, designed for integration into other frontend applications. The project includes an automated component generator that supports incremental development for creating responsive components with i18n support.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: React state with callback-based data management.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **UI Components**: shadcn/ui library with Radix UI primitives, and custom components like `TagSelector`, `HeterogeneousList`, `BottomNavigationBar`, `UniversalCard`, and `LoginCard`.
- **Theme System**: Custom theme provider with light/dark mode and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical i18n system with global and component-specific translations, supporting English (en) and Spanish (es), with fallback and dynamic language selection.
- **Modular Architecture**: Codebase follows a classified folder pattern for layouts, pages, and UI components, including `css/`, `types/`, `hooks/`, `utils/`, and `i18n/` subdirectories.
- **Provider Architecture**: Consistent modular structure for providers (e.g., `AppAuthProvider`, `AppLanguageProvider`), including authentication with real-time expiration and cross-tab synchronization.
- **Environment Configuration**: External environment configuration support, allowing parent applications to override library defaults. Components use a decentralized, flat-structured `environment/` folder for local configurations, aggregated globally. Configuration access follows a cascade: Props → ConfigProvider environment → Internal library environment.
- **Responsive Design**: Components automatically switch between mobile and web implementations based on screen size using the `useResponsive` hook. A wrapper component pattern facilitates conditional rendering of platform-specific variants.
- **Component Generator**: Automated script (`npm run new-component`) creates complete component structures from templates, including i18n, responsive wrappers, and ConfigProvider integration. Supports incremental development for mobile/web variants.

## Development Setup
- **Build Tool**: Vite for fast development and building.
- **Development Server**: Custom Vite server setup with hot reloading.
- **Component Demo**: Interactive component playground with live preview and built-in documentation.

## Feature Specifications
- **BottomNavigationBar**: Mobile navigation component supporting controlled/uncontrolled selection, dynamic item disabling (`disabledIds`), and `onError` callback for UX protection. Integrates with i18n and ConfigProvider.
- **HeterogeneousList**: Component supporting configurable page size and scroll preservation. Fully migrated to the Provider + Context + Hook architecture with i18n and ConfigProvider integration.
- **UniversalCard**: Flexible wrapper card component that can render any React component with customizable styling, sizing (numeric, CSS units, Tailwind classes), and optional header/footer content.
- **LoginCard**: Authentication card component with dual configurations: `with-credentials` (providers + email/password) and `providers-only` (external auth only). Supports up to 4 visible providers with expandable "more" button for additional providers. All text labels (title, subtitle, provider labels) use `MultiLanguageLabel` interface for reactive i18n support. The `resolveLabel()` helper function resolves labels based on current language. In `providers-only` mode, providers display as large horizontal buttons with left-aligned icon + text. In `with-credentials` mode, providers show as square grid cards. Fully responsive design with mobile/web variants.

# External Dependencies

### Core Framework Dependencies
- `vite`
- `react`
- `react-dom`
- `typescript`

### UI and Component Libraries
- `@radix-ui/*`
- `tailwindcss`
- `class-variance-authority`
- `clsx`
- `embla-carousel-react`
- `cmdk`
- `framer-motion`
- `lucide-react`

### Development and Build Tools
- `@replit/vite-plugin-*`
- `wouter`
- `postcss`
- `autoprefixer`

### Additional Libraries
- `date-fns`
- `react-hook-form`
- `zod`