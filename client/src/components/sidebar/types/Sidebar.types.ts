export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: SubMenuItem[];
  isActive?: boolean;
}

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  isActive?: boolean;
  description?: string;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  currentPath?: string;
  onNavigate?: (path: string) => void;
  className?: string;
  brandTitle?: string;
  brandSubtitle?: string;
  version?: string;
  BrandIcon?: React.FC<{className?: string}>;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export interface SidebarState {
  expandedItems: Set<string>;
  currentLanguage: string;
  currentTheme: 'light' | 'dark';
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
}

export interface SidebarConfig {
  showThemeToggle: boolean;
  showLanguageSelector: boolean;
  collapsible: boolean;
  defaultExpanded?: string[];
}