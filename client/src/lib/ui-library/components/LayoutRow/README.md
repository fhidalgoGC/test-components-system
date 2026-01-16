# LayoutRow Component

Componente de layout horizontal altamente configurable para organizar múltiples componentes en slots.

## Importación

```tsx
import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de slots horizontales |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode="fixed"` |
| `heightMode` | `'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentVerticalAlign` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'center'` | Alineación vertical de componentes |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo slot |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `components` | `LayoutRowComponent[]` | requerido | Array de componentes a renderizar |
| `className` | `string` | - | Clase CSS adicional |

## Tokens

### SizeToken (width)
| Token | Valor |
|-------|-------|
| `xs` | 100px |
| `sm` | 200px |
| `md` | 400px |
| `lg` | 600px |
| `xl` | 800px |

### HeightToken (height)
| Token | Valor |
|-------|-------|
| `xs` | 40px |
| `sm` | 56px |
| `md` | 72px |
| `lg` | 96px |
| `xl` | 120px |

### SpacingToken (padding, margin)
| Token | Valor |
|-------|-------|
| `none` | 0 |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |

### GapToken (componentGap)
| Token | Valor |
|-------|-------|
| `none` | 0 |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 24px |

### SlotGapToken (slotGap)
| Token | Valor |
|-------|-------|
| `none` | 0 |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |

## Valores Numéricos

Todas las props de espaciado y dimensiones aceptan valores numéricos además de tokens:

```tsx
// Con tokens
<LayoutRow
  height="lg"
  paddingX="md"
  marginY="sm"
  componentGap="xs"
  ...
/>

// Con números (en píxeles)
<LayoutRow
  height={150}
  paddingX={20}
  marginY={10}
  componentGap={50}
  ...
/>

// Mixto
<LayoutRow
  height="lg"
  paddingX={25}
  marginY="sm"
  componentGap={8}
  ...
/>
```

## Modos de Ancho

### `widthMode="full"` (default)
- El componente ocupa el 100% del contenedor padre
- Si hay `marginX`, el ancho se calcula automáticamente: `calc(100% - marginX*2)`

### `widthMode="auto"`
- El ancho se ajusta al contenido

### `widthMode="fixed"`
- Requiere prop `width` con token o número
- Ejemplo: `width="lg"` (600px) o `width={500}` (500px)

## Modos de Altura

### `heightMode="auto"` (default)
- La altura se ajusta al componente hijo más alto
- Se suma el padding vertical: `altura = hijo más alto + paddingY*2`

### `heightMode="fixed"`
- Requiere prop `height` con token o número
- Ejemplo: `height="md"` (72px) o `height={100}` (100px)
- Si el contenido es más alto, se desbordará

## Alineación Vertical

La prop `componentVerticalAlign` controla cómo se alinean los componentes dentro de los slots:

| Valor | Comportamiento |
|-------|----------------|
| `top` | Componentes alineados arriba |
| `center` | Componentes centrados verticalmente (default) |
| `bottom` | Componentes alineados abajo |
| `stretch` | Componentes estiran para llenar el alto del slot |

**Importante:** Para que un componente hijo use `height: 100%`, necesitas `componentVerticalAlign="stretch"`.

## Componentes Hijos que se Ajustan al Padre

Para que un componente hijo tome el 100% del alto del LayoutRow:

```tsx
<LayoutRow
  heightMode="fixed"
  height="lg"
  componentVerticalAlign="stretch"  // Importante!
  components={[
    {
      component: (
        <div style={{ height: '100%', background: 'blue' }}>
          Se ajusta al padre
        </div>
      ),
      align: "left",
      slot: 0,
    },
  ]}
/>
```

## Ejemplos

### Toolbar Básico

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height="sm"
  paddingX="md"
  components={[
    { component: <BackButton />, align: "left", slot: 0 },
    { component: <Title>Mi Página</Title>, align: "center", slot: 1 },
    { component: <SaveButton />, align: "right", slot: 2 },
  ]}
/>
```

### Header con Múltiples Acciones

```tsx
<LayoutRow
  slots={2}
  widthMode="full"
  paddingX="lg"
  paddingY="sm"
  componentGap="sm"
  components={[
    { component: <Logo />, align: "left", slot: 0 },
    { component: <AppName />, align: "left", slot: 0 },
    { component: <SearchBar />, align: "center", slot: 0 },
    { component: <NotificationIcon />, align: "right", slot: 1 },
    { component: <SettingsIcon />, align: "right", slot: 1 },
    { component: <UserAvatar />, align: "right", slot: 1 },
  ]}
/>
```

### Layout con Márgenes

```tsx
<LayoutRow
  slots={1}
  widthMode="full"
  marginX="lg"      // 24px cada lado
  marginY="md"      // 16px arriba y abajo
  paddingX="md"
  paddingY="sm"
  components={[
    { component: <Content />, align: "center", slot: 0 },
  ]}
/>
```

### Altura Fija con Componentes de Diferentes Tamaños

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height={80}
  componentVerticalAlign="stretch"
  components={[
    {
      component: <div style={{ height: '100%', background: 'green' }} />,
      align: "left",
      slot: 0,
    },
    {
      component: <div style={{ height: '120px', background: 'blue' }} />,
      align: "center",
      slot: 1,
    },
    {
      component: <div style={{ height: '100%', background: 'yellow' }} />,
      align: "right",
      slot: 2,
    },
  ]}
/>
```
