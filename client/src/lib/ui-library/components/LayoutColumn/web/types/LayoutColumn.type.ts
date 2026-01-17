export interface LayoutColumnProps {
  children?: React.ReactNode;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface LayoutColumnContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
