# LayoutColumn Component

Componente de layout vertical que organiza múltiples filas (slots) apiladas verticalmente. Cada fila es un contenedor horizontal donde los componentes se alinean left/center/right.

## Concepto

- **LayoutColumn**: Organiza los slots verticalmente (apilados)
- **Cada slot**: Es una fila horizontal donde los componentes se distribuyen
- **3 slots = 3 filas** apiladas una encima de otra

## Importación

```tsx
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de filas (slots) |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode="fixed"` |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentVerticalAlign` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'center'` | Alineación vertical de componentes dentro de cada fila |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo slot |
| `slotGap` | `SlotGapToken` | - | Espacio entre filas |
| `components` | `LayoutColumnComponent[]` | requerido | Array de componentes a renderizar |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutColumnComponent {
  id?: string;                      // ID único para el hook useLayoutColumn
  component: ReactNode;
  align: 'left' | 'center' | 'right';  // Alineación horizontal dentro de la fila
  slot: number;                     // Índice de la fila (0, 1, 2...)
  hide?: boolean;                   // Mostrar/ocultar dinámicamente
}
```

## Ejemplo Básico

```tsx
<LayoutColumn
  slots={4}
  widthMode="full"
  heightMode="auto"
  slotGap="sm"
  paddingX="md"
  paddingY="md"
  components={[
    { component: <Header />, align: "center", slot: 0 },
    { component: <Content1 />, align: "center", slot: 1 },
    { component: <Content2 />, align: "center", slot: 2 },
    { component: <Footer />, align: "center", slot: 3 },
  ]}
/>
```

Resultado: 4 filas apiladas verticalmente, cada una centrada horizontalmente.

## Múltiples Componentes por Fila

```tsx
<LayoutColumn
  slots={2}
  slotGap="md"
  components={[
    { component: <Logo />, align: "left", slot: 0 },
    { component: <Title />, align: "center", slot: 0 },
    { component: <Menu />, align: "right", slot: 0 },
    { component: <MainContent />, align: "center", slot: 1 },
  ]}
/>
```

Resultado: 
- Fila 0: Logo a la izquierda, Title en el centro, Menu a la derecha
- Fila 1: MainContent centrado

## Hook useLayoutColumn

Hook para gestionar la visibilidad dinámica de componentes y filas.

### Importación

```tsx
import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

### Uso Básico

```tsx
const initialComponents = [
  { id: 'header', component: <Header />, align: 'center', slot: 0 },
  { id: 'nav', component: <Nav />, align: 'center', slot: 1 },
  { id: 'main', component: <Main />, align: 'left', slot: 2 },
  { id: 'sidebar', component: <Sidebar />, align: 'right', slot: 2 },
  { id: 'footer', component: <Footer />, align: 'center', slot: 3 },
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
      <button onClick={() => toggleSlot(1)}>Toggle Nav Row</button>
      <button onClick={() => hideComponent('header')}>Hide Header</button>
      <p>Visible rows: {visibleSlots}</p>
      
      <LayoutColumn
        slots={4}
        components={visibleComponents}
        slotGap="md"
      />
    </>
  );
}
```

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `components` | `LayoutColumnComponent[]` | Array inicial de componentes (con `id` opcional) |
| `slots` | `number` | Número total de filas |

### Retorno

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `visibleComponents` | `LayoutColumnComponent[]` | Componentes visibles (para pasar al LayoutColumn) |
| `allComponents` | `LayoutColumnComponent[]` | Todos los componentes con estado `hide` actualizado |
| `visibleSlots` | `number` | Número de filas con componentes visibles |
| `hideComponent(id)` | `(id: string) => void` | Ocultar un componente por ID |
| `showComponent(id)` | `(id: string) => void` | Mostrar un componente por ID |
| `toggleComponent(id)` | `(id: string) => void` | Alternar visibilidad de un componente |
| `hideSlot(index)` | `(index: number) => void` | Ocultar todos los componentes de una fila |
| `showSlot(index)` | `(index: number) => void` | Mostrar todos los componentes de una fila |
| `toggleSlot(index)` | `(index: number) => void` | Alternar visibilidad de una fila |
| `isComponentVisible(id)` | `(id: string) => boolean` | Verificar si un componente es visible |
| `isSlotVisible(index)` | `(index: number) => boolean` | Verificar si una fila tiene componentes visibles |
| `isSlotEmpty(index)` | `(index: number) => boolean` | Verificar si una fila está vacía |
| `resetVisibility()` | `() => void` | Restaurar visibilidad inicial |

