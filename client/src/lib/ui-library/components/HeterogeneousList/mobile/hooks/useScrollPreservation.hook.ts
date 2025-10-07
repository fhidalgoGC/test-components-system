import { useEffect, useRef } from 'react';

interface UseScrollPreservationOptions {
  enabled: boolean;
  itemCount: number;
}

export function useScrollPreservation({ enabled, itemCount }: UseScrollPreservationOptions) {
  const scrollPositionRef = useRef<number>(0);
  const previousItemCountRef = useRef<number>(itemCount);

  useEffect(() => {
    if (!enabled) return;

    const saveScrollPosition = () => {
      scrollPositionRef.current = window.scrollY;
    };

    // Save scroll position before new items are added
    if (itemCount > previousItemCountRef.current) {
      saveScrollPosition();
    }

    previousItemCountRef.current = itemCount;
  }, [itemCount, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Restore scroll position after DOM update
    if (scrollPositionRef.current > 0) {
      window.scrollTo(0, scrollPositionRef.current);
    }
  });

  return scrollPositionRef;
}
