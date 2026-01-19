# LayoutColumn Component

Componente de layout vertical que divide el espacio en slots iguales. Cada slot ocupa una porción igual del espacio vertical disponible.

## Concepto

- **N slots = espacio dividido en N partes iguales**
- **3 slots** = cada slot ocupa 1/3 del espacio vertical
- **Dentro de cada slot**: componentes se alinean **top** o **bottom**
- **Tamaño de componentes**: auto, full (llenar slot), o altura fija

## Importación

```tsx
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

## Props del Contenedor

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de slots (dividen espacio equitativamente) |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode="fixed"` |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo grupo |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `components` | `LayoutColumnComponent[]` | requerido | Array de componentes |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutColumnComponent {
  id?: string;                    // ID único para el hook
  component: ReactNode;
  align: 'top' | 'bottom';        // Alineación vertical dentro del slot
  slot: number;                   // Índice del slot (0, 1, 2...)
  hide?: boolean;                 // Mostrar/ocultar dinámicamente
  sizeMode?: 'auto' | 'full';     // 'auto' = tamaño natural, 'full' = llenar espacio
  height?: HeightToken | number;  // Altura fija del componente
}
```

## Ejemplo Básico

```tsx
<LayoutColumn
  slots={3}
  widthMode="full"
  heightMode="full"
  slotGap="sm"
  components={[
    { component: <Header />, align: "top", slot: 0 },
    { component: <Content />, align: "top", slot: 1 },
    { component: <Footer />, align: "bottom", slot: 2 },
  ]}
/>
```

Resultado: 3 slots de igual altura. Header arriba del slot 0, Content arriba del slot 1, Footer abajo del slot 2.

## Top y Bottom en Mismo Slot

```tsx
<LayoutColumn
  slots={1}
  heightMode="full"
  components={[
    { component: <Title />, align: "top", slot: 0 },
    { component: <Subtitle />, align: "top", slot: 0 },
    { component: <Button />, align: "bottom", slot: 0 },
  ]}
/>
```

Resultado: Title y Subtitle arriba, Button abajo, con espacio entre ellos.

## Tamaño de Componentes

### sizeMode: "auto" (default)
El componente usa su tamaño natural.

### sizeMode: "full"
El componente se expande para llenar el espacio disponible del slot.

```tsx
{ 
  component: <ExpandableContent style={{ height: '100%' }} />, 
  align: "top", 
  slot: 0,
  sizeMode: "full"  // Ocupa todo el espacio del slot
}
```

### height: Altura fija
Especifica una altura fija con token o número.

```tsx
{ 
  component: <FixedHeader />, 
  align: "top", 
  slot: 0,
  height: 80  // 80px de altura
}

{ 
  component: <FixedFooter />, 
  align: "bottom", 
  slot: 0,
  height: "sm"  // 200px (token)
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
  { id: 'content', component: <Content />, align: 'top', slot: 1 },
  { id: 'footer', component: <Footer />, align: 'bottom', slot: 2 },
];

function MyComponent() {
  const {
    visibleComponents,
    visibleSlots,
    toggleSlot,
    toggleComponent,
    isSlotVisible,
    isComponentVisible,
    resetVisibility,
  } = useLayoutColumn({ components: initialComponents, slots: 3 });

  return (
    <>
      <button onClick={() => toggleSlot(1)}>Toggle Content</button>
      <p>Visible slots: {visibleSlots}</p>
      
      <LayoutColumn
        slots={3}
        heightMode="full"
        components={visibleComponents}
      />
    </>
  );
}
```

### Retorno del Hook

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `visibleComponents` | `LayoutColumnComponent[]` | Componentes visibles |
| `allComponents` | `LayoutColumnComponent[]` | Todos los componentes |
| `visibleSlots` | `number` | Número de slots con contenido |
| `hideComponent(id)` | `(id: string) => void` | Ocultar componente |
| `showComponent(id)` | `(id: string) => void` | Mostrar componente |
| `toggleComponent(id)` | `(id: string) => void` | Alternar visibilidad |
| `hideSlot(index)` | `(index: number) => void` | Ocultar slot |
| `showSlot(index)` | `(index: number) => void` | Mostrar slot |
| `toggleSlot(index)` | `(index: number) => void` | Alternar visibilidad de slot |
| `isComponentVisible(id)` | `(id: string) => boolean` | Es visible? |
| `isSlotVisible(index)` | `(index: number) => boolean` | Slot tiene contenido? |
| `isSlotEmpty(index)` | `(index: number) => boolean` | Slot vacío? |
| `resetVisibility()` | `() => void` | Restaurar estado inicial |

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

## Ejemplos de Uso

### Sidebar con Navegación

```tsx
<LayoutColumn
  slots={2}
  widthMode="fixed"
  width={200}
  heightMode="full"
  slotGap="lg"
  components={[
    { component: <Logo />, align: "top", slot: 0 },
    { component: <NavHome />, align: "top", slot: 1 },
    { component: <NavSettings />, align: "top", slot: 1 },
    { component: <NavProfile />, align: "top", slot: 1 },
    { component: <LogoutButton />, align: "bottom", slot: 1 },
  ]}
/>
```

### Card con Header y Footer Fijos

```tsx
<LayoutColumn
  slots={1}
  widthMode="fixed"
  width={400}
  heightMode="fixed"
  height={500}
  paddingX="lg"
  paddingY="md"
  components={[
    { component: <CardTitle />, align: "top", slot: 0, height: 60 },
    { component: <CardContent style={{ height: '100%' }} />, align: "top", slot: 0, sizeMode: "full" },
    { component: <CardActions />, align: "bottom", slot: 0, height: 50 },
  ]}
/>
```

### Layout de Página Completa

```tsx
<LayoutColumn
  slots={3}
  widthMode="full"
  heightMode="full"
  slotGap="none"
  components={[
    { component: <Header />, align: "top", slot: 0, height: 64 },
    { component: <MainContent style={{ height: '100%' }} />, align: "top", slot: 1, sizeMode: "full" },
    { component: <Footer />, align: "bottom", slot: 2, height: 80 },
  ]}
/>
```

## Comparación con LayoutRow

| Aspecto | LayoutRow | LayoutColumn |
|---------|-----------|--------------|
| Orientación | Horizontal (columnas lado a lado) | Vertical (slots apilados) |
| Slots dividen | Espacio horizontal | Espacio vertical |
| Alineación componentes | `left`, `center`, `right` | `top`, `bottom` |
| Uso típico | Columnas de contenido | Secciones verticales |
