import { ReactElement } from 'react';

export interface CarouselProps {
  // Core props
  items: ReactElement[];
  
  // Drag & Autoplay
  draggable?: boolean; // Default: true
  autoPlay?: boolean; // Default: false
  autoPlayIntervalMs?: number; // Min: 1000ms
  pauseOnHover?: boolean; // Default: true
  
  // Indicators
  showIndicators?: boolean; // Default: true if items.length > 1
  indicatorsClickable?: boolean; // Default: true
  
  // Navigation buttons
  showNavigationButtons?: boolean; // Default: true if items.length > 1
  
  // Layout
  spaceBetweenPx?: number; // Default: 0
  itemHeight?: string; // Accepts %, px, rem, vh, or design token
  slidesPerView?: 1 | 2 | 3 | 'auto'; // Default: 1
  align?: 'start' | 'center' | 'end'; // Default: 'start'
  
  // Navigation
  keyboard?: boolean; // Default: true on desktop
  loop?: boolean; // Default: true if items.length > 1
  
  // Control
  initialIndex?: number; // Default: 0
  currentIndex?: number; // Controlled mode
  onChange?: (index: number) => void;
  
  // Events
  onReachStart?: () => void;
  onReachEnd?: () => void;
  
  // Accessibility & Testing
  id?: string;
  
  // i18n (from library structure)
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  className?: string;
}

export interface CarouselContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}

export interface UseCarouselReturn {
  currentIndex: number;
  isAnimating: boolean;
  isDragging: boolean;
  isPaused: boolean;
  canGoPrev: boolean;
  canGoNext: boolean;
  goToSlide: (index: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  handleDragStart: (clientX: number, clientY?: number) => void;
  handleDragMove: (clientX: number, clientY?: number) => void;
  handleDragEnd: () => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
  trackRef: React.RefObject<HTMLDivElement>;
}
