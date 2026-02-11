import { useState, useCallback } from 'react';
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
import type { GridCapacityInfo } from '@/lib/ui-library/components/Grid/shared';
import styles from '../css/GridDemo.module.css';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  icon: string;
  color: string;
}

const CATEGORIES = ['Electronics', 'Audio', 'Accessories', 'Office', 'Gaming', 'Photography'];
const ICONS = ['💻', '🎧', '⌨️', '🖥️', '🎮', '📷', '🖱️', '📱', '🔌', '💡'];
const COLORS = ['#dbeafe', '#fce7f3', '#d1fae5', '#fef3c7', '#ede9fe', '#ffedd5'];

function generateProducts(startIndex: number, count: number): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = startIndex + i;
    return {
      id: `product-${idx}`,
      name: `Product ${idx + 1}`,
      category: CATEGORIES[idx % CATEGORIES.length],
      price: Math.floor(Math.random() * 900) + 50,
      rating: Math.round((3 + Math.random() * 2) * 10) / 10,
      icon: ICONS[idx % ICONS.length],
      color: COLORS[idx % COLORS.length],
    };
  });
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card} data-testid={`card-product-${product.id}`}>
      <div className={styles.cardIcon} style={{ background: product.color }}>
        {product.icon}
      </div>
      <div className={styles.cardTitle}>{product.name}</div>
      <div className={styles.cardCategory}>{product.category}</div>
      <div className={styles.cardBottom}>
        <div className={styles.cardPrice}>${product.price}</div>
        <div className={styles.cardRating}>{'★'.repeat(Math.round(product.rating))} {product.rating}</div>
      </div>
    </div>
  );
}

function BasicGridDemo() {
  const [products] = useState(() => generateProducts(0, 8));

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle} data-testid="text-basic-title">Grid Estático</div>
      <div className={styles.sectionDescription}>
        Grid básico sin controller. Calcula columnas automáticamente según el ancho disponible.
      </div>
      <div className={styles.gridContainer}>
        <Grid<Product>
          id="basic-grid"
          data={products}
          layout={{ widthMode: 'full' }}
          grid={{ minColumns: 1, maxColumns: 4, minCardWidth: 220, rowGap: 16, columnGap: 16 }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
          scroll={{ enabled: false }}
        />
      </div>
    </div>
  );
}

function InfiniteScrollGridDemo() {
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

function StatesDemo() {
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

export function GridDemoWebView() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title} data-testid="text-page-title">Grid Component</h1>
      <p className={styles.subtitle}>
        Grid Engine declarativo y agnóstico. Solo organiza layout, calcula capacidad y detecta final de scroll.
      </p>

      <BasicGridDemo />
      <InfiniteScrollGridDemo />
      <StatesDemo />
    </div>
  );
}
