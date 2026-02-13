# Overview

This project is a dual-platform React component library designed to provide a comprehensive UI toolkit for both Web (Vite) and Native (Expo + NativeWind) applications. It offers custom components, a complete theming system, internationalization support, and responsive design, aiming to be a standalone frontend library easily integratable into other frontend projects.

# User Preferences

Preferred communication style: Simple, everyday language.
Preferred language: Spanish.
Important rule: Always update the component's README.md when making changes to any component.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for web, Expo for native.
- **Routing**: Wouter for client-side routing on web.
- **State Management**: Primarily React state with callback-based data management.
- **Styling**: Tailwind CSS with CSS variables for theming on web, NativeWind and React Native `StyleSheet` for native.
- **UI Components**: Built on shadcn/ui and Radix UI primitives for web, with custom components like `TagSelector`, `HeterogeneousList`, `BottomNavigationBar`, `UniversalCard`, `LoginCard`, `Carousel`, `WrapperItemsSelected`, and `BaseTable`.
- **Theme System**: Custom theme provider supporting light/dark modes and CSS variable-based theming.
- **Internationalization (i18n)**: Hierarchical system with global and component-specific translations for English and Spanish, including fallback and dynamic language selection.
- **Modular Architecture**: Organized with a classified folder pattern for layouts, pages, UI components, hooks, utilities, and i18n.
- **Provider Architecture**: Consistent modular structure for providers (e.g., `AppAuthProvider`, `AppLanguageProvider`), handling authentication with real-time expiration and cross-tab synchronization.
- **Environment Configuration**: External configuration support, allowing parent applications to override library defaults through a cascaded approach (Props → ConfigProvider → Internal library environment).
- **Responsive Design**: Components adapt to screen size using the `useResponsive` hook, facilitating conditional rendering of platform-specific variants.
- **Component Generator**: An automated script (`npm run new-component`) streamlines the creation of new component structures, including i18n, responsive wrappers, and ConfigProvider integration.

## Platform Architecture
The project supports two distinct compilation targets: Web (Vite, React DOM) and Native (Expo, React Native). Platform-specific implementations utilize a `.web.tsx` / `.native.tsx` file naming convention for component resolution.

## Development Setup
- **Build Tool**: Vite for web development.
- **Development Server**: Custom Vite server with hot reloading, and Expo with Metro bundler for native.
- **Component Demo**: Interactive playground with live preview and documentation.

## Feature Specifications
- **Paginator Component (web-only)**: Externally controlled pagination with i18n support, offering flexible layout, page number generation with ellipsis, items-per-page selector, and navigation controls.
- **BaseTable Component (web-only)**: Declarative, agnostic table component for interpreting configuration without business logic. Features external state control (`useTableState`), customizable headers/cells/rows, column configuration, and comprehensive callbacks.
- **BottomNavigationBar**: Mobile navigation component with controlled/uncontrolled selection, dynamic item disabling, and `onError` callbacks.
- **Carousel**: Interactive component rendering React elements with autoplay, drag gestures, indicators, keyboard navigation, and external index control. Supports controlled/uncontrolled modes, configurable spacing, uniform item heights, multiple slides per view, and loop modes.
- **HeterogeneousList**: Supports configurable page size and scroll preservation, using a Provider + Context + Hook architecture.
- **UniversalCard**: Flexible wrapper for rendering any React component with customizable styling, sizing, and optional header/footer content. Supports selection integration via `selectable` prop.
- **LoginCard (web-only)**: Authentication component with dual configurations (`with-credentials` and `providers-only`), modular layouts, and advanced provider display logic. Supports custom provider components and external redirects.
- **WrapperItemsSelected**: Universal selection wrapper tracking item selection state by ID, providing callbacks for changes. Supports controlled/uncontrolled modes, multi-select/single-select, and a Context API for child component interaction.
- **GoogleMap (web-only)**: Google Maps component with externally controlled markers, supporting various map controls and callbacks.
- **List Component**: Rendering-only component with external state management via `useListController`. Features:
  - **Controller-based architecture**: All state managed through controller methods (`setData()`, `appendData()`, `setRenderState()`, `getRenderState()`)
  - **Render States**: `renderIdle`, `renderLoading`, `renderComplete`, `renderEmpty`, `renderError` - each with optional custom components
  - **Scroll behaviors**: `normal`, `infinityScroll`, `none`
  - **Pagination support**: Controller exposes `setTotalItems()`, `getTotalItems()`, `getTotalPages()`, `getLoadedItems()`, `getPage()`, `getNextPage()`
  - **Layout modes**: `widthMode` (full/fixed), `heightMode` (auto/fixed/fit-content), configurable height
  - **Loading indicator**: Configurable position (`top`, `bottom`, `over`, `center`) and render type (`self`, `component`)
  - **Empty state**: Configurable position (`center`, `over`) with custom component support
  - **Data source**: When controller is provided, `data` prop is optional - controller becomes single source of truth
  - **InfiniteScroll**: Uses IntersectionObserver with configurable threshold, triggers `onLoadMore` callback, uses `controller.appendData()` for new data
  - **Layout gap**: `layout.gap` controls spacing between items (responsibility of the List, not the item component)
  - **Selection integration**: Optional `selectionConfig` prop integrates `WrapperItemsSelected` for item selection
    - Two internal layouts in `layouts/` folder: `List.normal.layout.tsx` and `List.selectable.layout.tsx` - solo se carga en memoria si se necesita
    - `getItemId`: Function to extract ID from each item (agnóstico)
    - `getItem`: Optional function to transform T → R for callbacks (agnóstico, el consumidor decide qué interfaz recibir)
    - `multiSelect`: Single or multi-select mode
    - `selectedIds` / `defaultSelectedIds`: Controlled or uncontrolled selection
    - `onSelectionChange`: Callback with transformed items (R[]) when getItem provided, or string[] (IDs) when not
    - `onItemAction`: Callback for each select/deselect action with `{ item: R, action }` event
    - `selectionStyle`: Visual configuration (border, borderRadius, backgroundColor, boxShadow, outline, custom CSSProperties)
