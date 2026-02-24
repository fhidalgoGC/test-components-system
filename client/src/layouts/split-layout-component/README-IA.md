# SplitLayout

## Overview

Layout de dos paneles (split-screen) responsivo. Muestra dos paneles lado a lado en pantallas grandes; al reducirse por debajo de 768px, el panel secundario desaparece y el panel principal ocupa el 100% del ancho. Ideal para paginas de login, onboarding, landing pages con hero + formulario.

**Ubicacion**: `client/src/layouts/split-layout-component/` - Disponible para las apps que implementan la libreria.

## Key Features

- **Dos paneles configurables**: `main` (izquierda, siempre visible) y `secondary` (derecha, se oculta en mobile)
- **Control de dimensiones por nivel**: `layout` controla el contenedor, cada panel controla sus propias dimensiones
- **SizeMode flexible**: `full`, `auto`, `fixed`, `percentage` para width y height a nivel layout y panel
- **Alineacion**: Vertical (top/middle/bottom) y horizontal (left/center/right) por panel
- **Scroll configurable**: Control independiente de scroll vertical y horizontal por panel
- **Imagen de fondo por panel**: Cada panel puede tener su propia imagen de fondo con opacidad, objectFit, objectPosition y overlay de color
- **Responsive con collapse**: El panel secundario se oculta con CSS media query a 768px

## File Structure

```
SplitLayout/
├── index.tsx                         # Root export
└── web/
    ├── index.ts                      # Web exports
    ├── views/
    │   ├── index.ts
    │   └── SplitLayout.view.tsx      # Vista principal
    ├── hooks/
    │   └── useSplitLayout.hook.ts    # Logica: clases, estilos, dimensiones
    ├── types/
    │   ├── index.ts
    │   └── SplitLayout.types.ts      # SplitLayoutProps, PanelConfig, LayoutConfig
    └── css/
        └── SplitLayout.module.css    # Flex layout, responsive, alineacion, scroll
```

## Interfaces

### SplitLayoutProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `LayoutConfig` | `undefined` | Configuracion de dimensiones del contenedor |
| `main` | `PanelConfig` | **Required** | Panel principal (izquierda, siempre visible en mobile) |
| `secondary` | `PanelConfig` | **Required** | Panel secundario (derecha, se oculta en mobile) |

### LayoutConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `widthMode` | `SizeMode` | `'full'` | Modo de ancho del contenedor |
| `width` | `string \| number` | `undefined` | Valor de ancho (para fixed o percentage) |
| `minWidth` | `number` | `undefined` | Ancho minimo en px |
| `heightMode` | `SizeMode` | `'full'` | Modo de altura (full = 100vh) |
| `height` | `string \| number` | `undefined` | Valor de altura (para fixed o percentage) |
| `minHeight` | `number` | `undefined` | Altura minima en px |

### PanelConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `render` | `ReactNode` | **Required** | Contenido a renderizar |
| `renderType` | `'component'` | `'component'` | Tipo de render |
| `widthMode` | `SizeMode` | `'full'` | Modo de ancho del panel |
| `width` | `string \| number` | `undefined` | Valor de ancho |
| `minWidth` | `number` | `undefined` | Ancho minimo en px |
| `heightMode` | `SizeMode` | `'full'` | Modo de altura del panel |
| `height` | `string \| number` | `undefined` | Valor de altura |
| `minHeight` | `number` | `undefined` | Altura minima en px |
| `align` | `PanelAlign` | `{ vertical: 'middle', horizontal: 'center' }` | Alineacion del contenido |
| `scroll` | `PanelScroll` | `{ vertical: true, horizontal: false }` | Control de scroll |
| `backgroundImage` | `PanelBackgroundImage` | `undefined` | Imagen de fondo del panel |

### PanelBackgroundImage

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **Required** | URL o ruta de la imagen |
| `opacity` | `number` | `1` | Opacidad de la imagen (0 a 1) |
| `objectFit` | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | Modo de ajuste de la imagen |
| `objectPosition` | `string` | `'center'` | Posicion de la imagen (ej: 'top left') |
| `overlayColor` | `string` | `undefined` | Color de capa superpuesta (ej: 'rgba(0,0,0,0.5)') |

### PanelAlign

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `'top' \| 'middle' \| 'bottom'` | `'middle'` | Alineacion vertical |
| `horizontal` | `'left' \| 'center' \| 'right'` | `'center'` | Alineacion horizontal |

### PanelScroll

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | `boolean` | `true` | Scroll vertical cuando contenido excede altura |
| `horizontal` | `boolean` | `false` | Scroll horizontal cuando contenido excede ancho |

### SizeMode

| Value | Description |
|-------|-------------|
| `'full'` | 100% del contenedor (100vh para height a nivel layout) |
| `'auto'` | Se adapta al contenido |
| `'fixed'` | Valor fijo en px (usa el prop width/height) |
| `'percentage'` | Valor en porcentaje (usa el prop width/height) |

## Usage

```tsx
import { SplitLayout } from '@/layouts/split-layout-component';

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

### Con imagen de fondo

```tsx
<SplitLayout
  layout={{ heightMode: 'fixed', height: 500 }}
  main={{
    render: <LoginForm />,
    widthMode: 'percentage',
    width: 45,
    backgroundImage: {
      src: '/images/hero.jpg',
      opacity: 0.8,
      overlayColor: 'rgba(0, 0, 0, 0.5)',
    },
  }}
  secondary={{
    render: <HeroContent />,
    backgroundImage: {
      src: '/images/landscape.jpg',
      objectFit: 'cover',
      objectPosition: 'top center',
    },
  }}
/>
```

## Responsive Behavior

- **Desktop (> 768px)**: Ambos paneles visibles con dimensiones configuradas
- **Mobile (<= 768px)**: Solo el panel `main` visible al 100%
- Implementado con CSS `@media` query, sin JS resize listeners

## Dependencies

- CSS Modules
