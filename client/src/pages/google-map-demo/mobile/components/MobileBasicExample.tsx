import { useState } from 'react';
import { GoogleMap } from '../../../../lib/ui-library/components/GoogleMap';
import type { MapMarker, MapCenter } from '../../../../lib/ui-library/components/GoogleMap/shared/types';
import { GOOGLE_MAP_CONFIG } from '../../../../lib/ui-library/components/GoogleMap/shared/environment';
import { Trash2, MapPin, Plus } from 'lucide-react';
import styles from '../css/GoogleMapDemo.mobile.module.css';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

export function MobileBasicExample() {
  const [apiKey] = useState(GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY);
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'Ciudad de México' },
    { id: '2', position: { lat: 19.4284, lng: -99.1276 }, title: 'Zócalo' },
  ]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const handleMapClick = (position: MapCenter) => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      position,
      title: `Marcador ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  const removeMarker = (markerId: string) => {
    setMarkers(markers.filter(m => m.id !== markerId));
    if (selectedMarker?.id === markerId) setSelectedMarker(null);
  };

  const addRandomMarker = () => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      position: {
        lat: DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.05,
        lng: DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.05,
      },
      title: `Aleatorio ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className={styles.section} data-testid="mobile-basic-example">
      <h2 className={styles.sectionTitle}>Markers básicos</h2>
      <p className={styles.sectionDescription}>
        Toca el mapa para agregar marcadores. En mobile se usa <code>gestureHandling: greedy</code> y se ocultan los controles de Street View y tipo de mapa.
      </p>

      <div className={styles.mapWrapper}>
        {apiKey ? (
          <GoogleMap
            apiKey={apiKey}
            center={DEFAULT_CENTER}
            zoom={13}
            markers={markers}
            layout={{ widthMode: 'full', heightMode: 'fixed', height: 300 }}
            onMapClick={handleMapClick}
            onMarkerClick={(m) => setSelectedMarker(m)}
            onMarkerDragEnd={(marker, newPos) => {
              setMarkers(markers.map(m => m.id === marker.id ? { ...m, position: newPos } : m));
            }}
          />
        ) : (
          <div className={styles.placeholder}>
            <div className={styles.placeholderContent}>
              <MapPin style={{ width: 40, height: 40, opacity: 0.5, margin: '0 auto 8px' }} />
              <p>Configura VITE_GOOGLE_MAPS_API_KEY</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <button onClick={addRandomMarker} className={`${styles.controlBtn} ${styles.controlBtnPrimary}`} data-testid="button-mobile-add-marker">
          <Plus style={{ width: 14, height: 14 }} /> Agregar
        </button>
        <button onClick={() => { setMarkers([]); setSelectedMarker(null); }} className={`${styles.controlBtn} ${styles.controlBtnDanger}`} data-testid="button-mobile-clear-markers">
          <Trash2 style={{ width: 14, height: 14 }} /> Limpiar
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span>Marcadores ({markers.length})</span>
        </div>
        {markers.length === 0 ? (
          <p className={styles.emptyState}>No hay marcadores</p>
        ) : (
          markers.map((marker) => (
            <div
              key={marker.id}
              className={`${styles.markerItem} ${selectedMarker?.id === marker.id ? styles.markerItemActive : ''}`}
              data-testid={`mobile-marker-item-${marker.id}`}
            >
              <div className={styles.markerInfo}>
                <MapPin style={{ width: 14, height: 14, color: '#ef4444', flexShrink: 0 }} />
                <div>
                  <div className={styles.markerTitle}>{marker.title}</div>
                  <div className={styles.markerCoords}>
                    {marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}
                  </div>
                </div>
              </div>
              <button onClick={() => removeMarker(marker.id)} className={styles.iconBtn} data-testid={`button-mobile-remove-${marker.id}`}>
                <Trash2 style={{ width: 14, height: 14 }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
