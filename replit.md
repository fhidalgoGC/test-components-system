# Overview

This project is a frontend-only React component library built with React, TypeScript, and Vite. Its primary purpose is to provide a comprehensive UI component library, featuring custom components built on shadcn/ui, a complete theming system, internationalization support, and a responsive design. This is a standalone frontend library with no backend dependencies, designed for integration into other frontend applications.

## Component Generator

The project includes an automated component generator (`npm run new-component`) that creates complete component structures with i18n support and responsive wrapper pattern. The generator supports **incremental development** with three modes:

### Generator Modes
1. **Root Structure** (no flags): Creates component directly in root folder without mobile/web variants
   - Usage: `npm run new-component -- ComponentName`
   - Structure: `ComponentName/views/`, `ComponentName/types/`, etc.
   - Best for: Components that don't need responsive variants

2. **Mobile Variant** (`--mobile`): Creates mobile-specific implementation in `mobile/` folder
   - Usage: `npm run new-component -- ComponentName --mobile`
   - Structure: `ComponentName/mobile/views/`, `ComponentName/mobile/types/`, etc.
   - Creates wrapper with `NotImplemented` fallback for web

3. **Web Variant** (`--web`): Creates web-specific implementation in `web/` folder
   - Usage: `npm run new-component -- ComponentName --web`
   - Can be added incrementally to existing mobile variant
   - Updates wrapper to use both mobile and web when both exist

4. **Both Variants** (`--mobile --web`): Creates both mobile and web at once
   - Usage: `npm run new-component -- ComponentName --mobile --web`
   - Creates responsive wrapper that switches based on viewport

### Incremental Development
- **Add variants later**: Create mobile first, add web later (or vice versa)
- **Automatic wrapper updates**: Wrapper adjusts based on available variants
- **Smart detection**: Skips creating variants that already exist
- **Examples**:
  ```bash
  # Step 1: Create mobile version
  npm run new-component -- MyComponent --mobile
  
  # Step 2: Later, add web version (updates wrapper automatically)
  npm run new-component -- MyComponent --web
  ```

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
- **NEW**: All generated components include ConfigProvider integration by default
  - Includes `useOptionalConfig` hook in provider template
  - Ready for cascada de prioridades (Props → ConfigProvider → Environment)
  - Commented examples show how to implement config cascade

### ConfigProvider Standardization (October 2025)
- **Standardized Access Pattern**: All components use `optionalConfig?.environment` to access configuration
- **ConfigContextType Enhancement**: Added `environment` property that exposes full merged config
- **useOptionalConfig Pattern**: Returns `{ environment: LibraryConfig }` or `null`
  - Enables consistent access: `optionalConfig?.environment.SECTION_CONFIG.VALUE`
  - Works for all config sections: `BOTTOM_NAV_CONFIG`, `SESSION_CONFIG`, `LANGUAGE_CONFIG`, etc.
- **Cascade Priority**: Props → ConfigProvider environment → Internal library environment
- **Template Updates**: All component generator templates follow standardized pattern
- **Benefits**: Single, predictable way to access all configuration across components

### Responsive Component Pattern (October 2025)
- **Automatic Mobile/Web Switching**: Components automatically switch between mobile and web implementations based on screen size
- **useResponsive Hook**: Enhanced global hook (`client/src/lib/ui-library/hooks/use-mobile.tsx`) detects device type and orientation
  - **Device Types**: mobile (<768px), tablet (768px-1024px), desktop (≥1024px)
  - **Orientation Detection**: portrait (height > width) vs landscape (width > height)
  - **Event Listeners**: Handles both 'resize' and 'orientationchange' events
  - **Return Values**:
    - `deviceType`: 'mobile' | 'tablet' | 'desktop'
    - `orientation`: 'portrait' | 'landscape'
    - `isMobile`, `isTablet`, `isDesktop`: boolean helpers
    - `isPortrait`, `isLandscape`: boolean helpers
  - **Backward Compatibility**: `useIsMobile()` still available, returns boolean
- **Wrapper Component Pattern**: Each component has a root `index.tsx` wrapper that:
  - Imports `useIsMobile` hook
  - Conditionally renders mobile or web variant
  - Shows `NotImplemented` component when variant doesn't exist
  - Example structure:
    ```typescript
    export const ComponentName = (props) => {
      const isMobile = useIsMobile();
      return isMobile ? <ComponentNameMobile {...props} /> : <ComponentNameWeb {...props} />;
    };
    ```
- **NotImplemented Component**: Reusable fallback component for unimplemented variants
  - Located at `client/src/lib/ui-library/components/NotImplemented`
  - Shows user-friendly message with platform and component name
  - Provides visual feedback when variant is missing
