import { useRef } from 'react';
import { useLoading } from '@/lib/ui-library/providers';
import type { LabelOrMultiLanguage } from '@/lib/ui-library/types/language.types';
import styles from '../css/LoadingDemo.module.css';

export function ProviderWithRefExample() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const { show, hide, isLoading } = useLoading();

  const handleLoadCard = (ref: React.RefObject<HTMLDivElement>, labelI18n: LabelOrMultiLanguage) => {
    show({ parentRef: ref as React.RefObject<HTMLElement>, overlay: 'light', size: 'md', labelI18n });
    setTimeout(() => hide(), 3000);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-ref-title">Provider con parentRef</h2>
      <p className={styles.sectionDescription}>
        Usa <code>show({'{ parentRef: ref }'})</code> para inyectar el loading dentro de un componente especifico via portal.
        La referencia se puede cambiar dinamicamente en cada llamada.
      </p>

      <div className={styles.providerButtons} style={{ marginBottom: 16 }}>
        <button
          onClick={() => handleLoadCard(card1Ref, { en: 'Loading Card 1...', es: 'Cargando Card 1...', default: 'Loading Card 1...' })}
          className={`${styles.btn} ${styles.btnPrimary}`}
          data-testid="button-load-card1"
        >
          Loading Card 1 (3s)
        </button>
        <button
          onClick={() => handleLoadCard(card2Ref, { en: 'Loading Card 2...', es: 'Cargando Card 2...', default: 'Loading Card 2...' })}
          className={`${styles.btn} ${styles.btnBlue}`}
          data-testid="button-load-card2"
        >
          Loading Card 2 (3s)
        </button>
        <button
          onClick={() => {
            show({ overlay: 'dark', labelI18n: { en: 'Full screen...', es: 'Pantalla completa...', default: 'Full screen...' } });
            setTimeout(() => hide(), 3000);
          }}
          className={`${styles.btn} ${styles.btnDark}`}
          data-testid="button-load-fullscreen-ref"
        >
          Fullscreen (3s)
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div
          ref={card1Ref}
          style={{
            flex: 1,
            minWidth: 250,
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 24,
            background: '#fff',
          }}
          data-testid="card-ref-1"
        >
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Card 1</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
            Esta card tiene su propio ref. El loading se inyecta aqui via portal.
          </p>
        </div>

        <div
          ref={card2Ref}
          style={{
            flex: 1,
            minWidth: 250,
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: 24,
            background: '#fff',
          }}
          data-testid="card-ref-2"
        >
          <h3 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 600 }}>Card 2</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
            Otra card independiente. Puedes cargar cada una por separado.
          </p>
        </div>
      </div>

      {isLoading && (
        <p className={styles.loadingActive} data-testid="text-ref-loading-active">Loading activo...</p>
      )}
    </div>
  );
}
