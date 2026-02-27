import type { ReactNode } from 'react';
import type { LabelOrMultiLanguage } from '../../../../types/language.types';

export type LoadingState = 'loading' | 'completed';

export type LoadingOverlay = 'transparent' | 'light' | 'dark' | 'none';

export type LoadingCoverage = 'component' | 'fullscreen';

export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type LoadingRenderType = 'self' | 'component';

export interface LoadingProps {
  state?: LoadingState;
  overlay?: LoadingOverlay;
  coverage?: LoadingCoverage;
  size?: LoadingSize;
  renderType?: LoadingRenderType;
  render?: ReactNode;
  labelI18n?: LabelOrMultiLanguage;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface LoadingContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
