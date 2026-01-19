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
| `heightMode` | `'auto' \| 'fixed'` | `'auto'` | Modo de altura |
| `height` | `HeightToken \| number` | - | Altura cuando `heightMode="fixed"` |
| `paddingX` | `SpacingToken \| number` | - | Padding horizontal |
| `paddingY` | `SpacingToken \| number` | - | Padding vertical |
| `marginX` | `SpacingToken \| number` | - | Margen horizontal |
| `marginY` | `SpacingToken \| number` | - | Margen vertical |
| `componentVerticalAlign` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'center'` | Alineación vertical de componentes |
| `componentGap` | `GapToken \| number` | `'md'` | Espacio entre componentes del mismo grupo |
| `slotGap` | `SlotGapToken` | - | Espacio entre slots |
| `components` | `LayoutRowComponent[]` | requerido | Array de componentes |
| `className` | `string` | - | Clase CSS adicional |

## Interface de Componentes

```tsx
interface LayoutRowComponent {
  id?: string;                        // ID único para identificación
  component: ReactNode;
  align: 'left' | 'center' | 'right'; // Alineación horizontal dentro del slot
  slot: number;                       // Índice del slot (0, 1, 2...)
  hide?: boolean;                     // Mostrar/ocultar dinámicamente
}
```

## Comportamiento Dinámico vs Fijo

### Modo Dinámico (recomendado)
```tsx
<LayoutRow
  widthMode="full"    // 100% del ancho del contenedor padre
  heightMode="auto"   // Se ajusta al contenido
  slots={3}
  ...
/>
```
- Si el contenedor padre mide 900px → cada slot ocupa 300px
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

## Comparación con LayoutColumn

| Aspecto | LayoutRow | LayoutColumn |
|---------|-----------|--------------|
| Orientación | Horizontal (slots lado a lado) | Vertical (slots apilados) |
| Slots dividen | Espacio horizontal | Espacio vertical |
| Alineación | `left`, `center`, `right` | `top`, `center`, `bottom` |
| Uso típico | Toolbars, headers, footers | Páginas, sidebars, cards |
