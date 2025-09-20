import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../types/shared';
import type { TagItem, TagsFunction, MultiLanguageLabel, TagMetadata } from '../../types/language';

// Selection item format - Same as TagItem for consistency
export interface SelectedTagItem {
  id: string;
  label: MultiLanguageLabel; // Complete label object with all translations
  metadata?: TagMetadata; // Optional individual tag customization
}

// Callback type - always receives TagItem[] (SelectedTagItem[] is same format)
export type SelectionCallback = (selectedTags: TagItem[]) => void;

// Theme customization types
export interface TagThemeColors {
  selected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  all?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
}

export interface TagCustomColors {
  light?: TagThemeColors;
  dark?: TagThemeColors;
}

export interface TagSelectorProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // Tags input - only async function
  getTagsFunction: TagsFunction; // Required async function
  
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
  
  // Theme customization
  theme?: string; // CSS class name for theme (e.g., 'theme-corporate', 'theme-nature')
  customColors?: TagCustomColors; // Direct color overrides
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