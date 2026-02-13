# SplitLayout

## Overview

Layout de dos paneles (split-screen) responsivo. Muestra dos paneles lado a lado en pantallas grandes; al reducirse por debajo del breakpoint configurable (default 768px), el panel secundario desaparece y el panel principal ocupa el 100% del ancho. Ideal para páginas de login, onboarding, landing pages con hero + formulario.

**Ubicación**: `client/src/layouts/split-layout-component/` - Disponible para las apps que implementan la librería.

## Key Features

- **Dos paneles configurables**: Cada panel acepta un ReactNode con alineación, padding y fondo independientes
- **Selección de lado**: `mainSide` controla si el panel principal va a la izquierda o derecha
- **Ratio configurable**: `mainWidthPercent` define el porcentaje del panel principal (el secundario es el complemento)
- **Responsive con collapse**: El panel secundario se oculta con CSS media query al alcanzar el breakpoint
- **Fondos flexibles**: Color sólido, imagen con cover, gradiente CSS, overlay semitransparente
- **Alineación**: Vertical (top/center/bottom) y horizontal (left/center/right) por panel
- **Padding tokens**: none, xs, sm, md, lg, xl por panel
- **Altura**: fullHeight (100vh por defecto) o altura fija personalizada

## File Structure

```
SplitLayout/
├── index.tsx                         # Root export con web/mobile split (useIsMobile)
└── web/
    ├── index.ts                      # Web exports
    ├── views/
    │   ├── index.ts
    │   └── SplitLayout.view.tsx      # Vista principal
    ├── hooks/
    │   └── useSplitLayout.hook.ts    # Lógica: clases, estilos, orden de paneles
    ├── types/
    │   ├── index.ts
    │   └── SplitLayout.types.ts      # SplitLayoutProps, PanelConfig, PanelBackground
    └── css/
        └── SplitLayout.module.css    # Flex layout, responsive, alineación, padding tokens
```

## Interfaces

### SplitLayoutProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mainPanel` | `PanelConfig` | **Required** | Panel principal (siempre visible) |
| `secondPanel` | `PanelConfig` | **Required** | Panel secundario (se oculta en mobile) |
| `mainSide` | `'left' \| 'right'` | `'right'` | Lado donde aparece el panel principal |
| `mainWidthPercent` | `number` | `50` | Porcentaje de ancho del panel principal |
| `collapseBreakpoint` | `number` | `768` | Breakpoint (px) donde el secundario desaparece |
| `gap` | `SpacingToken` | `'none'` | Espacio entre paneles |
| `fullHeight` | `boolean` | `true` | Ocupa 100vh (se ignora si height está definido) |
| `height` | `string` | `undefined` | Altura fija (ej: '600px') |
| `className` | `string` | `undefined` | Clase CSS adicional |
| `style` | `CSSProperties` | `undefined` | Estilos inline adicionales |

### PanelConfig

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | **Required** | Contenido del panel |
| `verticalAlign` | `VerticalAlign` | `'center'` | Alineación vertical |
| `horizontalAlign` | `HorizontalAlign` | `'center'` | Alineación horizontal |
| `padding` | `SpacingToken` | `'none'` | Padding interno |
| `background` | `PanelBackground` | `undefined` | Configuración del fondo |
| `style` | `CSSProperties` | `undefined` | Estilos inline |
| `className` | `string` | `undefined` | Clase CSS adicional |

### PanelBackground

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `string` | - | Color de fondo (se ignora con gradient/image) |
| `image` | `string` | - | URL de imagen de fondo |
| `gradient` | `string` | - | Gradiente CSS |
| `size` | `string` | `'cover'` | background-size |
| `position` | `string` | `'center'` | background-position |
| `overlay` | `string` | - | Capa semitransparente sobre el fondo |

## Usage

```tsx
import { SplitLayout } from '@/layouts/split-layout-component';

<SplitLayout
  mainPanel={{
    content: <LoginForm />,
    verticalAlign: 'center',
    horizontalAlign: 'center',
    padding: 'lg',
  }}
  secondPanel={{
    content: <HeroContent />,
    verticalAlign: 'bottom',
    horizontalAlign: 'left',
    padding: 'lg',
    background: {
      image: '/hero.jpg',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
  }}
  mainSide="right"
  mainWidthPercent={45}
/>
```

## Responsive Behavior

- **Desktop (> breakpoint)**: Ambos paneles visibles con ratio definido
- **Mobile (<= breakpoint)**: Solo el mainPanel visible al 100%
- Implementado con CSS `@media` query, sin JS resize listeners
- Breakpoint configurable via `collapseBreakpoint` (default 768px)
- Si se usa un breakpoint diferente a 768px, se inyecta un `<style>` tag dinámico

## Dependencies

- CSS Modules
