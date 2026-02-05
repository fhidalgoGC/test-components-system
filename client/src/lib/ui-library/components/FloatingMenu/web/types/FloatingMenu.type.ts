export interface FloatingMenuProps {
  children?: React.ReactNode;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface FloatingMenuContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
