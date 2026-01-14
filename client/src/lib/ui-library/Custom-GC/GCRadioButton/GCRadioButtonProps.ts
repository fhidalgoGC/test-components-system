// Types and interfaces for GCRadioButton component

export type GCRadioButtonColor = 
  | 'primary' 
  | 'accent' 
  | 'warn' 
  | 'warning' 
  | 'information' 
  | 'success' 
  | 'neutral';

export interface GCRadioButtonOption {
  /** Unique value for this option */
  value: string;
  
  /** Label text to display */
  label: string;
  
  /** Whether this option is disabled */
  disabled?: boolean;
  
  /** Data testid for this specific option */
  'data-testid'?: string;
}

export interface GCRadioButtonProps {
  /** Array of radio button options */
  options: GCRadioButtonOption[];
  
  /** Currently selected value */
  value?: string;
  
  /** Function called when selection changes */
  onChange?: (value: string) => void;
  
  /** Color theme for the radio buttons */
  color?: GCRadioButtonColor;
  
  /** Whether all radio buttons are disabled */
  disabled?: boolean;
  
  /** Name attribute for radio button group (for form handling) */
  name?: string;
  
  /** Whether to keep selected labels with regular weight instead of semibold */
  keepRegularWeight?: boolean;
  
  /** Direction of radio button layout */
  direction?: 'horizontal' | 'vertical';
  
  /** Additional CSS classes to apply to the container */
  className?: string;
  
  /** Custom ID for the component */
  id?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

// Default values
export const GC_DEFAULT_COLOR: GCRadioButtonColor = 'information';
export const GC_DEFAULT_DIRECTION = 'vertical';
export const GC_DEFAULT_KEEP_REGULAR_WEIGHT = false;

// Color mapping to theme colors
export const GC_COLOR_THEME_MAP: Record<GCRadioButtonColor, string> = {
  primary: 'brand',
  accent: 'teal',
  warn: 'error',
  warning: 'warning',
  information: 'information',
  success: 'success',
  neutral: 'neutral'
};