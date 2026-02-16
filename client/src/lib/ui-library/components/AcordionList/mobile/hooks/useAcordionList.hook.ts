import { useState, useCallback, useEffect } from 'react';
import type {
  AcordionListProps,
  AcordionListBehaviors,
  AcordionListCallbacks,
  InternalAcordionListController,
} from '../../shared';

type UseAcordionListOptions = {
  data: AcordionListProps['data'];
  getItemId: AcordionListProps['getItemId'];
  behaviors?: AcordionListBehaviors;
  callbacks?: AcordionListCallbacks;
  controller?: any;
};

export function useAcordionList(options: UseAcordionListOptions) {
  const { data, getItemId, behaviors, callbacks, controller } = options;
  const mode = behaviors?.mode ?? 'single';
  const isControlled = behaviors?.openIds !== undefined;

  const [internalOpenIds, setInternalOpenIds] = useState<Set<string>>(() => {
    return new Set(behaviors?.defaultOpenIds || []);
  });

  const [, forceUpdate] = useState(0);

  const internalController = controller as InternalAcordionListController | undefined;

  useEffect(() => {
    if (internalController?._subscribe) {
      return internalController._subscribe(() => {
        forceUpdate((c) => c + 1);
      });
    }
  }, [internalController]);

  useEffect(() => {
    if (internalController && behaviors?.defaultOpenIds?.length) {
      behaviors.defaultOpenIds.forEach((id) => {
        internalController.open(id);
      });
    }
  }, []);

  const allItemIds = useCallback(() => {
    return data.map((item, index) => getItemId(item, index));
  }, [data, getItemId]);

  useEffect(() => {
    if (internalController) {
      (internalController as any)._setAllItemIds = allItemIds;
    }
  }, [internalController, allItemIds]);

  const openIds = isControlled
    ? new Set(behaviors!.openIds!)
    : internalController
      ? new Set(internalController.getOpenIds())
      : internalOpenIds;

  const handleToggle = useCallback(
    (id: string, isOpen: boolean) => {
      if (internalController) {
        if (isOpen) {
          if (mode === 'single') {
            const currentOpen = internalController.getOpenIds();
            currentOpen.forEach((openId: string) => {
              if (openId !== id) {
                internalController.close(openId);
              }
            });
          }
          internalController.open(id);
        } else {
          internalController.close(id);
        }
      } else if (!isControlled) {
        setInternalOpenIds((prev) => {
          const next = new Set(prev);
          if (isOpen) {
            if (mode === 'single') {
              next.clear();
            }
            next.add(id);
          } else {
            next.delete(id);
          }
          return next;
        });
      }

      callbacks?.onToggle?.(id, isOpen);

      if (callbacks?.onOpenChange) {
        const currentOpen = internalController
          ? new Set(internalController.getOpenIds())
          : new Set(openIds);
        if (isOpen) {
          if (mode === 'single') {
            currentOpen.clear();
          }
          currentOpen.add(id);
        } else {
          currentOpen.delete(id);
        }
        callbacks.onOpenChange(Array.from(currentOpen));
      }
    },
    [isControlled, mode, callbacks, openIds, internalController],
  );

  const isItemOpen = useCallback(
    (id: string): boolean => {
      if (internalController) {
        return internalController.isOpen(id);
      }
      return openIds.has(id);
    },
    [openIds, internalController],
  );

  const refreshKey = internalController?._getRefreshKey?.() ?? 0;

  const getItemRefreshKey = useCallback(
    (id: string): number => {
      return internalController?._getItemRefreshKey?.(id) ?? 0;
    },
    [internalController],
  );

  return {
    openIds,
    handleToggle,
    isItemOpen,
    refreshKey,
    getItemRefreshKey,
  };
}
