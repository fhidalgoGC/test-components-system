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
- Si hay más componentes de los que caben, se cortan visualmente (overflow: hidden). Los slots con `heightMode: "auto"` usan `overflow: visible` para permitir que el contenido defina la altura del slot
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
| `controller` | `UseLayoutColumnReturn` | - | Controller del hook `useLayoutColumn` (opcional). Controla visibilidad de slots y contenido override |
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
  heightMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  height?: number;      // Altura en píxeles (fixed) o porcentaje (percentage)
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
| `percentage` | `flex: 0 0 X%; height: X%` | Porcentaje del contenedor padre |

### División del espacio con múltiples slots `full`

Cuando hay múltiples slots con `heightMode: 'full'`, el espacio restante (después de los slots fijos) se divide proporcionalmente entre ellos:

```tsx
// Contenedor de 500px de alto
slotConfig={[
  { heightMode: 'fixed', height: 100 },  // Slot 0: 100px fijo
  { heightMode: 'full' },                 // Slot 1: flex: 1
  { heightMode: 'full' },                 // Slot 2: flex: 1
]}
// Resultado:
// - Slot 0: 100px (fijo)
// - Espacio restante: 400px
// - Slot 1: 200px (50% del resto)
// - Slot 2: 200px (50% del resto)
```

### Porcentajes

```tsx
slotConfig={[
  { heightMode: 'percentage', height: 60 },  // Slot 0: 60% del contenedor
  { heightMode: 'percentage', height: 40 },  // Slot 1: 40% del contenedor
]}
```

Se puede combinar con otros modos:

```tsx
slotConfig={[
  { heightMode: 'fixed', height: 60 },       // Nav: 60px fijo
  { heightMode: 'percentage', height: 70 },  // Content: 70% del contenedor
  { heightMode: 'auto' },                    // Footer: ajusta al contenido
]}
```

```tsx
// Contenedor de 500px de alto
slotConfig={[
  { heightMode: 'fixed', height: 60 },   // Slot 0: 60px
  { heightMode: 'full' },                 // Slot 1: flex: 1
  { heightMode: 'fixed', height: 60 },   // Slot 2: 60px
]}
// Resultado:
// - Slot 0: 60px (fijo)
// - Slot 1: 380px (todo el resto)
// - Slot 2: 60px (fijo)
```

```tsx
// 3 slots full = división equitativa
slotConfig={[
  { heightMode: 'full' },  // 33.3%
  { heightMode: 'full' },  // 33.3%
  { heightMode: 'full' },  // 33.3%
]}
```

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

### Diferencia entre `heightMode` (slot) y `sizeMode` (componente)

| Propiedad | Aplica a | Propósito |
|-----------|----------|-----------|
| `heightMode` (en slotConfig) | El slot/contenedor | Controla el alto del slot completo |
| `sizeMode` (en component) | El componente dentro del slot | Controla si el componente llena el slot |

```tsx
// Ejemplo: Slot de 300px con componente que lo llena
<LayoutColumn
  slots={2}
  heightMode="full"
  slotConfig={[
    { heightMode: 'fixed', height: 300 },  // ← El SLOT mide 300px
    { heightMode: 'full' },
  ]}
  components={[
    { 
      component: <Content />, 
      slot: 0, 
      sizeMode: 'full'  // ← El COMPONENTE llena los 300px del slot
    },
  ]}
/>

// Ejemplo: Slot de 300px con componente de tamaño natural
<LayoutColumn
  slotConfig={[
    { heightMode: 'fixed', height: 300 },  // ← El SLOT mide 300px
  ]}
  components={[
    { 
      component: <Button>Click</Button>, 
      slot: 0, 
      sizeMode: 'auto'  // ← El COMPONENTE usa su tamaño natural (40px)
    },                   // Queda espacio vacío en el slot
  ]}
/>
```

### sizeMode: "auto" (default)
El componente usa su tamaño natural. Si el slot es más grande, queda espacio vacío.

### sizeMode: "full"
El componente se expande para llenar todo el espacio disponible del slot.

```tsx
{ 
  component: <ExpandableContent style={{ height: '100%' }} />, 
  align: "top", 
  slot: 0,
  sizeMode: "full"
}
```

### height: Altura fija (en componente)
Especifica una altura fija para el componente con token o número.

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
| `setSlotContent(index, content, options?)` | `(index: number, content: ReactNode, options?: { unmount?: boolean }) => void` | Reemplazar contenido de un slot |
| `clearSlotContent(index)` | `(index: number) => void` | Restaurar contenido original del slot |
| `getSlotContent(index)` | `(index: number) => ReactNode \| undefined` | Obtener el contenido override actual |
| `slotContentOverrides` | `Record<number, SlotContentEntry>` | Mapa de overrides activos (content + revisionKey) |

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

