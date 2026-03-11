import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import type { GoogleMapProps, MapSizeValue } from '../types';
import { useGoogleMap } from '../hooks';
import { useI18nMerge } from '../hooks/useI18nMerge.hook';
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
  } = props;

  const resolvedApiKey = apiKey || GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY;

  const { t } = useI18nMerge(langOverride, { order: i18nOrder });

  const {
    center,
    zoom,
    markers,
    mapOptions,
    handleMapLoad,
    handleMapClick,
    handleMarkerClick,
    handleMarkerDragEnd,
  } = useGoogleMap(props);

  const containerStyle = {
    width: getSizeValue(width, '100%'),
    height: getSizeValue(height, '400px'),
  };

  return (
    <div className={`${styles.container} ${className || ''}`} data-testid="googlemap">
      <LoadScript 
        googleMapsApiKey={resolvedApiKey}
        loadingElement={
          <div className={styles.loading} style={containerStyle} data-testid="googlemap-loading">
            {t('loading')}
          </div>
        }
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={handleMapLoad}
          onClick={handleMapClick}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.title}
              icon={marker.icon}
              draggable={marker.draggable}
              onClick={() => handleMarkerClick(marker)}
              onDragEnd={(e) => handleMarkerDragEnd(marker, e)}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
