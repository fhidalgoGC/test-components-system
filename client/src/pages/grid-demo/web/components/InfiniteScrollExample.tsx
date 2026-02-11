import { useState, useCallback } from 'react';
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
import type { GridCapacityInfo } from '@/lib/ui-library/components/Grid/shared';
import { generateProducts, ProductCard } from './GridDemo.data';
import type { Product } from './GridDemo.data';
import styles from '../css/GridDemo.module.css';

export function InfiniteScrollExample() {
  const [products, setProducts] = useState(() => generateProducts(0, 12));
  const [capacity, setCapacity] = useState<GridCapacityInfo | null>(null);
  const [loadCount, setLoadCount] = useState(0);
  const controller = useGridController();

  const handleReachEnd = useCallback(() => {
    controller.setState('loading');
    setLoadCount((c) => c + 1);

    setTimeout(() => {
      const newProducts = generateProducts(products.length, 8);
      setProducts((prev) => [...prev, ...newProducts]);
      controller.setState('idle');
    }, 1200);
  }, [products.length, controller]);

  const handleReset = useCallback(() => {
    setProducts(generateProducts(0, 12));
    setLoadCount(0);
    controller.setState('idle');
  }, [controller]);

  const handleSetEmpty = useCallback(() => {
    setProducts([]);
    controller.setState('empty');
  }, [controller]);

  const handleSetError = useCallback(() => {
    controller.setState('error');
  }, [controller]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle} data-testid="text-infinite-title">Infinite Scroll Grid</div>
      <div className={styles.sectionDescription}>
        Grid con scroll infinito. Al llegar al final dispara onReachEnd, el padre controla la carga.
        onReachEnd solo se dispara cuando state === "idle".
      </div>

      <div className={styles.controls}>
        <button className={`${styles.controlBtn} ${styles.controlBtnPrimary}`} onClick={handleReset} data-testid="button-reset">
          Reset
        </button>
        <button className={styles.controlBtn} onClick={handleSetEmpty} data-testid="button-empty">
          Set Empty
        </button>
        <button className={`${styles.controlBtn} ${styles.controlBtnDanger}`} onClick={handleSetError} data-testid="button-error">
          Set Error
        </button>
      </div>

      <div className={styles.info}>
        <span className={styles.infoBadge} data-testid="text-state">State: {controller.getState()}</span>
        <span className={styles.infoBadge} data-testid="text-items">Items: {products.length}</span>
        <span className={styles.infoBadge} data-testid="text-loads">Loads: {loadCount}</span>
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
