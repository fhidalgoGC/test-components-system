import type { ReactNode } from 'react';

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
  label?: string;
  className?: string;
}
