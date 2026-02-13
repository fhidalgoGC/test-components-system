import { useState } from 'react';
import { SplitLayout } from '@/layouts/split-layout-component';
import type { SizeMode, ComponentMainAlign } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';

type LayoutPreset = 'full' | 'auto' | 'fixed' | 'percentage';

const presetDescriptions: Record<LayoutPreset, string> = {
  full: 'El contenedor ocupa 100% del ancho y 100vh de alto. Ideal para layouts a pantalla completa.',
  auto: 'El contenedor se ajusta al tamaño de su contenido. El alto y ancho dependen de lo que hay dentro.',
  fixed: 'El contenedor tiene un ancho y alto fijo en pixeles. No cambia con el contenido ni el viewport.',
  percentage: 'El contenedor usa un porcentaje del espacio disponible de su padre.',
};

function MainContent({ config }: { config: string }) {
  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0 }}>Main Panel</h3>
        <p style={{ fontSize: 13, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{config}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
          <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 12 }}>
            <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>Contenido de ejemplo para ver como se comporta el layout con el modo seleccionado.</p>
          </div>
          <div style={{ background: '#f3f4f6', borderRadius: 8, padding: 12 }}>
            <p style={{ fontSize: 12, color: '#374151', margin: 0 }}>Segundo bloque de contenido para verificar el scroll y la alineacion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecondaryContent() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px 0' }}>Secondary</h3>
        <p style={{ fontSize: 13, opacity: 0.8, margin: 0 }}>Este panel siempre usa widthMode: full</p>
      </div>
    </div>
  );
}

export function LayoutModesExample() {
  const [widthMode, setWidthMode] = useState<SizeMode>('full');
  const [heightMode, setHeightMode] = useState<SizeMode>('fixed');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(400);
  const [mainAlign, setMainAlign] = useState<ComponentMainAlign>('left');
  const [mainWidthMode, setMainWidthMode] = useState<SizeMode>('percentage');
  const [mainWidth, setMainWidth] = useState(45);

  const activePreset: LayoutPreset = widthMode === heightMode ? widthMode : widthMode;

  const configText = `layout: { widthMode: '${widthMode}', width: ${width}, heightMode: '${heightMode}', height: ${height}, componentMainAlign: '${mainAlign}' }`;

  const showWidthValue = widthMode === 'fixed' || widthMode === 'percentage';
  const showHeightValue = heightMode === 'fixed' || heightMode === 'percentage';

  const widthUnit = widthMode === 'fixed' ? 'px' : widthMode === 'percentage' ? '%' : '';
  const heightUnit = heightMode === 'fixed' ? 'px' : heightMode === 'percentage' ? '%' : '';

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-layout-modes-title">Layout SizeMode Explorer</h2>
      <p className={styles.sectionDescription}>
        Prueba todas las combinaciones de widthMode y heightMode del layout, ademas de componentMainAlign y configuracion del panel main.
      </p>

      <div className={styles.controlsBar}>
        <label className={styles.controlLabel}>Presets:</label>
        {(['full', 'auto', 'fixed', 'percentage'] as LayoutPreset[]).map((preset) => (
          <button
            key={preset}
            className={styles.controlPresetBtn}
            data-active={widthMode === preset && heightMode === preset ? 'true' : 'false'}
            onClick={() => {
              setWidthMode(preset);
              setHeightMode(preset);
              if (preset === 'fixed') { setWidth(800); setHeight(400); }
              if (preset === 'percentage') { setWidth(90); setHeight(60); }
            }}
            data-testid={`button-preset-${preset}`}
          >
            {preset}
          </button>
        ))}
      </div>

      <div className={styles.controlsDescription} data-testid="text-preset-description">
        {presetDescriptions[activePreset]}
      </div>

      <div className={styles.controlsBar}>
        <label className={styles.controlLabel}>Layout widthMode:</label>
        <select className={styles.controlSelect} value={widthMode} onChange={(e) => setWidthMode(e.target.value as SizeMode)} data-testid="select-layout-width-mode">
          <option value="full">full (100%)</option>
          <option value="auto">auto (contenido)</option>
          <option value="fixed">fixed (px)</option>
          <option value="percentage">percentage (%)</option>
        </select>

        {showWidthValue && (
          <>
            <label className={styles.controlLabel}>Width ({widthUnit}):</label>
            <input className={styles.controlInput} type="number" min={widthMode === 'percentage' ? 10 : 200} max={widthMode === 'percentage' ? 100 : 1200} value={width} onChange={(e) => setWidth(Number(e.target.value))} data-testid="input-layout-width" />
          </>
        )}

        <span className={styles.controlDivider} />

        <label className={styles.controlLabel}>Layout heightMode:</label>
        <select className={styles.controlSelect} value={heightMode} onChange={(e) => setHeightMode(e.target.value as SizeMode)} data-testid="select-layout-height-mode">
          <option value="full">full (100vh)</option>
          <option value="auto">auto (contenido)</option>
          <option value="fixed">fixed (px)</option>
          <option value="percentage">percentage (%)</option>
        </select>

        {showHeightValue && (
          <>
            <label className={styles.controlLabel}>Height ({heightUnit}):</label>
            <input className={styles.controlInput} type="number" min={heightMode === 'percentage' ? 10 : 100} max={heightMode === 'percentage' ? 100 : 800} value={height} onChange={(e) => setHeight(Number(e.target.value))} data-testid="input-layout-height" />
          </>
        )}
      </div>

      <div className={styles.controlsBar}>
        <label className={styles.controlLabel}>componentMainAlign:</label>
        <select className={styles.controlSelect} value={mainAlign} onChange={(e) => setMainAlign(e.target.value as ComponentMainAlign)} data-testid="select-main-align">
          <option value="left">left</option>
          <option value="right">right</option>
        </select>

        <span className={styles.controlDivider} />

        <label className={styles.controlLabel}>Main widthMode:</label>
        <select className={styles.controlSelect} value={mainWidthMode} onChange={(e) => setMainWidthMode(e.target.value as SizeMode)} data-testid="select-main-width-mode">
          <option value="full">full</option>
          <option value="auto">auto</option>
          <option value="fixed">fixed</option>
          <option value="percentage">percentage</option>
        </select>

        <label className={styles.controlLabel}>Main width:</label>
        <input className={styles.controlInput} type="number" min={mainWidthMode === 'percentage' ? 10 : 100} max={mainWidthMode === 'percentage' ? 90 : 800} value={mainWidth} onChange={(e) => setMainWidth(Number(e.target.value))} data-testid="input-main-width-explorer" />
      </div>

      <div className={styles.configPreview} data-testid="text-config-preview">
        <code>{configText}</code>
      </div>

      <div className={styles.demoWrapperAuto} data-testid="layout-modes-demo">
        <SplitLayout
          layout={{
            componentMainAlign: mainAlign,
            widthMode,
            width,
            heightMode,
            height,
          }}
          main={{
            render: <MainContent config={configText} />,
            widthMode: mainWidthMode,
            width: mainWidth,
          }}
          secondary={{
            render: <SecondaryContent />,
          }}
        />
      </div>
    </div>
  );
}
