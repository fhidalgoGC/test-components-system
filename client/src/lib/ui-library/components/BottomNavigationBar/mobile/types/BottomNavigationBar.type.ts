import type { MultiLanguageLabel } from '../../../../types';

export interface NavItem {
  id: string;
  label: MultiLanguageLabel;
  icon?: React.ReactNode;
  isDisabled?: boolean;
  metadata?: any;
}

export interface BottomNavigationBarProps {
  items: NavItem[];
  selectedId?: string;
  defaultSelectedId?: string;
  triggerOnMount?: boolean;
  onSelect?: (item: NavItem) => void;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface BottomNavigationBarContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
  items: NavItem[];
  selectedId: string | null;
  onItemClick: (item: NavItem) => void;
}
