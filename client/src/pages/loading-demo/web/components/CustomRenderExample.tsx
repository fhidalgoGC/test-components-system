import { useState } from 'react';
import { Loading } from '@/lib/ui-library/components/Loading';
import styles from '../css/LoadingDemo.module.css';

function PulseLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#6366f1',
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: 13, color: '#6b7280' }}>Cargando con componente custom...</span>
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '80%', maxWidth: 300 }}>
      <div style={{ height: 14, borderRadius: 4, background: '#e5e7eb', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ height: 14, borderRadius: 4, background: '#e5e7eb', width: '70%', animation: 'shimmer 1.5s 0.2s infinite' }} />
      <div style={{ height: 14, borderRadius: 4, background: '#e5e7eb', width: '50%', animation: 'shimmer 1.5s 0.4s infinite' }} />
      <style>{`
        @keyframes shimmer {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export function CustomRenderExample() {
  const [activeDemo, setActiveDemo] = useState<'none' | 'self' | 'pulse' | 'skeleton'>('none');

  const handleShow = (type: 'self' | 'pulse' | 'skeleton') => {
    setActiveDemo(type);
    setTimeout(() => setActiveDemo('none'), 3000);
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-render-title">renderType: self vs component</h2>
      <p className={styles.sectionDescription}>
        Con <code>renderType: 'self'</code> usa el spinner por defecto.
        Con <code>renderType: 'component'</code> renderiza cualquier componente custom que le pases en <code>render</code>.
      </p>

      <div className={styles.providerButtons} style={{ marginBottom: 16 }}>
        <button
          onClick={() => handleShow('self')}
          className={`${styles.btn} ${styles.btnPrimary}`}
          data-testid="button-render-self"
        >
          Self (spinner) 3s
        </button>
        <button
          onClick={() => handleShow('pulse')}
          className={`${styles.btn} ${styles.btnBlue}`}
          data-testid="button-render-pulse"
        >
          Custom (pulse) 3s
        </button>
        <button
          onClick={() => handleShow('skeleton')}
          className={`${styles.btn} ${styles.btnDark}`}
          data-testid="button-render-skeleton"
        >
          Custom (skeleton) 3s
        </button>
      </div>

      <div className={styles.demoBox} style={{ minHeight: 180 }}>
        <p className={styles.demoBoxText}>Contenido del componente</p>
        <p className={styles.demoBoxSubtext}>El loading se renderiza sobre esta area</p>

        {activeDemo === 'self' && (
          <Loading
            state="loading"
            overlay="light"
            coverage="component"
            size="lg"
            renderType="self"
          />
        )}

        {activeDemo === 'pulse' && (
          <Loading
            state="loading"
            overlay="light"
            coverage="component"
            renderType="component"
            render={<PulseLoader />}
          />
        )}

        {activeDemo === 'skeleton' && (
          <Loading
            state="loading"
            overlay="transparent"
            coverage="component"
            renderType="component"
            render={<SkeletonLoader />}
          />
        )}
      </div>
    </div>
  );
}
