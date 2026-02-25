# FloatingMenu Component

Componente de menú flotante con posicionamiento configurable, secciones (header, body, footer), selección interna de items, y soporte para items con render functions personalizadas.

## Features

- **Posicionamiento flexible**: 12 posiciones disponibles (top, bottom, left, right con variantes)
- **Secciones configurables**: Header, Body (items), Footer con show/hide independiente
- **Offset personalizable**: Separación configurable entre trigger y menú
- **Items con render function**: Renderizado completamente personalizable
- **Layout system**: Control de dimensiones (width, height, min/max)
- **Scroll modes**: Auto o none para el body
- **Backdrop opcional**: Click fuera para cerrar
- **Selección interna**: Estado interno de selección con `selectable`, `defaultSelectedId`, `selectionStyle` y `clearSelection`
- **Reordenable (orderable)**: Drag & drop nativo para reordenar items con `orderable`, `onOrderChange` y drag handle visual

## Platform Support

| Platform | Status | Description |
|----------|--------|-------------|
| Web | ✅ Implemented | Vite + Tailwind CSS |
| Mobile | ❌ Not Implemented | Web-only component |
| Native | ❌ Not Implemented | Web-only component |

## Installation

```tsx
import { FloatingMenu, useFloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem, MenuPosition, FloatingMenuController } from '@/lib/ui-library/components/FloatingMenu';
```

## Basic Usage

```tsx
const items: FloatingMenuItem<{ label: string }>[] = [
  {
    id: 'option-1',
    data: { label: 'Option 1' },
    render: (item) => <span>{item.data?.label}</span>,
  },
  {
    id: 'option-2',
    data: { label: 'Option 2' },
    render: (item) => <span>{item.data?.label}</span>,
  },
];

const [isOpen, setIsOpen] = useState(false);

<div className="relative inline-block">
  <button onClick={() => setIsOpen(!isOpen)}>
    Open Menu
  </button>
  
  <FloatingMenu
    items={items}
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    onItemClick={(item) => {
      console.log('Selected:', item.data?.label);
      setIsOpen(false);
    }}
  />
</div>
```

## Selection Feature

La selección interna se activa con `selectable={true}`. Cuando está desactivado (por defecto), el menú funciona sin estado de selección.

### Sin controller (estado local)

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  selectable={true}
  defaultSelectedId="option-1"
  onSelectionChange={(id, item) => {
    console.log('Seleccionado:', id, item);
  }}
  onClose={() => setIsOpen(false)}
/>
```

### Con controller (useFloatingMenu)

```tsx
const controller = useFloatingMenu();

<FloatingMenu
  items={items}
  isOpen={isOpen}
  selectable={true}
  defaultSelectedId="option-1"
  controller={controller}
  onSelectionChange={(id, item) => {
    console.log('Seleccionado:', id, item);
  }}
  onClose={() => setIsOpen(false)}
/>

// Limpiar selección externamente
<button onClick={() => controller.clearSelection()}>Reset</button>

// Consultar selección actual
controller.getSelectedId(); // => 'option-1' | null
```

### Con estilo personalizado

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  selectable={true}
  selectionStyle={{
    backgroundColor: '#e0f2fe',
    border: '2px solid #0284c7',
    borderRadius: '4px',
  }}
  onClose={() => setIsOpen(false)}
/>
```

## Props

### FloatingMenuProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `FloatingMenuItem<T>[]` | required | Array de items con render function |
| `position` | `MenuPosition` | `'bottom-start'` | Posición de apertura del menú |
| `offset` | `number` | `8` | Separación del trigger en pixels |
| `header` | `FloatingMenuSectionConfig` | - | Configuración del header |
| `footer` | `FloatingMenuSectionConfig` | - | Configuración del footer |
| `layout` | `FloatingMenuLayout` | - | Configuración de dimensiones |
| `scroll` | `'auto' \| 'none'` | `'auto'` | Modo de scroll del body |
| `isOpen` | `boolean` | `true` | Controla visibilidad |
| `showBackdrop` | `boolean` | `true` | Muestra backdrop para cerrar |
| `selectable` | `boolean` | `false` | Activa la funcionalidad de selección interna |
| `defaultSelectedId` | `string` | - | ID del item seleccionado por defecto al iniciar |
| `selectionStyle` | `FloatingMenuSelectionStyle` | - | Estilo visual personalizado para el item seleccionado |
| `controller` | `FloatingMenuController` | - | Controller via `useFloatingMenu()` para getSelectedId y clearSelection |
| `onSelectionChange` | `(id, item) => void` | - | Callback cuando cambia la selección |
| `onItemClick` | `(item, index) => void` | - | Callback al click en item |
| `onClose` | `() => void` | - | Callback al cerrar (click fuera) |
| `className` | `string` | - | Clase CSS del contenedor |
| `itemClassName` | `string` | - | Clase CSS de cada item |
| `headerClassName` | `string` | - | Clase CSS del header |
| `footerClassName` | `string` | - | Clase CSS del footer |
| `selectedClassName` | `string` | - | Clase CSS adicional del item seleccionado |
| `orderable` | `boolean` | `false` | Activa reordenamiento por drag & drop |
| `onOrderChange` | `(items: FloatingMenuItem<T>[]) => void` | - | Callback con el nuevo array tras reordenar |
| `dragHandleClassName` | `string` | - | Clase CSS adicional para el drag handle |
| `bodyClassName` | `string` | - | Clase CSS adicional para el body (útil para padding) |

### FloatingMenuController (useFloatingMenu)

| Method | Returns | Description |
|--------|---------|-------------|
| `getSelectedId()` | `string \| null` | Retorna el ID del item seleccionado actualmente |
| `clearSelection()` | `void` | Limpia la selección (pone selectedId en null) |

### FloatingMenuSelectionStyle

```typescript
interface FloatingMenuSelectionStyle {
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
  outline?: string;
  custom?: React.CSSProperties;
}
```

### MenuPosition

```typescript
type MenuPosition = 
  | 'top'         // Arriba, centrado
  | 'top-start'   // Arriba, alineado izquierda
  | 'top-end'     // Arriba, alineado derecha
  | 'bottom'      // Abajo, centrado
  | 'bottom-start' // Abajo, alineado izquierda (default)
  | 'bottom-end'  // Abajo, alineado derecha
  | 'left'        // Izquierda, centrado
  | 'left-start'  // Izquierda, arriba
  | 'left-end'    // Izquierda, abajo
  | 'right'       // Derecha, centrado
  | 'right-start' // Derecha, arriba
  | 'right-end';  // Derecha, abajo
```

### FloatingMenuItem

```typescript
interface FloatingMenuItem<T = unknown> {
  id: string;
  data?: T;
  render: (item: FloatingMenuItem<T>) => ReactNode;
  disabled?: boolean;
}
```

### FloatingMenuSectionConfig

```typescript
interface FloatingMenuSectionConfig {
  renderType?: 'component' | 'none';
  render?: () => ReactNode;
  show?: boolean;           // true = visible, false = desmontado
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}
```

### FloatingMenuLayout

```typescript
interface FloatingMenuLayout {
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}
```

## Orderable Feature

El reordenamiento se activa con `orderable={true}`. Usa HTML5 Drag and Drop API nativo. Cada item muestra un icono grip a la derecha para iniciar el drag.

```tsx
const [items, setItems] = useState(initialItems);

<FloatingMenu
  items={items}
  isOpen={isOpen}
  orderable={true}
  onOrderChange={(newItems) => setItems(newItems)}
  onClose={() => setIsOpen(false)}
  layout={{ widthMode: 'fixed', width: 260 }}
/>
```

### Orderable + Selectable

