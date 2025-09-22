// GC-UI-COMPONENTS - Main Entry Point
// ====================================

// Export everything from the UI Library
export * from './client/src/lib/ui-library';

// Re-export main components for convenience
export { default as TagSelector } from './client/src/lib/ui-library/components/TagSelector';

// Re-export all providers 
export { AppLanguageProvider, useAppLanguage } from './client/src/lib/ui-library/providers/AppLanguageProvider';
export { LibI18nProvider, useLibI18n } from './client/src/lib/ui-library/providers/LibI18n.provider';
export { ThemeProvider } from './client/src/lib/ui-library/providers/Theme.provider';

// Re-export types explicitly to ensure they are available
export type { TagItem, TagsFunction, TagMetadata, TagStateColors } from './client/src/lib/ui-library/components/TagSelector';
export type { TagSelectorProps, TagSelectorContext } from './client/src/lib/ui-library/components/TagSelector/types';
export type { MultiLanguageLabel, LanguageContextValue, GenericLanguageProvider } from './client/src/lib/ui-library/types/language.types';
export type { Device, Orientation, VisibilityConfig } from './client/src/lib/ui-library/types/shared.types';