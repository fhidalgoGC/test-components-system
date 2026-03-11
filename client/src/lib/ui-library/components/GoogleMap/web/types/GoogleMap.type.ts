import type { MultiLanguageLabel } from '../../../../types/language.types';

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

export interface MapMarkerMetadata {
  color?: string;
  icon?: string;
  draggable?: boolean;
  [key: string]: unknown;
}

export interface MapDataItem<T extends MapMarkerMetadata = MapMarkerMetadata> {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  labelI18n?: MultiLanguageLabel;
  metadata?: T;
}

export interface GoogleMapProps {
  apiKey?: string;
  center: MapCenter;
  zoom?: number;
  data?: MapDataItem[];
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
  onDataItemClick?: (item: MapDataItem) => void;
  onMapLoad?: (map: google.maps.Map) => void;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface GoogleMapContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
