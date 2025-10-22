# Carousel Component

## Overview
Carousel component description.

## Usage

```tsx
import { Carousel } from '@/lib/ui-library/components/Carousel';

function Example() {
  return (
    <Carousel>
      Content
    </Carousel>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | Component content |
| className | string | - | Additional CSS classes |
| langOverride | string | - | Override language (e.g., 'en', 'es') |
| i18nOrder | 'global-first' \| 'local-first' | 'local-first' | Translation priority order |

## Features

- Reactive to language changes
- Supports i18n with local and global translations
- Customizable with CSS classes

## Development Notes

Add development notes here...
