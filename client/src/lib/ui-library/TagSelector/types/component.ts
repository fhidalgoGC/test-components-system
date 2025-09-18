import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../types/shared';
import type { TagItem, TagsFunction, MultiLanguageLabel } from '../../types/language';

// New selection item format (preferred)
export interface SelectedTagItem {
  id: string;
  language: string;
}

// Legacy Tag interface for backward compatibility
export interface Tag {
  id: string;
  label: string;
}

// Callback types for backward compatibility
export type LegacySelectionCallback = (selectedTags: string[]) => void;
export type NewSelectionCallback = (selectedTags: SelectedTagItem[]) => void;
export type SelectionCallback = LegacySelectionCallback | NewSelectionCallback;

export interface TagSelectorProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // New async function approach (preferred)
  getTagsFunction?: TagsFunction;
  
  // Legacy props (for backward compatibility)
  tags?: Tag[];
  
  selectedTags: string[];
  // BACKWARD COMPATIBLE: Supports both old (string[]) and new (SelectedTagItem[]) callbacks
  onSelectionChange: SelectionCallback;
  
  // Language support for All and Default labels
  allLabel?: MultiLanguageLabel;
  defaultLabel?: MultiLanguageLabel;
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