# UniversalCard - Mobile Responsive Version

## Overview
Mobile responsive implementation for web browsers on small screens. Uses the same React DOM runtime as web, but with mobile-optimized layouts and touch interactions.

## Current Status

**Not Implemented** - Currently shows `NotImplemented` placeholder.

## Folder Structure

```
mobile/
└── index.tsx    # Currently returns NotImplemented
```

## Planned Structure (when implemented)

```
mobile/
├── css/
│   ├── index.ts
│   └── UniversalCard.module.css    # Mobile-specific CSS
├── hooks/
│   ├── index.ts
│   └── useUniversalCard.hook.ts    # Mobile touch logic
├── types/
│   ├── index.ts
│   └── UniversalCard.type.ts       # Mobile-specific types
├── views/
│   ├── index.ts
│   └── UniversalCard.view.tsx      # Mobile React component
└── index.tsx                        # Main export
```

## Using Shared Tokens

Same as web version - import from `token.shared/`:

```typescript
import { colors, spacing, borderRadius } from '../../token.shared';

// Tokens are platform-agnostic
const mobileStyle = {
  padding: spacing['4'],           // 16px
  backgroundColor: colors['white'],
  borderRadius: borderRadius['lg'],
};
```

## Platform Resolution

The main `index.tsx` uses `useIsMobile()` hook to dispatch:

```typescript
import { useIsMobile } from '../../hooks';
import { UniversalCard as UniversalCardWeb } from './web';
import { UniversalCard as UniversalCardMobile } from './mobile';

export const UniversalCard = (props) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <UniversalCardMobile {...props} />;  // < 768px
  }
  
  return <UniversalCardWeb {...props} />;        // >= 768px
};
```

## Implementation Guidelines

When implementing the mobile version:

1. **Touch-first interactions** - Larger touch targets, swipe gestures
2. **Full-width layouts** - Cards should span screen width on mobile
3. **Simplified UI** - Hide secondary actions, focus on primary content
4. **Performance** - Optimize for lower-powered devices

## Differences from Web

| Aspect | Web | Mobile |
|--------|-----|--------|
| Layout | Fixed/flexible widths | Full-width |
| Interactions | Click, hover | Touch, swipe |
| Typography | Standard sizes | Larger for readability |
| Spacing | Normal | Increased for touch |

## How to Implement

1. Create folder structure matching `web/`
2. Copy types from `web/types/` as starting point
3. Create mobile-specific view with touch optimizations
4. Export component from `mobile/index.tsx`

Example implementation:

```typescript
// mobile/index.tsx
import { UniversalCardMobileView } from './views';
import type { UniversalCardProps } from '../web/types';

export const UniversalCard = (props: UniversalCardProps) => {
  return <UniversalCardMobileView {...props} />;
};
```

## Testing

Mobile version is used when:
- Browser width < 768px
- `useIsMobile()` returns `true`

Test by resizing browser window or using device emulation in DevTools.
