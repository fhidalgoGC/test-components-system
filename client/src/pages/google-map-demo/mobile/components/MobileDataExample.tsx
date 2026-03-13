import { useState } from 'react';
import { GoogleMap } from '../../../../lib/ui-library/components/GoogleMap';
import type { MapDataItem, MapCenter } from '../../../../lib/ui-library/components/GoogleMap/shared/types';
import styles from '../css/GoogleMapDemo.mobile.module.css';

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

export function MobileDataExample() {
  const [clickedItem, setClickedItem] = useState<MapDataItem | null>(null);

  return (
    <div className={styles.section} data-testid="mobile-data-example">
      <h2 className={styles.sectionTitle}>Prop data con labelI18n</h2>
      <p className={styles.sectionDescription}>
        Usa <code>data</code> en vez de <code>markers</code>. Cada item tiene <code>labelI18n</code> (multiidioma) y <code>metadata</code>.
      </p>

      <div className={styles.mapWrapper}>
        <GoogleMap
          center={DEFAULT_CENTER}
          zoom={14}
          data={DEMO_DATA}
          layout={{ widthMode: 'full', heightMode: 'fixed', height: 300 }}
          onDataItemClick={(item) => setClickedItem(item)}
        />
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <span>Data Items ({DEMO_DATA.length})</span>
        </div>
        {DEMO_DATA.map((item) => (
          <div
            key={item.id}
            className={`${styles.markerItem} ${clickedItem?.id === item.id ? styles.markerItemActive : ''}`}
            data-testid={`mobile-data-item-${item.id}`}
          >
            <div className={styles.markerInfo}>
              <span className={styles.colorDot} style={{ backgroundColor: item.metadata?.color || '#999' }} />
              <div>
                <div className={styles.markerTitle}>{item.labelI18n?.es || item.labelI18n?.default}</div>
                <div className={styles.dataItemMeta}>
                  {item.position.lat.toFixed(4)}, {item.position.lng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clickedItem && (
        <div className={`${styles.infoBox} ${styles.infoBoxGreen}`}>
          <strong>onDataItemClick:</strong>
          <pre style={{ fontSize: 11, marginTop: 4, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {JSON.stringify(clickedItem, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
