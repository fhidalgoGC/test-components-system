import { ReactNode } from 'react';
import { GCColor } from '../types/GCColor';

export type GCAvatarType = 'icon' | 'initials' | 'picture';

export interface GCAvatarProps {
  /**
   * Type of content in the avatar
   * @default 'initials'
   */
  type: GCAvatarType;
  
  /**
   * Size of the avatar in pixels. Must be between 16 and 64, in multiples of 8
   * @default 24
   */
  size?: number;
  
  /**
   * Color from the GC color palette
   * @default 'information'
   */
  color?: GCColor;
  
  /**
   * Content to display inside the avatar (icon, initials text, or image)
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}