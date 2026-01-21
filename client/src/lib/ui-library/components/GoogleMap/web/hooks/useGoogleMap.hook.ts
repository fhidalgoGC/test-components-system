import { useCallback, useRef } from 'react';
import type { GoogleMapProps, MapCenter, MapMarker } from '../types';

export const useGoogleMap = (props: GoogleMapProps) => {
  const {
    center,
    zoom = 12,
    markers = [],
    onMapClick,
    onMarkerClick,
    onMarkerDragEnd,
    onMapLoad,
    showZoomControl = true,
    showStreetViewControl = false,
    showMapTypeControl = false,
    showFullscreenControl = false,
  } = props;

  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    onMapLoad?.(map);
  }, [onMapLoad]);

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
    onMarkerClick?.(marker);
  }, [onMarkerClick]);

  const handleMarkerDragEnd = useCallback((marker: MapMarker, e: google.maps.MapMouseEvent) => {
    if (e.latLng && onMarkerDragEnd) {
      const newPosition: MapCenter = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      onMarkerDragEnd(marker, newPosition);
    }
  }, [onMarkerDragEnd]);

  const mapOptions: google.maps.MapOptions = {
    zoomControl: showZoomControl,
    streetViewControl: showStreetViewControl,
    mapTypeControl: showMapTypeControl,
    fullscreenControl: showFullscreenControl,
    gestureHandling: 'cooperative',
  };

  return {
    mapRef,
    center,
    zoom,
    markers,
    mapOptions,
    handleMapLoad,
    handleMapClick,
    handleMarkerClick,
    handleMarkerDragEnd,
  };
};
