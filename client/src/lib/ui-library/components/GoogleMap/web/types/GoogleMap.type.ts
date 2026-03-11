export interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title?: string;
  icon?: string;
  draggable?: boolean;
}

export interface MapCenter {
  lat: number;
  lng: number;
}

export type MapSizeValue = number | string;

export interface GoogleMapProps {
  apiKey?: string;
  center: MapCenter;
  zoom?: number;
  markers?: MapMarker[];
  width?: MapSizeValue;
  height?: MapSizeValue;
  showZoomControl?: boolean;
  showStreetViewControl?: boolean;
  showMapTypeControl?: boolean;
  showFullscreenControl?: boolean;
  onMapClick?: (position: MapCenter) => void;
  onMarkerClick?: (marker: MapMarker) => void;
  onMarkerDragEnd?: (marker: MapMarker, newPosition: MapCenter) => void;
  onMapLoad?: (map: google.maps.Map) => void;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface GoogleMapContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
