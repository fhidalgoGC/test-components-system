import { GCColor, GCTone, GCSize } from '../types';

/**
 * Props for the GCLabel component
 * 
 * @interface GCLabelProps
 * 
 * @property {GCColor} [color] - Color variant of the label
 * @property {GCTone} [tone] - Tone/variant of the color
 * @property {GCSize} [size] - Size variant of the label
 * @property {string} text - i18n key for label text (automatically translated)
 * @property {string} [className] - Additional CSS class names
 * @property {string} [data-testid] - Data test ID for testing
 * 
 * @example
 * const labelProps: GCLabelProps = {
 *   color: 'brand',
 *   tone: 'default',
 *   size: 'medium',
 *   text: 'statusActive'
 * };
 */
export interface GCLabelProps {
  /**
   * Color variant of the label
   * @default 'brand'
   */
  color?: GCColor;
  
  /**
   * Tone/variant of the color
   * @default 'default'
   */
  tone?: GCTone;
  
  /**
   * Size variant of the label
   * @default 'medium'
   */
  size?: GCSize;
  
  /**
   * i18n key for label text (automatically translated)
   */
  text: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Data test ID for testing
   */
  'data-testid'?: string;
}