import { useMemo, CSSProperties } from 'react';
import type { SplitLayoutMobileProps } from '../types';
import type { PanelConfig, SizeMode } from '../../web/types';
import styles from '../css/SplitLayout.mobile.module.css';

const vAlignMap: Record<string, string> = {
  top: styles.vTop,
  middle: styles.vMiddle,
  bottom: styles.vBottom,
};

const hAlignMap: Record<string, string> = {
  left: styles.hLeft,
  center: styles.hCenter,
  right: styles.hRight,
};

function resolveSizeValue(mode: SizeMode, value: string | number | undefined, useVh: boolean): string {
  switch (mode) {
    case 'full':
      return useVh ? '100vh' : '100%';
    case 'auto':
      return 'auto';
    case 'fixed':
      return typeof value === 'number' ? `${value}px` : (value || 'auto');
    case 'percentage':
      return typeof value === 'number' ? `${value}%` : (value || 'auto');
    default:
      return 'auto';
  }
}

function buildPanelClasses(panel: PanelConfig): string {
  const classes = [styles.panel];

  const scrollV = panel.scroll?.vertical !== false;
  const scrollH = panel.scroll?.horizontal === true;

  classes.push(scrollV ? styles.scrollYAuto : styles.scrollYHidden);
  classes.push(scrollH ? styles.scrollXAuto : styles.scrollXHidden);

  return classes.join(' ');
}

function buildInnerClasses(panel: PanelConfig): string {
  const classes = [styles.panelInner];

  const vAlign = panel.align?.vertical || 'middle';
  const hAlign = panel.align?.horizontal || 'center';

  classes.push(vAlignMap[vAlign] || styles.vMiddle);
  classes.push(hAlignMap[hAlign] || styles.hCenter);

  return classes.join(' ');
}

export function useSplitLayoutMobile(props: SplitLayoutMobileProps) {
  const { layout, main } = props;

  const containerClasses = useMemo(() => {
    return styles.container;
  }, []);

  const containerStyle = useMemo((): CSSProperties => {
    const s: CSSProperties = {};

    const widthMode = layout?.widthMode || 'full';
    s.width = resolveSizeValue(widthMode, layout?.width, false);
    if (layout?.minWidth != null) s.minWidth = layout.minWidth;

    const heightMode = layout?.heightMode || 'full';
    s.height = resolveSizeValue(heightMode, layout?.height, true);
    if (layout?.minHeight != null) s.minHeight = layout.minHeight;

    return s;
  }, [layout]);

  const panelClasses = buildPanelClasses(main);
  const panelInnerClasses = buildInnerClasses(main);

  const panelStyle = useMemo((): CSSProperties => {
    return { width: '100%', height: '100%' };
  }, []);

  return {
    containerClasses,
    containerStyle,
    mainPanel: main,
    panelClasses,
    panelInnerClasses,
    panelStyle,
  };
}