## Controller (prop `controller`)

El prop `controller` permite controlar el LayoutColumn desde afuera sin modificar las props originales. Es **completamente opcional** — si no lo pasas, el componente funciona exactamente igual que siempre.

### Uso con controller

```tsx
import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";

const initialComponents = [
  { id: 'header', component: <Header />, align: 'top' as const, slot: 0 },
  { id: 'content', component: <MainContent />, align: 'top' as const, slot: 1, sizeMode: 'full' as const },
  { id: 'footer', component: <Footer />, align: 'bottom' as const, slot: 2 },
];

function MyPage() {
  const controller = useLayoutColumn({ components: initialComponents, slots: 3 });

  return (
    <>
      <button onClick={() => controller.toggleSlot(1)}>Toggle Content</button>
      <button onClick={() => controller.setSlotContent(1, <SettingsPanel />)}>
        Mostrar Settings
      </button>
      <button onClick={() => controller.clearSlotContent(1)}>
        Restaurar Content Original
      </button>

      <LayoutColumn
        slots={3}
        heightMode="full"
        controller={controller}
        components={controller.visibleComponents}
      />
    </>
  );
}
```

### Ocultar/Mostrar Slots

Cuando ocultas un slot, los demás slots se redistribuyen automáticamente para llenar el espacio:

```tsx
const controller = useLayoutColumn({ components, slots: 3 });

controller.hideSlot(0);     // Oculta slot 0, los slots 1 y 2 toman su espacio
controller.showSlot(0);     // Vuelve a mostrar slot 0
controller.toggleSlot(0);   // Alterna visibilidad
controller.isSlotVisible(0); // Consulta si está visible
```

### Cambiar Contenido de un Slot

`setSlotContent` reemplaza todo el contenido de un slot con un componente diferente, sin tocar la configuración original:

```tsx
const controller = useLayoutColumn({ components, slots: 3 });

// Reemplazar contenido (por defecto mantiene la instancia anterior, sin desmontar)
controller.setSlotContent(1, <SettingsPanel />);

// Reemplazar con desmontaje: destruye el componente anterior y monta uno nuevo
controller.setSlotContent(1, <SettingsPanel />, { unmount: true });

// Ver qué contenido override tiene el slot
controller.getSlotContent(1); // → <SettingsPanel />

// Restaurar el contenido original del slot
controller.clearSlotContent(1);
```

#### Opción `unmount`

| Valor | Comportamiento |
|-------|---------------|
| `false` (default) | React reconcilia: si el componente es del mismo tipo, reutiliza la instancia anterior (transición suave) |
| `true` | Fuerza desmontaje completo del componente anterior y monta uno nuevo desde cero (instancia limpia) |

```tsx
// Sin unmount: React reutiliza la instancia si el tipo es igual
controller.setSlotContent(1, <ProductList category="electronics" />);
controller.setSlotContent(1, <ProductList category="audio" />); // misma instancia, solo cambia prop

// Con unmount: siempre se destruye y crea una nueva instancia
controller.setSlotContent(1, <ProductList category="electronics" />, { unmount: true });
controller.setSlotContent(1, <ProductList category="audio" />, { unmount: true }); // nueva instancia
```

### Combinando Visibilidad + Content Override

```tsx
function Dashboard() {
  const controller = useLayoutColumn({ components: dashboardComponents, slots: 3 });
  const [showSettings, setShowSettings] = useState(false);

  const handleToggleSettings = () => {
    if (showSettings) {
      controller.clearSlotContent(1);    // Restaurar contenido original
    } else {
      controller.setSlotContent(1, <SettingsPanel />);  // Mostrar settings
    }
    setShowSettings(!showSettings);
  };

  return (
    <>
      <button onClick={handleToggleSettings}>
        {showSettings ? 'Volver al Dashboard' : 'Configuración'}
      </button>
      <button onClick={() => controller.toggleSlot(2)}>
        Toggle Footer
      </button>

      <LayoutColumn
        slots={3}
        heightMode="full"
        slotConfig={[
          { heightMode: 'fixed', height: 60 },
          { heightMode: 'full' },
          { heightMode: 'fixed', height: 60 },
        ]}
        controller={controller}
        components={controller.visibleComponents}
      />
    </>
  );
}
```

### Sin Controller (comportamiento original)

Si no pasas `controller`, todo funciona igual que antes:

```tsx
<LayoutColumn
  slots={3}
  heightMode="full"
  components={components}
/>
```
