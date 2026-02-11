import { useState } from 'react';
import { Grid } from '@/lib/ui-library/components/Grid';
import { generateProducts, ProductCard } from './GridDemo.data';
import type { Product } from './GridDemo.data';
import styles from '../css/GridDemo.module.css';

export function BasicGridExample() {
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
