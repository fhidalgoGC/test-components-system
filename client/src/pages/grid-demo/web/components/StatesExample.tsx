import { useState, useCallback } from 'react';
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
import { generateProducts, ProductCard } from './GridDemo.data';
import type { Product } from './GridDemo.data';
import styles from '../css/GridDemo.module.css';

export function StatesExample() {
  const controller = useGridController();
  const [products, setProducts] = useState<Product[]>([]);

  const handleLoad = useCallback(() => {
    controller.setState('loading');
    setTimeout(() => {
      setProducts(generateProducts(0, 6));
      controller.setState('idle');
    }, 1500);
  }, [controller]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle} data-testid="text-states-title">Estados Visuales</div>
      <div className={styles.sectionDescription}>
        Prueba los diferentes estados del Grid: idle, loading, empty, error.
      </div>

      <div className={styles.controls}>
        <button className={`${styles.controlBtn} ${styles.controlBtnPrimary}`} onClick={handleLoad} data-testid="button-load-data">
          Load Data
        </button>
        <button className={styles.controlBtn} onClick={() => controller.setState('idle')} data-testid="button-idle">
          Idle
        </button>
        <button className={styles.controlBtn} onClick={() => controller.setState('loading')} data-testid="button-loading">
          Loading
        </button>
        <button className={styles.controlBtn} onClick={() => { setProducts([]); controller.setState('empty'); }} data-testid="button-set-empty">
          Empty
        </button>
        <button className={`${styles.controlBtn} ${styles.controlBtnDanger}`} onClick={() => controller.setState('error')} data-testid="button-set-error">
          Error
        </button>
      </div>

      <div className={styles.info}>
        <span className={styles.infoBadge} data-testid="text-current-state">State: {controller.getState()}</span>
        <span className={styles.infoBadge} data-testid="text-data-count">Data: {products.length} items</span>
      </div>

      <div className={styles.gridContainer}>
        <Grid<Product>
          id="states-grid"
          data={products}
          controller={controller}
          layout={{ widthMode: 'full', heightMode: 'fixed', height: 300 }}
          grid={{ minColumns: 1, maxColumns: 3, minCardWidth: 200, rowGap: 12, columnGap: 12 }}
          scroll={{ enabled: false }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
        />
      </div>
    </div>
  );
}
