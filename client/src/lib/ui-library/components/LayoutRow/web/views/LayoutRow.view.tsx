import type { LayoutRowProps, LayoutRowComponent, SlotConfig, SpacingToken, GapToken, SlotGapToken } from '../../shared/types';
import {
  getWidthStyle,
  getHeightStyle,
  getSpacingStyle,
  getSlotStyle,
  getComponentWrapperStyle,
  groupComponentsBySlot,
  groupByAlign,
  capitalize,
} from '../../shared/utils';
import styles from '../styles/LayoutRow.module.scss';

const getPaddingXClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`paddingX${capitalize(value)}`] || '';
};

const getPaddingYClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`paddingY${capitalize(value)}`] || '';
};

const getMarginXClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`marginX${capitalize(value)}`] || '';
};

const getMarginYClass = (value: SpacingToken | number | undefined): string => {
  if (!value || typeof value === 'number') return '';
  return styles[`marginY${capitalize(value)}`] || '';
};

const getComponentGapClass = (gap: GapToken | number | undefined): string => {
  if (gap === undefined) return styles.componentGapMd;
  if (typeof gap === 'number') return '';
  return styles[`componentGap${capitalize(gap)}`] || styles.componentGapMd;
};

const getComponentGapStyle = (gap: GapToken | number | undefined): React.CSSProperties => {
  if (typeof gap === 'number') {
    return { gap: `${gap}px` };
  }
  return {};
};

const getSlotGapClass = (token: SlotGapToken | undefined) => {
  if (!token) return '';
  return styles[`slotGap${capitalize(token)}`] || '';
};

const getVerticalAlignClass = (align: string | undefined) => {
  switch (align) {
    case 'top': return styles.verticalTop;
    case 'bottom': return styles.verticalBottom;
    case 'stretch': return styles.verticalStretch;
    default: return styles.verticalCenter;
  }
};

const getAlignClass = (align: string) => {
  switch (align) {
    case 'left': return styles.alignLeft;
    case 'right': return styles.alignRight;
    default: return styles.alignCenter;
  }
};

const getComponentWrapperClasses = (comp: LayoutRowComponent): string => {
  const classes = [styles.componentWrapper];

  const wm = comp.widthMode || 'auto';
  if (wm === 'full') classes.push(styles.componentWidthFull);
  else if (wm === 'fixed' || wm === 'percentage') classes.push(styles.componentWidthFixed);
  else classes.push(styles.componentWidthAuto);

  const hm = comp.heightMode || 'auto';
  if (hm === 'full') classes.push(styles.componentHeightFull);
  else if (hm === 'fixed') classes.push(styles.componentHeightFixed);
  else classes.push(styles.componentHeightAuto);

  return classes.join(' ');
};

const getSlotClasses = (config: SlotConfig | undefined): string => {
  if (!config || !config.widthMode) return '';
  switch (config.widthMode) {
    case 'full': return styles.slotFull;
    case 'auto': return styles.slotAuto;
    case 'fixed': return styles.slotFixed;
    case 'percentage': return styles.slotFixed;
    default: return '';
  }
};

export const LayoutRowView = (props: LayoutRowProps) => {
  const {
    slots,
    slotConfig,
    widthMode = 'full',
    width,
    heightMode = 'auto',
    height,
    paddingX,
    paddingY,
    marginX,
    marginY,
    componentVerticalAlign = 'center',
    componentGap = 'md',
    slotGap,
    components,
    className,
  } = props;

  const groupedBySlot = groupComponentsBySlot(components, slots);

  const containerClasses = [
    styles.layoutrow,
    widthMode === 'full' ? styles.widthFull : widthMode === 'auto' ? styles.widthAuto : '',
    heightMode === 'full' ? styles.heightFull : heightMode === 'auto' ? styles.heightAuto : '',
    getPaddingXClass(paddingX),
    getPaddingYClass(paddingY),
    getMarginXClass(marginX),
    getMarginYClass(marginY),
    getSlotGapClass(slotGap),
    getVerticalAlignClass(componentVerticalAlign),
    className,
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {
    ...getWidthStyle(widthMode, width, marginX),
    ...getHeightStyle(heightMode, height),
    ...getSpacingStyle(paddingX, paddingY, marginX, marginY),
  };

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutrow">
      {Array.from({ length: slots }, (_, slotIndex) => {
        const slotComponents = groupedBySlot[slotIndex] || [];
        const currentSlotConfig = slotConfig?.[slotIndex];
        const alignGroups = groupByAlign(slotComponents);

        const slotClasses = [
          styles.slot,
          getSlotClasses(currentSlotConfig),
          getVerticalAlignClass(componentVerticalAlign),
        ].filter(Boolean).join(' ');

        return (
          <div
            key={slotIndex}
            className={slotClasses}
            style={getSlotStyle(currentSlotConfig)}
            data-testid={`layoutrow-slot-${slotIndex}`}
          >
            {(['left', 'center', 'right'] as const).map((align) => {
              const alignComponents = alignGroups[align];
              if (alignComponents.length === 0) return null;

              return (
                <div
                  key={align}
                  className={`${styles.slot} ${getAlignClass(align)} ${getComponentGapClass(componentGap)}`}
                  style={getComponentGapStyle(componentGap)}
                  data-testid={`layoutrow-slot-${slotIndex}-${align}`}
                >
                  {alignComponents.map((comp, idx) => (
                    <div
                      key={idx}
                      className={getComponentWrapperClasses(comp)}
                      style={getComponentWrapperStyle(comp)}
                      data-testid={`layoutrow-component-${slotIndex}-${align}-${idx}`}
                    >
                      {comp.component}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
