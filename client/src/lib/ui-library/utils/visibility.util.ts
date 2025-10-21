import type { VisibilityConfig, Device, Orientation, BreakpointRule } from '../types/shared.types';

export const detectDevice = (w: number): Device =>
  w <= 640 ? 'mobile' : w <= 1024 ? 'tablet' : 'desktop';

export const isVisibleByConfig = (
  cfg: VisibilityConfig | undefined,
  width: number,
  device: Device,
  orientation: Orientation
): boolean => {
  if (!cfg) return true;
  const { allowedDevices, allowedOrientations, breakpoints, defaultVisibility = 'visible' } = cfg;

  if (allowedDevices?.length && !allowedDevices.includes(device)) return false;
  if (allowedOrientations?.length && !allowedOrientations.includes(orientation)) return false;
  if (!breakpoints?.length) return defaultVisibility !== 'hidden';

  const rule = breakpoints.find((b: BreakpointRule) => width >= b.minWidth && width <= b.maxWidth);
  return (rule?.visibility ?? defaultVisibility) !== 'hidden';
};