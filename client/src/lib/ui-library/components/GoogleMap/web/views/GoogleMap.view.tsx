import { useContext, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { GoogleMapProps, MapSizeValue } from '../types';
import { useGoogleMap } from '../hooks';
import { useI18nMerge } from '../hooks/useI18nMerge.hook';
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';
import { GOOGLE_MAP_CONFIG } from '../environment';
import styles from '../css/GoogleMap.module.css';

const getSizeValue = (value: MapSizeValue | undefined, defaultValue: string): string => {
  if (value === undefined) return defaultValue;
  if (typeof value === 'number') return `${value}px`;
  return value;
};

export const GoogleMapView = (props: GoogleMapProps) => {
  const {
    apiKey,
    width,
    height,
    className,
    langOverride,
    i18nOrder,
    mapId,
  } = props;

  const configContext = useContext(ConfigContext);
  const resolvedApiKey =
    apiKey
    || configContext?.environment?.GOOGLE_MAP_CONFIG?.GOOGLE_MAPS_API_KEY
    || GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY;

  const { t, lang } = useI18nMerge(langOverride, { order: i18nOrder });

  const {
    center,
    zoom,
    markers,
    mapOptions,
    handleMapClick,
    handleMarkerClick,
    handleMarkerDragEnd,
  } = useGoogleMap(props, lang);

  const containerStyle = {
    width: getSizeValue(width, '100%'),
    height: getSizeValue(height, '400px'),
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    handleMapClick(e);
  }, [handleMapClick]);

  if (!resolvedApiKey) {
    return (
      <div className={`${styles.container} ${className || ''}`} data-testid="googlemap">
        <div className={styles.loading} style={containerStyle} data-testid="googlemap-no-key">
          {t('errorApiKey')}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`} data-testid="googlemap">
      <APIProvider apiKey={resolvedApiKey}>
        <Map
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="cooperative"
          zoomControl={mapOptions.zoomControl}
          streetViewControl={mapOptions.streetViewControl}
          mapTypeControl={mapOptions.mapTypeControl}
          fullscreenControl={mapOptions.fullscreenControl}
          mapId={mapId || 'DEFAULT_MAP_ID'}
          onClick={onMapClick}
        >
          {markers.map((marker) => (
            <AdvancedMarker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              draggable={marker.draggable}
              onClick={() => handleMarkerClick(marker)}
              onDragEnd={(e) => handleMarkerDragEnd(marker, e)}
            >
              <Pin />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};
