# LayoutRow Component

Componente de layout horizontal que organiza contenido en una estructura jerárquica de 3 niveles: Slots, Grupos de Alineación y Componentes.

## Arquitectura de 3 Niveles

```
LayoutRow (contenedor principal)
├── Slot 0 (1/N del espacio horizontal)
│   ├── Grupo Left ───── [Componente A, Componente B]
│   ├── Grupo Center ─── [Componente C]
│   └── Grupo Right ──── [Componente D]
│
├── (slotGap)
│
└── Slot 1 (1/N del espacio horizontal)
    ├── Grupo Left ───── [Componente E]
    └── Grupo Right ──── [Componente F]
```

### Nivel 1: SLOTS
- El espacio horizontal total se divide en N partes iguales (N = número de slots)
- 2 slots = cada slot ocupa 50% del espacio horizontal
- 3 slots = cada slot ocupa 33.3% del espacio horizontal
- **Comportamiento dinámico**: Los slots se adaptan al tamaño del contenedor padre

### Nivel 2: GRUPOS DE ALINEACIÓN
- Dentro de cada slot, los componentes se agrupan por alineación horizontal
- `left`: Componentes alineados a la izquierda
- `center`: Componentes centrados
- `right`: Componentes alineados a la derecha

### Nivel 3: COMPONENTES
- Los componentes se renderizan dentro de su grupo de alineación
- Múltiples componentes en el mismo grupo se apilan horizontalmente con `componentGap`

## Importación

```tsx
import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
```

## Props del Contenedor

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `slots` | `number` | requerido | Número de slots (dividen espacio horizontalmente) |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'full'` | Modo de ancho |
| `width` | `SizeToken \| number` | - | Ancho cuando `widthMode="fixed"` |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentVerticalAlign` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'center'` | Alineación vertical de componentes |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo grupo |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `slotConfig` | `SlotConfig[]` | - | Configuración individual por slot (ancho) |
| `components` | `LayoutRowComponent[]` | requerido | Array de componentes |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutRowComponent {
  component: ReactNode;
  align: 'left' | 'center' | 'right'; // Alineación horizontal dentro del slot
  slot: number;                        // Índice del slot (0, 1, 2...)
  widthMode?: 'full' | 'auto' | 'fixed';  // Modo de ancho del componente
  width?: number;                      // Ancho en px cuando widthMode="fixed"
  minWidth?: number;                   // Ancho mínimo en px
  heightMode?: 'full' | 'auto' | 'fixed'; // Modo de altura del componente
  height?: number;                     // Altura en px cuando heightMode="fixed"
  minHeight?: number;                  // Altura mínima en px
  hide?: boolean;                      // Mostrar/ocultar dinámicamente
}
```

### Props de Sizing por Componente

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | `full`: llena el ancho del slot. `auto`: tamaño natural. `fixed`: usa `width` |
| `width` | `number` | - | Ancho en píxeles cuando `widthMode="fixed"` |
| `minWidth` | `number` | - | Ancho mínimo garantizado en píxeles |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | `full`: llena la altura del slot. `auto`: tamaño natural. `fixed`: usa `height` |
| `height` | `number` | - | Altura en píxeles cuando `heightMode="fixed"` |
| `minHeight` | `number` | - | Altura mínima garantizada en píxeles |

## SlotConfig - Configuración Individual por Slot

Permite definir anchos diferentes para cada slot en lugar de dividir el espacio equitativamente.

### Interface SlotConfig

```tsx
interface SlotConfig {
  widthMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  width?: number;      // Ancho en píxeles (fixed) o porcentaje (percentage)
  minWidth?: number;   // Ancho mínimo
}
```

### Comportamiento de widthMode por Slot

| WidthMode | CSS | Descripción |
|-----------|-----|-------------|
| `full` | `flex: 1` | Toma el espacio restante |
| `auto` | `flex: 0 0 auto` | Crece según el contenido |
| `fixed` | `width: Xpx` | Ancho fijo en píxeles |
| `percentage` | `flex: 0 0 X%; width: X%` | Porcentaje del contenedor padre |

### Porcentajes

```tsx
slotConfig={[
  { widthMode: 'percentage', width: 60 },  // Slot 0: 60% del contenedor
  { widthMode: 'percentage', width: 40 },  // Slot 1: 40% del contenedor
]}
```

Se puede combinar con otros modos:

```tsx
slotConfig={[
  { widthMode: 'fixed', width: 200 },       // Sidebar: 200px fijo
  { widthMode: 'percentage', width: 60 },   // Content: 60% del contenedor
  { widthMode: 'auto' },                    // Info: ajusta al contenido
]}
```

## Comportamiento del Contenedor

### heightMode

| Valor | Comportamiento |
|-------|----------------|
| `auto` | La altura se ajusta al contenido (default) |
| `full` | Ocupa el 100% de la altura del contenedor padre. Usa `overflow: hidden` para no desbordar |
| `fixed` | Altura fija definida por la prop `height` (token o número en px) |

### widthMode

| Valor | Comportamiento |
|-------|----------------|
| `full` | Ocupa el 100% del ancho del contenedor padre (default) |
| `auto` | El ancho se ajusta al contenido |
| `fixed` | Ancho fijo definido por la prop `width` (token o número en px) |

### Modo Dinámico (recomendado)
```tsx
<LayoutRow
  widthMode="full"    // 100% del ancho del contenedor padre
  heightMode="full"   // 100% de la altura del contenedor padre
  slots={3}
  ...
/>
```
- Si el contenedor padre mide 900px × 400px → cada slot ocupa 300px × 400px
- **Todo se reajusta proporcionalmente** al tamaño del contenedor

