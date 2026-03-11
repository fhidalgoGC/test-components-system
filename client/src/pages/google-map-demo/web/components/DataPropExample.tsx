import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import type { MapDataItem, MapCenter } from '@/lib/ui-library/components/GoogleMap/shared/types';
import styles from '../css/GoogleMapDemo.module.css';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

const DEMO_DATA: MapDataItem[] = [
  {
    id: '1',
    position: { lat: 19.4326, lng: -99.1332 },
    labelI18n: { en: 'Mexico City', es: 'Ciudad de México', default: 'Mexico City' },
    metadata: { color: '#FF0000', draggable: false },
  },
  {
    id: '2',
    position: { lat: 19.4284, lng: -99.1276 },
    labelI18n: { en: 'Zócalo Square', es: 'Plaza del Zócalo', default: 'Zócalo' },
    metadata: { color: '#0066FF', draggable: true },
  },
  {
    id: '3',
    position: { lat: 19.4352, lng: -99.1412 },
    labelI18n: { en: 'Angel of Independence', es: 'Ángel de la Independencia', default: 'Angel' },
    metadata: { color: '#00AA00' },
  },
];

export function DataPropExample() {
  const [data] = useState<MapDataItem[]>(DEMO_DATA);
  const [clickedItem, setClickedItem] = useState<MapDataItem | null>(null);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Prop data con labelI18n y metadata</h2>
      <p className={styles.sectionDescription}>
        Usa la prop <code>data</code> en vez de <code>markers</code>. Cada item tiene <code>labelI18n</code> (multiidioma)
        y <code>metadata</code> (color, configuraciones). El <code>onDataItemClick</code> devuelve el item completo.
      </p>

      <div className={styles.grid2col}>
        <div className={styles.mapContainer}>
          <GoogleMap
            center={DEFAULT_CENTER}
            zoom={14}
            data={data}
            layout={{ widthMode: 'full', heightMode: 'fixed', height: 400 }}
            showZoomControl={true}
            showMapTypeControl={true}
            onDataItemClick={(item) => setClickedItem(item)}
          />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Data Items ({data.length})</span>
            <div style={{ marginTop: 8 }}>
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.dataItem} ${clickedItem?.id === item.id ? styles.dataItemActive : ''}`}
                  data-testid={`data-item-${item.id}`}
                >
                  <div className={styles.dataItemHeader}>
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: item.metadata?.color || '#999' }}
                    />
                    <span className={styles.markerTitle}>{item.labelI18n?.es || item.labelI18n?.default}</span>
                  </div>
                  <div className={styles.dataItemMeta}>
                    {item.position.lat.toFixed(4)}, {item.position.lng.toFixed(4)}
                  </div>
                  {item.metadata && (
                    <div className={styles.dataItemMeta}>
                      metadata: {JSON.stringify(item.metadata)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {clickedItem && (
            <div className={styles.infoBox + ' ' + styles.infoBoxGreen}>
              <strong>onDataItemClick</strong>
              <pre style={{ fontSize: 11, marginTop: 4, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(clickedItem, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
