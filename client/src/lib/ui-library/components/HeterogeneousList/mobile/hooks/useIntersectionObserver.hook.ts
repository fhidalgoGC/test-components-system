import { useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  enabled: boolean;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  onIntersect,
  enabled,
  rootMargin = '100px',
  threshold = 0.1,
}: UseIntersectionObserverOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const setSentinel = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!enabled || !node) {
        sentinelRef.current = null;
        return;
      }

      sentinelRef.current = node;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            onIntersect();
          }
        },
        {
          rootMargin,
          threshold,
        }
      );

      observerRef.current.observe(node);
    },
    [enabled, onIntersect, rootMargin, threshold]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return setSentinel;
}
