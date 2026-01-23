# UniversalCard - Web Version

## Overview
Web implementation of UniversalCard using React DOM, Tailwind CSS, and Radix UI primitives.

## Folder Structure

```
web/
├── css/
│   ├── index.ts
│   ├── UniversalCard.module.css    # Tailwind/CSS styles
│   └── UniversalCard.module.ts     # Style helpers
├── hooks/
│   ├── index.ts
│   └── useUniversalCard.hook.ts    # Component logic
├── types/
│   ├── index.ts
│   └── UniversalCard.type.ts       # TypeScript interfaces
├── views/
│   ├── index.ts
│   └── UniversalCard.view.tsx      # React component
└── index.tsx                        # Main export
```

## Using Shared Tokens

Import tokens from `token.shared/` for consistent styling:

```typescript
import { colors, spacing, borderRadius } from '../../token.shared';

// Use in inline styles or CSS-in-JS
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
colors['gray-200']     // #e5e7eb
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
borderRadius['md']     // 6px
borderRadius['lg']     // 8px
borderRadius['xl']     // 12px
borderRadius['full']   // 9999px
```

### Shadows
```typescript
shadow['sm']      // Small shadow
shadow['DEFAULT'] // Default shadow
shadow['md']      // Medium shadow
shadow['lg']      // Large shadow
```

## Semantic Colors

Use semantic aliases for common UI patterns:

```typescript
import { semanticColors } from '../../token.shared';

semanticColors['background']       // White background
semanticColors['border']           // Default border color
semanticColors['border-selected']  // Selected state border
semanticColors['error']            // Error color (red)
semanticColors['success']          // Success color (green)
```

## Component Usage

```tsx
import { UniversalCard } from 'GC-UI-COMPONENTS';

<UniversalCard
  component={MyContent}
  componentProps={{ title: 'Hello' }}
  width={300}
  height={200}
  cardStyles={{
    backgroundColor: '#fff',
    borderRadius: '12px',
  }}
  headerContent={<Header />}
  footerContent={<Footer />}
  selectable
  id="card-1"
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `component` | `React.ComponentType` | Component to render inside card |
| `componentProps` | `object` | Props to pass to component |
| `width` | `number \| string` | Card width |
| `height` | `number \| string` | Card height |
| `minWidth` | `number \| string` | Minimum width |
| `minHeight` | `number \| string` | Minimum height |
| `cardStyles` | `CardStyles` | Custom styling |
| `headerContent` | `ReactNode` | Header content |
| `footerContent` | `ReactNode` | Footer content |
| `selectable` | `boolean` | Enable selection mode |
| `id` | `string` | Unique ID for selection |
| `dataTestId` | `string` | Test ID attribute |

## Development

1. Edit styles in `web/css/UniversalCard.module.css`
2. Add logic in `web/hooks/useUniversalCard.hook.ts`
3. Update types in `web/types/UniversalCard.type.ts`
4. Modify view in `web/views/UniversalCard.view.tsx`

## Platform Resolution

- `index.tsx` dispatches to `web/` or `mobile/` based on `useIsMobile()` hook
- Desktop browsers use `web/` implementation
- Mobile browsers use `mobile/` implementation (responsive)
