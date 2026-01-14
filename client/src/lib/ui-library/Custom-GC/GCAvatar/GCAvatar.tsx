import { GCAvatarProps } from './GCAvatarProps';
import './GCAvatar.scss';

/**
 * GCAvatar - Reusable avatar component
 * 
 * Displays content (icon, initials, or picture) in a circular container
 * with configurable size and color from the GC color palette.
 * 
 * @example
 * // Icon avatar
 * <GCAvatar type="icon" size={32} color="brand">
 *   <UserIcon />
 * </GCAvatar>
 * 
 * @example
 * // Initials avatar
 * <GCAvatar type="initials" size={40} color="success">
 *   JP
 * </GCAvatar>
 * 
 * @example
 * // Picture avatar
 * <GCAvatar type="picture" size={48}>
 *   <img src="/profile.jpg" alt="Profile" />
 * </GCAvatar>
 */
export function GCAvatar({ 
  type, 
  size = 24, 
  color = 'information', 
  children, 
  className = '',
  'data-testid': dataTestId 
}: GCAvatarProps) {
  // Validate size (must be between 16-64 and multiple of 8)
  const validatedSize = Math.min(Math.max(Math.round(size / 8) * 8, 16), 64);
  
  // Generate CSS classes
  const avatarClasses = [
    'gc-avatar',
    `gc-avatar--${type}`,
    `gc-avatar--${color}`,
    `gc-avatar--size-${validatedSize}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={avatarClasses}
      style={{ 
        width: `${validatedSize}px`, 
        height: `${validatedSize}px` 
      }}
      data-testid={dataTestId}
    >
      <div className="gc-avatar__content">
        {children}
      </div>
    </div>
  );
}