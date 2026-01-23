# UniversalCard - Native Version (iOS/Android)

## Overview
Native implementation using React Native and Expo. Uses `StyleSheet` for styling and React Native primitives (`View`, `Pressable`, `Text`) for UI.

## Folder Structure

```
native/
├── styles/
│   ├── index.ts
│   └── UniversalCard.module.ts    # StyleSheet.create() styles
├── types/
│   ├── index.ts
│   └── UniversalCard.type.ts      # React Native types
├── views/
│   ├── index.ts
│   └── UniversalCard.view.tsx     # React Native component
└── index.tsx                       # Main export
```

## Using Shared Tokens

Import tokens from `token.shared/` - same values as web:

```typescript
import { colors, spacing, borders, cardShadow, semanticColors } from '../../token.shared';

const styles = StyleSheet.create({
  container: {
    padding: spacing['4'],                    // 16px (same as p-4)
    backgroundColor: colors['gray-100'],      // same as bg-gray-100
    borderRadius: borders['radius'],          // 12px
    borderWidth: borders['width'],            // 1px
    borderColor: semanticColors['border'],    // #e5e7eb
  },
});
```

## Token Reference (Tailwind-style)

### Colors
```typescript
colors['gray-50']       // #f9fafb (bg-gray-50)
colors['gray-100']      // #f3f4f6 (bg-gray-100)
colors['primary-500']   // #3b82f6 (bg-primary-500)
colors['primary-600']   // #2563eb (bg-primary-600)
```

### Spacing
```typescript
spacing['1']    // 4   (p-1)
spacing['2']    // 8   (p-2)
spacing['4']    // 16  (p-4)
spacing['5']    // 20  (p-5)
spacing['6']    // 24  (p-6)
```

### Borders
```typescript
borderRadius['sm']      // 2
borderRadius['md']      // 6
borderRadius['lg']      // 8
borderRadius['xl']      // 12
borderRadius['full']    // 9999

borderWidth['DEFAULT']  // 1
borderWidth['2']        // 2
```

### Shadows (Native)
```typescript
import { cardShadow, shadow } from '../../token.shared';

// Apply shadow in StyleSheet
const styles = StyleSheet.create({
  card: {
    shadowColor: cardShadow.color,
    shadowOffset: { 
      width: cardShadow.offsetX, 
      height: cardShadow.offsetY 
    },
    shadowOpacity: cardShadow.opacity,
    shadowRadius: cardShadow.radius,
    elevation: cardShadow.elevation,  // Android
  },
});

// Or use different shadow sizes
shadow['sm'].elevation   // 1
shadow['md'].elevation   // 3
shadow['lg'].elevation   // 5
```

### Semantic Colors
```typescript
semanticColors['background']       // #ffffff
semanticColors['background-muted'] // #f9fafb
semanticColors['border']           // #e5e7eb
semanticColors['border-selected']  // #2563eb
semanticColors['error']            // #ef4444
semanticColors['success']          // #22c55e
```

## Component Usage

```tsx
import { UniversalCard } from './native';

<UniversalCard
  component={MyNativeContent}
  componentProps={{ title: 'Hello' }}
  width={300}
  height={200}
  cardStyles={{
    backgroundColor: '#fff',
    borderRadius: 12,
  }}
  headerContent={<Header />}
  footerContent={<Footer />}
  selectable
  id="card-1"
  onSelect={(id) => console.log('Selected:', id)}
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
| `isSelected` | `boolean` | Current selection state |
| `onSelect` | `(id: string) => void` | Selection callback |
| `dataTestId` | `string` | testID attribute |

## Platform Resolution

Metro bundler automatically resolves `.native.tsx` files:

```
UniversalCard/
├── index.tsx          # Web/Mobile (Vite resolves this)
└── index.native.tsx   # Native (Metro resolves this)
```

When running `npx expo start`, Metro uses `index.native.tsx` which exports from `native/`.

## Styling Approach

### Option 1: StyleSheet (Current)
```typescript
import { StyleSheet } from 'react-native';
import { spacing, colors } from '../../token.shared';

const styles = StyleSheet.create({
  container: {
    padding: spacing['4'],
    backgroundColor: colors['white'],
  },
});

<View style={styles.container} />
```

### Option 2: NativeWind (Optional)
NativeWind is configured and available:

```typescript
<View className="p-4 bg-white rounded-lg" />
```

## Development

1. Edit styles in `native/styles/UniversalCard.module.ts`
2. Update types in `native/types/UniversalCard.type.ts`
3. Modify view in `native/views/UniversalCard.view.tsx`

## Running Native

```bash
# Start Expo development server
npx expo start

# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android
```

## Key Differences from Web

| Aspect | Web | Native |
|--------|-----|--------|
| Styling | CSS/Tailwind | StyleSheet |
| Layout | Flexbox (CSS) | Flexbox (RN) |
| Events | onClick | onPress |
| Elements | div, span | View, Text |
| Shadows | box-shadow | shadowColor + elevation |
| Units | px, rem, % | Numbers (dp) |
