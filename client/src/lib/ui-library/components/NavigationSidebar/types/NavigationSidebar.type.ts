import type { ReactNode } from 'react';
import type { MultiLanguageLabel } from '../../../types/language.types';

export interface NavigationSubItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  component?: ReactNode;
  i18n?: MultiLanguageLabel;
}

export interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  isActive?: boolean;
  children?: NavigationSubItem[];
  component?: ReactNode;
  i18n?: MultiLanguageLabel;
}

export interface NavigationSidebarProps {
  items: NavigationItem[];
  headerIcon?: ReactNode;
  headerContent?: ReactNode;
  currentPath?: string;
  defaultCollapsed?: boolean;
  showThemeToggle?: boolean;
  showLanguageSelector?: boolean;
  availableLanguages?: string[];
  currentLanguage?: string;
  currentTheme?: 'light' | 'dark';
  onNavigate?: (path: string) => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
  onLanguageChange?: (language: string) => void;
  onCollapseChange?: (collapsed: boolean) => void;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  className?: string;
  footerContent?: ReactNode;
  collapsedWidth?: number;
  expandedWidth?: number;
}

export interface NavigationSidebarContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}

export interface UseNavigationSidebarReturn {
  processedItems: NavigationItem[];
  expandedItems: Set<string>;
  isCollapsed: boolean;
  isMobileMenuOpen: boolean;
  currentTheme: 'light' | 'dark';
  currentLanguage: string;
  currentPath: string;
  toggleItemExpansion: (id: string) => void;
  handleNavigation: (path: string) => void;
  handleThemeToggle: () => void;
  handleLanguageChange: (language: string) => void;
  handleToggleCollapse: () => void;
  handleToggleMobileMenu: () => void;
}

export interface NavigationSidebarController {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  currentTheme: 'light' | 'dark';
  setCurrentTheme: (theme: 'light' | 'dark') => void;
  currentLanguage: string;
  setCurrentLanguage: (language: string) => void;
}
