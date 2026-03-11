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

export type WidthMode = 'full' | 'auto' | 'fixed' | 'percentage';
export type HeightMode = 'full' | 'auto' | 'fixed' | 'percentage';

export interface LayoutAlign {
  vertical?: 'top' | 'middle' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

export interface GoogleMapLayout {
  widthMode?: WidthMode;
  width?: number;
  minWidth?: number;
  heightMode?: HeightMode;
  height?: number | 'auto';
  minHeight?: number;
  align?: LayoutAlign;
}

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
  layout?: GoogleMapLayout;
  mapId?: string;
  showZoomControl?: boolean;
  showStreetViewControl?: boolean;
  showMapTypeControl?: boolean;
  showFullscreenControl?: boolean;
  onMapClick?: (position: MapCenter) => void;
  onMarkerClick?: (marker: MapMarker) => void;
  onMarkerDragEnd?: (marker: MapMarker, newPosition: MapCenter) => void;
  onDataItemClick?: (item: MapDataItem) => void;
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}

export interface GoogleMapContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}
