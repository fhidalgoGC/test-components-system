# LayoutColumn Component

Componente de layout vertical altamente configurable para organizar múltiples componentes en slots verticales.

## Importación

```tsx
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de slots verticales |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode="fixed"` |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentHorizontalAlign` | `'left' \| 'center' \| 'right' \| 'stretch'` | `'center'` | Alineación horizontal de componentes |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo slot |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `components` | `LayoutColumnComponent[]` | requerido | Array de componentes a renderizar |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutColumnComponent {
  id?: string;              // ID único para el hook useLayoutColumn
  component: ReactNode;
  align: 'top' | 'bottom';  // Alineación vertical dentro del slot
  slot: number;
  hide?: boolean;           // Mostrar/ocultar dinámicamente
}
```

## Hook useLayoutColumn

Hook para gestionar la visibilidad dinámica de componentes y slots.

### Importación

```tsx
import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

### Uso Básico

```tsx
const initialComponents = [
  { id: 'header', component: <Header />, align: 'top', slot: 0 },
  { id: 'nav', component: <Nav />, align: 'top', slot: 1 },
  { id: 'main', component: <Main />, align: 'top', slot: 2 },
  { id: 'footer', component: <Footer />, align: 'bottom', slot: 3 },
];

function MyComponent() {
  const {
    visibleComponents,
    visibleSlots,
    toggleSlot,
    toggleComponent,
    hideSlot,
    showSlot,
    hideComponent,
    showComponent,
    isSlotVisible,
    isSlotEmpty,
    isComponentVisible,
    resetVisibility,
  } = useLayoutColumn({ components: initialComponents, slots: 4 });

  return (
    <>
      <button onClick={() => toggleSlot(1)}>Toggle Nav</button>
      <button onClick={() => hideComponent('header')}>Hide Header</button>
      <p>Visible slots: {visibleSlots}</p>
      
      <LayoutColumn
        slots={4}
        components={visibleComponents}
        ...
      />
    </>
  );
}
```

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `components` | `LayoutColumnComponent[]` | Array inicial de componentes (con `id` opcional) |
| `slots` | `number` | Número total de slots |

### Retorno

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `visibleComponents` | `LayoutColumnComponent[]` | Componentes visibles (para pasar al LayoutColumn) |
| `allComponents` | `LayoutColumnComponent[]` | Todos los componentes con estado `hide` actualizado |
| `visibleSlots` | `number` | Número de slots con componentes visibles |
| `hideComponent(id)` | `(id: string) => void` | Ocultar un componente por ID |
| `showComponent(id)` | `(id: string) => void` | Mostrar un componente por ID |
| `toggleComponent(id)` | `(id: string) => void` | Alternar visibilidad de un componente |
| `hideSlot(index)` | `(index: number) => void` | Ocultar todos los componentes de un slot |
| `showSlot(index)` | `(index: number) => void` | Mostrar todos los componentes de un slot |
| `toggleSlot(index)` | `(index: number) => void` | Alternar visibilidad de un slot |
| `isComponentVisible(id)` | `(id: string) => boolean` | Verificar si un componente es visible |
| `isSlotVisible(index)` | `(index: number) => boolean` | Verificar si un slot tiene componentes visibles |
| `isSlotEmpty(index)` | `(index: number) => boolean` | Verificar si un slot está vacío |
| `resetVisibility()` | `() => void` | Restaurar visibilidad inicial |

### Comportamiento de Slots Vacíos

Cuando todos los componentes de un slot están ocultos:
- El slot **no se renderiza** en el DOM
- No ocupa espacio (sin margin, padding, gap)
- `isSlotEmpty(index)` retorna `true`

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
| `xs` | 100px |
| `sm` | 200px |
| `md` | 300px |
| `lg` | 400px |
| `xl` | 500px |

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
<LayoutColumn
  height="lg"
  paddingX="md"
  marginY="sm"
  componentGap="xs"
  ...
/>

// Con números (en píxeles)
<LayoutColumn
  height={350}
  paddingX={20}
  marginY={10}
  componentGap={50}
  ...
/>

// Mixto
<LayoutColumn
  height="lg"
  paddingX={25}
  marginY="sm"
  componentGap={8}
  ...
/>
```

