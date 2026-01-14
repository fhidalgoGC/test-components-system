import { useState, useEffect, useRef, useCallback, cloneElement } from 'react';
import {
  GCMenuProps,
  GCMenuState,
  GC_DEFAULT_X_POSITION,
  GC_DEFAULT_Y_POSITION,
  GC_DEFAULT_OVERLAP_TRIGGER,
  GC_DEFAULT_HAS_BACKDROP,
} from './GCMenuProps';
import './GCMenu.scss';

const GCMenu = ({
  xPosition = GC_DEFAULT_X_POSITION,
  yPosition = GC_DEFAULT_Y_POSITION,
  overlapTrigger = GC_DEFAULT_OVERLAP_TRIGGER,
  backdropClass = '',
  panelClass = '',
  hasBackdrop = GC_DEFAULT_HAS_BACKDROP,
  isOpen = false,
  onClose,
  trigger,
  children,
  className = '',
  id,
  'data-testid': dataTestId = 'gc-menu'
}: GCMenuProps) => {
  const [state, setState] = useState<GCMenuState>({
    isOpen: false,
    position: { top: 0, left: 0 },
    initialized: false
  });
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Calculate menu position based on trigger element
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !panelRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const panelRect = panelRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let top = 0;
    let left = 0;
    
    // Calculate Y position
    if (yPosition === 'below') {
      top = overlapTrigger ? triggerRect.top : triggerRect.bottom;
    } else {
      top = overlapTrigger ? triggerRect.bottom : triggerRect.top;
      top -= panelRect.height;
    }
    
    // Calculate X position
    if (xPosition === 'after') {
      left = overlapTrigger ? triggerRect.right - panelRect.width : triggerRect.left;
    } else {
      left = overlapTrigger ? triggerRect.left : triggerRect.right - panelRect.width;
    }
    
    // Ensure menu stays within viewport bounds
    if (left + panelRect.width > viewportWidth) {
      left = viewportWidth - panelRect.width - 8;
    }
    if (left < 8) {
      left = 8;
    }
    
    if (top + panelRect.height > viewportHeight) {
      top = viewportHeight - panelRect.height - 8;
    }
    if (top < 8) {
      top = 8;
    }
    
    setState(prev => ({
      ...prev,
      position: { top, left }
    }));
  }, [xPosition, yPosition, overlapTrigger]);
  
  // Update state when isOpen prop changes
  useEffect(() => {
    if (isOpen !== state.isOpen) {
      setState(prev => ({
        ...prev,
        isOpen: isOpen,
        initialized: true
      }));
    }
  }, [isOpen, state.isOpen]);
  
  // Calculate position after panel mounts
  useEffect(() => {
    if (state.isOpen && panelRef.current) {
      // Use requestAnimationFrame to ensure the panel is fully rendered
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }
  }, [state.isOpen, calculatePosition]);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        state.isOpen &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (state.isOpen && event.key === 'Escape') {
        handleClose();
      }
    };
    
    if (state.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [state.isOpen]);
  
  // Handle window resize and scroll
  useEffect(() => {
    const handleResize = () => {
      if (state.isOpen) {
        calculatePosition();
      }
    };
    
    const handleScroll = () => {
      if (state.isOpen) {
        calculatePosition();
      }
    };
    
    if (state.isOpen) {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [state.isOpen, calculatePosition]);
  
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  
  const handleBackdropClick = useCallback(() => {
    if (hasBackdrop) {
      handleClose();
    }
  }, [hasBackdrop, handleClose]);
  
  // Create enhanced trigger with click handler
  const enhancedTrigger = cloneElement(trigger, {
    ref: triggerRef,
    'data-testid': `${dataTestId}-trigger`
  });
  
  const menuClasses = [
    'gc-menu',
    className
  ].filter(Boolean).join(' ');
  
  const panelClasses = [
    'gc-menu__panel',
    xPosition === 'before' && 'gc-menu__panel--position-before',
    yPosition === 'above' && 'gc-menu__panel--position-above',
    panelClass
  ].filter(Boolean).join(' ');
  
  const overlayClasses = [
    'gc-menu__overlay',
    hasBackdrop && 'gc-menu__overlay--with-backdrop',
    backdropClass
  ].filter(Boolean).join(' ');
  
  return (
    <div
      className={menuClasses}
      id={id}
      data-testid={dataTestId}
    >
      <div className="gc-menu__trigger">
        {enhancedTrigger}
      </div>
      
      {state.isOpen && (
        <div
          ref={overlayRef}
          className={overlayClasses}
          onClick={handleBackdropClick}
          data-testid={`${dataTestId}-overlay`}
        >
          <div
            ref={panelRef}
            className={panelClasses}
            style={{
              position: 'fixed',
              top: `${state.position.top}px`,
              left: `${state.position.left}px`
            }}
            onClick={(e) => e.stopPropagation()}
            data-testid={`${dataTestId}-panel`}
            role="menu"
            tabIndex={-1}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default GCMenu;