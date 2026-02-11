import { useState, useCallback, useRef } from 'react';
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
import type { GridCapacityInfo } from '@/lib/ui-library/components/Grid/shared';
import { generateProducts, ProductCard } from './GridDemo.data';
import type { Product } from './GridDemo.data';
import styles from '../css/GridDemo.module.css';

const TOTAL_ITEMS = 100;
const PAGE_SIZE = 20;

function simulateApiFetch(startIndex: number, count: number): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateProducts(startIndex, count));
    }, 500);
  });
}

export function InfiniteScrollExample() {
  const [products, setProducts] = useState<Product[]>(() => generateProducts(0, PAGE_SIZE));
  const [capacity, setCapacity] = useState<GridCapacityInfo | null>(null);
  const [loadCount, setLoadCount] = useState(0);
  const controller = useGridController();
  const loadedRef = useRef(PAGE_SIZE);

  const handleReachEnd = useCallback(async () => {
    if (loadedRef.current >= TOTAL_ITEMS) return;

    controller.setState('loading');
    setLoadCount((c) => c + 1);

    const remaining = TOTAL_ITEMS - loadedRef.current;
    const toLoad = Math.min(PAGE_SIZE, remaining);

    const newProducts = await simulateApiFetch(loadedRef.current, toLoad);
    loadedRef.current += toLoad;

    setProducts((prev) => [...prev, ...newProducts]);
    controller.setState('idle');
  }, [controller]);

  const handleReset = useCallback(() => {
    const initial = generateProducts(0, PAGE_SIZE);
    setProducts(initial);
    loadedRef.current = PAGE_SIZE;
    setLoadCount(0);
    controller.setState('idle');
  }, [controller]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle} data-testid="text-infinite-title">Infinite Scroll Grid</div>
      <div className={styles.sectionDescription}>
        Carga {TOTAL_ITEMS} productos en bloques de {PAGE_SIZE}. Al llegar al final simula una llamada API (0.5s de espera) y muestra el indicador de carga.
      </div>

      <div className={styles.controls}>
        <button className={`${styles.controlBtn} ${styles.controlBtnPrimary}`} onClick={handleReset} data-testid="button-reset">
          Reset
        </button>
      </div>

      <div className={styles.info}>
        <span className={styles.infoBadge} data-testid="text-state">State: {controller.getState()}</span>
        <span className={styles.infoBadge} data-testid="text-items">Items: {products.length} / {TOTAL_ITEMS}</span>
        <span className={styles.infoBadge} data-testid="text-loads">Cargas: {loadCount}</span>
        {capacity && (
          <>
            <span className={styles.infoBadge} data-testid="text-columns">Cols: {capacity.columns}</span>
            <span className={styles.infoBadge} data-testid="text-rows">Rows: {capacity.rows}</span>
          </>
        )}
      </div>

      <div className={styles.gridContainer}>
        <Grid<Product>
          id="infinite-grid"
          data={products}
          controller={controller}
          layout={{ widthMode: 'full', heightMode: 'fixed', height: 500 }}
          grid={{ minColumns: 1, maxColumns: 4, minCardWidth: 220, rowGap: 16, columnGap: 16 }}
          scroll={{ enabled: true, threshold: 50 }}
          callbacks={{
            onReachEnd: handleReachEnd,
            onCapacityChange: setCapacity,
          }}
          statesComponents={{
            loading: { renderType: 'self' },
            empty: { renderType: 'self' },
            error: { renderType: 'self' },
          }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
        />
      </div>
    </div>
  );
}
