# LayoutColumn Component

Componente de layout vertical que organiza contenido en una estructura jerárquica de 3 niveles: Slots, Grupos de Alineación y Componentes.

## Arquitectura de 3 Niveles

```
LayoutColumn (contenedor principal)
├── Slot 0 (1/N del espacio vertical)
│   ├── Grupo Top (1/M del slot) ─────── [Componente A, Componente B]
│   ├── ─ ─ ─ slotAlignDivider ─ ─ ─
│   ├── Grupo Center (1/M del slot) ──── [Componente C]
│   ├── ─ ─ ─ slotAlignDivider ─ ─ ─
│   └── Grupo Bottom (1/M del slot) ──── [Componente D]
│
├── ═══════ slotDivider ═══════
│
└── Slot 1 (1/N del espacio vertical)
    ├── Grupo Top (1/M del slot) ─────── [Componente E]
    └── Grupo Bottom (1/M del slot) ──── [Componente F]
```

### Nivel 1: SLOTS
- El espacio vertical total se divide en N partes iguales (N = número de slots)
- 2 slots = cada slot ocupa 50% del espacio
- 3 slots = cada slot ocupa 33.3% del espacio
- **Comportamiento dinámico**: Los slots se adaptan al tamaño del contenedor padre

### Nivel 2: GRUPOS DE ALINEACIÓN
- Dentro de cada slot, el espacio se divide según las alineaciones presentes
- Si un slot tiene top + center + bottom = 3 grupos (cada uno 1/3 del slot)
- Si un slot tiene top + bottom = 2 grupos (cada uno 1/2 del slot)
- **Tamaño proporcional FIJO**: Los grupos NO crecen ni se encogen por el contenido interno

### Nivel 3: COMPONENTES
- Los componentes se renderizan dentro de su grupo de alineación
- Si hay más componentes de los que caben, se cortan visualmente (overflow: hidden)
- Los grupos mantienen su tamaño proporcional independientemente del contenido

## Importación

```tsx
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
```

## Props del Contenedor

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de slots |
| `slotConfig` | `SlotConfig[]` | - | Configuración individual por slot |
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
| `slotDivider` | `SlotDividerToken` | - | Línea divisora entre SLOTS |
| `slotAlignDivider` | `SlotAlignDividerToken` | - | Línea divisora entre GRUPOS DE ALINEACIÓN |
| `components` | `LayoutColumnComponent[]` | requerido | Array de componentes |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutColumnComponent {
  id?: string;                        // ID único para el hook
  component: ReactNode;
  align: 'top' | 'center' | 'bottom'; // Alineación vertical dentro del slot
  slot: number;                       // Índice del slot (0, 1, 2...)
  hide?: boolean;                     // Mostrar/ocultar dinámicamente
  sizeMode?: 'auto' | 'full';         // 'auto' = tamaño natural, 'full' = llenar espacio
  height?: HeightToken | number;      // Altura fija del componente
}
```

## SlotConfig - Configuración Individual por Slot

Permite definir alturas diferentes para cada slot en lugar de dividir el espacio equitativamente.

### Interface SlotConfig

```tsx
interface SlotConfig {
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number;      // Altura en píxeles (solo para fixed)
  minHeight?: number;   // Altura mínima
  maxHeight?: number;   // Altura máxima
}
```

**Nota**: El array `slotConfig` se indexa por el número de slot. Si tienes `slots={3}`, puedes definir `slotConfig={[config0, config1, config2]}`. 

**Comportamiento por defecto (sin slotConfig)**:
- Todos los slots usan `flex: 1` → división proporcional (cada slot = 1/N del espacio)
- 2 slots = 50% cada uno
- 3 slots = 33.3% cada uno

**Slots sin configuración en slotConfig**:
- Si defines `slotConfig` pero un slot no tiene configuración, ese slot mantiene `flex: 1` (división proporcional con otros slots sin configuración)

### Comportamiento de heightMode por Slot

| HeightMode | CSS | Descripción |
|------------|-----|-------------|
| `fixed` | `flex: 0 0 auto; height: Xpx` | Altura fija en píxeles |
| `auto` | `flex: 0 0 auto` | Crece según el contenido |
| `full` | `flex: 1 1 0` | Toma el espacio restante |

### Ejemplo: Header/Content/Footer

```tsx
<LayoutColumn
  slots={3}
  heightMode="full"  // Contenedor ocupa 100% del padre
  slotConfig={[
    { heightMode: 'fixed', height: 60 },   // Slot 0: Header 60px
    { heightMode: 'full' },                 // Slot 1: Content (resto)
    { heightMode: 'fixed', height: 60 },   // Slot 2: Footer 60px
  ]}
  components={[
    { component: <Header />, align: 'top', slot: 0 },
    { component: <Content />, align: 'top', slot: 1, sizeMode: 'full' },
    { component: <Footer />, align: 'top', slot: 2 },
  ]}
