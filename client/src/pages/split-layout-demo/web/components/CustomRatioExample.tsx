import { useState } from 'react';
import { SplitLayout } from '@/layouts/split-layout-component';
import type { MainSide, VerticalAlign, HorizontalAlign, SpacingToken } from '@/layouts/split-layout-component';
import styles from '../css/SplitLayoutDemo.module.css';

export function CustomRatioExample() {
  const [ratio, setRatio] = useState(50);
  const [side, setSide] = useState<MainSide>('right');
  const [vAlign, setVAlign] = useState<VerticalAlign>('center');
  const [hAlign, setHAlign] = useState<HorizontalAlign>('center');
  const [padding, setPadding] = useState<SpacingToken>('lg');

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle} data-testid="text-custom-title">Configuración Interactiva</h2>
      <p className={styles.sectionDescription}>
        Ajusta el ratio, lado, alineación y padding del panel principal en tiempo real.
      </p>
      <a href="/layouts/split-layout/preview/interactive" target="_blank" rel="noopener noreferrer" className={styles.previewLink} data-testid="link-preview-custom">
        <svg className={styles.previewLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        Abrir en nueva pestaña
      </a>

      <div className={styles.controlsBar}>
        <label className={styles.controlLabel}>Main Width %:</label>
        <input
          className={styles.controlInput}
          type="number"
          min={20}
          max={80}
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
          data-testid="input-ratio"
        />

        <label className={styles.controlLabel}>Side:</label>
        <select className={styles.controlSelect} value={side} onChange={(e) => setSide(e.target.value as MainSide)} data-testid="select-side">
          <option value="left">left</option>
          <option value="right">right</option>
        </select>

        <label className={styles.controlLabel}>V-Align:</label>
        <select className={styles.controlSelect} value={vAlign} onChange={(e) => setVAlign(e.target.value as VerticalAlign)} data-testid="select-valign">
          <option value="top">top</option>
          <option value="center">center</option>
          <option value="bottom">bottom</option>
        </select>

        <label className={styles.controlLabel}>H-Align:</label>
        <select className={styles.controlSelect} value={hAlign} onChange={(e) => setHAlign(e.target.value as HorizontalAlign)} data-testid="select-halign">
          <option value="left">left</option>
          <option value="center">center</option>
          <option value="right">right</option>
        </select>

        <label className={styles.controlLabel}>Padding:</label>
        <select className={styles.controlSelect} value={padding} onChange={(e) => setPadding(e.target.value as SpacingToken)} data-testid="select-padding">
          <option value="none">none</option>
          <option value="xs">xs</option>
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
          <option value="xl">xl</option>
        </select>
      </div>

      <div className={styles.demoWrapper}>
        <SplitLayout
          mainPanel={{
            content: (
              <div className={styles.minimalPanel}>
                <h2 className={styles.minimalTitle}>Main Panel</h2>
                <p className={styles.minimalText}>
                  width: {ratio}% | side: {side} | vAlign: {vAlign} | hAlign: {hAlign} | padding: {padding}
                </p>
              </div>
            ),
            verticalAlign: vAlign,
            horizontalAlign: hAlign,
            padding: padding,
            background: { color: '#f9fafb' },
          }}
          secondaryPanel={{
            content: (
              <div style={{ color: 'white', textAlign: 'center' }}>
                <h2 style={{ fontSize: 24, fontWeight: 700 }}>Secondary</h2>
                <p style={{ fontSize: 13, opacity: 0.8 }}>width: {100 - ratio}%</p>
              </div>
            ),
            verticalAlign: 'center',
            horizontalAlign: 'center',
            padding: 'lg',
            background: {
              gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            },
          }}
          mainSide={side}
          mainWidthPercent={ratio}
        />
      </div>
    </div>
  );
}