Ambas features pueden estar activas simultáneamente:

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  orderable={true}
  selectable={true}
  controller={controller}
  onOrderChange={(newItems) => setItems(newItems)}
  onSelectionChange={(id) => console.log('Selected:', id)}
  onClose={() => setIsOpen(false)}
/>
```

### Orderable Behavior

| Escenario | Comportamiento |
|-----------|----------------|
| `orderable=false` (default) | Sin drag & drop, items se renderizan directamente |
| `orderable=true` | Items muestran grip handle, se pueden arrastrar para reordenar |
| `onOrderChange` | Callback recibe nuevo array de items (no modifica el original) |
| `dragHandleClassName` | Clase CSS adicional para personalizar el drag handle |
| Con scroll | Auto-scroll funciona al arrastrar hacia bordes del contenedor |
| `itemConfig.gap` | Separación entre items (número en px o string CSS) |
| `bodyClassName` | Clase CSS para el body (útil para padding interno) |

### Card List Layout

Combina `itemConfig.gap`, `bodyClassName` e `itemClassName` para un layout tipo tarjeta con separación entre items:

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  orderable={true}
  onOrderChange={(newItems) => setItems(newItems)}
  itemConfig={{ gap: 8 }}
  bodyClassName="p-3"
  itemClassName="border border-gray-200 rounded-lg"
  layout={{ widthMode: 'fixed', width: 300, maxHeight: 400 }}
  header={{
    renderType: 'component',
    render: () => <div className="p-3 font-semibold">Select and Order KPIs</div>,
  }}
  footer={{
    renderType: 'component',
    render: () => <div className="p-3 text-center text-gray-500">Restore configuration</div>,
  }}
/>
```

## Selection Behavior

| Escenario | Comportamiento |
|-----------|----------------|
| `selectable=false` (default) | Sin estado de selección, funciona como antes |
| `selectable=true` sin controller | Estado local interno, click selecciona items |
| `selectable=true` con controller | Estado gestionado por controller, expone `clearSelection` y `getSelectedId` |
| `defaultSelectedId` | Item inicial seleccionado al montar el componente |
| `clearSelection()` | Resetea la selección a null |

## Examples

### With Position

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  position="top-end"
  offset={12}
  onClose={() => setIsOpen(false)}
  onItemClick={handleSelect}
/>
```

### With Header and Footer

```tsx
<FloatingMenu
  items={items}
  isOpen={isOpen}
  header={{
    renderType: 'component',
    show: true,
    heightMode: 'auto',
    render: () => (
      <div className="p-3 bg-gray-50">
        <h3 className="font-semibold">Select Option</h3>
      </div>
    ),
  }}
  footer={{
    renderType: 'component',
    show: true,
    heightMode: 'fixed',
    height: 50,
    render: () => (
      <div className="p-3 flex justify-end">
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    ),
  }}
  layout={{
    widthMode: 'fixed',
    width: 280,
    maxHeight: 350,
  }}
  onClose={() => setIsOpen(false)}
/>
```

### Selectable Language Selector

```tsx
const controller = useFloatingMenu();

<FloatingMenu
  items={languages}
  isOpen={isOpen}
  selectable={true}
  defaultSelectedId="es"
  controller={controller}
  layout={{ widthMode: 'fixed', width: 200 }}
  onSelectionChange={(id, item) => {
    console.log('Selected:', id, item?.data);
  }}
  onItemClick={() => setIsOpen(false)}
/>

<button onClick={() => controller.clearSelection()}>
  Limpiar selección
</button>
```

## Folder Structure

```
FloatingMenu/
├── web/
│   ├── types/
│   │   └── FloatingMenu.type.ts
│   ├── views/
│   │   └── FloatingMenu.view.tsx
│   ├── hooks/
│   │   └── useFloatingMenu.hook.ts
│   ├── css/
│   │   └── FloatingMenu.module.css
│   └── index.ts
├── index.tsx           # Web/Mobile dispatch
└── README.md
```

## Demo

Ver demo interactivo en: `/components/floating-menu`
