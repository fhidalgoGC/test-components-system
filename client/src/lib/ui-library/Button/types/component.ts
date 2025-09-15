import type { CSSProperties, ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from './visibility';

export interface ButtonProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  titleKey?: string;
  children?: ReactNode;
  config?: VisibilityConfig;    // override over index.visibility.ts if passed
  intent?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export interface ButtonContext {
  theme: 'light' | 'dark';
  t: (key: string, params?: Record<string, string | number>) => string;
  visibilityConfig?: VisibilityConfig;
  isVisible: boolean;
  device: Device;
  orientation: Orientation;
  width: number;
}
