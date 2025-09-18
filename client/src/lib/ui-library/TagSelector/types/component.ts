import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../types/shared';
import type { TagItem, TagsFunction } from '../../types/language';

// Legacy Tag interface for backward compatibility
export interface Tag {
  id: string;
  label: string;
}

export interface TagSelectorProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  
  // New async function approach (preferred)
  getTagsFunction?: TagsFunction;
  
  // Legacy props (for backward compatibility)
  tags?: Tag[];
  
  selectedTags: string[];
  onSelectionChange: (selectedTags: string[]) => void;
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