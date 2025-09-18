import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../types/shared';
import type { TagItem, TagsFunction, MultiLanguageLabel } from '../../types/language';

// Selection item format - Same as TagItem for consistency
export interface SelectedTagItem {
  id: string;
  label: MultiLanguageLabel; // Complete label object with all translations
}

// Callback type - always receives TagItem[] (SelectedTagItem[] is same format)
export type SelectionCallback = (selectedTags: TagItem[]) => void;

export interface TagSelectorProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // Tags input - can be async function or direct array
  getTagsFunction?: TagsFunction;
  tags?: TagItem[]; // Direct TagItem array
  
  selectedTags: string[]; // Still use IDs for state management
  onSelectionChange: SelectionCallback; // Always receives full TagItem[] with translations
  
  // Language support for All and Default labels
  allLabel?: MultiLanguageLabel;
  defaultLabel?: MultiLanguageLabel;
  
  // Translations for default tag labels (when no getTagsFunction or tags provided)
  defaultTagLabels?: MultiLanguageLabel;
  allowMultiple?: boolean;
  allowAll?: boolean;
  config?: VisibilityConfig;    // override over default visibility config if passed
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface TagSelectorContext {
  theme: 'light' | 'dark';
  t: (key: string, params?: Record<string, string | number>) => string;
  visibilityConfig?: VisibilityConfig;
  isVisible: boolean;
  device: Device;
  orientation: Orientation;
  width: number;
}