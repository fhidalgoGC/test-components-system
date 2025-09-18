# Overview

This is a frontend-only React component library project built with React, TypeScript, and Vite. The project features a comprehensive UI component library built on top of shadcn/ui with custom components, complete theming system, internationalization support, and responsive design. This is a standalone frontend library without backend dependencies.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: 
  - shadcn/ui component library with Radix UI primitives
  - Custom UI library with TagSelector component featuring async loading, multilingual support, and responsive design
- **Theme System**: Custom theme provider with light/dark mode support and CSS variable-based theming

## Development Setup
- **Build Tool**: Vite for fast development and building
- **Development Server**: Custom Vite server setup for component library development
- **Hot Reloading**: Instant updates during development
- **Component Demo**: Interactive component playground with live preview
- **Documentation**: Built-in component documentation with usage examples

## External Dependencies

### Core Framework Dependencies
- **vite**: Build tool and development server
- **react**: Core React library
- **react-dom**: React DOM rendering
- **typescript**: TypeScript language support

### UI and Component Libraries
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Utility for conditional CSS classes

### Development and Build Tools
- **@replit/vite-plugin-***: Replit-specific development plugins
- **wouter**: Lightweight client-side routing library
- **postcss**: CSS processing
- **autoprefixer**: CSS vendor prefixing

### Additional Libraries
- **date-fns**: Date utility library
- **react-hook-form**: Form handling with validation
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component
- **framer-motion**: Animation library
- **lucide-react**: Icon library
- **zod**: Schema validation (for frontend forms)

# Recent Changes

## Backend Removal and Frontend-Only Conversion (September 18, 2025)
- **Architecture Conversion**: Converted from full-stack application to frontend-only React component library
- **Eliminated Dependencies**: Removed all backend-related dependencies:
  - Database: `@neondatabase/serverless`, `drizzle-orm`, `drizzle-kit`
  - Server: `express`, `express-session`, `passport`, `passport-local`
  - Development tools: `tsx`, `esbuild`, WebSockets (`ws`)
  - Session storage: `connect-pg-simple`, `memorystore`
- **Removed Directories**: 
  - `server/` - Express.js backend implementation
  - `shared/` - Shared schema and types
  - `drizzle.config.ts` - Database configuration
- **Development Setup**: Created `start-frontend.mjs` script for running Vite development server
- **Documentation Update**: Updated replit.md to reflect frontend-only architecture
- **CSS Module Organization**: Moved all `*.module.css` and `*.module.ts` files to respective `css/` directories

## How to Run the Application
Since the project is now frontend-only, use the custom startup script:
```bash
node start-frontend.mjs
```
This runs the Vite development server on `http://localhost:5000` with all UI components and documentation.

## Component Organization Restructuring (September 18, 2025)
- **Page-Scoped Component Architecture**: Restructured component organization to follow page-scoped pattern:
  - **Removed**: `client/src/pages/component-demo` directory and all references (including /demo route)
  - **Moved**: Components from centralized `client/src/pages/components/*` to page-specific locations:
    - `tag-selector-demo`: moved to `client/src/pages/tag-selector-demo/components/tag-selector-demo/`
- **Enhanced Page Structure**: Each page now contains its own `components/` subdirectory for better encapsulation
- **Updated Import System**: Created page-level index.ts files that re-export from component subdirectories
- **Router Optimization**: Simplified route imports and removed obsolete component-demo references
- **Type Compatibility**: Fixed LibraryDashboardView to be compatible with wouter's RouteComponentProps

## Architectural Restructuring (September 2025)
- **Complete Modular Architecture**: Restructured entire codebase to follow classified folder pattern:
  - **Layouts**: app-layout, component-layout now use css/, types/, hooks/, utils/, i18n/ subdirectories
  - **Pages**: library-dashboard, tag-selector-demo, not-found restructured to modular pattern
  - **UI Components**: Maintained existing shadcn/ui structure per requirements
- **Hierarchical i18n System**: Implemented comprehensive internationalization:
  - Global translations at client/src/i18n/ level
  - Component/page/layout specific translations take priority over globals
  - Uses useHierarchicalTranslations hook with fallback mechanism
  - Supports Spanish (es) and English (en) languages
- **CSS Modules Integration**: All restructured components use CSS modules with theme-aware styling
- **Consistent Hook Patterns**: Standardized hooks across all components for theme, i18n, and state management

## Project Structure Updates
- **Modular Architecture**: Components, layouts, and pages follow classified folder pattern:
  - `css/` - CSS modules and styling utilities
  - `types/` - TypeScript type definitions
  - `hooks/` - React hooks and custom logic
  - `utils/` - Utility functions and helpers
  - `i18n/` - Localized translations with hierarchical fallback
- **UI Library**: shadcn/ui components maintained in original flat structure
- **Global Systems**: Centralized i18n, theme management, and shared utilities

## Button Component and Demo Removal (September 18, 2025)
- **Removed Components**: Eliminated Button component from UI library (`client/src/lib/ui-library/Button/`)
- **Removed Pages**: Eliminated button-demo page (`client/src/pages/button-demo/`)
- **Updated Navigation**: Removed Button menu item from sidebar navigation
- **Updated Routes**: Removed `/components/button` route from Router configuration
- **Focused Library**: Project now focuses solely on TagSelector component with comprehensive async and multilingual features

## TagSelector Demo Simplification (September 18, 2025)
- **Removed Documentation Folder**: Eliminated `client/src/lib/ui-library/TagSelector/documentation/` directory
- **Simplified Demo Page**: Integrated live preview directly into `client/src/pages/tag-selector-demo/views/TagSelectorDemo.view.tsx`
- **Removed ComponentLayout**: No longer uses component layout system, shows preview directly in page
- **Maintained Full Functionality**: Preview with props controls, live demo, generated code, and async/multilingual features
- **Streamlined Architecture**: Faster loading and simpler maintenance without separate documentation components

## Known Issues & Future Improvements
- **i18n Array/Object Support**: Current hierarchical i18n system works for strings but needs enhancement for arrays and objects
- **Font Awesome Dependencies**: Some components reference Font Awesome icons that may need resolution
- **Type Safety**: Minor LSP diagnostics remaining in Router.tsx