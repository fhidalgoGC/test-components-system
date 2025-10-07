import { useMemo } from 'react';
import type {
  HeterogeneousListProps,
  RegistryModeProps,
  ElementsModeProps,
} from '../types';
import { useHeterogeneousList } from '../hooks';
import {
  containerClasses,
  listClasses,
  itemClasses,
  dividerLineClasses,
  dividerComponentClasses,
  emptyStateClasses,
  loadingIndicatorClasses,
  endRenderClasses,
  errorStateClasses,
  sentinelClasses,
} from '../css';

export const HeterogeneousListView = (props: HeterogeneousListProps) => {
  const {
    mode,
    className,
    listClassName,
    itemClassName,
    itemWrapperProps = {},
    gap,
    paddingStart,
    paddingEnd,
    dividerVariant = 'none',
    dividerEvery = 1,
    dividerInset,
    renderDivider,
    empty,
    emptySpacing,
    endRender,
    endSpacing,
    loading: loadingElement,
    errorRender,
    infiniteScroll = true,
  } = props;

  const { state, sentinelRef, retry } = useHeterogeneousList(props);

  // Build container styles
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (paddingStart !== undefined) {
      style.paddingTop = typeof paddingStart === 'number' ? `${paddingStart}px` : paddingStart;
    }
    if (paddingEnd !== undefined) {
      style.paddingBottom = typeof paddingEnd === 'number' ? `${paddingEnd}px` : paddingEnd;
    }
    return style;
  }, [paddingStart, paddingEnd]);

  // Build list styles
  const listStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    if (gap !== undefined && dividerVariant === 'none') {
      style.gap = typeof gap === 'number' ? `${gap}px` : gap;
    }
    return style;
  }, [gap, dividerVariant]);

  // Get item key function
  const getItemKey = (item: any, index: number): string | number => {
    if (mode === 'registry') {
      const registryProps = props as RegistryModeProps;
      if (registryProps.itemKey) {
        return registryProps.itemKey(item, index);
      }
      return item.id ?? index;
    }
    return index;
  };

  // Render item based on mode
  const renderItem = (item: any, index: number): React.ReactElement | null => {
    if (mode === 'registry') {
      const registryProps = props as RegistryModeProps;
      const Component = registryProps.registry[item.kindComponent];
      
      if (!Component) {
        console.error(`No component found for kindComponent: ${item.kindComponent}`);
        return null;
      }
      
      return <Component item={item} index={index} />;
    }

    return null;
  };

  // Render divider
  const renderDividerElement = (index: number) => {
    if (dividerVariant === 'none') return null;
    if (dividerEvery && (index + 1) % dividerEvery !== 0) return null;

    if (dividerVariant === 'component' && renderDivider) {
      return (
        <div 
          key={`divider-${index}`} 
          className={dividerComponentClasses()} 
          data-testid={`divider-${index}`}
        >
          {renderDivider(index)}
        </div>
      );
    }

    if (dividerVariant === 'line') {
      const dividerStyle: React.CSSProperties = {};
      
      if (gap) {
        dividerStyle.margin = `${typeof gap === 'number' ? gap / 2 : '0.5rem'} 0`;
      }

      if (dividerInset !== undefined) {
        dividerStyle.marginLeft = typeof dividerInset === 'number' ? `${dividerInset}px` : dividerInset;
        dividerStyle.marginRight = typeof dividerInset === 'number' ? `${dividerInset}px` : dividerInset;
      }

      return (
        <div
          key={`divider-${index}`}
          className={dividerLineClasses()}
          style={Object.keys(dividerStyle).length > 0 ? dividerStyle : undefined}
          data-testid={`divider-${index}`}
          aria-hidden="true"
        />
      );
    }

    return null;
  };

  // Build items list
  const itemsList = useMemo(() => {
    const items = mode === 'elements' ? state.elements : state.items;
    const result: React.ReactNode[] = [];

    items.forEach((item, index) => {
      const key = mode === 'elements' ? index : getItemKey(item, index);
      
      // Add item
      result.push(
        <div
          key={key}
          className={itemClasses(itemClassName)}
          {...itemWrapperProps}
          data-testid={`list-item-${index}`}
        >
          {mode === 'elements' ? item : renderItem(item, index)}
        </div>
      );

      // Add divider (but not after the last item)
      if (index < items.length - 1) {
        const divider = renderDividerElement(index);
        if (divider) {
          result.push(divider);
        }
      }
    });

    return result;
  }, [mode, state.elements, state.items, itemClassName, itemWrapperProps, dividerVariant, dividerEvery, gap, dividerInset, renderDivider]);

  // Show empty state
  if (!state.isLoading && itemsList.length === 0 && !state.hasMore) {
    const emptyStyle: React.CSSProperties = {};
    if (emptySpacing !== undefined) {
      emptyStyle.padding = typeof emptySpacing === 'number' ? `${emptySpacing}px` : emptySpacing;
    }

    return (
      <div className={containerClasses(className)} data-testid="heterogeneous-list-mobile">
        <div 
          className={emptyStateClasses()} 
          style={Object.keys(emptyStyle).length > 0 ? emptyStyle : undefined} 
          data-testid="empty-state"
        >
          {empty || <div>No items to display</div>}
        </div>
      </div>
    );
  }

  // Show error state
  if (state.error && errorRender) {
    return (
      <div className={containerClasses(className)} data-testid="heterogeneous-list-mobile">
        <div className={errorStateClasses()} data-testid="error-state">
          {errorRender(state.error, retry)}
        </div>
      </div>
    );
  }

  const finalContainerStyle = Object.keys(containerStyle).length > 0 ? containerStyle : undefined;
  const finalListStyle = Object.keys(listStyle).length > 0 ? listStyle : undefined;

  return (
    <div
      className={containerClasses(className)}
      style={finalContainerStyle}
      data-testid="heterogeneous-list-mobile"
      role="list"
      aria-busy={state.isLoading}
    >
      <div className={listClasses(listClassName)} style={finalListStyle}>
        {itemsList}
      </div>

      {/* Loading indicator */}
      {state.isLoading && (
        <div className={loadingIndicatorClasses()} data-testid="loading-indicator" aria-live="polite">
          {loadingElement || <div>Loading...</div>}
        </div>
      )}

      {/* End render */}
      {!state.hasMore && !state.isLoading && itemsList.length > 0 && (
        <div
          className={endRenderClasses()}
          data-testid="end-render"
          style={{
            padding: endSpacing
              ? typeof endSpacing === 'number'
                ? `${endSpacing}px`
                : endSpacing
              : undefined,
          }}
          aria-live="polite"
        >
          {endRender}
        </div>
      )}

      {/* Sentinel for infinite scroll */}
      {infiniteScroll && state.hasMore && !state.isLoading && (
        <div
          ref={sentinelRef}
          className={sentinelClasses()}
          data-testid="scroll-sentinel"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
