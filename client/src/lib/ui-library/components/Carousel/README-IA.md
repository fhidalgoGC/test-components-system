# Carousel Component

## Overview

Interactive carousel component for React applications with true infinite looping, autoplay, drag gestures, keyboard navigation, and clickable indicators. Perfect for showcasing featured content, product galleries, testimonials, or any sequential content with smooth animations and comprehensive user interaction support.

## Key Features

- ✅ **True Infinite Loop**: Seamless continuous scrolling using slide cloning technique with automatic position resets
- ✅ **Autoplay with Pause on Hover**: Automatic slide rotation with user-friendly pause when hovering
- ✅ **Drag & Touch Gestures**: Mouse and touch support with visual feedback and GPU-optimized transitions
- ✅ **Keyboard Navigation**: Arrow key support for accessibility
- ✅ **Clickable Indicators**: Visual dots for quick navigation between slides
- ✅ **Controlled & Uncontrolled Modes**: Flexible state management for external control
- ✅ **Responsive Design**: Configurable slides per view and spacing
- ✅ **Boundary Navigation**: Navigation buttons hide (not disable) at carousel boundaries when loop is disabled
- ✅ **Callbacks**: `onChange`, `onReachStart`, `onReachEnd` for lifecycle events
- ✅ **Async Data Support**: Load carousel items from APIs with loading and error states
- ✅ **Full Accessibility**: ARIA attributes and semantic HTML

## Installation

```tsx
import { Carousel } from '@/lib/ui-library/components/Carousel';
```

## Basic Usage

### Simple Carousel with Autoplay

```tsx
import { Carousel } from '@/lib/ui-library/components/Carousel';

function App() {
  const items = [
    <div style={{ background: '#FF6B9D', padding: '40px', borderRadius: '12px' }}>
      <h2>Slide 1</h2>
      <p>Featured content here</p>
    </div>,
    <div style={{ background: '#6366F1', padding: '40px', borderRadius: '12px' }}>
      <h2>Slide 2</h2>
      <p>Another amazing slide</p>
    </div>,
    <div style={{ background: '#10B981', padding: '40px', borderRadius: '12px' }}>
      <h2>Slide 3</h2>
      <p>More great content</p>
    </div>,
  ];

  return (
    <Carousel
      items={items}
      autoPlay={true}
      autoPlayIntervalMs={3000}
      pauseOnHover={true}
      draggable={true}
      showIndicators={true}
      indicatorsClickable={true}
      itemHeight="400px"
      loop={true}
      keyboard={true}
    />
  );
}
```

### Controlled Mode with External Navigation

```tsx
import { useState } from 'react';
import { Carousel } from '@/lib/ui-library/components/Carousel';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    <div>Slide 1</div>,
    <div>Slide 2</div>,
    <div>Slide 3</div>,
  ];

  return (
    <div>
      <p>Current Slide: {currentIndex + 1} of {items.length}</p>
      
      {/* External navigation buttons */}
      <div>
        {items.map((_, index) => (
          <button 
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{ 
              background: currentIndex === index ? '#6366f1' : '#e5e7eb' 
            }}
          >
            Slide {index + 1}
          </button>
        ))}
      </div>

      <Carousel
        items={items}
        currentIndex={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        autoPlay={true}
        draggable={true}
        showIndicators={true}
        loop={true}
        itemHeight="400px"
      />
    </div>
  );
}
```

### Carousel without Loop (with Boundaries)

```tsx
import { Carousel } from '@/lib/ui-library/components/Carousel';

function App() {
  const items = [
    <div>Slide 1</div>,
    <div>Slide 2</div>,
    <div>Slide 3</div>,
  ];

  return (
    <Carousel
      items={items}
      loop={false} // Navigation buttons will hide at boundaries
      draggable={true}
      showIndicators={true}
      indicatorsClickable={true}
      itemHeight="400px"
      onReachStart={() => console.log('Reached first slide!')}
      onReachEnd={() => console.log('Reached last slide!')}
    />
  );
}
```

### Multiple Slides Per View

