# Overview

This project is a frontend-only React component library built with React, TypeScript, and Vite. Its primary purpose is to provide a comprehensive UI component library, featuring custom components built on shadcn/ui, a complete theming system, internationalization support, and a responsive design. This is a standalone frontend library with no backend dependencies, designed for integration into other frontend applications.

## Component Generator

The project includes an automated component generator (`npm run new-component`) that creates complete component structures with i18n support. All generated components follow the same pattern as TagSelector, with automatic language reactivity and translation merging.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: React state with callback-based data management.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **UI Components**: shadcn/ui library with Radix UI primitives, and custom components like `TagSelector`, `HeterogeneousList`, and `BottomNavigationBar`.
- **Theme System**: Custom theme provider with light/dark mode and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical i18n system with global and component-specific translations, supporting English (en) and Spanish (es), with fallback and dynamic language selection.
- **Modular Architecture**: Codebase follows a classified folder pattern for layouts, pages, and UI components, including `css/`, `types/`, `hooks/`, `utils/`, and `i18n/` subdirectories.
- **Provider Architecture**: Consistent modular structure for providers (e.g., `AppAuthProvider`, `AppLanguageProvider`), including authentication with real-time expiration and cross-tab synchronization.
- **Environment Configuration**: External environment configuration support, allowing parent applications to override library defaults.

## Development Setup
- **Build Tool**: Vite for fast development and building.
- **Development Server**: Custom Vite server setup with hot reloading.
- **Component Demo**: Interactive component playground with live preview and built-in documentation.
- **Component Generator**: Automated script (`scripts/generate-component.mjs`) that creates components from templates in `client/src/lib/ui-library/command-templates/`.

## Recent Changes (October 2025)

### Component Generator with i18n Templates
- Created template-based component generator using files instead of hardcoded strings
- All templates stored in `client/src/lib/ui-library/command-templates/`
- Components generated with `-all-folders` are automatically reactive to language changes
- Follows TagSelector pattern: useI18nMerge hook + Provider with Context + i18n support
- Dynamic language selection logic generated based on `--languages` parameter
- Templates support variable replacement: `{{ComponentName}}`, `{{componentname}}`, etc.

### BottomNavigationBar Component
- Mobile navigation component using ItemWithMultiLanguageLabel for items
- Supports both controlled (selectedId) and uncontrolled (defaultSelectedId) selection
- Features:
  - `onSelect` callback triggered on manual selection and external changes
  - `triggerOnMount` option to invoke callback on initial mount
  - Item metadata includes: icon, isDisabled, dataTestId
  - Reactive i18n support with resolveMultiLanguageLabel utility
  - Full accessibility support (aria-current, aria-disabled)
  - **ConfigProvider Integration**: Uses cascada de prioridades (Props → ConfigProvider → Environment)
  - Internal `useOptionalConfig` hook for safe ConfigProvider access
  - Configuration: `BOTTOM_NAV_CONFIG.TRIGGER_ON_MOUNT` in environment.ts
- Pattern: Provider + Context + Hook architecture with i18n and environment config integration

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