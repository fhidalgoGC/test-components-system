# LayoutRow Component

## Overview

LayoutRow es un componente de layout horizontal altamente configurable que permite organizar y renderizar múltiples componentes (íconos, botones, imágenes o componentes personalizados) dentro de una fila dividida en secciones (slots). Su principal objetivo es resolver layouts complejos de forma declarativa, ofreciendo control preciso sobre el ancho, la altura, la alineación, el espaciado y la distribución del contenido.

## Key Features

- ✅ **Slots Configurables**: Divide el layout en N secciones de igual ancho
- ✅ **Modos de Ancho**: `full` (100%), `auto` (contenido), o `fixed` (valor específico)
- ✅ **Modos de Altura**: `auto` (contenido) o `fixed` (valor específico)
- ✅ **Tokens de Tamaño**: `xs`, `sm`, `md`, `lg`, `xl` o valores numéricos
- ✅ **Alineación Vertical**: `top`, `center`, `bottom`, `stretch`
- ✅ **Alineación Horizontal por Componente**: `left`, `center`, `right`
- ✅ **Espaciado Configurable**: `paddingX`, `paddingY`, `marginX`, `marginY`
- ✅ **Gaps**: `componentGap` (entre componentes) y `slotGap` (entre slots)
- ✅ **CSS Modules**: Estilos encapsulados sin conflictos

## Installation

```tsx
import { LayoutRow } from '@/lib/ui-library/components/LayoutRow';
```

## Basic Usage

### Simple Toolbar

```tsx
import { LayoutRow } from '@/lib/ui-library/components/LayoutRow';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

function Toolbar() {
  return (
    <LayoutRow
      slots={3}
      widthMode="full"
      heightMode="fixed"
      height="md"
      paddingX="md"
      paddingY="sm"
      componentVerticalAlign="center"
      componentGap="sm"
      slotGap="md"
      components={[
        { component: <Button variant="ghost"><ArrowLeft /></Button>, align: 'left', slot: 0 },
        { component: <h1 className="text-lg font-bold">Page Title</h1>, align: 'center', slot: 1 },
        { component: <Button><Save /> Save</Button>, align: 'right', slot: 2 },
      ]}
    />
  );
}
```

### Header with Multiple Actions

```tsx
import { LayoutRow } from '@/lib/ui-library/components/LayoutRow';

function Header() {
  return (
    <LayoutRow
      slots={2}
      widthMode="full"
      paddingX="lg"
      paddingY="md"
      componentVerticalAlign="center"
      components={[
        { component: <Logo />, align: 'left', slot: 0 },
        { component: <SearchBar />, align: 'center', slot: 0 },
        { component: <UserMenu />, align: 'right', slot: 1 },
        { component: <NotificationBell />, align: 'right', slot: 1 },
      ]}
    />
  );
}
```

### Fixed Width Card Actions

```tsx
<LayoutRow
  slots={1}
  widthMode="fixed"
  width={400}
  heightMode="auto"
  paddingX="md"
  paddingY="sm"
  componentGap="sm"
  components={[
    { component: <Button variant="outline">Cancel</Button>, align: 'left', slot: 0 },
    { component: <Button>Confirm</Button>, align: 'right', slot: 0 },
  ]}
/>
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `slots` | `number` | Required | Número de secciones horizontales |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho del layout |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode='fixed'` |
| `heightMode` | `'auto' \| 'fixed'` | `'auto'` | Modo de altura del layout |
| `height` | `SizeToken \| number` | - | Altura cuando `heightMode='fixed'` |
| `paddingX` | `SpacingToken` | - | Espaciado horizontal interno |
| `paddingY` | `SpacingToken` | - | Espaciado vertical interno |
| `marginX` | `SpacingToken` | - | Espaciado horizontal externo |
| `marginY` | `SpacingToken` | - | Espaciado vertical externo |
| `componentVerticalAlign` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'center'` | Alineación vertical |
| `componentGap` | `SizeToken` | `'md'` | Espacio entre componentes |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `components` | `LayoutRowComponent[]` | Required | Array de componentes a renderizar |
| `className` | `string` | - | Clases CSS adicionales |

## Types

```typescript
type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SlotGapToken = 'none' | 'xs' | 'sm' | 'md' | 'lg';
type WidthMode = 'full' | 'auto' | 'fixed';
type HeightMode = 'auto' | 'fixed';
type VerticalAlign = 'top' | 'center' | 'bottom' | 'stretch';
type HorizontalAlign = 'left' | 'center' | 'right';

interface LayoutRowComponent {
  component: ReactNode;
  align: HorizontalAlign;
  slot: number;
}
```

## Size Token Values

| Token | Pixels |
|-------|--------|
| `xs` | 100px |
| `sm` | 200px |
| `md` | 400px |
| `lg` | 600px |
| `xl` | 800px |

## Spacing Token Values

| Token | Pixels |
|-------|--------|
| `none` | 0px |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |

## Use Cases

- **Toolbars**: Barras de herramientas con acciones izquierda/centro/derecha
- **Headers**: Cabeceras con logo, navegación y acciones de usuario
- **Card Actions**: Botones de acción en tarjetas
- **Filtros**: Barras de filtros con múltiples controles
- **Navegación**: Breadcrumbs y navegación secundaria
- **Footers**: Pies de página con información distribuida

## File Structure

```
LayoutRow/
├── web/
│   ├── css/
│   │   ├── LayoutRow.module.css
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useLayoutRow.hook.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── LayoutRow.type.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── LayoutRow.view.tsx
│   │   └── index.ts
│   ├── i18n/
│   ├── providers/
│   ├── environment/
│   ├── utils/
│   └── index.tsx
└── index.tsx
```

## Data Test IDs

- `layoutrow` - Contenedor principal
- `layoutrow-slot-{index}` - Cada slot
- `layoutrow-slot-{index}-{align}` - Grupo de alineación dentro del slot
- `layoutrow-component-{slot}-{align}-{index}` - Cada componente individual

---

**Last Updated:** January 2026
