export interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface CarouselContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
