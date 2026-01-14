import React from 'react';
import { useTranslation } from 'react-i18next';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import { GCButtonProps } from './GCButtonProps';
import './GCButton.scss';

/**
 * GCButton - A reusable button component with dynamic theming and i18n support
 * 
 * @description A comprehensive button component that provides multiple variants, sizes, 
 * icon support, and automatic internationalization through i18n keys. Uses SCSS-based 
 * theming with CSS custom properties for consistent styling across the application.
 * 
 * @component
 * @param {GCButtonProps} props - The component props
 * @param {'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link' | 'danger'} props.variant - Visual style variant
 * @param {string} props.label - i18n key for the button text (will be translated automatically)
 * @param {'small' | 'medium' | 'large'} props.size - Button size
 * @param {Object} [props.icon] - Optional icon configuration
 * @param {'left' | 'right' | 'only-icon'} props.icon.alignment - Icon position relative to text
 * @param {string} props.icon.name - Lucide icon name (e.g., 'Plus', 'Edit', 'Trash2')
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - HTML button type
 * @param {Function} props.onClick - Click event handler
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {React.ReactElement} The rendered button component
 * 
 * @example
 * // Basic usage with i18n
 * <GCButton 
 *   variant="primary" 
 *   label="saveChanges" 
 *   size="medium" 
 *   onClick={() => handleSave()}
 * />
 * 
 * @example
 * // With left-aligned icon
 * <GCButton 
 *   variant="secondary" 
 *   label="edit" 
 *   size="small"
 *   icon={{ alignment: 'left', name: 'Edit' }}
 *   onClick={() => handleEdit()}
 * />
 * 
 * @example
 * // Icon-only button
 * <GCButton 
 *   variant="ghost" 
 *   label="" 
 *   size="medium"
 *   icon={{ alignment: 'only-icon', name: 'Heart' }}
 *   onClick={() => toggleFavorite()}
 * />
 * 
 * @example
 * // Danger variant with right-aligned icon
 * <GCButton 
 *   variant="danger" 
 *   label="delete" 
 *   size="large"
 *   icon={{ alignment: 'right', name: 'Trash2' }}
 *   onClick={() => handleDelete()}
 * />
 */
const GCButton: React.FC<GCButtonProps> = ({
  variant,
  label,
  size,
  icon,
  type = 'button',
  ...props
}) => {
  const { t } = useTranslation();
  
  /**
   * Dynamically gets the Lucide icon component based on the icon name
   * @type {React.ComponentType | null}
   */
  const IconComponent = icon ? (LucideIcons as any)[icon.name] : null;

  /** @type {boolean} Whether the button displays only an icon without text */
  const isIconOnly = icon?.alignment === 'only-icon';
  /** @type {boolean} Whether the icon is positioned to the left of text */
  const hasLeftIcon = icon?.alignment === 'left';
  /** @type {boolean} Whether the icon is positioned to the right of text */
  const hasRightIcon = icon?.alignment === 'right';
  
  /**
   * Generates CSS classes for the button based on props and state
   * @type {string} Combined CSS class string
   */
  const buttonClasses = cn(
    'gc-button',
    `gc-button--${size}`,
    `gc-button--${variant}`,
    isIconOnly && 'only-icon',
    hasLeftIcon && 'has-left-icon',
    hasRightIcon && 'has-right-icon',
    props.className
  );

  /**
   * Renders the icon component with appropriate size based on button size
   * 
   * @returns {React.ReactElement | null} The rendered icon or null if no icon
   * 
   * @description Icon sizes are automatically calculated:
   * - small: 12px
   * - medium: 14px  
   * - large: 16px
   */
  const renderIcon = () => {
    if (!icon || !IconComponent) return null;
    
    const iconSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;
    
    return <IconComponent size={iconSize} />;
  };

  /**
   * Renders the button content including text and icons in the correct order
   * 
   * @returns {React.ReactNode} The rendered button content
   * 
   * @description Handles different content layouts:
   * - Icon-only: Shows only the icon
   * - No icon: Shows only translated text
   * - Left icon: Icon followed by text
   * - Right icon: Text followed by icon
   * - Fallback: Just translated text
   * 
   * The label is automatically translated using the i18n system.
   */
  const renderContent = () => {
    /** @type {string} Translated label text using i18n key */
    const translatedLabel = label ? t(label) : '';
    
    if (isIconOnly) {
      return renderIcon();
    }

    if (!icon) {
      return translatedLabel;
    }

    if (icon.alignment === 'left') {
      return (
        <>
          {renderIcon()}
          {translatedLabel}
        </>
      );
    }

    if (icon.alignment === 'right') {
      return (
        <>
          {translatedLabel}
          {renderIcon()}
        </>
      );
    }

    return translatedLabel;
  };

  return (
    <button
      {...props}
      type={type}
      className={buttonClasses}
      data-testid={`button-${variant}-${size}`}
    >
      {renderContent()}
    </button>
  );
};

export { GCButton };
export default GCButton;