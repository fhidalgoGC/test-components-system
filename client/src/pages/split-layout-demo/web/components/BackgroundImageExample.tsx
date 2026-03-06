import { SplitLayout } from '@/lib/ui-library/layouts/SplitLayout';
import styles from '../css/SplitLayoutDemo.module.css';
import heroImg from '@assets/Screenshot_2026-02-13_at_12.11.37_p.m._1771006299518.png';

function LeftContent() {
  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle} style={{ color: 'white' }}>Panel con src</h2>
      <p className={styles.formSubtitle} style={{ color: 'rgba(255,255,255,0.8)' }}>
        renderType: 'src' con overlay oscuro y opacidad 0.8
      </p>
    </div>
  );
}

function RightContent() {
  return (
    <div className={styles.heroPanel}>
      <h2 className={styles.heroTitle} style={{ color: 'white' }}>Panel con component</h2>
      <p className={styles.heroText} style={{ color: 'rgba(255,255,255,0.9)' }}>
        renderType: 'component' con gradiente personalizado
      </p>
    </div>
  );
}

function GradientBackground() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
      data-testid="gradient-bg"
    />
  );
}

export function BackgroundImageExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-bgimage-title">Imagen de Fondo por Panel</h2>
      <p className={styles.sectionDescription}>
        Cada panel soporta dos modos de fondo: <code>renderType: 'src'</code> para pasar una URL/ruta de imagen,
        o <code>renderType: 'component'</code> para pasar un componente React personalizado.
      </p>
      <div className={styles.demoWrapper}>
        <SplitLayout
          layout={{ heightMode: 'fixed', height: 400 }}
          main={{
            render: <LeftContent />,
            widthMode: 'percentage',
            width: 50,
            align: { vertical: 'middle', horizontal: 'center' },
            backgroundImage: {
              renderType: 'src',
              src: heroImg,
              opacity: 0.8,
              objectFit: 'cover',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
            },
          }}
          secondary={{
            render: <RightContent />,
            align: { vertical: 'middle', horizontal: 'center' },
            backgroundImage: {
              renderType: 'component',
              render: <GradientBackground />,
            },
          }}
        />
      </div>
    </div>
  );
}
