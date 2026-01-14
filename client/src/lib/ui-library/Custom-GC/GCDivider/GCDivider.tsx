import React from 'react';
import { GCDividerProps, GC_DIVIDER_DEFAULTS } from './GCDividerProps';
import './GCDivider.scss';

/**
 * GCDivider Component
 * 
 * A reusable divider component inspired by Angular Material's mat-divider.
 * Supports both horizontal and vertical orientations, with optional inset styling.
 * 
 * @example
 * ```tsx
 * // Basic horizontal divider
 * <GCDivider />
 * 
 * // Vertical divider
 * <GCDivider vertical />
 * 
 * // Inset divider with margin
 * <GCDivider inset />
 * 
 * // Vertical inset divider
 * <GCDivider vertical inset />
 * ```
 * 
 * @param props - GCDivider component props
 * @returns JSX element representing a divider
 */
export const GCDivider: React.FC<GCDividerProps> = ({
  inset = GC_DIVIDER_DEFAULTS.inset,
  vertical = GC_DIVIDER_DEFAULTS.vertical,
  className = GC_DIVIDER_DEFAULTS.className,
  'data-testid': dataTestId = 'gc-divider',
  ...rest
}) => {
  /**
   * Generate CSS classes for the divider based on props
   * @type {string} Combined CSS class string
   */
  const dividerClasses = [
    'gc-divider',
    vertical ? 'gc-divider--vertical' : 'gc-divider--horizontal',
    inset && 'gc-divider--inset',
    className
  ].filter(Boolean).join(' ');

  return (
    <hr
      className={dividerClasses}
      data-testid={dataTestId}
      role="separator"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      {...rest}
    />
  );
};

export default GCDivider;