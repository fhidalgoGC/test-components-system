import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import type { MapMarker, MapCenter } from '@/lib/ui-library/components/GoogleMap/shared/types';
import { GOOGLE_MAP_CONFIG } from '@/lib/ui-library/components/GoogleMap/shared/environment';
import { Trash2, MapPin, Plus } from 'lucide-react';
import styles from '../css/GoogleMapDemo.module.css';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

export function BasicExample() {
  const [apiKey] = useState(GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY);
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'Ciudad de México' },
    { id: '2', position: { lat: 19.4284, lng: -99.1276 }, title: 'Zócalo' },
  ]);
  const [center] = useState<MapCenter>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(13);
  const [showZoomControl, setShowZoomControl] = useState(true);
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
        lat: center.lat + (Math.random() - 0.5) * 0.05,
        lng: center.lng + (Math.random() - 0.5) * 0.05,
      },
      title: `Aleatorio ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Markers básicos</h2>
      <p className={styles.sectionDescription}>
        Mapa con marcadores controlados externamente usando la prop <code>markers</code>. 
        Haz clic en el mapa para agregar marcadores.
      </p>

      <div className={styles.grid2col}>
        <div>
          <div className={styles.mapContainer}>
            {apiKey ? (
              <GoogleMap
                apiKey={apiKey}
                center={center}
                zoom={zoom}
                markers={markers}
                layout={{ widthMode: 'full', heightMode: 'fixed', height: 400 }}
                showZoomControl={showZoomControl}
                showMapTypeControl={true}
                onMapClick={handleMapClick}
                onMarkerClick={(m) => setSelectedMarker(m)}
                onMarkerDragEnd={(marker, newPos) => {
                  setMarkers(markers.map(m => m.id === marker.id ? { ...m, position: newPos } : m));
                }}
              />
            ) : (
              <div className={styles.placeholder}>
                <div className={styles.placeholderContent}>
                  <MapPin style={{ width: 48, height: 48, opacity: 0.5, margin: '0 auto 8px' }} />
                  <p>Configura VITE_GOOGLE_MAPS_API_KEY para ver el mapa</p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.controlsGrid}>
            <div>
              <label className={styles.controlLabel}>Zoom</label>
              <input
                type="number"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                min={1}
                max={20}
                className={styles.controlInput}
                data-testid="input-zoom"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <label className={styles.controlLabel}>
                <input
                  type="checkbox"
                  checked={showZoomControl}
                  onChange={(e) => setShowZoomControl(e.target.checked)}
                  data-testid="input-zoom-control"
                />
                Zoom Control
              </label>
            </div>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span className={styles.sidebarTitle}>Marcadores ({markers.length})</span>
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={addRandomMarker} className={styles.iconBtn} title="Agregar" data-testid="button-add-marker">
                  <Plus style={{ width: 16, height: 16 }} />
                </button>
                <button onClick={() => { setMarkers([]); setSelectedMarker(null); }} className={styles.iconBtn} title="Limpiar" data-testid="button-clear-markers">
                  <Trash2 style={{ width: 16, height: 16 }} />
                </button>
              </div>
            </div>

            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {markers.length === 0 ? (
                <p className={styles.emptyState}>No hay marcadores</p>
              ) : (
                markers.map((marker) => (
                  <div
                    key={marker.id}
                    className={`${styles.markerItem} ${selectedMarker?.id === marker.id ? styles.markerItemActive : ''}`}
                    data-testid={`marker-item-${marker.id}`}
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
                    <button onClick={() => removeMarker(marker.id)} className={styles.iconBtn} data-testid={`button-remove-${marker.id}`}>
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
