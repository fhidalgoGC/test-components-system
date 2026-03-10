import type { LayoutColumnProps, SpacingToken, GapToken, SlotGapToken, SlotConfig } from '../../shared/types';
import {
  getWidthStyle,
  getHeightStyle,
  getSpacingStyle,
  getComponentHeightStyle,
  getSlotWrapperStyle,
  groupComponentsBySlot,
  dividerSizeToPixels,
  dividerColorToValue,
  parseDividerToken,
  parseAlignDividerToken,
  capitalize,
} from '../../shared/utils';
import styles from '../styles/LayoutColumn.mobile.module.css';

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

const getSlotWrapperClass = (config: SlotConfig | undefined): string => {
  if (!config) return styles.slotWrapper;

  const heightMode = config.heightMode || 'auto';

  if (heightMode === 'full') {
    return `${styles.slotWrapper} ${styles.slotWrapperFull}`;
  } else if (heightMode === 'fixed' || heightMode === 'percentage') {
    return `${styles.slotWrapper} ${styles.slotWrapperFixed}`;
  }
  return `${styles.slotWrapper} ${styles.slotWrapperAuto}`;
};

export const LayoutColumnMobileView = (props: LayoutColumnProps) => {
  const {
    slots,
    slotConfig,
    controller,
    widthMode = 'full',
    width,
    heightMode = 'auto',
    height,
    paddingX,
    paddingY,
    marginX,
    marginY,
    componentGap = 'md',
    slotGap,
    slotDivider,
    slotAlignDivider,
    components,
    className,
  } = props;

  const alignDividerStyle = slotAlignDivider ? (() => {
    const { size, color, style } = parseAlignDividerToken(slotAlignDivider);
    return {
      height: 0,
      borderTopWidth: `${dividerSizeToPixels[size]}px`,
      borderTopStyle: style as any,
      borderTopColor: dividerColorToValue[color],
    };
  })() : null;

  const groupedBySlot = groupComponentsBySlot(components, slots);

  const containerClasses = [
    styles.layoutcolumn,
    widthMode === 'full' ? styles.widthFull : widthMode === 'auto' ? styles.widthAuto : '',
    heightMode === 'full' ? styles.heightFull : heightMode === 'auto' ? styles.heightAuto : '',
    getPaddingXClass(paddingX),
    getPaddingYClass(paddingY),
    getMarginXClass(marginX),
    getMarginYClass(marginY),
    getSlotGapClass(slotGap),
    className,
  ].filter(Boolean).join(' ');

  const inlineStyles: React.CSSProperties = {
    ...getWidthStyle(widthMode, width, marginX),
    ...getHeightStyle(heightMode, height, marginY),
    ...getSpacingStyle(paddingX, paddingY, marginX, marginY),
  };

  const slotContentOverrides = controller?.slotContentOverrides || {};

  const slotsToRender = Array.from({ length: slots }, (_, i) => i)
    .filter((slotIndex) => {
      const hasOverride = slotIndex in slotContentOverrides;
      if (hasOverride) return true;
      if (controller && !controller.isSlotVisible(slotIndex)) {
        return false;
      }
      const slotComponents = groupedBySlot[slotIndex];
      return slotComponents && slotComponents.length > 0;
    });

  const dividerStyle = slotDivider ? (() => {
    const { size, color } = parseDividerToken(slotDivider);
    return {
      height: `${dividerSizeToPixels[size]}px`,
      backgroundColor: dividerColorToValue[color],
    };
  })() : null;

  return (
    <div className={containerClasses} style={inlineStyles} data-testid="layoutcolumn-mobile">
      {slotsToRender.map((slotIndex, arrayIndex) => {
        const hasContentOverride = slotIndex in slotContentOverrides;
        const slotComponents = groupedBySlot[slotIndex] || [];

        const topComponents = slotComponents.filter(c => c.align === 'top');
        const centerComponents = slotComponents.filter(c => c.align === 'center');
        const bottomComponents = slotComponents.filter(c => c.align === 'bottom');

        const hasTop = topComponents.length > 0;
        const hasCenter = centerComponents.length > 0;
        const hasBottom = bottomComponents.length > 0;

        const showDivider = slotDivider && arrayIndex < slotsToRender.length - 1;

        const currentSlotConfig = slotConfig?.[slotIndex];
        const slotWrapperClass = getSlotWrapperClass(currentSlotConfig);
        const slotWrapperStyleVal = getSlotWrapperStyle(currentSlotConfig);

        return (
          <div key={slotIndex} className={slotWrapperClass} style={slotWrapperStyleVal}>
            <div
              className={styles.slot}
              data-testid={`layoutcolumn-mobile-slot-${slotIndex}`}
            >
              {hasContentOverride ? (
                <div
                  key={slotContentOverrides[slotIndex].revisionKey}
                  className={`${styles.slotContent} ${styles.alignTop}`}
                  data-testid={`layoutcolumn-mobile-slot-${slotIndex}-override`}
                >
                  <div className={`${styles.componentWrapper} ${styles.componentFull}`}>
                    {slotContentOverrides[slotIndex].content}
                  </div>
                </div>
              ) : (
                <>
                  {hasTop && (
                    <div
                      className={`${styles.slotContent} ${styles.alignTop} ${getComponentGapClass(componentGap)}`}
                      style={getComponentGapStyle(componentGap)}
                      data-testid={`layoutcolumn-mobile-slot-${slotIndex}-top`}
                    >
                      {topComponents.map((comp, idx) => {
                        const sizeMode = comp.sizeMode || 'auto';
                        const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                        return (
                          <div
                            key={comp.id || idx}
                            className={`${styles.componentWrapper} ${wrapperClass}`}
                            style={getComponentHeightStyle(comp)}
                            data-testid={`layoutcolumn-mobile-component-${slotIndex}-top-${idx}`}
                          >
                            {comp.component}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {slotAlignDivider && hasTop && (hasCenter || hasBottom) && (
                    <div className={styles.alignDivider} style={alignDividerStyle || undefined} />
                  )}

                  {hasCenter && (
                    <div
                      className={`${styles.slotContent} ${styles.alignCenter} ${getComponentGapClass(componentGap)}`}
                      style={getComponentGapStyle(componentGap)}
                      data-testid={`layoutcolumn-mobile-slot-${slotIndex}-center`}
                    >
                      {centerComponents.map((comp, idx) => {
                        const sizeMode = comp.sizeMode || 'auto';
                        const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                        return (
                          <div
                            key={comp.id || idx}
                            className={`${styles.componentWrapper} ${wrapperClass}`}
                            style={getComponentHeightStyle(comp)}
                            data-testid={`layoutcolumn-mobile-component-${slotIndex}-center-${idx}`}
                          >
                            {comp.component}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {slotAlignDivider && (hasCenter || hasTop) && hasBottom && (
                    <div className={styles.alignDivider} style={alignDividerStyle || undefined} />
                  )}

                  {hasBottom && (
                    <div
                      className={`${styles.slotContent} ${styles.alignBottom} ${getComponentGapClass(componentGap)}`}
                      style={getComponentGapStyle(componentGap)}
                      data-testid={`layoutcolumn-mobile-slot-${slotIndex}-bottom`}
                    >
                      {bottomComponents.map((comp, idx) => {
                        const sizeMode = comp.sizeMode || 'auto';
                        const wrapperClass = sizeMode === 'full' ? styles.componentFull : styles.componentAuto;
                        return (
                          <div
                            key={comp.id || idx}
                            className={`${styles.componentWrapper} ${wrapperClass}`}
                            style={getComponentHeightStyle(comp)}
                            data-testid={`layoutcolumn-mobile-component-${slotIndex}-bottom-${idx}`}
                          >
                            {comp.component}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
            {showDivider && dividerStyle && (
              <div
                className={styles.slotDivider}
                style={dividerStyle}
                data-testid={`layoutcolumn-mobile-divider-${slotIndex}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