/>
```

### Ejemplo: Slots con Altura Mínima/Máxima

```tsx
<LayoutColumn
  slots={2}
  heightMode="full"
  slotConfig={[
    { heightMode: 'auto', minHeight: 100, maxHeight: 300 },
    { heightMode: 'full' },
  ]}
  components={components}
/>
```

## Comportamiento Dinámico vs Fijo

### Modo Dinámico (recomendado)
```tsx
<LayoutColumn
  widthMode="full"    // 100% del ancho del contenedor padre
  heightMode="full"   // 100% del alto del contenedor padre
  slots={2}
  ...
/>
```
- Si el contenedor padre mide 600px → cada slot ocupa 300px
- Si el contenedor padre mide 1000px → cada slot ocupa 500px
- **Todo se reajusta proporcionalmente** al tamaño del contenedor
- **Usa slotConfig para alturas personalizadas por slot**

### Modo Fijo
```tsx
<LayoutColumn
  widthMode="fixed"
  width="md"          // 400px fijo
  heightMode="fixed"
  height={500}        // 500px fijo
  slots={2}
  ...
/>
```
- Usa tokens (xs/sm/md/lg/xl) o valores numéricos en píxeles

## Limitaciones Importantes

### heightMode="auto" vs heightMode="full"

| heightMode | Comportamiento | Uso recomendado |
|------------|----------------|-----------------|
| `auto` | El contenedor crece según su contenido | Cuando no necesitas dividir el espacio vertical |
| `full` | El contenedor ocupa 100% del padre | Cuando necesitas que los slots dividan el espacio |
| `fixed` | Altura fija en píxeles/tokens | Cuando conoces la altura exacta |

**IMPORTANTE**: Si usas `heightMode="auto"` sin `slotConfig`, los slots con `flex: 1` no pueden calcular el espacio porque no hay altura definida. Usa `heightMode="full"` o `heightMode="fixed"` cuando necesites que los slots dividan el espacio verticalmente.

### Ejemplo correcto vs incorrecto

```tsx
// ❌ INCORRECTO: heightMode="auto" sin altura definida
<LayoutColumn
  slots={3}
  heightMode="auto"  // Sin altura, los slots colapsan
  components={components}
/>

// ✅ CORRECTO: heightMode="full" para dividir el espacio
<LayoutColumn
  slots={3}
  heightMode="full"
  components={components}
/>

// ✅ CORRECTO: slotConfig para control individual
<LayoutColumn
  slots={3}
  heightMode="full"
  slotConfig={[
    { heightMode: 'fixed', height: 60 },
    { heightMode: 'full' },
    { heightMode: 'fixed', height: 60 },
  ]}
  components={components}
/>
```

## Divisores

### slotDivider (entre SLOTS)
Línea sólida que separa los slots principales.

**Formato:** `{size}-{color}`

```tsx
<LayoutColumn
  slotDivider="md-primary"  // Línea sólida azul de 4px entre slots
  ...
/>
```

### slotAlignDivider (entre GRUPOS DE ALINEACIÓN)
Línea que separa los grupos de alineación (top/center/bottom) dentro de un slot.

**Formato:** `{size}-{color}-{style}`

```tsx
<LayoutColumn
  slotAlignDivider="sm-gray-dashed"  // Línea punteada gris de 2px entre grupos
  ...
