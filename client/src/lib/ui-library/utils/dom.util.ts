import type { Orientation } from '../../../types/shared.types';

export const detectWidth = (def = 1024) =>
  typeof window === 'undefined' ? def : (window.innerWidth || def);

export const detectOrientation = (): Orientation => {
  if (typeof window === 'undefined') return 'landscape';
  const { innerWidth: w, innerHeight: h } = window;
  return h >= w ? 'portrait' : 'landscape';
};