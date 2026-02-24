import { SplitLayout } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';
import heroImg from '@assets/Screenshot_2026-02-13_at_12.11.37_p.m._1771006299518.png';

function LeftContent() {
  return (
    <div className={styles.formPanel}>
      <h2 className={styles.formTitle} style={{ color: 'white' }}>Panel izquierdo</h2>
      <p className={styles.formSubtitle} style={{ color: 'rgba(255,255,255,0.8)' }}>
        Imagen de fondo con overlay oscuro y opacidad 0.8
      </p>
    </div>
  );
}

function RightContent() {
  return (
    <div className={styles.heroPanel}>
      <h2 className={styles.heroTitle} style={{ color: 'white' }}>Panel derecho</h2>
      <p className={styles.heroText} style={{ color: 'rgba(255,255,255,0.9)' }}>
        Imagen de fondo sin overlay, opacidad completa, objectFit contain
      </p>
    </div>
  );
}

export function BackgroundImageExample() {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-bgimage-title">Imagen de Fondo por Panel</h2>
      <p className={styles.sectionDescription}>
        Cada panel puede tener su propia imagen de fondo con opciones de opacidad, objectFit, objectPosition y overlay de color.
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
              src: heroImg,
              objectFit: 'cover',
              objectPosition: 'top center',
            },
          }}
        />
      </div>
    </div>
  );
}
