import { useTranslation } from 'react-i18next';
import { GCLabelProps } from './GCLabelProps';
import './GCLabel.scss';

/**
 * GCLabel - A reusable label component with multiple color, tone, and size variants
 * 
 * Features:
 * - Supports multiple colors with tone variations
 * - Automatic text color calculation based on background
 * - Three size variants (small, medium, large)
 * - Internationalization support
 * - Optimized SCSS styling with GetColorFromTheme function
 * 
 * @param props - GCLabelProps
 * @returns JSX.Element
 */
export function GCLabel({ 
  color = 'brand', 
  tone = 'default', 
  size = 'medium', 
  text, 
  className = '', 
  'data-testid': dataTestId,
  ...rest 
}: GCLabelProps) {
  const { t } = useTranslation();

  // Generate CSS classes based on props
  const labelClasses = [
    'gc-label',
    `gc-label--${size}`,
    `gc-label--${color}-${tone}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={labelClasses}
      data-testid={dataTestId}
      {...rest}
    >
      {t(text)}
    </span>
  );
}