### Modo Fijo
```tsx
<LayoutRow
  widthMode="fixed"
  width="lg"          // 600px fijo
  heightMode="fixed"
  height={80}         // 80px fijo
  slots={3}
  ...
/>
```
- Usa tokens (xs/sm/md/lg/xl) o valores numéricos en píxeles

## Alineación Vertical de Componentes

La prop `componentVerticalAlign` controla cómo se alinean los componentes verticalmente dentro de los slots:

| Valor | Comportamiento |
|-------|----------------|
| `top` | Componentes alineados arriba |
| `center` | Componentes centrados verticalmente (default) |
| `bottom` | Componentes alineados abajo |
| `stretch` | Componentes estiran para llenar el alto del slot |

**Importante:** Para que un componente hijo use `height: 100%`, necesitas `componentVerticalAlign="stretch"`.

## Ejemplo Básico

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

**Resultado:**
- Slot 0 (33%): BackButton alineado a la izquierda
- Slot 1 (33%): Title centrado
- Slot 2 (33%): SaveButton alineado a la derecha

## Múltiples Componentes por Grupo

```tsx
<LayoutRow
  slots={2}
  widthMode="full"
  componentGap="sm"
  components={[
    // Slot 0 - múltiples componentes a la izquierda
    { component: <Logo />, align: "left", slot: 0 },
    { component: <AppName />, align: "left", slot: 0 },
    
    // Slot 1 - múltiples componentes a la derecha
    { component: <NotificationIcon />, align: "right", slot: 1 },
    { component: <SettingsIcon />, align: "right", slot: 1 },
    { component: <UserAvatar />, align: "right", slot: 1 },
  ]}
/>
```

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

## Ejemplos de Uso

### Toolbar con Acciones

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height="sm"
  paddingX="md"
  components={[
    { component: <BackButton />, align: "left", slot: 0 },
    { component: <Title>Configuración</Title>, align: "center", slot: 1 },
    { component: <SaveButton />, align: "right", slot: 2 },
  ]}
/>
```

### Header de Aplicación

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
    { component: <UserAvatar />, align: "right", slot: 1 },
  ]}
/>
```

### Card Footer con Acciones

```tsx
<LayoutRow
  slots={1}
  widthMode="full"
  heightMode="fixed"
  height={60}
  paddingX="md"
  components={[
    { component: <CancelButton />, align: "left", slot: 0 },
    { component: <DeleteButton />, align: "center", slot: 0 },
    { component: <SaveButton />, align: "right", slot: 0 },
  ]}
/>
```

### Componentes que Llenan el Alto

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height={80}
  componentVerticalAlign="stretch"
  components={[
    {
      component: <div style={{ height: '100%', background: 'green' }}>Full height</div>,
      align: "left",
      slot: 0,
    },
    {
      component: <div style={{ height: '100%', background: 'blue' }}>Full height</div>,
      align: "center",
      slot: 1,
    },
    {
      component: <div style={{ height: '100%', background: 'yellow' }}>Full height</div>,
      align: "right",
      slot: 2,
    },
  ]}
/>
```

## Sizing Individual por Componente

Cada componente dentro del LayoutRow puede controlar su propio ancho y alto de forma independiente mediante `widthMode`, `heightMode`, `width`, `height`, `minWidth` y `minHeight`.

### widthMode por Componente

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height={60}
  componentVerticalAlign="stretch"
  components={[
    { component: <A />, align: "left", slot: 0, widthMode: "full" },    // llena todo el slot
    { component: <B />, align: "center", slot: 1, widthMode: "auto" },  // tamaño natural
    { component: <C />, align: "right", slot: 2, widthMode: "fixed", width: 150 }, // 150px fijo
    { component: <D />, align: "left", slot: 3, widthMode: "percentage", width: 50 }, // 50% del slot
  ]}
/>
```

### heightMode por Componente

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height={100}
  componentVerticalAlign="stretch"
  components={[
    { component: <A />, align: "left", slot: 0, heightMode: "full" },   // llena toda la altura
    { component: <B />, align: "center", slot: 1, heightMode: "auto" }, // tamaño natural
    { component: <C />, align: "right", slot: 2, heightMode: "fixed", height: 40 }, // 40px fijo
  ]}
/>
```

### minWidth y minHeight

```tsx
<LayoutRow
  slots={2}
  widthMode="full"
  components={[
    { component: <Logo />, align: "left", slot: 0, minWidth: 120 },    // nunca menos de 120px
    { component: <Panel />, align: "right", slot: 1, minHeight: 50 },  // nunca menos de 50px alto
  ]}
/>
```

### Combinando widthMode + heightMode

```tsx
<LayoutRow
  slots={3}
  widthMode="full"
  heightMode="fixed"
  height={100}
  componentVerticalAlign="stretch"
  components={[
    { component: <A />, align: "left", slot: 0, widthMode: "full", heightMode: "full" },
    { component: <B />, align: "center", slot: 1, widthMode: "fixed", width: 200, heightMode: "fixed", height: 60 },
    { component: <C />, align: "right", slot: 2, widthMode: "auto", heightMode: "auto" },
  ]}
/>
```

## Comparación con LayoutColumn

| Aspecto | LayoutRow | LayoutColumn |
|---------|-----------|--------------|
| Orientación | Horizontal (slots lado a lado) | Vertical (slots apilados) |
| Slots dividen | Espacio horizontal | Espacio vertical |
| Alineación | `left`, `center`, `right` | `top`, `center`, `bottom` |
| Uso típico | Toolbars, headers, footers | Páginas, sidebars, cards |
