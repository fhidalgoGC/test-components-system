import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../../types/shared.types';
import type { TagItem, TagsFunction, TagMetadata } from './tag-selector.types';
import type { MultiLanguageLabel } from '../../../types/language.types';

// Unified size type for TagSelector
export type TagSelectorSize = 'sm' | 'md' | 'lg' | 'tam-1' | 'tam-2' | 'tam-3' | 'tam-4' | 'tam-5' | 'tam-6' | 'tam-7' | 'tam-8' | 'tam-9' | 'tam-10' | 'tam-11' | 'tam-12';

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
    hoverText?: string;      // Text color on hover
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
    hoverText?: string;      // Text color on hover
  };
  all?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
    hoverText?: string;      // Text color on hover
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
  requireSelection?: boolean; // Require at least one tag to be selected
  config?: VisibilityConfig;    // override over default visibility config if passed
  size?: TagSelectorSize;
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