export type LoadingState = 'loading' | 'completed';

export type LoadingOverlay = 'transparent' | 'light' | 'dark' | 'none';

export type LoadingCoverage = 'component' | 'fullscreen';

export type LoadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingProps {
  state?: LoadingState;
  overlay?: LoadingOverlay;
  coverage?: LoadingCoverage;
  size?: LoadingSize;
  label?: string;
  className?: string;
}
