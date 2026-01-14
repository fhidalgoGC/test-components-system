export type GCProgressSpinnerMode = 'determinate' | 'indeterminate';

export type GCProgressSpinnerSize = 'tiny' | 'small' | 'medium' | 'large' | 'extra-large';

import { GCColor, GCTone } from '../types';

export interface GCProgressSpinnerProps {
  /**
   * The mode of the progress spinner
   */
  mode?: GCProgressSpinnerMode;
  
  /**
   * The size of the progress spinner
   */
  size?: GCProgressSpinnerSize;
  
  /**
   * The color of the progress spinner
   */
  color?: GCColor;
  
  /**
   * The tone/variant of the color
   */
  tone?: GCTone;
  
  /**
   * Progress value for determinate mode (0-100)
   */
  value?: number;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Data test ID for testing
   */
  'data-testid'?: string;
}