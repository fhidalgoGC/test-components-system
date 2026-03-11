import { useIsMobile } from '../../hooks';
import { GoogleMap as GoogleMapWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { GoogleMapProps } from './shared/types';

export const GoogleMap = (props: GoogleMapProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="GoogleMap" />;
  }

  return <GoogleMapWeb {...props} />;
};

export type { GoogleMapProps, MapMarker, MapCenter, MapDataItem, MapMarkerMetadata, GoogleMapLayout, LayoutAlign, WidthMode, HeightMode } from './shared/types';
