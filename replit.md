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
- **UI Foundation**: Built on shadcn/ui and Radix UI primitives for web, complemented by custom components such as `TagSelector`, `HeterogeneousList`, `BottomNavigationBar`, `NavigationSidebar`, `UniversalCard`, `LoginCard`, `Carousel`, `WrapperItemsSelected`, `BaseTable`, `Paginator`, `FloatingMenu`, `List`, `Modal`, `Grid`, `AcordionList`, and `SplitLayout`.
- **Theming**: Custom theme provider with light/dark modes and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical global and component-specific translation system with fallback and dynamic language selection (English and Spanish).
- **Modularity**: Organized with a classified folder structure for UI, layouts, pages, hooks, utilities, and i18n.
- **Provider Pattern**: Consistent modular providers (`AppAuthProvider`, `AppLanguageProvider`, `ControlDataProvider`, `MultiControlDataProvider`) for managing global concerns like authentication and data. `AppAuthProvider` supports generic session data via `login(data)`, `sessionData` in context, `sessionDataKey` prop, `updateSessionData(data)` for recursive deep merge of session data (post-login only), `getSessionData<T>()` for typed access, and route protection wrappers (`ProtectedRoute`, `PublicRoute`).
- **MultiControlDataProvider**: Manages multiple independent data sources, enabling controlled state, data, loading, and error handling for complex UI components. Supports an `activeSource` mechanism.
- **Configuration**: External configuration support allows parent applications to override library defaults through a cascaded approach.
- **Responsiveness**: `useResponsive` hook for adapting components to screen sizes and conditionally rendering platform-specific variants.
- **Component Generation**: An automated script (`npm run new-component`) to streamline the creation of new component structures.

## Platform Architecture
- Supports Web (Vite, React DOM) and Native (Expo, React Native) compilation targets.
- Uses `.web.tsx` / `.native.tsx` file naming conventions for platform-specific component resolution.

## Feature Specifications
- **Data-Driven Components**: `BaseTable` (migrated to `shared/web/mobile` structure with dual platform support), `Paginator`, `List`, `Grid`, `AcordionList` offer declarative APIs and external state control. `BaseTable` supports infinite scroll via `behaviors.infiniteScroll` config (`enabled`, `threshold`, `loadingMoreMessage`, `loadingMoreComponent`), `callbacks.onReachEnd`, and `state: 'loadingMore'`. Includes re-entrancy guard and vertical-overflow validation. Works on both web and mobile. Vertical scroll uses a double-div scroll container pattern (outer div with `overflow: hidden`, inner div with `overflowY: auto`) to avoid flex-shrink issues with `display: flex` on `.tableWrapper`. Demo page migrated to `ComponentLayoutView` tab pattern (Examples + Props tabs) at `pages/base-table-demo/web/`.
- **Navigation**: `NavigationSidebar` (migrated to `shared/web/mobile` structure) supports dual web/mobile variants: web shows collapsible sidebar with header/body/footer; mobile (< 768px) shows a slide-in drawer from the left via `createPortal` to `document.body` with `z-index: 9999`. Mobile requires `isOpen`/`onClose` props (optional, default closed). Resolution is automatic via `useIsMobile()`.
- **Interactive UI**: `BottomNavigationBar`, `Carousel`, `FloatingMenu`, `Modal` provide rich user interaction and customizable behaviors. `FloatingMenu` supports dual web/mobile variants: web shows positioned floating menu with drag & drop reordering (`orderable`, `onOrderChange`, `dragHandleClassName`), mobile (< 768px) shows bottom sheet with slide-up animation (no drag & drop). Both support internal selection (`selectable`, `controller`, `selectionStyle`), header/footer sections, and scroll modes. Resolution is automatic via `useIsMobile()`.
- **Layout & Structure**: `UniversalCard`, `SplitLayout`, `SidebarLayout` offer flexible content rendering and responsive arrangements. `SplitLayout` (located at `client/src/lib/ui-library/layouts/SplitLayout/`) supports dual web/mobile variants: web shows two panels side by side, mobile (< 768px) renders only the `main` panel. Resolution is automatic via `useIsMobile()`. Supports per-panel background images via `backgroundImage` with dual render modes: `renderType: 'src'` (URL/path with opacity, objectFit, overlay) or `renderType: 'component'` (custom React component). `SidebarLayout` (located at `client/src/lib/ui-library/layouts/SidebarLayout/`) supports dual web/mobile variants: web shows Sidebar + Toolbar + Main, mobile (< 768px) renders only Toolbar + Main (no sidebar). Resolution is automatic via `useIsMobile()`. Sidebar is collapsable with context hook `useSidebarLayout`.
- **Authentication**: `LoginCard` provides a customizable authentication interface.
- **Selection Management**: `WrapperItemsSelected` integrates item selection capabilities into various components.
- **Google Maps**: `GoogleMap` component with dual web/mobile variants. Web supports full `layout` prop (widthMode, heightMode, align); mobile forces full-width with `gestureHandling: 'greedy'` and disables streetView/mapType controls. API key resolution: prop `apiKey` → `ConfigProvider.GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY` → `VITE_GOOGLE_MAPS_API_KEY` env var.
- **LayoutContainerContext**: Shared context (`client/src/lib/ui-library/contexts/`) that layouts (e.g., `SidebarLayout` mobile) provide to signal child components they are inside a managed layout. `BottomNavigationBar` reads this context to auto-switch from `position: fixed` to `position: relative` when inside a layout, preventing content overlap.
- **Loading**: `Loading` component with configurable overlay (`transparent`, `light`, `dark`, `none`), coverage (`component`, `fullscreen`), spinner sizes (`xs`-`xl`), `renderType` (`self` for built-in spinner in `components/self/`, `component` for custom ReactNode via `render` prop), `labelI18n` (accepts `string` or `MultiLanguageLabel` for automatic i18n via `LibI18nContext`), and `LoadingProvider` for global loading state control via `useLoading()` hook with `parentRef` support for portal-based component-level loading. Provider uses `defaultLabelI18n` and `show({ labelI18n })` for multilanguage labels.

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
- `@vis.gl/react-google-maps`

### Development and Build Tools
- `@replit/vite-plugin-*`
- `wouter`
- `postcss`
- `autoprefixer`

### Additional Libraries
- `date-fns`
- `react-hook-form`
- `zod`