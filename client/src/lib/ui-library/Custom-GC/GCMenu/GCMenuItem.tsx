import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { GCMenuItemProps } from './GCMenuProps';

// Component to handle submenu positioning with viewport awareness
interface SubmenuWithPositioningProps {
  submenuRef: React.RefObject<HTMLDivElement>;
  itemRef: React.RefObject<HTMLButtonElement>;
  submenu: React.ReactNode;
  dataTestId: string;
}

const SubmenuWithPositioning = ({ submenuRef, itemRef, submenu, dataTestId }: SubmenuWithPositioningProps) => {
  const [positionLeft, setPositionLeft] = useState(false);

  useEffect(() => {
    if (submenuRef.current && itemRef.current) {
      const submenuRect = submenuRef.current.getBoundingClientRect();
      const itemRect = itemRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Check if submenu would overflow on the right side
      const wouldOverflowRight = itemRect.right + submenuRect.width > viewportWidth - 16;
      setPositionLeft(wouldOverflowRight);
    }
  }, [submenuRef, itemRef]);

  const submenuClasses = [
    'gc-menu__submenu',
    positionLeft ? 'gc-menu__submenu--position-left' : ''
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={submenuRef}
      className={submenuClasses}
      role="menu"
      data-testid={`${dataTestId}-submenu`}
    >
      {submenu}
    </div>
  );
};

const GCMenuItem = ({
  disabled = false,
  onClick,
  children,
  icon: Icon,
  hasSubmenu = false,
  submenu,
  className = '',
  'data-testid': dataTestId = 'gc-menu-item'
}: GCMenuItemProps) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const itemRef = useRef<HTMLButtonElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
    if (hasSubmenu && !disabled) {
      setShowSubmenu(!showSubmenu);
    }
  };

  const handleMouseEnter = () => {
    if (hasSubmenu && !disabled) {
      setShowSubmenu(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasSubmenu && !disabled) {
      setShowSubmenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        submenuRef.current &&
        !submenuRef.current.contains(event.target as Node) &&
        itemRef.current &&
        !itemRef.current.contains(event.target as Node)
      ) {
        setShowSubmenu(false);
      }
    };

    if (showSubmenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSubmenu]);

  const menuItemClasses = [
    'gc-menu__item',
    hasSubmenu ? 'gc-menu__item--submenu' : '',
    disabled ? 'gc-menu__item--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className="gc-menu__item-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={itemRef}
        type="button"
        className={menuItemClasses}
        onClick={handleClick}
        disabled={disabled}
        data-testid={dataTestId}
        role="menuitem"
        aria-haspopup={hasSubmenu ? 'menu' : undefined}
        aria-expanded={hasSubmenu ? showSubmenu : undefined}
      >
        {Icon && (
          <Icon 
            className="gc-menu__item-icon" 
            size={16} 
          />
        )}
        <span className="gc-menu__item-text">{children}</span>
        {hasSubmenu && (
          <ChevronRight 
            className="gc-menu__item-arrow" 
            size={16} 
          />
        )}
      </button>
      
      {hasSubmenu && showSubmenu && submenu && (
        <SubmenuWithPositioning 
          submenuRef={submenuRef}
          itemRef={itemRef}
          submenu={submenu}
          dataTestId={dataTestId}
        />
      )}
    </div>
  );
};

export default GCMenuItem;