### Comportamiento de Filas Vacías

Cuando todos los componentes de una fila están ocultos:
- La fila **no se renderiza** en el DOM
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
  slotGap="md"
  ...
/>

// Con números (en píxeles)
<LayoutColumn
  height={350}
  paddingX={20}
  marginY={10}
  componentGap={50}
  slotGap={16}
  ...
/>
```

## Propiedad hide

Cada componente puede ocultarse dinámicamente usando la prop `hide`:

```tsx
<LayoutColumn
  slots={4}
  components={[
    { component: <Header />, align: "center", slot: 0, hide: false },
    { component: <Content />, align: "center", slot: 1, hide: isLoading },
    { component: <Sidebar />, align: "center", slot: 2, hide: !showSidebar },
    { component: <Footer />, align: "center", slot: 3 },
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
- La altura se ajusta al contenido total de todas las filas

### `heightMode="full"`
- Ocupa el 100% del contenedor padre
- Si hay `marginY`, la altura se calcula automáticamente: `calc(100% - marginY*2)`

### `heightMode="fixed"`
- Requiere prop `height` con token o número
- Ejemplo: `height="lg"` (400px) o `height={350}` (350px)

## Alineación Horizontal (dentro de la fila)

Cada componente especifica su alineación horizontal dentro de la fila con `align`:

| Valor | Comportamiento |
|-------|----------------|
| `left` | Componente alineado a la izquierda de la fila |
| `center` | Componente centrado horizontalmente en la fila |
| `right` | Componente alineado a la derecha de la fila |

## Alineación Vertical (componentVerticalAlign)

La prop `componentVerticalAlign` controla cómo se alinean los componentes verticalmente dentro de cada fila:

| Valor | Comportamiento |
|-------|----------------|
| `top` | Componentes alineados arriba de la fila |
| `center` | Componentes centrados verticalmente (default) |
| `bottom` | Componentes alineados abajo de la fila |
| `stretch` | Componentes estiran para llenar la altura de la fila |

## Ejemplos

### Sidebar Vertical

```tsx
<LayoutColumn
  slots={5}
  widthMode="fixed"
  width={200}
  heightMode="auto"
  slotGap="xs"
  paddingX="sm"
  paddingY="md"
  components={[
    { component: <Logo />, align: "left", slot: 0 },
    { component: <NavItem>Home</NavItem>, align: "left", slot: 1 },
    { component: <NavItem>Settings</NavItem>, align: "left", slot: 2 },
    { component: <NavItem>Profile</NavItem>, align: "left", slot: 3 },
    { component: <LogoutButton />, align: "left", slot: 4 },
  ]}
/>
```

### Header con Distribución

```tsx
<LayoutColumn
  slots={1}
  widthMode="full"
  paddingX="lg"
  paddingY="md"
  components={[
    { component: <Logo />, align: "left", slot: 0 },
    { component: <Title />, align: "center", slot: 0 },
    { component: <UserMenu />, align: "right", slot: 0 },
  ]}
/>
```

### Formulario con Filas

```tsx
<LayoutColumn
  slots={4}
  widthMode="fixed"
  width={400}
  slotGap="md"
  paddingX="lg"
  paddingY="lg"
  components={[
    { component: <FormTitle />, align: "center", slot: 0 },
    { component: <EmailInput />, align: "center", slot: 1 },
    { component: <PasswordInput />, align: "center", slot: 2 },
    { component: <SubmitButton />, align: "center", slot: 3 },
  ]}
/>
```

## Comparación con LayoutRow

| Aspecto | LayoutRow | LayoutColumn |
|---------|-----------|--------------|
| Orientación slots | Columnas horizontales | Filas verticales |
| Alineación componentes | `left`, `center`, `right` | `left`, `center`, `right` |
| Alineación contenedor | `componentVerticalAlign` | `componentVerticalAlign` |
| Slots | Dividen horizontalmente (columnas) | Apilan verticalmente (filas) |
| Prop hide | Disponible | Disponible |
