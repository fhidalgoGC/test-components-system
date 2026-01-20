# SidebarLayout

Layout agnóstico con estructura de 3 áreas: **Sidebar (A)**, **Toolbar (B)** y **Main (C)**.

## Arquitectura

```
┌──────────────┬─────────────────────────────┐
│              │          TOOLBAR (B)        │  ← toolbarContent (ReactNode)
│              │   (componente custom)       │
│   SIDEBAR    ├─────────────────────────────┤
│     (A)      │                             │
│              │          MAIN (C)           │  ← children (ReactNode)
│  sidebarContent                            │
│  (ReactNode) │   (contenido principal)     │
│              │   (scroll automático)       │
│              │                             │
└──────────────┴─────────────────────────────┘
```

## Características

- **Layout agnóstico**: Sin colores, solo estructura
- **Scroll automático**: El área C (Main) tiene scroll interno cuando el contenido excede
- **Sidebar colapsable**: Hook para controlar estado collapsed/expanded
- **Modo controlado/no-controlado**: Manejo flexible del estado

## Importación

```tsx
import { SidebarLayout, useSidebarLayout } from "@/lib/ui-library/layouts/SidebarLayout";
```

O desde el index de layouts:

```tsx
import { SidebarLayout, useSidebarLayout } from "@/lib/ui-library/layouts";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `sidebarContent` | `ReactNode` | **requerido** | Contenido del área A (Sidebar) |
| `toolbarContent` | `ReactNode` | **requerido** | Contenido del área B (Toolbar) |
| `children` | `ReactNode` | **requerido** | Contenido del área C (Main) |
| `collapsed` | `boolean` | - | Estado controlado de colapso |
| `defaultCollapsed` | `boolean` | `false` | Estado inicial de colapso |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Callback al cambiar estado |
| `sidebarExpandedWidth` | `number` | `260` | Ancho del sidebar expandido (px) |
| `sidebarCollapsedWidth` | `number` | `70` | Ancho del sidebar colapsado (px) |
| `toolbarHeight` | `number` | `60` | Altura del toolbar (px) |
| `className` | `string` | - | Clases CSS adicionales |

## Interfaces

### SidebarLayoutProps

```tsx
interface SidebarLayoutProps {
  sidebarContent: ReactNode;
  toolbarContent: ReactNode;
  children: ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
  sidebarExpandedWidth?: number;
  sidebarCollapsedWidth?: number;
  toolbarHeight?: number;
  className?: string;
}
```

### SidebarLayoutContextValue

```tsx
interface SidebarLayoutContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapse: () => void;
  sidebarWidth: number;
}
```

## Hook: useSidebarLayout

Permite a los componentes hijos acceder al estado del layout.

```tsx
function SidebarContent() {
  const { collapsed, toggleCollapse, sidebarWidth } = useSidebarLayout();
  
  return (
    <div>
      <span>{collapsed ? 'Colapsado' : 'Expandido'}</span>
      <button onClick={toggleCollapse}>Toggle</button>
    </div>
  );
}
```

### Métodos disponibles

| Método | Tipo | Descripción |
|--------|------|-------------|
| `collapsed` | `boolean` | Estado actual de colapso |
| `setCollapsed` | `(value: boolean) => void` | Establecer estado de colapso |
| `toggleCollapse` | `() => void` | Alternar estado de colapso |
| `sidebarWidth` | `number` | Ancho actual del sidebar (px) |

## Uso Básico

```tsx
import { SidebarLayout, useSidebarLayout } from "@/lib/ui-library/layouts/SidebarLayout";

function MySidebar() {
  const { collapsed, toggleCollapse } = useSidebarLayout();
  
  return (
    <div style={{ background: '#333', height: '100%', color: 'white' }}>
      {collapsed ? 'Menu' : 'Menu Principal'}
    </div>
  );
}

function MyToolbar() {
  const { toggleCollapse } = useSidebarLayout();
  
  return (
    <div style={{ background: '#444', height: '100%', color: 'white' }}>
      <button onClick={toggleCollapse}>Toggle Sidebar</button>
    </div>
  );
}

function App() {
  return (
    <SidebarLayout
      sidebarContent={<MySidebar />}
      toolbarContent={<MyToolbar />}
    >
      <div style={{ padding: 20 }}>
        <h1>Contenido Principal</h1>
        <p>Este contenido tiene scroll automático si excede el espacio.</p>
      </div>
    </SidebarLayout>
  );
}
```

## Modo Controlado

```tsx
function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <SidebarLayout
      collapsed={isCollapsed}
      onCollapseChange={setIsCollapsed}
      sidebarContent={<MySidebar />}
      toolbarContent={<MyToolbar />}
    >
      <MainContent />
    </SidebarLayout>
  );
}
```

## Estructura de Archivos

```
SidebarLayout/
├── css/
│   └── SidebarLayout.module.scss
├── hooks/
│   └── useSidebarLayout.hook.ts
├── types/
│   └── SidebarLayout.types.ts
├── views/
│   └── SidebarLayout.view.tsx
├── index.tsx
└── README.md
```

## Notas de Desarrollo

- El layout es **completamente agnóstico** - no tiene colores, solo estructura
- Los colores y estilos visuales deben ir en los componentes que se pasan (`sidebarContent`, `toolbarContent`, `children`)
- El scroll del área C es interno al layout
- La transición del sidebar es animada (0.3s ease)
