import { useEffect, useState } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';

export const useResponsive = () => {
  const getDeviceType = (): DeviceType => {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';       // Tailwind 'md'
    if (width < 1024) return 'tablet';      // Tailwind 'lg'
    return 'desktop';
  };

  const getOrientation = (): Orientation =>
    window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';

  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
      setOrientation(getOrientation());
    };

    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return {
    deviceType,
    orientation,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
};

// Backward compatibility: export useIsMobile that returns only boolean
export function useIsMobile() {
  const { isMobile } = useResponsive();
  return isMobile;
}
