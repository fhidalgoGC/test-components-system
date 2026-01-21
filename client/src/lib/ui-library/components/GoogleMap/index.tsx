import { useIsMobile } from '../../hooks';
import { GoogleMap as GoogleMapWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { GoogleMapProps } from './web/types';

// Mobile version placeholder (uncomment when implemented)
// import { GoogleMap as GoogleMapMobile } from './mobile';

export const GoogleMap = (props: GoogleMapProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Return mobile version when implemented
    // return <GoogleMapMobile {...props} />;
    
    // Fallback: mobile version not implemented
    return <NotImplemented platform="Mobile" componentName="GoogleMap" />;
  }

  return <GoogleMapWeb {...props} />;
};

export type { GoogleMapProps };
