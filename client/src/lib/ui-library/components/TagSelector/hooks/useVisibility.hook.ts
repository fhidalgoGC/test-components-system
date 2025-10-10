import { useEffect, useMemo, useState } from 'react';
import type { VisibilityConfig, Device, Orientation, VisibilitySetting, BreakpointRule } from '../../../types/shared.types';
import { useResponsive } from '../../../hooks/use-mobile';

// Helper function to map deviceType from useResponsive to Device type
const mapDeviceType = (deviceType: 'mobile' | 'tablet' | 'desktop'): Device => {
  return deviceType as Device;
};

// Helper function to check visibility based on config
const isVisibleByConfig = (
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

export function useVisibility(configFromProps?: VisibilityConfig) {
  const responsive = useResponsive();
  const [cfg, setCfg] = useState<VisibilityConfig | undefined>(configFromProps);
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;

  useEffect(() => {
    if (configFromProps) { setCfg(configFromProps); return; }
    setCfg(undefined); // For now, no dynamic loading from index.visibility
  }, [configFromProps]);

  const device = mapDeviceType(responsive.deviceType);
  const orientation = responsive.orientation;
  const isVisible = useMemo(() => isVisibleByConfig(cfg, width, device, orientation), [cfg, width, device, orientation]);

  return { cfg, width, device, orientation, isVisible };
}
