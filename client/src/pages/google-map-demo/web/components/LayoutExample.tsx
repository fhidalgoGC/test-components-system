import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import type { GoogleMapLayout } from '@/lib/ui-library/components/GoogleMap/shared/types';
import styles from '../css/GoogleMapDemo.module.css';

type WidthMode = 'full' | 'auto' | 'fixed' | 'percentage';
type HeightMode = 'full' | 'auto' | 'fixed' | 'percentage';
type VerticalAlign = 'top' | 'middle' | 'bottom';
type HorizontalAlign = 'left' | 'center' | 'right';

const CENTER = { lat: 19.4326, lng: -99.1332 };

const DATA = [
  {
    id: '1',
    position: { lat: 19.4326, lng: -99.1332 },
    labelI18n: { en: 'Mexico City', es: 'CDMX', default: 'CDMX' },
    metadata: { color: '#FF0000' },
  },
  {
    id: '2',
    position: { lat: 19.4284, lng: -99.1276 },
    labelI18n: { en: 'Zócalo', es: 'Zócalo', default: 'Zócalo' },
    metadata: { color: '#0066FF' },
  },
];

export function LayoutExample() {
  const [widthMode, setWidthMode] = useState<WidthMode>('full');
  const [widthValue, setWidthValue] = useState(600);
  const [minWidth, setMinWidth] = useState(0);
  const [heightMode, setHeightMode] = useState<HeightMode>('fixed');
  const [heightValue, setHeightValue] = useState(400);
  const [minHeight, setMinHeight] = useState(0);
  const [vAlign, setVAlign] = useState<VerticalAlign>('middle');
  const [hAlign, setHAlign] = useState<HorizontalAlign>('center');

  const layout: GoogleMapLayout = {
    widthMode,
    ...(widthMode === 'fixed' || widthMode === 'percentage' ? { width: widthValue } : {}),
    ...(minWidth > 0 ? { minWidth } : {}),
    heightMode,
    ...(heightMode === 'fixed' || heightMode === 'percentage' ? { height: heightValue } : {}),
    ...(minHeight > 0 ? { minHeight } : {}),
    align: { vertical: vAlign, horizontal: hAlign },
  };

  const layoutJson = JSON.stringify(layout, null, 2);

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Prop layout (dimensionamiento y alineación)</h2>
      <p className={styles.sectionDescription}>
        Controla el tamaño y alineación del mapa con la prop <code>layout</code>.
        Sigue el estándar <code>HeightWidthSize + align</code> de la librería.
      </p>

      <div className={styles.grid2col}>
        <div>
          <div
            className={styles.layoutPreviewContainer}
            data-testid="layout-preview-container"
          >
            <GoogleMap
              center={CENTER}
              zoom={14}
              data={DATA}
              layout={layout}
              showZoomControl={true}
              showMapTypeControl={true}
            />
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Width</span>
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>widthMode</label>
              <select
                value={widthMode}
                onChange={(e) => setWidthMode(e.target.value as WidthMode)}
                className={styles.controlSelect}
                data-testid="select-width-mode"
              >
                <option value="full">full (100%)</option>
                <option value="auto">auto</option>
                <option value="fixed">fixed (px)</option>
                <option value="percentage">percentage (%)</option>
              </select>
            </div>
            {(widthMode === 'fixed' || widthMode === 'percentage') && (
              <div className={styles.layoutControlGroup}>
                <label className={styles.controlLabel}>
                  width {widthMode === 'fixed' ? '(px)' : '(%)'}
                </label>
                <input
                  type="number"
                  value={widthValue}
                  onChange={(e) => setWidthValue(Number(e.target.value))}
                  min={0}
                  max={widthMode === 'percentage' ? 100 : 2000}
                  className={styles.controlInput}
                  data-testid="input-width-value"
                />
              </div>
            )}
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>minWidth (px)</label>
              <input
                type="number"
                value={minWidth}
                onChange={(e) => setMinWidth(Number(e.target.value))}
                min={0}
                max={2000}
                className={styles.controlInput}
                data-testid="input-min-width"
              />
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Height</span>
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>heightMode</label>
              <select
                value={heightMode}
                onChange={(e) => setHeightMode(e.target.value as HeightMode)}
                className={styles.controlSelect}
                data-testid="select-height-mode"
              >
                <option value="fixed">fixed (px)</option>
                <option value="full">full (100%)</option>
                <option value="auto">auto</option>
                <option value="percentage">percentage (%)</option>
              </select>
            </div>
            {(heightMode === 'fixed' || heightMode === 'percentage') && (
              <div className={styles.layoutControlGroup}>
                <label className={styles.controlLabel}>
                  height {heightMode === 'fixed' ? '(px)' : '(%)'}
                </label>
                <input
                  type="number"
                  value={heightValue}
                  onChange={(e) => setHeightValue(Number(e.target.value))}
                  min={0}
                  max={heightMode === 'percentage' ? 100 : 2000}
                  className={styles.controlInput}
                  data-testid="input-height-value"
                />
              </div>
            )}
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>minHeight (px)</label>
              <input
                type="number"
                value={minHeight}
                onChange={(e) => setMinHeight(Number(e.target.value))}
                min={0}
                max={2000}
                className={styles.controlInput}
                data-testid="input-min-height"
              />
            </div>
          </div>

          <div className={styles.sidebarCard}>
            <span className={styles.sidebarTitle}>Align</span>
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>vertical</label>
              <select
                value={vAlign}
                onChange={(e) => setVAlign(e.target.value as VerticalAlign)}
                className={styles.controlSelect}
                data-testid="select-vertical-align"
              >
                <option value="top">top</option>
                <option value="middle">middle</option>
                <option value="bottom">bottom</option>
              </select>
            </div>
            <div className={styles.layoutControlGroup}>
              <label className={styles.controlLabel}>horizontal</label>
              <select
                value={hAlign}
                onChange={(e) => setHAlign(e.target.value as HorizontalAlign)}
                className={styles.controlSelect}
                data-testid="select-horizontal-align"
              >
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </div>
          </div>

          <div className={styles.codeBlock} data-testid="layout-json-output">
{`layout={${layoutJson}}`}
          </div>
        </div>
      </div>
    </div>
  );
}
