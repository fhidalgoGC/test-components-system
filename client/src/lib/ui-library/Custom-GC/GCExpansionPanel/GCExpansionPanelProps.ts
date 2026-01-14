// Types and interfaces for GCExpansionPanel component

export interface GCExpansionPanelProps {
  /** Whether the panel is expanded by default */
  expanded?: boolean;
  
  /** Whether the panel is disabled */
  disabled?: boolean;
  
  /** Function called when the panel expansion state changes */
  onToggle?: (expanded: boolean) => void;
  
  /** Whether to hide the toggle icon */
  hideToggle?: boolean;
  
  /** Whether to enable lazy rendering (content only renders when expanded) */
  lazy?: boolean;
  
  /** Panel header content */
  header: React.ReactNode;
  
  /** Panel content */
  children: React.ReactNode;
  
  /** Additional CSS classes to apply to the panel */
  className?: string;
  
  /** Custom ID for the panel */
  id?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCExpansionPanelHeaderProps {
  /** Whether the panel is expanded */
  expanded: boolean;
  
  /** Whether the panel is disabled */
  disabled: boolean;
  
  /** Whether to hide the toggle icon */
  hideToggle: boolean;
  
  /** Function called when header is clicked */
  onClick: () => void;
  
  /** Panel title */
  title?: React.ReactNode;
  
  /** Panel description */
  description?: React.ReactNode;
  
  /** Header content (if not using title/description) */
  children?: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCExpansionPanelContentProps {
  /** Whether the content is expanded/visible */
  expanded: boolean;
  
  /** Whether to enable lazy rendering */
  lazy: boolean;
  
  /** Content to display */
  children: React.ReactNode;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCExpansionPanelAccordionProps {
  /** Whether multiple panels can be expanded simultaneously */
  multi?: boolean;
  
  /** Array of panels */
  panels: Array<{
    id: string;
    header: React.ReactNode;
    content: React.ReactNode;
    expanded?: boolean;
    disabled?: boolean;
  }>;
  
  /** Function called when any panel's expansion state changes */
  onToggle?: (panelId: string, expanded: boolean) => void;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCExpansionPanelState {
  /** Whether the panel is currently expanded */
  expanded: boolean;
  
  /** Whether the panel has been initialized */
  initialized: boolean;
}

// Default values
export const GC_EXPANSION_PANEL_DEFAULT_EXPANDED = false;
export const GC_EXPANSION_PANEL_DEFAULT_DISABLED = false;
export const GC_EXPANSION_PANEL_DEFAULT_HIDE_TOGGLE = false;
export const GC_EXPANSION_PANEL_DEFAULT_LAZY = false;