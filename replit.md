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
- **UI Components**: shadcn/ui library with Radix UI primitives, and custom components like `TagSelector`, `HeterogeneousList`, `BottomNavigationBar`, `UniversalCard`, `Carousel`, and `WrapperItemsSelected`.
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
- **Carousel**: Interactive carousel component that renders React elements with autoplay, drag gestures (mouse/touch), clickable indicators, keyboard navigation, and external index control. Supports both controlled and uncontrolled modes, configurable spacing, uniform item heights, multiple slides per view, loop/no-loop modes, and pause-on-hover. Features GPU-optimized transitions, vertical-scroll cancellation for drag gestures, and automatic timer reset on external index changes. Includes comprehensive demo page with 6 configuration examples.
- **HeterogeneousList**: Component supporting configurable page size and scroll preservation. Fully migrated to the Provider + Context + Hook architecture with i18n and ConfigProvider integration.
- **UniversalCard**: Flexible wrapper card component that can render any React component with customizable styling, sizing (numeric, CSS units, Tailwind classes), and optional header/footer content.
- **WrapperItemsSelected**: Universal selection wrapper that tracks item selection state by ID and provides callbacks for selection changes. Wraps any child components (cards, lists, grids) and provides a Context API via `useSelection()` hook for children to interact with selection state. Supports controlled/uncontrolled modes, multi-select/single-select, and dual callback system (`onSelectionChange` for full selection array, `onItemAction` for individual select/deselect events). Pure logic wrapper with no visual styling.

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