# Overview

This is a full-stack web application built with React, TypeScript, Express.js, and PostgreSQL. The project follows a modern monorepo structure with a shared schema layer and features a comprehensive UI component library built on top of shadcn/ui. The application includes both a custom UI library implementation and standard shadcn/ui components, with support for theming, internationalization, and responsive design.

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
  - Custom UI library with Button component featuring responsive visibility, theming, and i18n
- **Theme System**: Custom theme provider with light/dark mode support and CSS variable-based theming

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Development**: Hot reloading with Vite integration in development mode
- **API Structure**: RESTful API with `/api` prefix for all endpoints
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging with timing information

## Data Storage Solutions
- **Database**: PostgreSQL with Neon serverless connection
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Shared schema layer in TypeScript with Zod validation
- **Migrations**: Drizzle Kit for database migrations
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Schema**: Basic user model with username/password authentication
- **Storage Interface**: Abstracted storage layer with both memory and database implementations

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration and schema management tool
- **express**: Node.js web framework
- **vite**: Build tool and development server

### UI and Component Libraries
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Utility for conditional CSS classes

### Development and Build Tools
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for server builds
- **@replit/vite-plugin-***: Replit-specific development plugins
- **wouter**: Lightweight client-side routing library

### Additional Libraries
- **date-fns**: Date utility library
- **react-hook-form**: Form handling with validation
- **embla-carousel-react**: Carousel component
- **cmdk**: Command palette component
- **nanoid**: URL-safe unique ID generator

# Recent Changes

## Architectural Restructuring (September 2025)
- **Complete Modular Architecture**: Restructured entire codebase to follow classified folder pattern:
  - **Layouts**: app-layout, component-layout now use css/, types/, hooks/, utils/, i18n/ subdirectories
  - **Pages**: library-dashboard, component-demo, button-demo, tag-selector-demo, not-found restructured to modular pattern
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

## Known Issues & Future Improvements
- **i18n Array/Object Support**: Current hierarchical i18n system works for strings but needs enhancement for arrays and objects
- **Font Awesome Dependencies**: Some components reference Font Awesome icons that may need resolution
- **Type Safety**: Minor LSP diagnostics remaining in App.tsx and ComponentDemo.view.tsx