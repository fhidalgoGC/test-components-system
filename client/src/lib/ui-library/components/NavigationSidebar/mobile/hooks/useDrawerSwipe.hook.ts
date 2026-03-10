import { useRef, useCallback, type RefObject } from 'react';

interface UseDrawerSwipeOptions {
  onClose: () => void;
  isOpen: boolean;
  drawerWidth?: number;
  threshold?: number;
  minSwipeDistance?: number;
}

interface SwipeState {
  startX: number;
  startY: number;
  currentX: number;
  isDragging: boolean;
  startTime: number;
}

export function useDrawerSwipe({
  onClose,
  isOpen,
  drawerWidth = 280,
  threshold = 0.3,
  minSwipeDistance = 50,
}: UseDrawerSwipeOptions) {
  const stateRef = useRef<SwipeState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    isDragging: false,
    startTime: 0,
  });
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isOpen) return;
      const touch = e.touches[0];
      stateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        currentX: touch.clientX,
        isDragging: false,
        startTime: Date.now(),
      };
    },
    [isOpen]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isOpen) return;
      const touch = e.touches[0];
      const state = stateRef.current;
      const deltaX = touch.clientX - state.startX;
      const deltaY = touch.clientY - state.startY;

      if (!state.isDragging) {
        if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
          state.isDragging = true;
        } else {
          return;
        }
      }

      if (deltaX > 0) return;

      state.currentX = touch.clientX;

      if (drawerRef.current) {
        const translateX = Math.min(0, deltaX);
        drawerRef.current.style.transition = 'none';
        drawerRef.current.style.transform = `translateX(${translateX}px)`;
      }
    },
    [isOpen]
  );

  const handleTouchEnd = useCallback(
    (_e: React.TouchEvent) => {
      if (!isOpen) return;
      const state = stateRef.current;

      if (!state.isDragging) return;

      const deltaX = state.currentX - state.startX;
      const elapsed = Date.now() - state.startTime;
      const velocity = Math.abs(deltaX) / elapsed;
      const movedRatio = Math.abs(deltaX) / drawerWidth;

      if (drawerRef.current) {
        drawerRef.current.style.transition = '';
        drawerRef.current.style.transform = '';
      }

      const isFastSwipe = velocity > 0.5 && Math.abs(deltaX) > minSwipeDistance;
      const isPastThreshold = movedRatio > threshold;

      if ((isFastSwipe || isPastThreshold) && deltaX < 0) {
        onClose();
      }

      stateRef.current = {
        startX: 0,
        startY: 0,
        currentX: 0,
        isDragging: false,
        startTime: 0,
      };
    },
    [isOpen, onClose, drawerWidth, threshold, minSwipeDistance]
  );

  return {
    drawerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
