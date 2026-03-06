# SplitLayout

**Version: 2.0.0**

## Overview

Layout de dos paneles (split-screen) con soporte dual web/mobile. En web muestra dos paneles lado a lado. En mobile (< 768px) solo renderiza el panel principal, ignorando completamente el panel secundario. La resolución web/mobile es automática via `useIsMobile()`.

**Ubicación**: `client/src/lib/ui-library/layouts/SplitLayout/`

## Key Features

- **Dos paneles configurables**: `main` (siempre visible) y `secondary` (solo en web)
- **Resolución automática web/mobile**: Usa `useIsMobile()` (breakpoint 768px) para elegir la variante
- **Mobile**: Solo renderiza el panel `main` a pantalla completa, sin panel secundario
- **Control de dimensiones por nivel**: `layout` controla el contenedor, cada panel controla sus propias dimensiones
- **SizeMode flexible**: `full`, `auto`, `fixed`, `percentage` para width y height
- **Alineación**: Vertical (top/middle/bottom) y horizontal (left/center/right) por panel
- **Scroll configurable**: Control independiente de scroll vertical y horizontal por panel
- **Imagen de fondo por panel**: Cada panel soporta `renderType: 'src'` (URL) o `renderType: 'component'` (React component)
- **componentMainAlign**: Controla si el panel main va a izquierda (`left`) o derecha (`right`) — solo web

## File Structure

```
SplitLayout/
├── index.tsx                                  # Root: resuelve web/mobile con useIsMobile()
├── README-IA.md
├── web/
│   ├── index.ts
│   ├── views/
│   │   ├── index.ts
│   │   └── SplitLayout.view.tsx               # Vista web: dos paneles
│   ├── hooks/
│   │   └── useSplitLayout.hook.ts             # Lógica web: clases, estilos, dimensiones
│   ├── types/
│   │   ├── index.ts
│   │   └── SplitLayout.types.ts               # Tipos compartidos + SplitLayoutProps
│   └── css/
│       └── SplitLayout.module.css             # Flex layout, alineación, scroll
└── mobile/
    ├── index.ts
    ├── views/
    │   ├── index.ts
    │   └── SplitLayout.mobile.view.tsx        # Vista mobile: solo panel main
    ├── hooks/
    │   └── useSplitLayout.mobile.hook.ts      # Lógica mobile simplificada
    ├── types/
    │   ├── index.ts
    │   └── SplitLayout.mobile.types.ts        # SplitLayoutMobileProps (sin secondary)
    └── css/
        └── SplitLayout.mobile.module.css      # Estilos mobile
```

## Interfaces

### SplitLayoutProps (Web)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `LayoutConfig` | `undefined` | Configuración de dimensiones del contenedor |
| `main` | `PanelConfig` | **Required** | Panel principal (siempre visible) |
| `secondary` | `PanelConfig` | **Required** | Panel secundario (solo visible en web) |

### SplitLayoutMobileProps (Mobile)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `MobileLayoutConfig` | `undefined` | Configuración de dimensiones (sin componentMainAlign) |
| `main` | `PanelConfig` | **Required** | Panel principal a pantalla completa |

### LayoutConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `componentMainAlign` | `'left' \| 'right'` | `'left'` | Posición del panel main (solo web) |
| `widthMode` | `SizeMode` | `'full'` | Modo de ancho del contenedor |
| `width` | `string \| number` | `undefined` | Valor de ancho (para fixed o percentage) |
| `minWidth` | `number` | `undefined` | Ancho mínimo en px |
| `heightMode` | `SizeMode` | `'full'` | Modo de altura (full = 100vh) |
| `height` | `string \| number` | `undefined` | Valor de altura (para fixed o percentage) |
| `minHeight` | `number` | `undefined` | Altura mínima en px |

### PanelConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `render` | `ReactNode` | **Required** | Contenido a renderizar |
| `renderType` | `'component'` | `'component'` | Tipo de render |
| `widthMode` | `SizeMode` | `'full'` | Modo de ancho del panel |
| `width` | `string \| number` | `undefined` | Valor de ancho |
| `minWidth` | `number` | `undefined` | Ancho mínimo en px |
| `heightMode` | `SizeMode` | `'full'` | Modo de altura del panel |
| `height` | `string \| number` | `undefined` | Valor de altura |
| `minHeight` | `number` | `undefined` | Altura mínima en px |
| `align` | `PanelAlign` | `{ vertical: 'middle', horizontal: 'center' }` | Alineación del contenido |
| `scroll` | `PanelScroll` | `{ vertical: true, horizontal: false }` | Control de scroll |
| `backgroundImage` | `PanelBackgroundImage` | `undefined` | Imagen de fondo del panel |

### PanelBackgroundImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `renderType` | `'src' \| 'component'` | **Required** | Modo: 'src' para URL, 'component' para React component |
| `src` | `string` | `undefined` | URL o ruta de la imagen (cuando renderType es 'src') |
| `render` | `ReactNode` | `undefined` | Componente React de fondo (cuando renderType es 'component') |
| `opacity` | `number` | `1` | Opacidad de la imagen (solo con renderType 'src') |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | Modo de ajuste (solo con renderType 'src') |
| `objectPosition` | `string` | `'center'` | Posición de la imagen (solo con renderType 'src') |
| `overlayColor` | `string` | `undefined` | Color de overlay (solo con renderType 'src') |

### PanelAlign

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Alineación vertical |
| `horizontal` | `'left' \| 'center' \| 'right'` | `'center'` | Alineación horizontal |

### PanelScroll

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `boolean` | `true` | Scroll vertical |
| `horizontal` | `boolean` | `false` | Scroll horizontal |

### SizeMode

| Value | Description |
|-------|-------------|
| `'full'` | 100% del contenedor (100vh para height a nivel layout) |
| `'auto'` | Se adapta al contenido |
| `'fixed'` | Valor fijo en px (usa el prop width/height) |
| `'percentage'` | Valor en porcentaje (usa el prop width/height) |

## Usage

```tsx
import { SplitLayout } from '@/lib/ui-library/layouts/SplitLayout';

<SplitLayout
  layout={{ heightMode: 'fixed', height: 500 }}
  main={{
    render: <LoginForm />,
    widthMode: 'percentage',
    width: 45,
    align: { vertical: 'middle', horizontal: 'center' },
  }}
  secondary={{
    render: <HeroContent />,
    align: { vertical: 'bottom', horizontal: 'left' },
    scroll: { vertical: false },
  }}
/>
```

En web (>= 768px): muestra ambos paneles lado a lado.
En mobile (< 768px): solo muestra `<LoginForm />` a pantalla completa.

### Con imagen de fondo (renderType: 'src')

```tsx
<SplitLayout
  layout={{ heightMode: 'fixed', height: 500 }}
  main={{
    render: <LoginForm />,
    widthMode: 'percentage',
    width: 45,
    backgroundImage: {
      renderType: 'src',
      src: '/images/hero.jpg',
      opacity: 0.8,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    },
  }}
  secondary={{
    render: <HeroContent />,
    backgroundImage: {
      renderType: 'src',
      src: '/images/landscape.jpg',
      objectFit: 'cover',
      objectPosition: 'top center',
    },
  }}
/>
```

### Con componente de fondo (renderType: 'component')

```tsx
<SplitLayout
  layout={{ heightMode: 'fixed', height: 500 }}
  main={{
    render: <LoginForm />,
    backgroundImage: {
      renderType: 'component',
      render: <VideoBackground />,
    },
  }}
  secondary={{
    render: <HeroContent />,
    backgroundImage: {
      renderType: 'component',
      render: <GradientBackground />,
    },
  }}
/>
```

## Responsive Behavior

```
Desktop (>= 768px)                    Mobile (< 768px)
┌──────────┬──────────┐               ┌─────────────────┐
│          │          │               │                 │
│   main   │secondary │               │      main       │
│          │          │               │   (fullscreen)  │
│          │          │               │                 │
└──────────┴──────────┘               └─────────────────┘
```

- **Web (>= 768px)**: Ambos paneles visibles con dimensiones configuradas
- **Mobile (< 768px)**: Solo el panel `main` visible al 100%, `secondary` no se renderiza
- Resolución automática via `useIsMobile()` — sin media queries CSS, detección JS con resize listener

## Dependencies

- CSS Modules
- `useIsMobile` hook (de `@/lib/ui-library/hooks/useResponsive`)

## Changelog

### v2.0.0 (Marzo 2026)
- Movido de `client/src/layouts/split-layout-component/` a `client/src/lib/ui-library/layouts/SplitLayout/`
- Agregada variante mobile: solo renderiza panel `main`, ignora `secondary`
- Resolución automática web/mobile via `useIsMobile()` (breakpoint 768px)
- Eliminado media query CSS — la responsividad ahora se maneja con componentes separados
- Tipos mobile independientes: `SplitLayoutMobileProps`, `MobileLayoutConfig`

### v1.0.0 (Febrero 2026)
- Versión inicial con dos paneles y media query CSS para responsive
