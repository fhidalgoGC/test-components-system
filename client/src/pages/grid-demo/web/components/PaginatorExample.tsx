import { useState, useCallback, useMemo } from 'react';
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
import { generateProducts, ProductCard } from './GridDemo.data';
import type { Product } from './GridDemo.data';
import styles from '../css/GridDemo.module.css';

const TOTAL_ITEMS = 60;
const PAGE_SIZE = 12;
const TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

const allProducts = generateProducts(0, TOTAL_ITEMS);

function simulateApiFetch(page: number): Promise<Product[]> {
  return new Promise((resolve) => {
    const start = (page - 1) * PAGE_SIZE;
    const items = allProducts.slice(start, start + PAGE_SIZE);
    setTimeout(() => resolve(items), 800);
  });
}

export function PaginatorExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(() => allProducts.slice(0, PAGE_SIZE));
  const [minCols, setMinCols] = useState(1);
  const [maxCols, setMaxCols] = useState(4);
  const controller = useGridController();

  const goToPage = useCallback(async (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;

    controller.setState('loading');
    setCurrentPage(page);

    const data = await simulateApiFetch(page);
    setProducts(data);
    controller.setState('idle');
  }, [controller]);

  const pages = useMemo(() => {
    const result: (number | '...')[] = [];
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      if (i === 1 || i === TOTAL_PAGES || Math.abs(i - currentPage) <= 1) {
        result.push(i);
      } else if (result[result.length - 1] !== '...') {
        result.push('...');
      }
    }
    return result;
  }, [currentPage]);

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle} data-testid="text-paginator-title">Grid con Paginador</div>
      <div className={styles.sectionDescription}>
        Paginador externo que controla el Grid. Al cambiar de página: state → loading (0.8s simulando API) → carga data → state → idle.
      </div>

      <div className={styles.controls}>
        <label className={styles.controlLabel} data-testid="label-pag-min-cols">
          minColumns:
          <select
            className={styles.controlSelect}
            value={minCols}
            onChange={(e) => setMinCols(Number(e.target.value))}
            data-testid="select-pag-min-cols"
          >
            {[1, 2, 3, 4].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>

        <label className={styles.controlLabel} data-testid="label-pag-max-cols">
          maxColumns:
          <select
            className={styles.controlSelect}
            value={maxCols}
            onChange={(e) => setMaxCols(Number(e.target.value))}
            data-testid="select-pag-max-cols"
          >
            {[1, 2, 3, 4, 5, 6].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
      </div>

      <div className={styles.info}>
        <span className={styles.infoBadge} data-testid="text-pag-state">State: {controller.getState()}</span>
        <span className={styles.infoBadge} data-testid="text-pag-page">Página: {currentPage} / {TOTAL_PAGES}</span>
        <span className={styles.infoBadge} data-testid="text-pag-total">Total: {TOTAL_ITEMS} items</span>
      </div>

      <div className={styles.gridContainer}>
        <Grid<Product>
          id="paginator-grid"
          data={products}
          controller={controller}
          layout={{ widthMode: 'full', heightMode: 'fixed', height: 480 }}
          grid={{ minColumns: minCols, maxColumns: maxCols, minCardWidth: 220, rowGap: 16, columnGap: 16 }}
          scroll={{ enabled: false }}
          statesComponents={{
            loading: { renderType: 'self', position: 'over' },
          }}
          item={{
            renderType: 'component',
            render: (product) => <ProductCard product={product} />,
          }}
        />
      </div>

      <div className={styles.paginatorBar} data-testid="paginator-bar">
        <button
          className={styles.pagBtn}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          data-testid="button-pag-prev"
        >
          ← Anterior
        </button>

        <div className={styles.pagPages}>
          {pages.map((p, i) =>
            p === '...' ? (
              <span key={`ellipsis-${i}`} className={styles.pagEllipsis}>...</span>
            ) : (
              <button
                key={p}
                className={`${styles.pagPageBtn} ${p === currentPage ? styles.pagPageActive : ''}`}
                onClick={() => goToPage(p)}
                data-testid={`button-pag-page-${p}`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          className={styles.pagBtn}
          disabled={currentPage === TOTAL_PAGES}
          onClick={() => goToPage(currentPage + 1)}
          data-testid="button-pag-next"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