## Propiedad hide

Cada componente puede ocultarse dinámicamente usando la prop `hide`:

```tsx
<LayoutColumn
  slots={3}
  components={[
    {
      component: <Header />,
      align: "top",
      slot: 0,
      hide: false,  // Visible
    },
    {
      component: <Content />,
      align: "top",
      slot: 1,
      hide: isLoading,  // Oculto durante carga
    },
    {
      component: <Footer />,
      align: "bottom",
      slot: 2,
      hide: !showFooter,  // Condicional
    },
  ]}
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
- La altura se ajusta al contenido total de todos los slots

### `heightMode="full"`
- Ocupa el 100% del contenedor padre
- Si hay `marginY`, la altura se calcula automáticamente: `calc(100% - marginY*2)`

### `heightMode="fixed"`
- Requiere prop `height` con token o número
- Ejemplo: `height="lg"` (400px) o `height={350}` (350px)

## Alineación Horizontal

La prop `componentHorizontalAlign` controla cómo se alinean los componentes horizontalmente:

| Valor | Comportamiento |
|-------|----------------|
| `left` | Componentes alineados a la izquierda |
| `center` | Componentes centrados horizontalmente (default) |
| `right` | Componentes alineados a la derecha |
| `stretch` | Componentes estiran para llenar el ancho del slot |

## Alineación Vertical (dentro del slot)

Cada componente especifica su alineación vertical dentro del slot:

| Valor | Comportamiento |
|-------|----------------|
| `top` | Componente en la parte superior del slot |
| `bottom` | Componente en la parte inferior del slot |

## Ejemplos

### Página Básica con Header, Content y Footer

```tsx
<LayoutColumn
  slots={3}
  widthMode="full"
  heightMode="full"
  paddingX="lg"
  paddingY="md"
  components={[
    { component: <Header />, align: "top", slot: 0 },
    { component: <MainContent />, align: "top", slot: 1 },
    { component: <Footer />, align: "bottom", slot: 2 },
  ]}
/>
```

### Sidebar con Navegación

```tsx
<LayoutColumn
  slots={2}
  widthMode="fixed"
  width={250}
  heightMode="full"
  paddingY="md"
  slotGap="lg"
  components={[
    { component: <Logo />, align: "top", slot: 0 },
    { component: <NavItem>Home</NavItem>, align: "top", slot: 1 },
    { component: <NavItem>Settings</NavItem>, align: "top", slot: 1 },
    { component: <NavItem>Profile</NavItem>, align: "top", slot: 1 },
    { component: <LogoutButton />, align: "bottom", slot: 1 },
  ]}
/>
```

### Lista con Elementos Condicionales

```tsx
<LayoutColumn
  slots={1}
  widthMode="full"
  componentGap="sm"
  components={[
    { component: <Item1 />, align: "top", slot: 0, hide: false },
    { component: <Item2 />, align: "top", slot: 0, hide: !showItem2 },
    { component: <Item3 />, align: "top", slot: 0, hide: isLoading },
  ]}
/>
```

### Card con Contenido Centrado

```tsx
<LayoutColumn
  slots={1}
  widthMode="fixed"
  width={400}
  heightMode="fixed"
  height={300}
  paddingX="xl"
  paddingY="lg"
  componentHorizontalAlign="center"
  componentGap="md"
  className="bg-white rounded-lg shadow"
  components={[
    { component: <Icon size={48} />, align: "top", slot: 0 },
    { component: <Title>Bienvenido</Title>, align: "top", slot: 0 },
    { component: <Description />, align: "top", slot: 0 },
    { component: <ActionButton />, align: "bottom", slot: 0 },
  ]}
/>
```

## Comparación con LayoutRow

| Aspecto | LayoutRow | LayoutColumn |
|---------|-----------|--------------|
| Orientación | Horizontal (fila) | Vertical (columna) |
| Alineación componentes | `left`, `center`, `right` | `top`, `bottom` |
| Alineación contenedor | `componentVerticalAlign` | `componentHorizontalAlign` |
| Slots | Dividen horizontalmente | Dividen verticalmente |
| Prop hide | Disponible | Disponible |
