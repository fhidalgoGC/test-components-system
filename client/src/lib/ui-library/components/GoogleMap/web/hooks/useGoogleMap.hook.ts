import { useCallback, useRef, useMemo } from 'react';
import type { GoogleMapProps, MapCenter, MapMarker, MapDataItem } from '../types';

export const useGoogleMap = (props: GoogleMapProps, resolvedLang?: string) => {
  const {
    center,
    zoom = 12,
    markers = [],
    data,
    onMapClick,
    onMarkerClick,
    onMarkerDragEnd,
    onDataItemClick,
    showZoomControl = true,
    showStreetViewControl = false,
    showMapTypeControl = false,
    showFullscreenControl = false,
  } = props;

  const dataItemsRef = useRef<Map<string, MapDataItem>>(new Map());

  const resolvedMarkers = useMemo<MapMarker[]>(() => {
    if (data !== undefined) {
      const itemsMap = new Map<string, MapDataItem>();
      const converted = data.map((item): MapMarker => {
        itemsMap.set(item.id, item);

        let title: string | undefined;
        if (item.labelI18n) {
          const lang = resolvedLang || 'en';
          title = item.labelI18n[lang] || item.labelI18n.default || '';
        }

        return {
          id: item.id,
          position: item.position,
          title,
          icon: item.metadata?.icon,
          draggable: item.metadata?.draggable ?? false,
        };
      });
      dataItemsRef.current = itemsMap;
      return converted;
    }
    dataItemsRef.current = new Map();
    return markers;
  }, [data, markers, resolvedLang]);

  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng && onMapClick) {
      const position: MapCenter = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      onMapClick(position);
    }
  }, [onMapClick]);

  const handleMarkerClick = useCallback((marker: MapMarker) => {
    if (onDataItemClick && dataItemsRef.current.has(marker.id)) {
      onDataItemClick(dataItemsRef.current.get(marker.id)!);
    }
    onMarkerClick?.(marker);
  }, [onMarkerClick, onDataItemClick]);

  const handleMarkerDragEnd = useCallback((marker: MapMarker, e: google.maps.MapMouseEvent) => {
    if (e.latLng && onMarkerDragEnd) {
      const newPosition: MapCenter = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      onMarkerDragEnd(marker, newPosition);
    }
  }, [onMarkerDragEnd]);

  const mapOptions = {
    zoomControl: showZoomControl,
    streetViewControl: showStreetViewControl,
    mapTypeControl: showMapTypeControl,
    fullscreenControl: showFullscreenControl,
  };

  return {
    center,
    zoom,
    markers: resolvedMarkers,
    mapOptions,
    handleMapClick,
    handleMarkerClick,
    handleMarkerDragEnd,
  };
};
