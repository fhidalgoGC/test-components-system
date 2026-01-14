// Types and interfaces for GCMenu component

export interface GCMenuProps {
  /** Position of the menu in the X axis relative to the trigger. Defaults to 'after' */
  xPosition?: 'after' | 'before';
  
  /** Position of the menu in the Y axis relative to the trigger. Defaults to 'below' */
  yPosition?: 'above' | 'below';
  
  /** Whether the menu should overlap the trigger element. Defaults to false */
  overlapTrigger?: boolean;
  
  /** Optional CSS class to apply to the backdrop */
  backdropClass?: string;
  
  /** Optional CSS class to apply to the menu panel */
  panelClass?: string;
  
  /** Whether to show a backdrop behind the menu. Defaults to false */
  hasBackdrop?: boolean;
  
  /** Whether the menu is currently open */
  isOpen?: boolean;
  
  /** Function called when the menu should be closed */
  onClose?: () => void;
  
  /** The trigger element that opens the menu */
  trigger: React.ReactElement;
  
  /** Menu content/children */
  children: React.ReactNode;
  
  /** Additional CSS classes to apply to the component */
  className?: string;
  
  /** Custom ID for the component */
  id?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCMenuState {
  /** Whether the menu is currently open */
  isOpen: boolean;
  
  /** Position of the menu relative to trigger */
  position: {
    top: number;
    left: number;
  };
  
  /** Whether the menu is initialized */
  initialized: boolean;
}

export interface GCMenuItemProps {
  /** Whether the menu item is disabled */
  disabled?: boolean;
  
  /** Function called when the menu item is clicked */
  onClick?: () => void;
  
  /** Menu item content */
  children: React.ReactNode;
  
  /** Icon to display before the text (from lucide-react) */
  icon?: React.ComponentType<{ className?: string; size?: string | number }>;
  
  /** Whether this item has a submenu */
  hasSubmenu?: boolean;
  
  /** Submenu items */
  submenu?: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

// Default values
export const GC_DEFAULT_X_POSITION: 'after' | 'before' = 'after';
export const GC_DEFAULT_Y_POSITION: 'above' | 'below' = 'below';
export const GC_DEFAULT_OVERLAP_TRIGGER = false;
export const GC_DEFAULT_HAS_BACKDROP = false;