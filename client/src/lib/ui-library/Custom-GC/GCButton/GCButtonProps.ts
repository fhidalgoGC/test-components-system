import React from 'react';
import { GCVariant, GCSize } from '../types';

/**
 * Icon configuration for the GCButton component
 * 
 * @interface GCButtonIcon
 * @property {'left' | 'right' | 'only-icon'} alignment - Position of the icon relative to text
 * @property {string} name - Name of the Lucide React icon (e.g., 'Plus', 'Edit', 'Trash2')
 */
interface GCButtonIcon {
  alignment: 'left' | 'right' | 'only-icon';
  name: string;
}

/**
 * Props for the GCButton component
 * 
 * @interface GCButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * 
 * @property {GCVariant} variant - Visual style variant of the button
 * @property {string} label - i18n key for button text (automatically translated)
 * @property {GCSize} size - Size variant of the button
 * @property {GCButtonIcon} [icon] - Optional icon configuration
 * @property {() => void} onClick - Required click event handler
 * 
 * @example
 * const buttonProps: GCButtonProps = {
 *   variant: 'primary',
 *   label: 'saveChanges',
 *   size: 'medium',
 *   icon: { alignment: 'left', name: 'Save' },
 *   onClick: () => handleSave()
 * };
 */
export interface GCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: GCVariant;
  label: string;
  size: GCSize;
  icon?: GCButtonIcon;
  onClick: () => void; // Required as requested
}