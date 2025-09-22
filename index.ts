// GC-UI-COMPONENTS - Main Entry Point
// ====================================

// Export everything from the UI Library
export * from './client/src/lib/ui-library';

// Re-export main components for convenience
export { default as TagSelector } from './client/src/lib/ui-library/components/TagSelector';
export { LibI18nProvider, useLibI18n } from './client/src/lib/ui-library/providers/LibI18n.provider';
export { ThemeProvider } from './client/src/lib/ui-library/providers/Theme.provider';