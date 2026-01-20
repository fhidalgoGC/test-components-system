import { ReactNode } from 'react';

export interface SidebarLayoutProps {
  sidebarContent: ReactNode;
  toolbarContent: ReactNode;
  children: ReactNode;
  
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  
  sidebarExpandedWidth?: number;
  sidebarCollapsedWidth?: number;
  toolbarHeight?: number;
  className?: string;
}

export interface SidebarLayoutContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapse: () => void;
  sidebarWidth: number | 'auto';
}
