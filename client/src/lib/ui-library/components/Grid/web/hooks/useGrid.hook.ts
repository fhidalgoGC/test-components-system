import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type {
  GridProps,
  GridState,
  GridCapacityInfo,
  InternalGridController,
} from '../../shared';

interface UseGridResult<T> {
  state: GridState;
  data: T[];
  columns: number;
  rows: number;
  containerRef: React.RefObject<HTMLDivElement>;
  sentinelRef: React.RefObject<HTMLDivElement>;
  containerStyle: React.CSSProperties;
  gridStyle: React.CSSProperties;
}

export function useGrid<T>(props: GridProps<T>): UseGridResult<T> {
  const { layout, grid, scroll, callbacks, controller, data: propData } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevCapacityRef = useRef<GridCapacityInfo | null>(null);
  const reachEndFiredRef = useRef(false);

  const [internalState, setInternalState] = useState<GridState>('idle');
  const [columns, setColumns] = useState(grid?.minColumns ?? 1);
  const [, setRefreshCount] = useState(0);

  const internalController = controller as InternalGridController | undefined;

  useEffect(() => {
    if (!internalController) return;
    const unsubscribe = internalController._subscribe(() => {
      setInternalState(internalController._getState());
      setRefreshCount((c) => c + 1);
    });
    setInternalState(internalController._getState());
    return unsubscribe;
  }, [internalController]);

  const controllerState = internalController ? internalController._getState() : internalState;
  const data = propData ?? [];

  const currentState: GridState =
    controllerState === 'idle' && data.length === 0 ? 'empty' : controllerState;

  const minColumns = grid?.minColumns ?? 1;
  const maxColumns = grid?.maxColumns ?? 4;
  const minCardWidth = grid?.minCardWidth ?? 280;
  const rowGap = grid?.rowGap ?? 16;
  const columnGap = grid?.columnGap ?? 16;

  const calculateColumns = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    let cols = Math.floor((containerWidth + columnGap) / (minCardWidth + columnGap));
    cols = Math.max(minColumns, Math.min(maxColumns, cols));

    setColumns(cols);

    const maxRows = grid?.maxRows;
    const visibleItems = maxRows ? cols * maxRows : data.length;

    const newCapacity: GridCapacityInfo = {
      columns: cols,
      rows: maxRows ?? Math.ceil(data.length / cols),
      visibleItems: Math.min(visibleItems, data.length),
    };

    const prev = prevCapacityRef.current;
    if (
      !prev ||
      prev.columns !== newCapacity.columns ||
      prev.rows !== newCapacity.rows ||
      prev.visibleItems !== newCapacity.visibleItems
    ) {
      prevCapacityRef.current = newCapacity;
      callbacks?.onCapacityChange?.(newCapacity);
    }
  }, [minColumns, maxColumns, minCardWidth, columnGap, grid?.maxRows, data.length, callbacks]);

  useEffect(() => {
    calculateColumns();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateColumns();
      if (container) {
        callbacks?.onLayoutChange?.({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [calculateColumns, callbacks]);

  useEffect(() => {
    if (!scroll?.enabled) return;
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          reachEndFiredRef.current = false;
          return;
        }

        if (controllerState !== 'idle') return;
        if (reachEndFiredRef.current) return;
        if (data.length === 0) return;

        reachEndFiredRef.current = true;
        callbacks?.onReachEnd?.();
      },
      {
        root: containerRef.current,
        threshold: 0,
        rootMargin: `0px 0px ${scroll.threshold ?? 50}px 0px`,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [scroll?.enabled, scroll?.threshold, currentState, data.length, callbacks, internalController]);

  useEffect(() => {
    if (currentState === 'idle') {
      reachEndFiredRef.current = false;
    }
  }, [currentState]);

  useEffect(() => {
    callbacks?.onStateChange?.(currentState);
  }, [currentState, callbacks]);

  const containerStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};

    if (layout?.widthMode === 'fixed' && layout.width) {
      style.width = layout.width;
    }
    if (layout?.minWidth) {
      style.minWidth = layout.minWidth;
    }
    if (layout?.heightMode === 'fixed' && layout.height) {
      style.height = layout.height;
    }
    if (layout?.minHeight) {
      style.minHeight = layout.minHeight;
    }

    return style;
  }, [layout]);

  const gridStyle = useMemo<React.CSSProperties>(() => {
    return {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      rowGap,
      columnGap,
      minHeight: grid?.minCardHeight ? grid.minCardHeight : undefined,
    };
  }, [columns, rowGap, columnGap, grid?.minCardHeight]);

  return {
    state: currentState,
    data,
    columns,
    rows: Math.ceil(data.length / columns),
    containerRef,
    sentinelRef,
    containerStyle,
    gridStyle,
  };
}
