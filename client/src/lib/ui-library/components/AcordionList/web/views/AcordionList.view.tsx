import { useMemo } from 'react';
import { Accordion } from '@/lib/ui-library/components/Accordion';
import type {
  AcordionListProps,
  AcordionListItemHeaderSelf,
  AcordionListItemHeaderComponent,
  AcordionListItemDataProps,
  AcordionListState,
  AcordionListStateConfig,
  AcordionListStatesComponents,
} from '../../shared';
import { useAcordionList } from '../hooks';
import styles from '../css/AcordionList.module.css';
import type { ComponentType, CSSProperties } from 'react';

function getContainerStyles(layout: AcordionListProps['layout']): CSSProperties {
  const style: CSSProperties = {};
  if (!layout) return style;

  if (layout.widthMode === 'full') style.width = '100%';
  else if (layout.widthMode === 'fixed' && layout.width) style.width = layout.width;

  if (layout.minWidth) style.minWidth = layout.minWidth;

  if (layout.heightMode === 'full') style.height = '100%';
  else if (layout.heightMode === 'fixed' && layout.height) style.height = layout.height;

  if (layout.minHeight) style.minHeight = layout.minHeight;

  if (layout.heightMode === 'fixed' || layout.heightMode === 'full') {
    style.overflowY = 'auto';
  }

  if (layout.gap !== undefined) style.gap = layout.gap;

  return style;
}

function getStateContainerStyles(config?: AcordionListStateConfig): CSSProperties {
  const style: CSSProperties = {};
  if (!config) return style;

  if (config.widthMode === 'full') style.width = '100%';
  else if (config.widthMode === 'fixed' && config.width) style.width = config.width;
  if (config.minWidth) style.minWidth = config.minWidth;

  if (config.heightMode === 'full') style.height = '100%';
  else if (config.heightMode === 'fixed' && config.height) style.height = config.height;
  if (config.minHeight) style.minHeight = config.minHeight;

  const vAlign = config.verticalAlign || 'middle';
  if (vAlign === 'top') style.justifyContent = 'flex-start';
  else if (vAlign === 'bottom') style.justifyContent = 'flex-end';
  else style.justifyContent = 'center';

  const hAlign = config.horizontalAlign || 'center';
  if (hAlign === 'left') style.alignItems = 'flex-start';
  else if (hAlign === 'right') style.alignItems = 'flex-end';
  else style.alignItems = 'center';

  return style;
}

function createSelfHeaderComponent<R>(
  getHeaderLabel: (item: any) => string,
): ComponentType<AcordionListItemDataProps<R>> {
  const SelfHeader = ({ itemData }: AcordionListItemDataProps<R>) => (
    <div className={styles.selfHeader} data-testid="text-accordion-self-header">
      {getHeaderLabel(itemData)}
    </div>
  );
  return SelfHeader;
}

function renderDefaultState(state: AcordionListState, error?: string) {
  switch (state) {
    case 'loading':
      return (
        <div className={styles.stateContainer}>
          <div className={styles.loadingSpinner} />
          <span className={styles.stateText}>Loading...</span>
        </div>
      );
    case 'error':
      return (
        <div className={`${styles.stateContainer} ${styles.errorState}`}>
          <span className={styles.stateText}>{error || 'An error occurred'}</span>
        </div>
      );
    case 'empty':
      return (
        <div className={`${styles.stateContainer} ${styles.emptyState}`}>
          <span className={styles.stateText}>No data available</span>
        </div>
      );
    default:
      return null;
  }
}

function renderState(
  state: AcordionListState,
  statesComponents?: AcordionListStatesComponents,
  error?: string,
) {
  if (state === 'idle' || state === 'success') return null;

  const config = statesComponents?.[state];

  if (!config) {
    return renderDefaultState(state, error);
  }

  if (config.renderType === 'component' && config.render) {
    const stateStyles = getStateContainerStyles(config);
    return (
      <div className={styles.stateContainer} style={stateStyles}>
        {config.render}
      </div>
    );
  }

  const stateStyles = getStateContainerStyles(config);
  const defaultContent = renderDefaultState(state, error);
  if (defaultContent) {
    return (
      <div style={stateStyles}>
        {defaultContent}
      </div>
    );
  }

  return null;
}

export const AcordionListView = <T = any, R = any>(props: AcordionListProps<T, R>) => {
  const {
    id,
    data,
    getItemId,
    getItemData,
    itemHeader,
    itemBody,
    layout,
    behaviors,
    callbacks,
    controller,
    state: stateProp,
    statesComponents,
    error,
    className,
  } = props;

  const {
    handleToggle,
    isItemOpen,
    refreshKey,
    getItemRefreshKey,
    currentState,
  } = useAcordionList({
    data,
    getItemId,
    behaviors,
    callbacks,
    controller,
    state: stateProp,
  });

  const resolvedState = currentState || stateProp || 'idle';
  const showData = (resolvedState === 'idle' || resolvedState === 'success') && data.length > 0;

  const containerStyles = useMemo(() => getContainerStyles(layout), [layout]);

  const HeaderComponent = useMemo(() => {
    if (itemHeader.renderType === 'self') {
      const selfHeader = itemHeader as AcordionListItemHeaderSelf;
      return createSelfHeaderComponent<R>(selfHeader.getHeaderLabel);
    }
    return (itemHeader as AcordionListItemHeaderComponent<R>).render;
  }, [itemHeader]);

  const stateContent = renderState(resolvedState, statesComponents, error);

  if (stateContent) {
    return (
      <div
        className={`${styles.acordionListContainer} ${className || ''}`}
        style={containerStyles}
        data-testid={`acordion-list-${id}`}
      >
        {stateContent}
      </div>
    );
  }

  return (
    <div
      className={`${styles.acordionListContainer} ${className || ''}`}
      style={containerStyles}
      data-testid={`acordion-list-${id}`}
    >
      {showData && data.map((item, index) => {
        const itemId = getItemId(item, index);
        const itemData = getItemData(item, index);
        const itemRefresh = getItemRefreshKey(itemId);

        return (
          <div key={`${itemId}-${refreshKey}-${itemRefresh}`} className={styles.acordionListItem}>
            <Accordion
              id={itemId}
              itemData={itemData}
              isOpen={isItemOpen(itemId)}
              header={{
                renderType: 'component',
                render: HeaderComponent as ComponentType<any>,
                heightMode: itemHeader.heightMode,
                height: itemHeader.height,
                minHeight: itemHeader.minHeight,
                arrowPosition: itemHeader.arrowPosition ?? 'right',
              }}
              body={{
                renderType: 'component',
                render: itemBody.render as ComponentType<any>,
                heightMode: itemBody.heightMode,
                height: itemBody.height,
                minHeight: itemBody.minHeight,
                behaviors: itemBody.behaviors,
              }}
              callbacks={{
                onToggleAccordion: (accId: string, isOpen: boolean) => {
                  handleToggle(accId, isOpen);
                },
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
