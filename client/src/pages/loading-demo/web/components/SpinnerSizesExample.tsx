import { Loading } from '@/lib/ui-library/components/Loading';
import type { LoadingSize } from '@/lib/ui-library/components/Loading';
import styles from '../css/LoadingDemo.module.css';

const sizes: LoadingSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function SpinnerSizesExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-sizes-title">Tamaños del spinner</h2>
      <p className={styles.sectionDescription}>Los 5 tamaños disponibles del spinner, de extra-small a extra-large.</p>
      <div className={styles.sizesRow}>
        {sizes.map((s) => (
          <div key={s} className={styles.sizeItem}>
            <Loading state="loading" overlay="none" coverage="component" size={s} />
            <span className={styles.sizeLabel} data-testid={`text-size-label-${s}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