```tsx
import { Carousel } from '@/lib/ui-library/components/Carousel';

function App() {
  const items = [
    <div>Product 1</div>,
    <div>Product 2</div>,
    <div>Product 3</div>,
    <div>Product 4</div>,
    <div>Product 5</div>,
    <div>Product 6</div>,
  ];

  return (
    <Carousel
      items={items}
      slidesPerView={2} // Show 2 slides at once
      spaceBetweenPx={16} // Add 16px gap between slides
      draggable={true}
      showIndicators={true}
      loop={true}
      itemHeight="300px"
    />
  );
}
```

### Loading Data from API (Async)

```tsx
import { useState, useEffect } from 'react';
import { Carousel } from '@/lib/ui-library/components/Carousel';

// Simulated API call
const fetchProductsFromAPI = async () => {
  const response = await fetch('https://api.example.com/products');
  return response.json();
};

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProductsFromAPI();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Render products as React elements
  const productElements = products.map((product) => (
    <div key={product.id} style={{ padding: '20px' }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <img src={product.image} alt={product.name} />
    </div>
  ));

  if (isLoading) {
    return <div>Loading carousel...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Carousel
      items={productElements}
      autoPlay={true}
      autoPlayIntervalMs={4000}
      draggable={true}
      showIndicators={true}
      loop={true}
      itemHeight="500px"
    />
  );
}
```

### With Lifecycle Callbacks

```tsx
import { useState } from 'react';
import { Carousel } from '@/lib/ui-library/components/Carousel';

function App() {
  const [message, setMessage] = useState('');

  const items = [
    <div>Slide 1</div>,
    <div>Slide 2</div>,
    <div>Slide 3</div>,
  ];

  return (
    <div>
      {message && <div className="notification">{message}</div>}
      
      <Carousel
        items={items}
        loop={false}
        onChange={(index) => {
          console.log('Changed to slide:', index);
        }}
        onReachStart={() => {
          setMessage('You reached the first slide!');
          setTimeout(() => setMessage(''), 2000);
        }}
        onReachEnd={() => {
          setMessage('You reached the last slide!');
          setTimeout(() => setMessage(''), 2000);
        }}
        draggable={true}
        showIndicators={true}
        itemHeight="400px"
      />
    </div>
  );
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ReactElement[]` | **Required** | Array of React elements to display in the carousel |
| `draggable` | `boolean` | `true` | Enable mouse/touch drag gestures |
| `autoPlay` | `boolean` | `false` | Enable automatic slide rotation |
| `autoPlayIntervalMs` | `number` | `3000` | Autoplay interval in milliseconds (min: 1000ms) |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay when user hovers over carousel |
| `showIndicators` | `boolean` | `true` | Show navigation dots/indicators |
| `indicatorsClickable` | `boolean` | `true` | Allow clicking indicators to jump to slides |
| `showNavigationButtons` | `boolean` | `true` | Show left/right navigation buttons |
| `spaceBetweenPx` | `number` | `0` | Space between slides in pixels |
| `itemHeight` | `string` | `'auto'` | Height of carousel items (supports px, %, rem, vh) |
| `slidesPerView` | `1 \| 2 \| 3 \| 'auto'` | `1` | Number of slides visible at once |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment of slides within the carousel |
| `keyboard` | `boolean` | `true` | Enable arrow key navigation (desktop) |
| `loop` | `boolean` | `true` | Enable infinite loop (continuous scrolling) |
| `initialIndex` | `number` | `0` | Starting slide index (uncontrolled mode) |
| `currentIndex` | `number` | `undefined` | Current slide index (controlled mode) |
| `onChange` | `(index: number) => void` | `undefined` | Callback when slide changes |
| `onReachStart` | `() => void` | `undefined` | Callback when reaching first slide (loop=false only) |
| `onReachEnd` | `() => void` | `undefined` | Callback when reaching last slide (loop=false only) |
| `id` | `string` | `undefined` | Unique identifier for carousel instance |
| `className` | `string` | `undefined` | Custom CSS class for carousel container |

## Modes

### Controlled vs Uncontrolled

**Uncontrolled Mode** (Default):
- Component manages its own state internally
- Use `initialIndex` to set starting slide
- Use `onChange` to listen to slide changes

```tsx
<Carousel
  items={items}
  initialIndex={2}
  onChange={(index) => console.log('Now on slide:', index)}
/>
```

**Controlled Mode**:
- Parent component controls the current slide
- Provide both `currentIndex` and `onChange`
- Enables external navigation controls

