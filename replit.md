# Overview

This project is a comprehensive, dual-platform React component library for Web (Vite) and Native (Expo + NativeWind) applications. It provides a rich UI toolkit, including custom components, a theming system, internationalization, and responsive design. The goal is to offer a standalone, easily integrable frontend library for various projects, accelerating UI development and ensuring consistent user experiences across platforms.

# User Preferences

Preferred communication style: Simple, everyday language.
Preferred language: Spanish.
Important rule: Always update the component's README.md when making changes to any component.

# System Architecture

## Frontend Architecture
- **Frameworks**: React 18 with TypeScript, Vite for web, Expo for native.
- **Routing**: Wouter for client-side web routing.
- **State Management**: Primarily React state with callback-based data handling.
- **Styling**: Tailwind CSS with CSS variables for web theming; NativeWind and React Native `StyleSheet` for native.
- **UI Foundation**: Built on shadcn/ui and Radix UI primitives for web, complemented by custom components such as `TagSelector`, `HeterogeneousList`, `BottomNavigationBar`, `UniversalCard`, `LoginCard`, `Carousel`, `WrapperItemsSelected`, `BaseTable`, `Paginator`, `FloatingMenu`, `List`, `Modal`, `Grid`, `AcordionList`, and `SplitLayout`.
- **Theming**: Custom theme provider with light/dark modes and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical global and component-specific translation system with fallback and dynamic language selection (English and Spanish).
- **Modularity**: Organized with a classified folder structure for UI, layouts, pages, hooks, utilities, and i18n.
- **Provider Pattern**: Consistent modular providers (`AppAuthProvider`, `AppLanguageProvider`, `ControlDataProvider`, `MultiControlDataProvider`) for managing global concerns like authentication and data. `AppAuthProvider` supports generic session data via `login(data)`, `sessionData` in context, `sessionDataKey` prop, and route protection wrappers (`ProtectedRoute`, `PublicRoute`).
- **MultiControlDataProvider**: Manages multiple independent data sources, enabling controlled state, data, loading, and error handling for complex UI components. Supports an `activeSource` mechanism.
- **Configuration**: External configuration support allows parent applications to override library defaults through a cascaded approach.
- **Responsiveness**: `useResponsive` hook for adapting components to screen sizes and conditionally rendering platform-specific variants.
- **Component Generation**: An automated script (`npm run new-component`) to streamline the creation of new component structures.

## Platform Architecture
- Supports Web (Vite, React DOM) and Native (Expo, React Native) compilation targets.
- Uses `.web.tsx` / `.native.tsx` file naming conventions for platform-specific component resolution.

## Feature Specifications
- **Data-Driven Components**: `BaseTable`, `Paginator`, `List`, `Grid`, `AcordionList` offer declarative APIs and external state control.
- **Interactive UI**: `BottomNavigationBar`, `Carousel`, `FloatingMenu`, `Modal` provide rich user interaction and customizable behaviors. `FloatingMenu` supports internal selection (`selectable`, `controller`, `selectionStyle`) and drag & drop reordering (`orderable`, `onOrderChange`, `dragHandleClassName`) using native HTML5 Drag and Drop API.
- **Layout & Structure**: `UniversalCard`, `SplitLayout` offer flexible content rendering and responsive arrangements. `SplitLayout` supports per-panel background images via `backgroundImage` with dual render modes: `renderType: 'src'` (URL/path with opacity, objectFit, overlay) or `renderType: 'component'` (custom React component).
- **Authentication**: `LoginCard` provides a customizable authentication interface.
- **Selection Management**: `WrapperItemsSelected` integrates item selection capabilities into various components.
- **Google Maps**: `GoogleMap` component for web with external marker control.
- **Loading**: `Loading` component with configurable overlay (`transparent`, `light`, `dark`, `none`), coverage (`component`, `fullscreen`), spinner sizes (`xs`-`xl`), `renderType` (`self` for built-in spinner in `components/self/`, `component` for custom ReactNode via `render` prop), and `LoadingProvider` for global loading state control via `useLoading()` hook with `parentRef` support for portal-based component-level loading.

# External Dependencies

### Core Framework
- `vite`
- `react`
- `react-dom`
- `typescript`

### Native/Mobile
- `expo`
- `react-native`
- `react-native-web`
- `nativewind`
- `expo-status-bar`

### UI and Component Libraries
- `@radix-ui/*` (for UI primitives)
- `tailwindcss`
- `class-variance-authority`
- `clsx`
- `embla-carousel-react`
- `cmdk`
- `framer-motion`
- `lucide-react`
- `@react-google-maps/api`

### Development and Build Tools
- `@replit/vite-plugin-*`
- `wouter`
- `postcss`
- `autoprefixer`

### Additional Libraries
- `date-fns`
- `react-hook-form`
- `zod`