import { useLoading } from '@/lib/ui-library/providers';
import styles from '../css/LoadingDemo.module.css';

export function ProviderExample() {
  const { show, hide, isLoading } = useLoading();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-provider-title">Loading con Provider (pantalla completa)</h2>
      <p className={styles.providerDescription}>
        Usa <code>useLoading()</code> para controlar el loading global desde cualquier componente.
      </p>
      <div className={styles.providerButtons}>
        <button
          onClick={() => {
            show({ overlay: 'transparent', label: 'Procesando...' });
            setTimeout(() => hide(), 3000);
          }}
          className={`${styles.btn} ${styles.btnPrimary}`}
          data-testid="button-fullscreen-transparent"
        >
          Transparent (3s)
        </button>
        <button
          onClick={() => {
            show({ overlay: 'light', label: 'Guardando...' });
            setTimeout(() => hide(), 3000);
          }}
          className={`${styles.btn} ${styles.btnBlue}`}
          data-testid="button-fullscreen-light"
        >
          Light (3s)
        </button>
        <button
          onClick={() => {
            show({ overlay: 'dark', label: 'Enviando...' });
            setTimeout(() => hide(), 3000);
          }}
          className={`${styles.btn} ${styles.btnDark}`}
          data-testid="button-fullscreen-dark"
        >
          Dark (3s)
        </button>
      </div>
      {isLoading && (
        <p className={styles.loadingActive} data-testid="text-loading-active">Loading activo...</p>
      )}
    </div>
  );
}
