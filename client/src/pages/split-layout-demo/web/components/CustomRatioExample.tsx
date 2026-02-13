import { useState } from 'react';
import { SplitLayout } from '@/layouts/split-layout-component';
import type { SizeMode, VerticalAlign, HorizontalAlign } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';

export function CustomRatioExample() {
  const [mainWidth, setMainWidth] = useState(50);
  const [layoutHeight, setLayoutHeight] = useState(500);
  const [vAlign, setVAlign] = useState<VerticalAlign>('middle');
  const [hAlign, setHAlign] = useState<HorizontalAlign>('center');
  const [mainWidthMode, setMainWidthMode] = useState<SizeMode>('percentage');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-custom-title">Configuracion Interactiva</h2>
      <p className={styles.sectionDescription}>
        Ajusta widthMode, width, heightMode, height y alineacion del panel principal en tiempo real.
      </p>
      <a href="/layouts/split-layout/preview/interactive" target="_blank" rel="noopener noreferrer" className={styles.previewLink} data-testid="link-preview-custom">
        <svg className={styles.previewLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        Abrir en nueva pestaña
      </a>

      <div className={styles.controlsBar}>
        <label className={styles.controlLabel}>Main WidthMode:</label>
        <select className={styles.controlSelect} value={mainWidthMode} onChange={(e) => setMainWidthMode(e.target.value as SizeMode)} data-testid="select-width-mode">
          <option value="full">full</option>
          <option value="auto">auto</option>
          <option value="fixed">fixed</option>
          <option value="percentage">percentage</option>
        </select>

        <label className={styles.controlLabel}>Main Width:</label>
        <input
          className={styles.controlInput}
          type="number"
          min={100}
          max={800}
          value={mainWidth}
          onChange={(e) => setMainWidth(Number(e.target.value))}
          data-testid="input-main-width"
        />

        <label className={styles.controlLabel}>Layout Height:</label>
        <input
          className={styles.controlInput}
          type="number"
          min={200}
          max={800}
          value={layoutHeight}
          onChange={(e) => setLayoutHeight(Number(e.target.value))}
          data-testid="input-layout-height"
        />

        <label className={styles.controlLabel}>V-Align:</label>
        <select className={styles.controlSelect} value={vAlign} onChange={(e) => setVAlign(e.target.value as VerticalAlign)} data-testid="select-valign">
          <option value="top">top</option>
          <option value="middle">middle</option>
          <option value="bottom">bottom</option>
        </select>

        <label className={styles.controlLabel}>H-Align:</label>
        <select className={styles.controlSelect} value={hAlign} onChange={(e) => setHAlign(e.target.value as HorizontalAlign)} data-testid="select-halign">
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>
      </div>

      <div className={styles.demoWrapper}>
        <SplitLayout
          layout={{ heightMode: 'fixed', height: layoutHeight }}
          main={{
            render: (
              <div className={styles.minimalPanel}>
                <h2 className={styles.minimalTitle}>Main Panel</h2>
                <p className={styles.minimalText}>
                  widthMode: {mainWidthMode} | width: {mainWidth} | vAlign: {vAlign} | hAlign: {hAlign}
                </p>
              </div>
            ),
            widthMode: mainWidthMode,
            width: mainWidth,
            align: { vertical: vAlign, horizontal: hAlign },
          }}
          secondary={{
            render: (
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <h2 style={{ fontSize: 24, fontWeight: 700 }}>Secondary</h2>
                  <p style={{ fontSize: 13, opacity: 0.8 }}>widthMode: full (takes remaining)</p>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}
