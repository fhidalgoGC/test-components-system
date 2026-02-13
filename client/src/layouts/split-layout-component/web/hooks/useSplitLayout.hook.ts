import { useMemo, CSSProperties } from 'react';
import type { SplitLayoutProps, PanelConfig, PanelBackground } from '../types';
import styles from '../css/SplitLayout.module.css';

const paddingMap: Record<string, string> = {
  none: styles.padNone,
  xs: styles.padXs,
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
  xl: styles.padXl,
};

const vAlignMap: Record<string, string> = {
  top: styles.vTop,
  center: styles.vCenter,
  bottom: styles.vBottom,
};

const hAlignMap: Record<string, string> = {
  left: styles.hLeft,
  center: styles.hCenter,
  right: styles.hRight,
};

const gapMap: Record<string, string> = {
  none: styles.gapNone,
  xs: styles.gapXs,
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
  xl: styles.gapXl,
};

function buildBackgroundStyle(bg?: PanelBackground): CSSProperties {
  if (!bg) return {};
  const style: CSSProperties = {};

  if (bg.gradient) {
    style.background = bg.gradient;
  } else if (bg.image) {
    style.backgroundImage = `url(${bg.image})`;
    style.backgroundSize = bg.size || 'cover';
    style.backgroundPosition = bg.position || 'center';
    style.backgroundRepeat = 'no-repeat';
  }

  if (bg.color && !bg.gradient && !bg.image) {
    style.backgroundColor = bg.color;
  }

  return style;
}

function buildPanelClasses(panel: PanelConfig, isMain: boolean): string {
  const classes = [
    styles.panel,
    isMain ? styles.mainPanel : styles.secondaryPanel,
  ];

  const vAlign = panel.verticalAlign || 'center';
  const hAlign = panel.horizontalAlign || 'center';
  const padding = panel.padding || 'none';

  classes.push(vAlignMap[vAlign] || styles.vCenter);
  classes.push(hAlignMap[hAlign] || styles.hCenter);
  classes.push(paddingMap[padding] || styles.padNone);

  if (panel.className) classes.push(panel.className);

  return classes.join(' ');
}

export function useSplitLayout(props: SplitLayoutProps) {
  const {
    mainPanel,
    secondaryPanel,
    mainSide = 'right',
    mainWidthPercent = 50,
    collapseBreakpoint = 768,
    gap = 'none',
    fullHeight = true,
    height,
    className,
    style,
  } = props;

  const containerClasses = useMemo(() => {
    const classes = [styles.container];
    if (fullHeight && !height) classes.push(styles.fullHeight);
    if (gap !== 'none') classes.push(gapMap[gap] || '');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [fullHeight, height, gap, className]);

  const containerStyle = useMemo((): CSSProperties => {
    const s: CSSProperties = {};
    if (height) s.height = height;
    if (style) Object.assign(s, style);
    return s;
  }, [height, style]);

  const secondaryWidthPercent = 100 - mainWidthPercent;

  const leftPanel = mainSide === 'left' ? mainPanel : secondaryPanel;
  const rightPanel = mainSide === 'right' ? mainPanel : secondaryPanel;
  const isLeftMain = mainSide === 'left';

  const leftClasses = buildPanelClasses(leftPanel, isLeftMain);
  const rightClasses = buildPanelClasses(rightPanel, !isLeftMain);

  const leftStyle = useMemo((): CSSProperties => {
    const widthPct = isLeftMain ? mainWidthPercent : secondaryWidthPercent;
    const s: CSSProperties = {
      flexBasis: `${widthPct}%`,
      width: `${widthPct}%`,
      ...buildBackgroundStyle(leftPanel.background),
    };
    if (leftPanel.style) Object.assign(s, leftPanel.style);
    return s;
  }, [isLeftMain, mainWidthPercent, secondaryWidthPercent, leftPanel]);

  const rightStyle = useMemo((): CSSProperties => {
    const widthPct = isLeftMain ? secondaryWidthPercent : mainWidthPercent;
    const s: CSSProperties = {
      flexBasis: `${widthPct}%`,
      width: `${widthPct}%`,
      ...buildBackgroundStyle(rightPanel.background),
    };
    if (rightPanel.style) Object.assign(s, rightPanel.style);
    return s;
  }, [isLeftMain, mainWidthPercent, secondaryWidthPercent, rightPanel]);

  const leftOverlay = leftPanel.background?.overlay;
  const rightOverlay = rightPanel.background?.overlay;

  const collapseMediaQuery = useMemo(() => {
    if (collapseBreakpoint !== 768) {
      return `@media (max-width: ${collapseBreakpoint}px) { [data-split-secondary] { display: none !important; } [data-split-main] { flex-basis: 100% !important; width: 100% !important; } }`;
    }
    return null;
  }, [collapseBreakpoint]);

  return {
    containerClasses,
    containerStyle,
    leftPanel,
    rightPanel,
    leftClasses,
    rightClasses,
    leftStyle,
    rightStyle,
    leftOverlay,
    rightOverlay,
    isLeftMain,
    collapseMediaQuery,
  };
}
