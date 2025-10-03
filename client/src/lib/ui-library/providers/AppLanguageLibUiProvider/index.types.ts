import type { GenericLanguageProvider } from '../../types/language.types';

export type Lang = 'es' | 'en';

export type LibI18nContextValue = {
  lang: Lang;
  t: (key: string, params?: Record<string, string | number>) => string;
  setLanguage: (next: Lang) => void;
  resolveLabel: (label: { [key: string]: string; default: string }) => string;
  getExternalTranslations: () => Record<string, string>;
  translationPriority: 'component-first' | 'external-first';
};

export type GlobalTranslationPath = {
  lang: string;
  path: string;
};

export type LibI18nProviderProps = {
  /** Si lo pasas, la librería se vuelve controlada por props (o por el padre si existe) */
  language?: Lang;
  /** Callback para cambios de idioma disparados desde la librería */
  onLanguageChange?: (next: Lang) => void;
  /** Proveedor padre inyectado (opcional) - permite conectar con cualquier sistema de idioma */
  parentLanguageProvider?: GenericLanguageProvider;
  /** Array de rutas a archivos JSON de traducciones globales */
  globalTranslationPaths?: GlobalTranslationPath[];
  /** Orden de prioridad: 'component-first' (por defecto) o 'external-first' */
  translationPriority?: 'component-first' | 'external-first';
  children: React.ReactNode;
};
