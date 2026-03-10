import { useState, useCallback, useMemo, useRef, type ReactNode } from 'react';
import type { LayoutColumnComponent, SlotContentEntry, UseLayoutColumnOptions, UseLayoutColumnReturn } from '../types';

export const useLayoutColumn = (options: UseLayoutColumnOptions): UseLayoutColumnReturn => {
  const { components: initialComponents, slots } = options;

  const componentsWithIds = useMemo(() => {
    return initialComponents.map((comp, index) => ({
      ...comp,
      id: comp.id || `component-${index}`,
    }));
  }, [initialComponents]);

  const [hiddenComponentIds, setHiddenComponentIds] = useState<Set<string>>(() => {
    const initialHidden = new Set<string>();
    componentsWithIds.forEach((comp) => {
      if (comp.hide) {
        initialHidden.add(comp.id!);
      }
    });
    return initialHidden;
  });

  const allComponents = useMemo(() => {
    return componentsWithIds.map((comp) => ({
      ...comp,
      hide: hiddenComponentIds.has(comp.id!),
    }));
  }, [componentsWithIds, hiddenComponentIds]);

  const visibleComponents = useMemo(() => {
    return allComponents.filter((comp) => !comp.hide);
  }, [allComponents]);

  const visibleSlots = useMemo(() => {
    const slotsWithComponents = new Set<number>();
    visibleComponents.forEach((comp) => {
      if (comp.slot >= 0 && comp.slot < slots) {
        slotsWithComponents.add(comp.slot);
      }
    });
    return slotsWithComponents.size;
  }, [visibleComponents, slots]);

  const hideComponent = useCallback((id: string) => {
    setHiddenComponentIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const showComponent = useCallback((id: string) => {
    setHiddenComponentIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleComponent = useCallback((id: string) => {
    setHiddenComponentIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const hideSlot = useCallback((slotIndex: number) => {
    setHiddenComponentIds((prev) => {
      const next = new Set(prev);
      componentsWithIds.forEach((comp) => {
        if (comp.slot === slotIndex) {
          next.add(comp.id!);
        }
      });
      return next;
    });
  }, [componentsWithIds]);

  const showSlot = useCallback((slotIndex: number) => {
    setHiddenComponentIds((prev) => {
      const next = new Set(prev);
      componentsWithIds.forEach((comp) => {
        if (comp.slot === slotIndex) {
          next.delete(comp.id!);
        }
      });
      return next;
    });
  }, [componentsWithIds]);

  const toggleSlot = useCallback((slotIndex: number) => {
    const slotComponents = componentsWithIds.filter((comp) => comp.slot === slotIndex);
    const allHidden = slotComponents.every((comp) => hiddenComponentIds.has(comp.id!));
    
    if (allHidden) {
      showSlot(slotIndex);
    } else {
      hideSlot(slotIndex);
    }
  }, [componentsWithIds, hiddenComponentIds, showSlot, hideSlot]);

  const isComponentVisible = useCallback((id: string) => {
    return !hiddenComponentIds.has(id);
  }, [hiddenComponentIds]);

  const isSlotVisible = useCallback((slotIndex: number) => {
    const slotComponents = componentsWithIds.filter((comp) => comp.slot === slotIndex);
    return slotComponents.some((comp) => !hiddenComponentIds.has(comp.id!));
  }, [componentsWithIds, hiddenComponentIds]);

  const isSlotEmpty = useCallback((slotIndex: number) => {
    return !isSlotVisible(slotIndex);
  }, [isSlotVisible]);

  const resetVisibility = useCallback(() => {
    const initialHidden = new Set<string>();
    componentsWithIds.forEach((comp) => {
      if (comp.hide) {
        initialHidden.add(comp.id!);
      }
    });
    setHiddenComponentIds(initialHidden);
  }, [componentsWithIds]);

  const [slotContentOverrides, setSlotContentOverrides] = useState<Record<number, SlotContentEntry>>({});
  const revisionCounterRef = useRef(0);

  const setSlotContent = useCallback((slotIndex: number, content: ReactNode, options?: { unmount?: boolean }) => {
    const shouldUnmount = options?.unmount ?? false;
    const revisionKey = shouldUnmount
      ? ++revisionCounterRef.current
      : (0);
    setSlotContentOverrides((prev) => {
      const prevKey = prev[slotIndex]?.revisionKey ?? 0;
      return {
        ...prev,
        [slotIndex]: { content, revisionKey: shouldUnmount ? revisionKey : prevKey },
      };
    });
  }, []);

  const clearSlotContent = useCallback((slotIndex: number) => {
    setSlotContentOverrides((prev) => {
      const next = { ...prev };
      delete next[slotIndex];
      return next;
    });
  }, []);

  const getSlotContent = useCallback((slotIndex: number): ReactNode | undefined => {
    return slotContentOverrides[slotIndex]?.content;
  }, [slotContentOverrides]);

  return {
    visibleComponents,
    allComponents,
    visibleSlots,
    hideComponent,
    showComponent,
    toggleComponent,
    hideSlot,
    showSlot,
    toggleSlot,
    isComponentVisible,
    isSlotVisible,
    isSlotEmpty,
    resetVisibility,
    setSlotContent,
    clearSlotContent,
    getSlotContent,
    slotContentOverrides,
  };
};
