# Overview

This project is a frontend-only React component library built with React, TypeScript, and Vite. Its primary purpose is to provide a comprehensive UI component library, featuring custom components built on shadcn/ui, a complete theming system, internationalization support, and a responsive design. This is a standalone frontend library with no backend dependencies, designed for integration into other frontend applications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite.
- **Routing**: Wouter for client-side routing.
- **State Management**: React state with callback-based data management.
- **Styling**: Tailwind CSS with CSS variables for theming.
- **UI Components**:
  - shadcn/ui library with Radix UI primitives.
  - Custom UI library including a `TagSelector` component with async loading, multilingual support, and responsive design.
- **Theme System**: Custom theme provider with light/dark mode and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical i18n system with global and component-specific translations, supporting English (en) and Spanish (es). It includes a fallback mechanism and dynamic language selection.
- **Modular Architecture**: Codebase follows a classified folder pattern for layouts, pages, and UI components, including `css/`, `types/`, `hooks/`, `utils/`, and `i18n/` subdirectories.
- **Provider Architecture**: All providers (e.g., `AppAuthProvider`, `AppLanguageProvider`, `AppEnviromentProvider`, `AppLanguageLibUiProvider`) follow a consistent modular structure with dedicated files for provider components, types, hooks, and documentation.
  - `AppAuthProvider`: Authentication and session management with real-time expiration (not inactivity-based), cross-tab synchronization via BroadcastChannel API, optional lifecycle callbacks (onLogging/onSessionInvalid), and hierarchical configuration through ConfigProvider.
- **Environment Configuration**: External environment configuration support at the application level, allowing parent applications to override library defaults for aspects like language settings.

## Development Setup
- **Build Tool**: Vite for fast development and building.
- **Development Server**: Custom Vite server setup for component library development with hot reloading.
- **Component Demo**: Interactive component playground with live preview and built-in documentation.

# External Dependencies

### Core Framework Dependencies
- `vite`: Build tool and development server.
- `react`: Core React library.
- `react-dom`: React DOM rendering.
- `typescript`: TypeScript language support.

### UI and Component Libraries
- `@radix-ui/*`: Unstyled, accessible UI primitives.
- `tailwindcss`: Utility-first CSS framework.
- `class-variance-authority`: Component variant management.
- `clsx`: Utility for conditional CSS classes.
- `embla-carousel-react`: Carousel component.
- `cmdk`: Command palette component.
- `framer-motion`: Animation library.
- `lucide-react`: Icon library.

### Development and Build Tools
- `@replit/vite-plugin-*`: Replit-specific development plugins.
- `wouter`: Lightweight client-side routing library.
- `postcss`: CSS processing.
- `autoprefixer`: CSS vendor prefixing.

### Additional Libraries
- `date-fns`: Date utility library.
- `react-hook-form`: Form handling with validation.
- `zod`: Schema validation.