import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../types/shared';

export interface Tag {
  id: string;
  label: string;
}

export interface TagSelectorProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  tags: Tag[];
  selectedTags: string[];
  onSelectionChange: (selectedTags: string[]) => void;
  allowMultiple?: boolean;
  allowAll?: boolean;
  config?: VisibilityConfig;    // override over default visibility config if passed
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
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