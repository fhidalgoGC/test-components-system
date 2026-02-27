import type { LoadingSize, LoadingOverlay } from '../../../web/types/Loading.type';
import type { LabelOrMultiLanguage } from '../../../../../types/language.types';

export interface SelfSpinnerProps {
  size?: LoadingSize;
  labelI18n?: LabelOrMultiLanguage;
  overlay?: LoadingOverlay;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface SelfSpinnerContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