- **Generator Integration**: Component generator automatically creates wrapper with responsive pattern
  - Template: `client/src/lib/ui-library/command-templates/index.tsx.template`
  - All new components include mobile/web switching logic
  - Commented placeholders for web implementation
- **Benefits**: 
  - Seamless responsive behavior without manual intervention
  - Clear separation between mobile and web implementations
  - Graceful degradation when variants are missing
  - Consistent pattern across all components

### Decentralized Environment Configuration (October 2025)
- **Component-Local Configs**: Each component has its own `environment/` folder with **flat structure** configuration
  - Structure: `ComponentName/mobile/environment/enviroment.ts` + `index.ts`
  - **Flat Pattern** in `enviroment.ts` (no nesting):
    ```typescript
    export const environment = {
      SOME_CONFIG: value,
      ANOTHER_CONFIG: value2,
      // Properties directly in environment object
    };
    ```
  - Index re-exports: `export { environment as COMPONENT_NAME_CONFIG } from './enviroment'`
  - Prevents `enviorments/enviroment.ts` from growing infinitely
  - Each config is defined where it's used (modular approach)
- **Global Environment as Aggregator**: `enviorments/enviroment.ts` only imports and aggregates
  - No longer defines component configs directly
  - Acts as central export point for all configurations
  - Example: `import { BOTTOM_NAV_CONFIG } from '../components/BottomNavigationBar/mobile/environment'`
  - Result: `BOTTOM_NAV_CONFIG = { TRIGGER_ON_MOUNT: false }` (flat structure)
- **Access Pattern in Components** (Flat Structure):
  - Local import: `import { COMPONENT_NAME_CONFIG as environment } from './../environment'`
  - Access: `environment.SOME_CONFIG` (direct property access, no nesting)
  - With ConfigProvider: `optionalConfig?.environment?.COMPONENT_NAME_CONFIG?.SOME_CONFIG`
- **Component Generator Integration**: 
  - `-all-folders` flag automatically creates `environment/` folder
  - Templates include flat structure pattern
  - Follows standardized export pattern aligned with ConfigProvider usage
- **Backward Compatibility**: AppEnvironmentProvider unchanged, ConfigProvider works identically
- **Benefits**: Better scalability, easier maintenance, configs colocated with components, consistent with ConfigProvider demos

### BottomNavigationBar Component
- Mobile navigation component using ItemWithMultiLanguageLabel for items
- Supports both controlled (selectedId) and uncontrolled (defaultSelectedId) selection
- Features:
  - `onSelect` callback triggered on manual selection and external changes
  - `triggerOnMount` option to invoke callback on initial mount
  - **`disabledIds` prop**: Dynamic array to disable items in real-time
  - **UX Protection Rule**: Cannot disable currently selected item (must change selection first)
  - **`onError` callback**: Notifies when operations fail (e.g., attempting to disable selected item)
    - Error type: `{ type: 'disable-selected-item', itemId: string, message: string }`
    - Triggered via useEffect when selectedId is added to disabledIds array
    - Demo includes visual error alerts with auto-dismiss after 3 seconds
  - Item metadata includes: icon, isDisabled, dataTestId
  - Disable priority: disabledIds prop > item.metadata.isDisabled
  - Reactive i18n support with resolveMultiLanguageLabel utility
  - Full accessibility support (aria-current, aria-disabled)
  - **ConfigProvider Integration**: Uses standardized `optionalConfig?.environment` pattern
  - Configuration: `optionalConfig?.environment?.BOTTOM_NAV_CONFIG?.TRIGGER_ON_MOUNT` (flat access)
- Pattern: Provider + Context + Hook architecture with i18n and environment config integration

### HeterogeneousList Component (October 2025)
- **Structural Migration Completed**: Migrated to match BottomNavigationBar architecture
- **New Folders Added**:
  - `environment/` - Flat structure configuration with `HETEROGENEOUS_LIST_CONFIG`
    - Config properties: `DEFAULT_PAGE_SIZE`, `DEFAULT_PRESERVE_SCROLL`
    - Environment variable support: `VITE_HETEROGENEOUS_LIST_*`
  - `i18n/` - Internationalization support (en.json, es.json)
    - Translations for empty state, loading, error messages
  - `providers/` - Provider with Context pattern
    - Includes `useOptionalConfig` for ConfigProvider integration
    - Exports `useHeterogeneousListContext` hook
  - `hooks/useI18nMerge.hook.ts` - Translation merging with global i18n
- **Integration**: Added to global environment (`HETEROGENEOUS_LIST_CONFIG`)
- **Functionality**: All original logic preserved (hooks, types, utils, views intact)
- **Pattern Consistency**: Now follows same architecture as BottomNavigationBar
  - Provider + Context + Hook architecture
  - i18n reactivity support
  - ConfigProvider cascade (Props → ConfigProvider → Environment)

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