```tsx
const [currentIndex, setCurrentIndex] = useState(0);

<Carousel
  items={items}
  currentIndex={currentIndex}
  onChange={(index) => setCurrentIndex(index)}
/>
```

### Loop vs No Loop

**With Loop** (`loop={true}`):
- Seamless infinite scrolling
- Navigation buttons always visible
- Slides wrap around from last to first
- `onReachStart` and `onReachEnd` callbacks not triggered

**Without Loop** (`loop={false}`):
- Hard boundaries at first and last slides
- Navigation buttons hide at boundaries (not disable)
- Left button hidden when at first slide
- Right button hidden when at last slide
- `onReachStart` and `onReachEnd` callbacks triggered

## Features in Detail

### True Infinite Loop

The carousel uses a slide cloning technique for seamless infinite scrolling:
- Clones first/last slides and appends them to the ends
- Automatically resets position when reaching clones
- GPU-optimized transitions for smooth animations
- No visual jumps or stuttering

### Drag Gestures

- **Mouse Support**: Click and drag to navigate
- **Touch Support**: Swipe on mobile devices
- **Visual Feedback**: Cursor changes to grabbing state
- **Vertical Scroll Protection**: Cancels drag if vertical movement detected
- **Threshold Detection**: Requires minimum drag distance to trigger navigation

### Keyboard Navigation

- **Arrow Left**: Go to previous slide
- **Arrow Right**: Go to next slide
- **Automatic Enable**: Enabled by default on desktop
- **Accessibility**: Works with screen readers

### Navigation Buttons

- **Smart Visibility**: Hide (not disable) at carousel boundaries when loop is disabled
- **Hover Effects**: Scale up with smooth animation
- **Fixed Position**: Always stay in same position (left/right)
- **Accessibility**: Proper ARIA labels

### Indicators

- **Visual Feedback**: Active indicator highlighted
- **Clickable**: Jump to any slide directly (when enabled)
- **Responsive**: Adapt to number of slides
- **Smooth Animation**: Active indicator expands horizontally

## Styling

The carousel uses CSS modules for styling. Customize via:

### CSS Variables (Recommended)

```css
.carousel-container {
  --carousel-button-bg: rgba(255, 255, 255, 0.9);
  --carousel-button-hover-bg: rgba(255, 255, 255, 1);
  --carousel-indicator-bg: rgba(0, 0, 0, 0.2);
  --carousel-indicator-active-bg: rgba(0, 0, 0, 0.8);
}
```

### Custom Classes

```tsx
<Carousel
  items={items}
  className="my-custom-carousel"
/>
```

### Inline Styles (Items)

```tsx
const items = [
  <div style={{ background: '#FF6B9D', padding: '40px' }}>
    Slide 1
  </div>
];
```

## Accessibility

- ✅ **ARIA Labels**: Navigation buttons have descriptive labels
- ✅ **ARIA Current**: Active indicator marked with `aria-current="true"`
- ✅ **Keyboard Navigation**: Full keyboard support for navigation
- ✅ **Semantic HTML**: Proper button and container elements
- ✅ **Focus Management**: Visible focus indicators
- ✅ **Screen Reader Support**: Announces current slide and navigation

## Testing

All interactive elements include `data-testid` attributes:

```tsx
// Carousel container
data-testid="carousel-container"

// Slides
data-testid="carousel-slide-0"
data-testid="carousel-slide-1"

// Navigation buttons
data-testid="button-prev"
data-testid="button-next"

// Indicators
data-testid="carousel-indicators"
data-testid="indicator-0"
data-testid="indicator-1"
```

Example test:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from '@/lib/ui-library/components/Carousel';

test('navigates to next slide on button click', () => {
  const items = [<div>Slide 1</div>, <div>Slide 2</div>];
  const onChange = jest.fn();
  
  render(<Carousel items={items} loop={false} onChange={onChange} />);
  
  const nextButton = screen.getByTestId('button-next');
  fireEvent.click(nextButton);
  
  // Verify slide changed
  expect(onChange).toHaveBeenCalledWith(1);
});
```

## Common Use Cases

### Product Gallery

```tsx
<Carousel
  items={productCards}
  slidesPerView={3}
  spaceBetweenPx={20}
  autoPlay={true}
  autoPlayIntervalMs={5000}
  loop={true}
  itemHeight="350px"
