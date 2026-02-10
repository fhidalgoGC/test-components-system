import { useEffect, useRef, useCallback, useState } from 'react';
import type { ListProps, InternalListController, RenderState } from '../../shared/List.types';
import { useListController } from '../../shared/useListController';
import styles from '../css/List.module.css';

interface ListState<T> {
  data: T[];
  renderState: RenderState;
  page: number;
  nextPage: number;
}

export const ListNormalLayout = <T,>(props: ListProps<T>) => {
  const {
    id,
    layout = {},
    callbacks = {},
    behaviors = {},
    loading = {},
    item,
    data,
    controller: externalController,
    className,
  } = props;

  const {
    widthMode = 'full',
    width,
    minWidth,
    heightMode = 'auto',
    height,
    minHeight,
  } = layout;

  const { onScroll, onScrollInfinity } = callbacks;
  const { scroll = 'normal', paginator } = behaviors;
  const { renderType: loadingRenderType = 'self', render: loadingRender, position: loadingPosition = 'bottom' } = loading;

  const internalController = useListController<T>();
  const controller = (externalController || internalController) as InternalListController<T>;

  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [state, setState] = useState<ListState<T>>({
    data: controller._getData(),
    renderState: controller.getRenderState(),
    page: controller.getPage(),
    nextPage: controller.getNextPage(),
  });

  useEffect(() => {
    const unsubscribe = controller._subscribe(() => {
      setState({
        data: controller._getData(),
        renderState: controller.getRenderState(),
        page: controller.getPage(),
        nextPage: controller.getNextPage(),
      });
    });
    return unsubscribe;
  }, [controller]);

  useEffect(() => {
    controller._register(id);
    return () => {
      controller._unregister(id);
    };
  }, [controller, id]);

  useEffect(() => {
    if (data && data.length > 0) {
      controller.setData(data);
      if (controller.getRenderState() === 'renderIdle') {
        controller.setRenderState('renderComplete');
      }
    }
  }, [data, controller]);

  useEffect(() => {
    if (paginator?.maxItem) {
      controller.setPageSize(paginator.maxItem);
    }
  }, [paginator?.maxItem, controller]);

  useEffect(() => {
    if (scroll !== 'infinityScroll' || !sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && state.renderState !== 'renderLoading') {
          onScrollInfinity?.(state.nextPage);
        }
      },
      {
        root: listRef.current,
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [scroll, state.renderState, state.nextPage, onScrollInfinity]);

  const handleScroll = useCallback(() => {
    onScroll?.(id);
  }, [onScroll, id]);

  const containerClasses = [
    styles.container,
    widthMode === 'full' && styles.containerWidthFull,
    widthMode === 'auto' && styles.containerWidthAuto,
    heightMode === 'full' && styles.containerHeightFull,
    heightMode === 'auto' && styles.containerHeightAuto,
    className,
  ].filter(Boolean).join(' ');

  const listClasses = [
    styles.list,
    scroll === 'normal' && styles.listScrollNormal,
    scroll === 'infinityScroll' && styles.listScrollNormal,
    scroll === 'none' && styles.listScrollNone,
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {};
  if (widthMode === 'fixed' && width) containerStyle.width = width;
  if (minWidth) containerStyle.minWidth = minWidth;
  if (heightMode === 'fixed' && height) containerStyle.height = height === 'auto' ? 'auto' : height;
  if (minHeight) containerStyle.minHeight = minHeight;

  const listStyle: React.CSSProperties = {};
  if (heightMode === 'fixed' && height && height !== 'auto') {
    listStyle.height = height;
    listStyle.maxHeight = height;
  }

  const itemClasses = [
    styles.item,
    item.heightMode === 'full' && styles.itemHeightFull,
    item.heightMode === 'auto' && styles.itemHeightAuto,
  ].filter(Boolean).join(' ');

  const getItemStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = {};
    if (item.heightMode === 'fixed' && item.height) {
      style.height = item.height === 'auto' ? 'auto' : item.height;
    }
    if (item.minHeight) style.minHeight = item.minHeight;
    return style;
  };

  const renderLoadingIndicator = () => {
    if (state.renderState !== 'renderLoading') return null;

    const loadingClasses = [
      styles.loadingContainer,
      loadingPosition === 'top' && styles.loadingTop,
      loadingPosition === 'bottom' && styles.loadingBottom,
      loadingPosition === 'over' && styles.loadingOver,
    ].filter(Boolean).join(' ');

    const content = loadingRenderType === 'component' && loadingRender ? (
      typeof loadingRender === 'function' ? (
        (() => {
          const LoadingComponent = loadingRender as React.ComponentType;
          return <LoadingComponent />;
        })()
      ) : loadingRender
    ) : (
      <div className={styles.loadingDefault}>
        <div className={styles.spinner} />
        <span>Loading...</span>
      </div>
    );

    return (
      <div className={loadingClasses} data-testid={`${id}-loading`}>
        {content}
      </div>
    );
  };

  const renderContent = () => {
    const currentData = state.data;
    const renderState = state.renderState as RenderState;

    if (renderState === 'renderIdle' && currentData.length === 0) {
      return (
        <div className={styles.idleState} data-testid={`${id}-idle`}>
          Waiting for data...
        </div>
      );
    }

    if (renderState === 'renderError') {
      return (
        <div className={styles.errorState} data-testid={`${id}-error`}>
          Error loading data
        </div>
      );
    }

    if (renderState === 'renderComplete' && currentData.length === 0) {
      return (
        <div className={styles.emptyState} data-testid={`${id}-empty`}>
          No items to display
        </div>
      );
    }

    return (
      <>
        {loadingPosition === 'top' && renderLoadingIndicator()}
        
        {currentData.map((dataItem, index) => (
          <div
            key={index}
            className={itemClasses}
            style={getItemStyle()}
            data-testid={`${id}-item-${index}`}
          >
            {item.render(dataItem, index)}
          </div>
        ))}

        {scroll === 'infinityScroll' && (
          <div
            ref={sentinelRef}
            className={styles.sentinel}
            data-testid={`${id}-sentinel`}
            aria-hidden="true"
          />
        )}

        {loadingPosition === 'bottom' && renderLoadingIndicator()}
      </>
    );
  };

  return (
    <div
      className={containerClasses}
      style={containerStyle}
      data-testid={`${id}-container`}
    >
      {loadingPosition === 'over' && renderLoadingIndicator()}
      
      <div
        ref={listRef}
        className={listClasses}
        style={listStyle}
        onScroll={handleScroll}
        role="list"
        aria-busy={state.renderState === 'renderLoading'}
        data-testid={id}
      >
        {renderContent()}
      </div>
    </div>
  );
};
