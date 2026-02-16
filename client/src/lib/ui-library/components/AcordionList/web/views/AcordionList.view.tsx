import { useMemo } from 'react';
import { Accordion } from '@/lib/ui-library/components/Accordion';
import type {
  AcordionListProps,
  AcordionListItemHeaderSelf,
  AcordionListItemHeaderComponent,
  AcordionListItemDataProps,
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
    className,
  } = props;

  const {
    handleToggle,
    isItemOpen,
    refreshKey,
    getItemRefreshKey,
  } = useAcordionList({
    data,
    getItemId,
    behaviors,
    callbacks,
    controller,
  });

  const containerStyles = useMemo(() => getContainerStyles(layout), [layout]);

  const HeaderComponent = useMemo(() => {
    if (itemHeader.renderType === 'self') {
      const selfHeader = itemHeader as AcordionListItemHeaderSelf;
      return createSelfHeaderComponent<R>(selfHeader.getHeaderLabel);
    }
    return (itemHeader as AcordionListItemHeaderComponent<R>).render;
  }, [itemHeader]);

  return (
    <div
      className={`${styles.acordionListContainer} ${className || ''}`}
      style={containerStyles}
      data-testid={`acordion-list-${id}`}
    >
      {data.map((item, index) => {
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