/>
```

**Si no defines estos props, no aparecen los divisores correspondientes.**

## Ejemplo Básico

```tsx
<LayoutColumn
  slots={2}
  widthMode="full"
  heightMode="full"
  slotDivider="md-primary"
  slotAlignDivider="sm-gray-dashed"
  components={[
    // Slot 0
    { component: <Header />, align: "top", slot: 0 },
    { component: <Content />, align: "center", slot: 0 },
    { component: <Footer />, align: "bottom", slot: 0 },
    // Slot 1
    { component: <Nav />, align: "top", slot: 1 },
    { component: <Actions />, align: "bottom", slot: 1 },
  ]}
/>
```

**Resultado:**
- Slot 0 (50%): Header arriba, Content centrado, Footer abajo (con líneas punteadas entre ellos)
- Línea sólida azul entre Slot 0 y Slot 1
- Slot 1 (50%): Nav arriba, Actions abajo (con línea punteada entre ellos)

## Tamaño de Componentes

### sizeMode: "auto" (default)
El componente usa su tamaño natural.

### sizeMode: "full"
El componente se expande para llenar el espacio disponible del grupo.

```tsx
{ 
  component: <ExpandableContent style={{ height: '100%' }} />, 
  align: "top", 
  slot: 0,
  sizeMode: "full"
}
```

### height: Altura fija
Especifica una altura fija con token o número.

```tsx
{ component: <FixedHeader />, align: "top", slot: 0, height: 80 }     // 80px
{ component: <FixedFooter />, align: "bottom", slot: 0, height: "sm" } // 200px
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
  { id: 'content', component: <Content />, align: 'center', slot: 0 },
  { id: 'footer', component: <Footer />, align: 'bottom', slot: 1 },
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
  } = useLayoutColumn({ components: initialComponents, slots: 2 });

  return (
    <>
      <button onClick={() => toggleSlot(0)}>Toggle Slot 0</button>
      <button onClick={() => toggleComponent('header')}>Toggle Header</button>
      
      <LayoutColumn
        slots={2}
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

## Tokens de Referencia

### SizeToken (width en modo fixed)
| Token | Valor |
|-------|-------|
| `xs` | 100px |
| `sm` | 200px |
| `md` | 400px |
| `lg` | 600px |
| `xl` | 800px |

### HeightToken (height en modo fixed)
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

### SlotDividerToken (slotDivider)
**Formato:** `{size}-{color}`

| Size | Altura |
|------|--------|
| `xs` | 1px |
| `sm` | 2px |
| `md` | 4px |
| `lg` | 6px |
| `xl` | 8px |

| Color | Valor |
|-------|-------|
| `white` | #ffffff |
| `gray` | #9ca3af |
| `light` | #e5e7eb |
| `dark` | #374151 |
| `primary` | #4353ff |

**Ejemplos:** `xs-white`, `sm-gray`, `md-light`, `lg-primary`, `xl-dark`

### SlotAlignDividerToken (slotAlignDivider)
**Formato:** `{size}-{color}-{style}`

| Style | Descripción |
|-------|-------------|
| `solid` | Línea sólida |
| `dashed` | Línea punteada (guiones) |
| `dotted` | Línea de puntos |

**Ejemplos:** `sm-gray-dashed`, `md-light-dotted`, `xs-primary-solid`

## Ejemplos de Uso

### Layout de Página Completa

```tsx
<LayoutColumn
  slots={3}
  widthMode="full"
  heightMode="full"
  slotDivider="sm-light"
  components={[
    { component: <Header />, align: "top", slot: 0, height: 64 },
    { component: <MainContent />, align: "top", slot: 1, sizeMode: "full" },
    { component: <Footer />, align: "bottom", slot: 2, height: 80 },
  ]}
/>
```

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
    { component: <LogoutButton />, align: "bottom", slot: 1 },
  ]}
/>
```

### Card con Secciones

```tsx
<LayoutColumn
  slots={1}
  widthMode="fixed"
  width={400}
  heightMode="fixed"
  height={500}
  paddingX="lg"
  paddingY="md"
  slotAlignDivider="xs-light-solid"
  components={[
    { component: <CardTitle />, align: "top", slot: 0, height: 60 },
    { component: <CardContent />, align: "center", slot: 0, sizeMode: "full" },
    { component: <CardActions />, align: "bottom", slot: 0, height: 50 },
  ]}
/>
```
