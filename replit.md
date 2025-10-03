# Overview

This is a frontend-only React component library project built with React, TypeScript, and Vite. The project features a comprehensive UI component library built on top of shadcn/ui with custom components, complete theming system, internationalization support, and responsive design. This is a standalone frontend library without backend dependencies.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: React state with callback-based data management (removed TanStack Query)
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

## Replit Environment Setup (October 3, 2025)
- **Package.json Scripts Update**: Updated npm scripts to work in Replit environment:
  - `dev`: Changed to use `node start-frontend.mjs` (removed tsx dependency)
  - `build`: Simplified to `vite build`
  - `start`: Updated to use `vite preview --host 0.0.0.0 --port 5000` for production preview
  - `check`: Kept TypeScript checking with `tsc`
  - Removed `db:push` script (no database in this project)
- **Development Configuration**: 
  - `start-frontend.mjs` configured with proper host (0.0.0.0) and port (5000)
  - `vite.config.ts` updated with HMR configuration (clientPort: 443)
- **Workflow Setup**: 
  - Configured workflow "Start application" to run `npm run dev`
  - Workflow uses webview output type on port 5000
- **Deployment Configuration**: 
  - Set up autoscale deployment target
  - Build command: `npm run build`
  - Start command: `npm run start`
- **Environment Compatibility**: 
  - All configurations optimized for Replit's proxy-based architecture
  - Frontend serves on 0.0.0.0:5000 with proper host allowance

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
Since the project is now frontend-only, you can run it using npm scripts:

### Development Mode
```bash
npm run dev
```
This runs the Vite development server on `http://0.0.0.0:5000` with all UI components and documentation. The workflow "Start application" is configured to run this automatically.

### Production Preview
```bash
npm run start
```
This runs the production build preview on `http://0.0.0.0:5000`.

### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist/public` directory.

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

## Library Optimization and Code Organization (September 22, 2025)
- **TanStack Query Removal**: Eliminated unnecessary TanStack Query dependency from frontend-only component library
  - Removed `@tanstack/react-query` package and `client/src/lib/queryClient.ts`
  - Simplified App.tsx provider structure for better performance
  - Components now use pure callback-based data management approach
- **Utils Reorganization**: Moved CSS utility functions to proper library location
  - Relocated `client/src/lib/utils.ts` to `client/src/lib/ui-library/utils/cn.util.ts`
  - Updated all shadcn/ui component imports to use library utils path
  - Follows naming conventions with singular file prefixes
- **Architecture Cleanup**: Removed unnecessary index.ts files and optimized import structure
  - Direct imports to component view files without intermediate index files
  - Cleaner dependency graph and better development experience

## Import Path Optimization and Library Structure (September 22, 2025)
- **Export Structure Reorganization**: Created comprehensive export system for easy imports
  - Main library export: `client/src/lib/ui-library/index.ts` exports all components, providers, types
  - Components export: `client/src/lib/ui-library/components/index.ts` for component-specific imports
  - Providers export: `client/src/lib/ui-library/providers/index.ts` for provider-specific imports
  - Root entry point: `index.ts` for direct library access from external projects
- **Vite Alias Configuration**: Added "GC-UI-COMPONENTS" alias for simplified imports
  - External imports: `import { TagSelector, LibI18nProvider } from 'GC-UI-COMPONENTS'`
  - Internal imports: Consistent relative path resolution
- **Package Name Update**: Changed from "rest-express" to "GC-UI-COMPONENTS" for better identification
- **Route Resolution Fix**: Solved "useLibI18n must be used within LibI18nProvider" error caused by import path issues

## Known Issues & Future Improvements
- **i18n Array/Object Support**: Current hierarchical i18n system works for strings but needs enhancement for arrays and objects
- **Font Awesome Dependencies**: Some components reference Font Awesome icons that may need resolution
- **Type Safety**: Minor LSP diagnostics remaining in Router.tsx