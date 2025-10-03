// Re-export the unified component
export { TagSelectorView as default } from './views/TagSelector.view';

// Re-export types and utilities for external use
export * from './types';
export { LibI18nProvider } from '../../providers/AppLanguageLibUiProvider/index.provider';
export { useLibI18n } from '../../providers/AppLanguageLibUiProvider/index.hook';
export type { TagItem, TagsFunction, TagMetadata, TagStateColors } from './types/tag-selector.type';
export type { MultiLanguageLabel } from '../../types/language.types';
export type { TagSelectorSize } from './types/component.type';

// Re-export the component as TagSelector as well
export { TagSelectorView as TagSelector } from './views/TagSelector.view';