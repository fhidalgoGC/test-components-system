import { useState, useEffect } from 'react';

export type Platform = 'web' | 'mobile';

export const usePlatform = (): Platform => {
  const [platform, setPlatform] = useState<Platform>('web');

  useEffect(() => {
    const checkPlatform = () => {
      const isMobile = window.innerWidth < 768;
      setPlatform(isMobile ? 'mobile' : 'web');
    };

    checkPlatform();
    window.addEventListener('resize', checkPlatform);
    
    return () => window.removeEventListener('resize', checkPlatform);
  }, []);

  return platform;
};
