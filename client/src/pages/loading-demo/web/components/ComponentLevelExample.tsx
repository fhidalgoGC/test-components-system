import { useState } from 'react';
import { Loading } from '@/lib/ui-library/components/Loading';
import type { LoadingOverlay, LoadingSize } from '@/lib/ui-library/components/Loading';
import styles from '../css/LoadingDemo.module.css';

export function ComponentLevelExample() {
  const [overlay, setOverlay] = useState<LoadingOverlay>('transparent');
  const [size, setSize] = useState<LoadingSize>('md');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-component-title">Loading a nivel de componente</h2>
      <p className={styles.sectionDescription}>
        El loading cubre solo el contenedor padre (requiere <code>position: relative</code>).
      </p>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Overlay</label>
          <select
            value={overlay}
            onChange={(e) => setOverlay(e.target.value as LoadingOverlay)}
            className={styles.controlSelect}
            data-testid="select-overlay"
          >
            <option value="transparent">transparent</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
            <option value="none">none</option>
          </select>
        </div>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as LoadingSize)}
            className={styles.controlSelect}
            data-testid="select-size"
          >
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </div>
        <button
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 3000);
          }}
          className={`${styles.btn} ${styles.btnPrimary}`}
          data-testid="button-toggle-component-loading"
        >
          Mostrar Loading (3s)
        </button>
      </div>

      <div className={styles.demoBox}>
        <p className={styles.demoBoxText}>Contenido del componente</p>
        <p className={styles.demoBoxSubtext}>El loading cubre solo esta area</p>
        {isLoading && (
          <Loading
            state="loading"
            overlay={overlay}
            coverage="component"
            size={size}
            label="Cargando datos..."
          />
        )}
      </div>
    </div>
  );
}
