import { useState, useEffect, useRef, useCallback } from 'react';
import type { CarouselProps, UseCarouselReturn } from '../types';

const DRAG_THRESHOLD = 30; // px
const MIN_AUTOPLAY_INTERVAL = 1000; // ms

export const useCarousel = (props: CarouselProps): UseCarouselReturn => {
  const {
    items,
    draggable = true,
    autoPlay = false,
    autoPlayIntervalMs = 3000,
    pauseOnHover = true,
    loop = items.length > 1,
    initialIndex = 0,
    currentIndex: controlledIndex,
    onChange,
    onReachStart,
    onReachEnd,
    keyboard = true,
  } = props;

  const isControlled = controlledIndex !== undefined;
  const normalizedInterval = Math.max(autoPlayIntervalMs, MIN_AUTOPLAY_INTERVAL);
  const normalizedInitialIndex = Math.max(0, Math.min(initialIndex, items.length - 1));

  // For infinite loop: we need to adjust the internal index to account for cloned slides
  // If loop is enabled, we start at index = items.length (the first real slide after the clones)
  const getInitialInternalIndex = () => {
    if (loop && items.length > 1) {
      return normalizedInitialIndex + items.length;
    }
    return normalizedInitialIndex;
  };

  // State
  const [internalIndex, setInternalIndex] = useState(getInitialInternalIndex());
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartXRef = useRef<number>(0);
  const dragStartYRef = useRef<number>(0);
  const dragCurrentXRef = useRef<number>(0);
  const dragCurrentYRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Current index (controlled or uncontrolled)
  // For infinite loop, we need to map the internal index back to the real index
  const getRealIndex = useCallback((idx: number) => {
    if (!loop || items.length <= 1) return idx;
    // Map the internal index (which includes clones) to the real index
    if (idx < items.length) return items.length - 1; // First clone set
    if (idx >= items.length * 2) return 0; // Last clone set
    return idx - items.length;
  }, [loop, items.length]);

  const currentIndex = isControlled 
    ? Math.max(0, Math.min(controlledIndex, items.length - 1))
    : getRealIndex(internalIndex);

  // Can navigate
  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < items.length - 1;

  // Go to slide
  const goToSlide = useCallback((index: number) => {
    const newIndex = Math.max(0, Math.min(index, items.length - 1));
    
    if (newIndex === currentIndex) return;

    setIsAnimating(true);
    setIsTransitioning(true);
    
    if (!isControlled) {
      // For infinite loop, convert real index to internal index
      const targetInternalIndex = loop && items.length > 1 ? newIndex + items.length : newIndex;
      setInternalIndex(targetInternalIndex);
    }
    
    onChange?.(newIndex);

    // Reset reach flags when navigating
    setHasReachedStart(false);
    setHasReachedEnd(false);

    // Check if reached boundaries
    if (!loop) {
      if (newIndex === 0 && !hasReachedStart) {
        setHasReachedStart(true);
        onReachStart?.();
      }
      if (newIndex === items.length - 1 && !hasReachedEnd) {
        setHasReachedEnd(true);
        onReachEnd?.();
      }
    }

    setTimeout(() => setIsAnimating(false), 300);
  }, [currentIndex, items.length, isControlled, loop, onChange, onReachStart, onReachEnd, hasReachedStart, hasReachedEnd]);

  // Navigation
  const goToPrev = useCallback(() => {
    if (!canGoPrev) return;
    
    if (loop && items.length > 1) {
      // For infinite loop, just decrement the internal index
      setIsAnimating(true);
      setIsTransitioning(true);
      const newInternalIndex = internalIndex - 1;
      setInternalIndex(newInternalIndex);
      
      // Calculate real index from the new internal index
      let newRealIndex = newInternalIndex - items.length;
      if (newInternalIndex < items.length) newRealIndex = items.length - 1;
      if (newInternalIndex >= items.length * 2) newRealIndex = 0;
      
      onChange?.(newRealIndex);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
      goToSlide(newIndex);
    }
  }, [currentIndex, canGoPrev, loop, items.length, goToSlide, internalIndex, onChange]);

  const goToNext = useCallback(() => {
    if (!canGoNext) return;
    
    if (loop && items.length > 1) {
      // For infinite loop, just increment the internal index
      setIsAnimating(true);
      setIsTransitioning(true);
      const newInternalIndex = internalIndex + 1;
      setInternalIndex(newInternalIndex);
      
      // Calculate real index from the new internal index
      let newRealIndex = newInternalIndex - items.length;
      if (newInternalIndex < items.length) newRealIndex = items.length - 1;
      if (newInternalIndex >= items.length * 2) newRealIndex = 0;
      
      onChange?.(newRealIndex);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      const newIndex = currentIndex === items.length - 1 ? items.length - 1 : currentIndex + 1;
      goToSlide(newIndex);
    }
  }, [currentIndex, canGoNext, loop, items.length, goToSlide, internalIndex, onChange]);

  // Autoplay logic
  useEffect(() => {
    if (!autoPlay || isPaused || items.length <= 1) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    // Clear existing timer
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    // Start new timer
    autoPlayTimerRef.current = setInterval(() => {
      goToNext();
    }, normalizedInterval);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [autoPlay, isPaused, normalizedInterval, items.length, goToNext]);

  // Restart autoplay when currentIndex changes externally (controlled mode)
  useEffect(() => {
    if (isControlled && autoPlay && !isPaused) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, normalizedInterval);
    }
  }, [isControlled, autoPlay, isPaused, controlledIndex, normalizedInterval, goToNext]);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && autoPlay) {
      setIsPaused(true);
    }
  }, [pauseOnHover, autoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && autoPlay) {
      setIsPaused(false);
    }
  }, [pauseOnHover, autoPlay]);

  // Drag handlers - fixed to track pointer delta correctly
  const handleDragStart = useCallback((clientX: number, clientY?: number) => {
    if (!draggable) return;
    
    dragStartXRef.current = clientX;
    dragCurrentXRef.current = clientX;
    if (clientY !== undefined) {
      dragStartYRef.current = clientY;
      dragCurrentYRef.current = clientY;
    }
    isDraggingRef.current = true;
    setIsDragging(true);
    
    // Pause autoplay during drag
    if (autoPlay) {
      setIsPaused(true);
    }
  }, [draggable, autoPlay]);

  const handleDragMove = useCallback((clientX: number, clientY?: number) => {
    if (!isDraggingRef.current || !draggable) return;

    dragCurrentXRef.current = clientX;
    if (clientY !== undefined) {
      dragCurrentYRef.current = clientY;
    }

    const deltaX = Math.abs(clientX - dragStartXRef.current);
    const deltaY = clientY !== undefined ? Math.abs(clientY - dragStartYRef.current) : 0;

    // Cancel if vertical gesture (for scrolling)
    if (deltaY > deltaX && deltaY > DRAG_THRESHOLD) {
      isDraggingRef.current = false;
      setIsDragging(false);
      if (autoPlay) {
        setIsPaused(false);
      }
    }
  }, [draggable, autoPlay]);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current || !draggable) return;

    // Calculate the actual drag delta
    const deltaX = dragStartXRef.current - dragCurrentXRef.current;
    
    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      if (deltaX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    isDraggingRef.current = false;
    setIsDragging(false);
    
    // Resume autoplay after drag
    if (autoPlay) {
      setIsPaused(false);
    }
  }, [draggable, autoPlay, goToNext, goToPrev]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!keyboard) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrev();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(items.length - 1);
        break;
    }
  }, [keyboard, goToPrev, goToNext, goToSlide, items.length]);

  // Attach keyboard listener
  useEffect(() => {
    if (!keyboard) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboard, handleKeyDown]);

  // Handle infinite loop: reset position after transition
  useEffect(() => {
    if (!loop || items.length <= 1 || isAnimating) return;

    // Check if we're on a cloned slide
    if (internalIndex >= items.length * 2) {
      // We're on the last clone set, jump to the first real slide
      setTimeout(() => {
        setIsTransitioning(false);
        setInternalIndex(items.length);
        // Re-enable transition after the instant jump
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
    } else if (internalIndex < items.length) {
      // We're on the first clone set, jump to the last real slide
      setTimeout(() => {
        setIsTransitioning(false);
        setInternalIndex(items.length * 2 - 1);
        // Re-enable transition after the instant jump
        setTimeout(() => setIsTransitioning(true), 50);
      }, 300);
    }
  }, [internalIndex, loop, items.length, isAnimating]);

  // Update internal index when items change
  useEffect(() => {
    if (!isControlled && internalIndex >= items.length && !loop) {
      const newIndex = Math.max(0, items.length - 1);
      setInternalIndex(newIndex);
      onChange?.(newIndex);
    }
  }, [items.length, internalIndex, isControlled, onChange, loop]);

  return {
    currentIndex,
    internalIndex, // For infinite loop
    isAnimating,
    isDragging,
    isPaused,
    canGoPrev,
    canGoNext,
    goToSlide,
    goToPrev,
    goToNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleKeyDown,
    handleMouseEnter,
    handleMouseLeave,
    containerRef,
    trackRef,
    isTransitioning, // For controlling CSS transitions
  };
};
