# AcordionList - Web Version

## Overview
Web implementation of AcordionList using React DOM, Tailwind CSS, and Radix UI primitives.

## Folder Structure

```
web/
├── css/
│   ├── index.ts
│   ├── AcordionList.module.css    # Tailwind/CSS styles
│   └── AcordionList.module.ts     # Style helpers
├── hooks/
│   ├── index.ts
│   └── useAcordionList.hook.ts    # Component logic
├── types/
│   ├── index.ts
│   └── AcordionList.type.ts       # TypeScript interfaces
├── views/
│   ├── index.ts
│   └── AcordionList.view.tsx      # React component
└── index.tsx                            # Main export
```

## Using Shared Tokens

Import tokens from `token.shared/` for consistent styling:

```typescript
import { colors, spacing, borderRadius } from '../../token.shared';

const style = {
  padding: spacing['4'],           // 16px (same as p-4)
  backgroundColor: colors['gray-100'],
  borderRadius: borderRadius['lg'],
};
```

## Token Reference (Tailwind-style)

### Colors
```typescript
colors['gray-50']      // #f9fafb
colors['gray-100']     // #f3f4f6
colors['primary-500']  // #3b82f6
colors['primary-600']  // #2563eb
```

### Spacing
```typescript
spacing['1']   // 4px  (p-1)
spacing['2']   // 8px  (p-2)
spacing['4']   // 16px (p-4)
spacing['6']   // 24px (p-6)
```

### Border Radius
```typescript
borderRadius['sm']     // 2px
borderRadius['lg']     // 8px
borderRadius['xl']     // 12px
borderRadius['full']   // 9999px
```

## Component Usage

```tsx
import { AcordionList } from 'GC-UI-COMPONENTS';

<AcordionList>
  Content
</AcordionList>
```

## Platform Resolution

- `index.tsx` dispatches to `web/` or `mobile/` based on `useIsMobile()` hook
- Desktop browsers use `web/` implementation
- Mobile browsers use `mobile/` implementation (responsive)