- **Modal Component**: Agnostic dialog with 100% external control via `useModalController` hook. Features:
  - **External control**: `useModalController` hook manages open/close/state/selectedData
  - **Visual states**: `idle`, `loading`, `success`, `empty`, `error` with configurable renders (`self` or `component`)
  - **Layout**: Configurable header/body/footer sections with alignment (vertical/horizontal)
  - **Overlay**: Configurable opacity, color, blur, closeOnClick
  - **Close button**: Position (`top-left`/`top-right`), custom render support
  - **Size modes**: `widthMode` and `heightMode` (`full`/`auto`/`fixed`)
  - **Responsive**: Web (centered dialog) and Mobile (bottom sheet)
  - **Keyboard**: Escape key closes modal, body scroll lock when open
- **Grid Component (web-only)**: Declarative Grid Engine, agnostic to data. Features:
  - **Layout Engine**: Auto-calculates columns based on container width and `minCardWidth`
  - **State Machine**: `idle`, `loading`, `empty`, `error` with configurable visual renders
  - **Scroll End Detector**: Fires `onReachEnd` only when `state === 'idle'`
  - **Capacity Calculator**: Emits `onCapacityChange` with `{ columns, rows, visibleItems }`
  - **External control**: `useGridController` hook with `setState`, `getState`, `refreshLayout`
  - **Grid config**: `minColumns`, `maxColumns`, `minRows`, `maxRows`, `minCardWidth`, `minCardHeight`, `rowGap`, `columnGap`
  - **Layout modes**: `widthMode` and `heightMode` (`full`/`auto`/`fixed`)
  - **ResizeObserver**: Auto-recalculates on container resize
  - **showBorder**: Optional prop to toggle border visibility on the Grid container
  - **Loading position**: `position` prop on loading state (`'bottom'` for append/scroll infinito, `'over'` for overlay centrado sobre datos existentes)
  - **Selection integration**: Optional `selectionConfig` prop integrates `WrapperItemsSelected` for item selection
    - Two internal layouts in `layouts/` folder: `Grid.view.tsx` (normal) and `Grid.selectable.layout.tsx` - solo se carga en memoria si se necesita
    - `getItemId`: Function to extract ID from each item (agnóstico)
    - `getItem`: Optional function to transform T → R for callbacks (agnóstico, el consumidor decide qué interfaz recibir)
    - `multiSelect`: Single or multi-select mode
    - `selectedIds` / `defaultSelectedIds`: Controlled or uncontrolled selection
    - `onSelectionChange`: Callback with transformed items (R[]) when getItem provided, or string[] (IDs) when not
    - `onItemAction`: Callback for each select/deselect action with `{ item: R, action }` event
    - `selectionStyle`: Visual configuration (border, borderRadius, backgroundColor, boxShadow, outline, custom CSSProperties)
- **SplitLayout** (ubicado en `client/src/layouts/split-layout-component/`): Two-panel responsive layout. Features:
  - **Three-level config**: `layout` (container), `main` (panel principal), `secondary` (panel secundario)
  - **componentMainAlign**: `'left'` | `'right'` — controla en qué lado se renderiza el panel main (default: `'left'`). Usa `flexDirection: row-reverse` internamente.
  - **SizeMode**: `full`, `auto`, `fixed`, `percentage` for width/height at layout and panel level
  - **Panel dimensions**: Each panel has independent `widthMode`, `width`, `minWidth`, `heightMode`, `height`, `minHeight`
  - **Layout dimensions**: Container has `widthMode`, `width`, `minWidth`, `heightMode`, `height`, `minHeight`
  - **Responsive collapse**: Secondary panel hides at 768px via CSS media query, main always visible
  - **Alignment**: `align: { vertical: 'top'|'middle'|'bottom', horizontal: 'left'|'center'|'right' }` per panel, defaults to middle/center
  - **Scroll control**: `scroll: { vertical: boolean, horizontal: boolean }` per panel, defaults to vertical=true, horizontal=false
  - **Render**: `render` prop accepts ReactNode, `renderType` is always 'component'

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
- `@radix-ui/*`
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