/>
```

### Hero Banner

```tsx
<Carousel
  items={heroBanners}
  autoPlay={true}
  autoPlayIntervalMs={4000}
  pauseOnHover={true}
  showIndicators={true}
  showNavigationButtons={false}
  itemHeight="80vh"
  loop={true}
/>
```

### Testimonials

```tsx
<Carousel
  items={testimonials}
  autoPlay={true}
  autoPlayIntervalMs={6000}
  draggable={true}
  showIndicators={true}
  indicatorsClickable={true}
  itemHeight="400px"
  loop={true}
/>
```

### Image Gallery with Thumbnails

```tsx
const [selectedIndex, setSelectedIndex] = useState(0);

<div>
  <Carousel
    items={fullImages}
    currentIndex={selectedIndex}
    onChange={setSelectedIndex}
    loop={false}
    itemHeight="500px"
  />
  
  <div className="thumbnails">
    {fullImages.map((_, index) => (
      <img
        key={index}
        onClick={() => setSelectedIndex(index)}
        className={selectedIndex === index ? 'active' : ''}
      />
    ))}
  </div>
</div>
```

## Performance Considerations

1. **GPU Optimization**: Uses `transform` instead of `left/right` for animations
2. **Lazy Loading**: Consider lazy loading images in carousel items
3. **Memory Management**: Autoplay timer properly cleaned up on unmount
4. **Efficient Re-renders**: Only re-renders on state changes
5. **Event Debouncing**: Drag events optimized to prevent excessive renders

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import { Carousel, CarouselProps } from '@/lib/ui-library/components/Carousel';

const props: CarouselProps = {
  items: [],
  autoPlay: true,
  loop: true,
  onChange: (index: number) => console.log(index),
};
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11: Not supported (uses modern JS features)

## Troubleshooting

### Carousel items not displaying correctly

**Problem**: Items have incorrect height or width  
**Solution**: Ensure `itemHeight` is set and items have `width: 100%`

### Navigation buttons moving on hover

**Problem**: Buttons shift position when hovering  
**Solution**: Already fixed - buttons use combined `transform: translateY(-50%) scale(1.1)`

### Infinite loop not working

**Problem**: Carousel doesn't loop seamlessly  
**Solution**: Ensure `loop={true}` and `items.length > 1`

### Autoplay not pausing on hover

**Problem**: Carousel continues playing when hovering  
**Solution**: Ensure `pauseOnHover={true}` is set

### Drag gesture not working on mobile

**Problem**: Touch events not recognized  
**Solution**: Ensure `draggable={true}` and no conflicting touch handlers

## Migration from Other Carousels

### From react-slick

```tsx
// Before (react-slick)
<Slider
  infinite={true}
  speed={500}
  slidesToShow={3}
  slidesToScroll={1}
  autoplay={true}
>
  {items}
</Slider>

// After (GC-UI-COMPONENTS Carousel)
<Carousel
  items={items}
  loop={true}
  slidesPerView={3}
  autoPlay={true}
  autoPlayIntervalMs={3000}
/>
```

### From Swiper

```tsx
// Before (Swiper)
<Swiper
  spaceBetween={50}
  slidesPerView={3}
  loop={true}
  autoplay={{ delay: 3000 }}
>
  {items.map(item => <SwiperSlide>{item}</SwiperSlide>)}
</Swiper>

// After (GC-UI-COMPONENTS Carousel)
<Carousel
  items={items}
  spaceBetweenPx={50}
  slidesPerView={3}
  loop={true}
  autoPlay={true}
  autoPlayIntervalMs={3000}
/>
```

## Related Components

- **UniversalCard**: Wrap carousel items in cards for consistent styling
- **HeterogeneousList**: For vertical scrolling lists with different item types

## Changelog

### Version 1.2.0 (October 2025)
- ✅ Fixed navigation button positioning on hover
- ✅ Added true infinite loop with slide cloning
- ✅ Navigation buttons now hide (not disable) at boundaries when loop=false
- ✅ Added comprehensive async data loading example
- ✅ Improved drag gesture performance
- ✅ Added vertical scroll cancellation for better mobile UX

---

**Last Updated**: October 2025 | **Component Version**: 1.2.0
