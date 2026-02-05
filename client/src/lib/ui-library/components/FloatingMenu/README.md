# FloatingMenu Component

Componente de menú flotante con posicionamiento configurable, secciones (header, body, footer), y soporte para items con render functions personalizadas.

## Features

- **Posicionamiento flexible**: 12 posiciones disponibles (top, bottom, left, right con variantes)
- **Secciones configurables**: Header, Body (items), Footer con show/hide independiente
- **Offset personalizable**: Separación configurable entre trigger y menú
- **Items con render function**: Renderizado completamente personalizable
- **Layout system**: Control de dimensiones (width, height, min/max)
- **Scroll modes**: Auto o none para el body
- **Backdrop opcional**: Click fuera para cerrar

## Platform Support

| Platform | Status | Description |
|----------|--------|-------------|
| Web | ✅ Implemented | Vite + Tailwind CSS |
| Mobile | ❌ Not Implemented | Web-only component |
| Native | ❌ Not Implemented | Web-only component |

## Installation

```tsx
import { FloatingMenu } from '@/lib/ui-library/components/FloatingMenu';
import type { FloatingMenuItem, MenuPosition } from '@/lib/ui-library/components/FloatingMenu';
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
| `onItemClick` | `(item, index) => void` | - | Callback al click en item |
| `onClose` | `() => void` | - | Callback al cerrar (click fuera) |
| `className` | `string` | - | Clase CSS del contenedor |
| `itemClassName` | `string` | - | Clase CSS de cada item |
| `headerClassName` | `string` | - | Clase CSS del header |
| `footerClassName` | `string` | - | Clase CSS del footer |

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

### Language Selector

```tsx
interface LanguageData {
  name: string;
  code: string;
  flag: string;
}

const languages: FloatingMenuItem<LanguageData>[] = [
  {
    id: 'en',
    data: { name: 'English', code: 'en', flag: '🇺🇸' },
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="text-2xl">{item.data?.flag}</span>
        <span>{item.data?.name}</span>
      </div>
    ),
  },
  // ... more languages
];

<FloatingMenu
  items={languages}
  isOpen={isOpen}
  layout={{ widthMode: 'fixed', width: 200 }}
  onItemClick={(item) => {
    setSelectedLanguage(item.data);
    setIsOpen(false);
  }}
/>
```

## Folder Structure

```
FloatingMenu/
├── web/
│   ├── types/
│   │   └── FloatingMenu.type.ts
│   ├── views/
│   │   └── FloatingMenu.view.tsx
│   ├── css/
│   │   └── FloatingMenu.module.css
│   └── index.ts
├── index.tsx           # Web/Mobile dispatch
└── README.md
```

## Demo

Ver demo interactivo en: `/components/floating-menu`
