import { useCarousel } from '../hooks/useCarousel.hook';
import type { CarouselProps } from '../types';
import styles from '../css/Carousel.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cloneElement } from 'react';

export const CarouselView = (props: CarouselProps) => {
  const {
    items,
    className = '',
    id,
    showIndicators = items.length > 1,
    indicatorsClickable = true,
    showNavigationButtons = items.length > 1,
    spaceBetweenPx = 0,
    itemHeight = '400px',
    slidesPerView = 1,
    align = 'start',
    loop = items.length > 1,
  } = props;

  const {
    currentIndex,
    internalIndex,
    isDragging,
    canGoPrev,
    canGoNext,
    goToSlide,
    goToPrev,
    goToNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    handleMouseEnter,
    handleMouseLeave,
    containerRef,
    trackRef,
    isTransitioning,
  } = useCarousel(props);

  // Create the items array with clones for infinite loop
  const displayItems = loop && items.length > 1 
    ? [...items, ...items, ...items] // Clone items: [items, items, items]
    : items;

  // Calculate slide width based on slidesPerView
  const getSlideWidth = () => {
    if (slidesPerView === 'auto') {
      return 'auto';
    }
    
    const gapTotal = spaceBetweenPx * (slidesPerView - 1);
    return `calc((100% - ${gapTotal}px) / ${slidesPerView})`;
  };

  const slideWidth = getSlideWidth();

  // Calculate transform based on internal index (for infinite loop)
  const getTransform = () => {
    const indexToUse = loop && items.length > 1 ? internalIndex : currentIndex;
    
    if (slidesPerView === 'auto') {
      return `translateX(-${indexToUse * 100}%)`;
    }
    const slideWidthPercent = 100 / slidesPerView;
    const offset = indexToUse * slideWidthPercent;
    return `translateX(-${offset}%)`;
  };

  // Mouse drag handlers - delegate to hook
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleDragMove(moveEvent.clientX, moveEvent.clientY);
    };

    const handleMouseUp = () => {
      handleDragEnd();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Touch drag handlers - delegate to hook
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      handleDragMove(moveTouch.clientX, moveTouch.clientY);
    };

    const handleTouchEnd = () => {
      handleDragEnd();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  if (items.length === 0) {
    return null;
  }

  const alignClass = align === 'center' ? styles.alignCenter : align === 'end' ? styles.alignEnd : styles.alignStart;

  return (
    <div 
      className={`${styles.carousel} ${alignClass} ${className}`}
      id={id}
      data-testid="carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={styles.carouselContainer} 
        ref={containerRef}
      >
        <div
          ref={trackRef}
          className={`${styles.carouselTrack} ${isDragging ? styles.dragging : ''} ${!isTransitioning ? styles.noTransition : ''}`}
          style={{
            transform: getTransform(),
            gap: `${spaceBetweenPx}px`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {displayItems.map((item, index) => (
            <div
              key={index}
              className={styles.carouselSlide}
              style={{
                width: slideWidth,
                height: itemHeight,
                minHeight: itemHeight,
                maxHeight: itemHeight,
              }}
              data-testid={`carousel-slide-${index}`}
            >
              {cloneElement(item, {
                ...item.props,
                style: {
                  ...item.props.style,
                  height: '100%',
                  width: '100%',
                },
              })}
            </div>
          ))}
        </div>

        {showNavigationButtons && items.length > 1 && (
          <div className={styles.carouselControls}>
            {canGoPrev && (
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonPrev}`}
                onClick={goToPrev}
                aria-label="Previous slide"
                data-testid="button-prev"
              >
                <ChevronLeft />
              </button>
            )}
            {canGoNext && (
              <button
                className={`${styles.carouselButton} ${styles.carouselButtonNext}`}
                onClick={goToNext}
                aria-label="Next slide"
                data-testid="button-next"
              >
                <ChevronRight />
              </button>
            )}
          </div>
        )}
      </div>

      {showIndicators && items.length > 1 && (
        <div className={styles.carouselIndicators} data-testid="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`${styles.carouselIndicator} ${
                index === currentIndex ? styles.active : ''
              } ${indicatorsClickable ? styles.clickable : ''}`}
              onClick={() => indicatorsClickable && goToSlide(index)}
              disabled={!indicatorsClickable}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
              data-testid={`indicator-${index}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
