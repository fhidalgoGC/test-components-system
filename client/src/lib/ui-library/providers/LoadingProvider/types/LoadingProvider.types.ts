import type { ReactNode, RefObject } from 'react';
import type { LoadingOverlay, LoadingSize, LoadingRenderType } from '../../../components/Loading/web/types/Loading.type';
import type { LabelOrMultiLanguage } from '../../../types/language.types';

export interface LoadingConfig {
  overlay?: LoadingOverlay;
  size?: LoadingSize;
  labelI18n?: LabelOrMultiLanguage;
  renderType?: LoadingRenderType;
  render?: ReactNode;
  parentRef?: RefObject<HTMLElement>;
}

export interface LoadingContextValue {
  isLoading: boolean;
  show: (config?: LoadingConfig) => void;
  hide: () => void;
  config: LoadingConfig;
}

export interface LoadingProviderProps {
  children: ReactNode;
  defaultOverlay?: LoadingOverlay;
  defaultSize?: LoadingSize;
  defaultLabelI18n?: LabelOrMultiLanguage;
}
