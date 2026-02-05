# SidebarLayout

Layout agnóstico con estructura de 3 áreas: **Sidebar (A)**, **Toolbar (B)** y **Main (C)**.

## Arquitectura

```
┌──────────────┬─────────────────────────────┐
│              │          TOOLBAR (B)        │  ← toolbarContent (ReactNode)
│              │   (flex-shrink: 0)         │     No se encoge, altura fija o auto
│   SIDEBAR    ├─────────────────────────────┤
│     (A)      │  ┌─────────────────────┐   │
│              │  │     MAIN (C)        │   │  ← children (ReactNode)
│  sidebarContent │  (padding configurable) │
│  (ReactNode) │  │  (scroll interno)   │   │     mainPaddingX / mainPaddingY
│              │  │                     │   │
│              │  └─────────────────────┘   │
└──────────────┴─────────────────────────────┘
```

## Características

- **Layout agnóstico**: Sin colores, solo estructura
- **Cálculo automático del espacio**: El área Main ocupa todo el espacio restante después del Toolbar (flex: 1), sin necesidad de calcular alturas manualmente
- **Scroll interno**: El área Main tiene scroll automático cuando el contenido excede el espacio disponible. El contenido nunca desborda fuera del layout
- **Padding configurable**: Props `mainPaddingX` y `mainPaddingY` para controlar el espaciado interno del área Main
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
| `sidebarExpandedWidth` | `number` | `stretch` | Ancho del sidebar expandido. Si no se pasa, se ajusta al contenido |
| `sidebarCollapsedWidth` | `number` | `stretch` | Ancho del sidebar colapsado. Si no se pasa, se ajusta al contenido |
| `toolbarHeight` | `number` | `stretch` | Altura del toolbar. Si no se pasa, se ajusta al contenido |
| `className` | `string` | - | Clases CSS adicionales |
| `mainPaddingX` | `number` | - | Padding horizontal (izquierda/derecha) del área Main en px |
| `mainPaddingY` | `number` | - | Padding vertical (arriba/abajo) del área Main en px |

### Comportamiento de tamaños

- **Sin prop (default)**: El área se ajusta automáticamente al tamaño del componente que se pasa (stretch/auto)
- **Con número**: El área usa ese tamaño fijo en píxeles

```tsx
// Stretch: se ajusta al contenido
<SidebarLayout
  sidebarContent={<MySidebar />}
  toolbarContent={<MyToolbar />}
>
  ...
</SidebarLayout>

// Fijo: tamaños específicos en px
<SidebarLayout
  sidebarExpandedWidth={300}
  sidebarCollapsedWidth={80}
  toolbarHeight={60}
  sidebarContent={<MySidebar />}
  toolbarContent={<MyToolbar />}
>
  ...
</SidebarLayout>

// Con padding en el área Main
<SidebarLayout
  mainPaddingX={24}
  mainPaddingY={16}
  sidebarContent={<MySidebar />}
  toolbarContent={<MyToolbar />}
>
  ...
</SidebarLayout>
```

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
  mainPaddingX?: number;
  mainPaddingY?: number;
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

## Comportamiento del Área Main

### Cálculo del espacio disponible

El SidebarLayout calcula automáticamente el espacio disponible para el área Main:

```
Altura total del viewport (100vh)
  - Altura del Toolbar (fija o auto)
  = Espacio disponible para Main
```

El Toolbar usa `flex-shrink: 0` y el Main usa `flex: 1`, por lo que el Main siempre ocupa exactamente el espacio restante después del Toolbar.

### Scroll interno

El área Main contiene el contenido dentro de sus límites:
- El contenedor Main tiene `overflow: hidden` para que nada desborde
- Dentro hay un wrapper con `overflow-y: auto` que proporciona scroll automático
- Si el contenido es más pequeño que el espacio, no hay scroll
- Si el contenido excede el espacio, aparece scroll vertical

### Padding del área Main

El padding se configura a nivel del SidebarLayout, no en los children:

```tsx
// ✓ Correcto: padding configurado en el layout
<SidebarLayout
  mainPaddingX={24}
  mainPaddingY={16}
  sidebarContent={<MySidebar />}
  toolbarContent={<MyToolbar />}
>
  <MyContent />
</SidebarLayout>

// ✗ Evitar: padding en el div hijo (no necesario)
<SidebarLayout ...>
  <div style={{ padding: 20 }}>
    <MyContent />
  </div>
</SidebarLayout>
```

| Prop | Aplica a |
|------|----------|
| `mainPaddingX` | padding-left + padding-right |
| `mainPaddingY` | padding-top + padding-bottom |

Si no se pasan, el área Main no tiene padding (contenido pegado a los bordes).

## Notas de Desarrollo

- El layout es **completamente agnóstico** - no tiene colores, solo estructura
- Los colores y estilos visuales deben ir en los componentes que se pasan (`sidebarContent`, `toolbarContent`, `children`)
- El scroll del área Main es interno al layout
- La transición del sidebar es animada (0.3s ease)
- El contenido del Main nunca desborda fuera del layout, el SidebarLayout se encarga de contenerlo
