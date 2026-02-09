# useResponsive

**Archivo:** `useResponsive.ts`

Hook para detección responsiva en tiempo real. Detecta tipo de dispositivo y orientación de pantalla. También exporta `useIsMobile` como atajo.

---

## Breakpoints

| Tipo | Ancho |
|------|-------|
| `mobile` | < 768px |
| `tablet` | 768px – 1023px |
| `desktop` | >= 1024px |

## Orientación

| Tipo | Condición |
|------|-----------|
| `portrait` | alto > ancho |
| `landscape` | ancho > alto |

## Retorno

```ts
const {
  deviceType,    // 'mobile' | 'tablet' | 'desktop'
  orientation,   // 'portrait' | 'landscape'
  isMobile,      // boolean
  isTablet,      // boolean
  isDesktop,     // boolean
  isPortrait,    // boolean
  isLandscape,   // boolean
} = useResponsive();
```

## Eventos que escucha

- `resize` — cambio de tamaño de ventana
- `orientationchange` — rotación de dispositivo

## Ejemplo

```tsx
import { useResponsive } from '../hooks';

function MyComponent() {
  const { isMobile, isTablet, isLandscape, isDesktop } = useResponsive();

  if (isMobile) {
    return <MobileView />;
  }

  if (isTablet && isLandscape) {
    return <TabletLandscapeView />;
  }

  if (isTablet) {
    return <TabletPortraitView />;
  }

  return <DesktopView />;
}
```

---

## useIsMobile (mismo archivo)

Atajo que devuelve solo un `boolean` indicando si el dispositivo es móvil (< 768px). Usa `useResponsive` internamente.

### Retorno

```ts
const isMobile: boolean = useIsMobile();
```

### Ejemplo

```tsx
import { useIsMobile } from '../hooks';

function MyComponent(props) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileView {...props} /> : <WebView {...props} />;
}
```

### Uso principal

Los componentes con variante web/mobile usan este hook en su `index.tsx` para decidir qué vista renderizar:

```tsx
import { useIsMobile } from '../../hooks';
import { MyComponentWeb } from './web/views/MyComponent.view';
import { MyComponentMobile } from './mobile/views/MyComponent.view';

export function MyComponent(props) {
  const isMobile = useIsMobile();
  return isMobile ? <MyComponentMobile {...props} /> : <MyComponentWeb {...props} />;
}
```

## Importación

Desde dentro de la biblioteca:
```ts
import { useResponsive, useIsMobile } from '../../hooks';
```

Desde el proyecto padre:
```ts
import { useResponsive, useIsMobile } from 'GC-UI-COMPONENTS/hooks';
```
