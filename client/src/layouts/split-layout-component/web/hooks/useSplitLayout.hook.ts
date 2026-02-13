import { useMemo, CSSProperties } from 'react';
import type { SplitLayoutProps, PanelConfig, SizeMode } from '../types';
import styles from '../css/SplitLayout.module.css';

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

function buildPanelClasses(panel: PanelConfig, isMain: boolean): string {
  const classes = [
    styles.panel,
    isMain ? styles.mainPanel : styles.secondPanel,
  ];

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

function buildPanelStyle(panel: PanelConfig): CSSProperties {
  const s: CSSProperties = {};

  const widthMode = panel.widthMode || 'full';
  const resolved = resolveSizeValue(widthMode, panel.width, false);

  if (widthMode === 'percentage' || widthMode === 'fixed') {
    s.flexBasis = resolved;
    s.width = resolved;
    s.flexGrow = 0;
    s.flexShrink = 0;
  } else if (widthMode === 'full') {
    s.flex = 1;
    s.minWidth = 0;
  } else {
    s.flexGrow = 0;
    s.flexShrink = 0;
    s.flexBasis = 'auto';
    s.width = 'auto';
  }

  const heightMode = panel.heightMode || 'full';
  if (heightMode === 'full') {
    s.height = '100%';
  } else if (heightMode === 'auto') {
    s.height = 'auto';
  } else {
    s.height = resolveSizeValue(heightMode, panel.height, false);
  }

  if (panel.minWidth != null) s.minWidth = panel.minWidth;
  if (panel.minHeight != null) s.minHeight = panel.minHeight;

  return s;
}

export function useSplitLayout(props: SplitLayoutProps) {
  const { layout, main, secondary } = props;

  const mainAlign = layout?.componentMainAlign || 'left';
  const isReversed = mainAlign === 'right';

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

    if (isReversed) {
      s.flexDirection = 'row-reverse';
    }

    return s;
  }, [layout, isReversed]);

  const mainClasses = buildPanelClasses(main, true);
  const secondaryClasses = buildPanelClasses(secondary, false);
  const mainInnerClasses = buildInnerClasses(main);
  const secondaryInnerClasses = buildInnerClasses(secondary);

  const mainStyle = useMemo((): CSSProperties => {
    return buildPanelStyle(main);
  }, [main]);

  const secondaryStyle = useMemo((): CSSProperties => {
    return buildPanelStyle(secondary);
  }, [secondary]);

  return {
    containerClasses,
    containerStyle,
    mainPanel: main,
    secondaryPanel: secondary,
    mainClasses,
    secondaryClasses,
    mainInnerClasses,
    secondaryInnerClasses,
    mainStyle,
    secondaryStyle,
  };
}
