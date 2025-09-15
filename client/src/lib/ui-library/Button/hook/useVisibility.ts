import { useEffect, useMemo, useState } from 'react';
import type { VisibilityConfig } from '../types';
import { detectWidth, detectOrientation, detectDevice, isVisibleByConfig } from '../utils';

export function useVisibility(configFromProps?: VisibilityConfig) {
  const [width, setWidth] = useState(detectWidth());
  const [cfg, setCfg] = useState<VisibilityConfig | undefined>(configFromProps);

  useEffect(() => {
    if (configFromProps) { setCfg(configFromProps); return; }
    setCfg(undefined); // For now, no dynamic loading from index.visibility
  }, [configFromProps]);

  useEffect(() => {
    const onResize = () => setWidth(detectWidth());
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }
  }, []);

  const device = detectDevice(width);
  const orientation = detectOrientation();
  const isVisible = useMemo(() => isVisibleByConfig(cfg, width, device, orientation), [cfg, width, device, orientation]);

  return { cfg, width, device, orientation, isVisible };
}
