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
  const controllerStateRef = useRef<GridState>('idle');
  const callbacksRef = useRef(callbacks);

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

  controllerStateRef.current = controllerState;
  callbacksRef.current = callbacks;

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
    const minRows = grid?.minRows;
    const naturalRows = Math.ceil(data.length / cols);
    const effectiveRows = maxRows ? Math.min(naturalRows, maxRows) : naturalRows;
    const visibleItems = maxRows ? cols * maxRows : data.length;

    const newCapacity: GridCapacityInfo = {
      columns: cols,
      rows: effectiveRows,
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
  }, [minColumns, maxColumns, minCardWidth, columnGap, grid?.minRows, grid?.maxRows, data.length, callbacks]);

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

  const dataLengthRef = useRef(data.length);
  dataLengthRef.current = data.length;

  useEffect(() => {
    if (!scroll?.enabled) return;
    if (!sentinelRef.current) return;
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          reachEndFiredRef.current = false;
          return;
        }

        if (controllerStateRef.current !== 'idle') return;
        if (reachEndFiredRef.current) return;
        if (dataLengthRef.current === 0) return;

        reachEndFiredRef.current = true;
        callbacksRef.current?.onReachEnd?.();
      },
      {
        root: containerRef.current,
        threshold: 0,
        rootMargin: `0px 0px ${scroll.threshold ?? 50}px 0px`,
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [scroll?.enabled, scroll?.threshold]);

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

  const visibleData = useMemo(() => {
    if (grid?.maxRows && columns > 0) {
      const maxItems = columns * grid.maxRows;
      return data.slice(0, maxItems);
    }
    return data;
  }, [data, columns, grid?.maxRows]);

  const heightMode = layout?.heightMode ?? 'auto';

  const gridStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      rowGap,
      columnGap,
    };
    if (grid?.minCardHeight) {
      style.minHeight = grid.minCardHeight;
    }
    if (grid?.minRows && grid?.minCardHeight) {
      const minGridHeight = grid.minRows * grid.minCardHeight + (grid.minRows - 1) * rowGap;
      style.minHeight = Math.max(minGridHeight, grid.minCardHeight);
    }
    if (grid?.maxRows && grid?.minCardHeight && heightMode !== 'auto') {
      const maxGridHeight = grid.maxRows * grid.minCardHeight + (grid.maxRows - 1) * rowGap;
      style.maxHeight = maxGridHeight;
    }
    return style;
  }, [columns, rowGap, columnGap, grid?.minCardHeight, grid?.minRows, grid?.maxRows, heightMode]);

  return {
    state: currentState,
    data: visibleData,
    columns,
    rows: Math.ceil(visibleData.length / columns),
    containerRef,
    sentinelRef,
    containerStyle,
    gridStyle,
  };
}
