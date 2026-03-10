# SidebarLayout

**Version: 2.0.0**

Layout agnóstico con estructura de 3 áreas: **Sidebar (A)**, **Toolbar (B)** y **Main (C)**. Soporte dual web/mobile con resolución automática via `useIsMobile()`.

## Comportamiento Responsivo

```
Desktop (>= 768px)                              Mobile (< 768px)
┌──────────────┬─────────────────────────────┐   ┌──────────────────────────┐
│              │          TOOLBAR (B)        │   │       TOOLBAR (B)        │
│   SIDEBAR    ├─────────────────────────────┤   ├──────────────────────────┤
│     (A)      │                             │   │                          │
│              │         MAIN (C)            │   │        MAIN (C)          │
│              │                             │   │      (fullscreen)        │
│              │                             │   │                          │
└──────────────┴─────────────────────────────┘   ├──────────────────────────┤
                                                 │    BOTTOM NAV (opt.)     │
                                                 └──────────────────────────┘
```

- **Web (>= 768px)**: Sidebar + Toolbar + Main
- **Mobile (< 768px)**: Toolbar + Main + Bottom Nav opcional (sin sidebar)
- Resolución automática via `useIsMobile()` — sin media queries CSS

## Estructura de Archivos

```
SidebarLayout/
├── index.tsx                                    # Root: resuelve web/mobile con useIsMobile()
├── README.md
├── web/
│   ├── index.ts
│   ├── views/
│   │   ├── index.ts
│   │   └── SidebarLayout.view.tsx               # Vista web: sidebar + toolbar + main
│   ├── hooks/
│   │   └── useSidebarLayout.hook.ts             # Context y hooks para estado del sidebar
│   ├── types/
│   │   ├── index.ts
│   │   └── SidebarLayout.types.ts               # SidebarLayoutProps + SidebarLayoutContextValue
│   └── css/
│       └── SidebarLayout.module.scss            # Estilos web con sidebar
└── mobile/
    ├── index.ts
    ├── views/
    │   ├── index.ts
    │   └── SidebarLayout.mobile.view.tsx         # Vista mobile: solo toolbar + main
    ├── types/
    │   ├── index.ts
    │   └── SidebarLayout.mobile.types.ts         # SidebarLayoutMobileProps (sin sidebar)
    └── css/
        └── SidebarLayout.mobile.module.scss      # Estilos mobile sin sidebar
```

## Características

- **Layout agnóstico**: Sin colores, solo estructura
- **Cálculo automático del espacio**: El área Main ocupa todo el espacio restante después del Toolbar (flex: 1)
- **Scroll interno**: El área Main tiene scroll automático cuando el contenido excede el espacio disponible
- **Padding configurable**: Props `mainPaddingX` y `mainPaddingY` para controlar el espaciado interno del área Main
- **Sidebar colapsable**: Hook para controlar estado collapsed/expanded (solo web)
- **Modo controlado/no-controlado**: Manejo flexible del estado del sidebar
- **Bottom nav en mobile**: Prop `bottomNavContent` para renderizar navegación inferior en mobile (solo se muestra en mobile)

## Importación

```tsx
import { SidebarLayout, useSidebarLayout } from "@/lib/ui-library/layouts/SidebarLayout";
```

O desde el index de layouts:

```tsx
import { SidebarLayout, useSidebarLayout } from "@/lib/ui-library/layouts";
```

## Props

### SidebarLayoutProps (Web — se pasan al root)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `sidebarContent` | `ReactNode` | **requerido** | Contenido del área A (Sidebar) — ignorado en mobile |
| `toolbarContent` | `ReactNode` | **requerido** | Contenido del área B (Toolbar) |
| `children` | `ReactNode` | **requerido** | Contenido del área C (Main) |
| `collapsed` | `boolean` | - | Estado controlado de colapso (solo web) |
| `defaultCollapsed` | `boolean` | `false` | Estado inicial de colapso (solo web) |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Callback al cambiar estado (solo web) |
| `sidebarExpandedWidth` | `number` | `auto` | Ancho del sidebar expandido (solo web) |
| `sidebarCollapsedWidth` | `number` | `auto` | Ancho del sidebar colapsado (solo web) |
| `toolbarHeight` | `number` | `auto` | Altura del toolbar |
| `className` | `string` | - | Clases CSS adicionales |
| `mainPaddingX` | `number` | - | Padding horizontal del área Main en px |
| `mainPaddingY` | `number` | - | Padding vertical del área Main en px |
| `bottomNavContent` | `ReactNode` | - | Navegación inferior (solo se renderiza en mobile) |

### SidebarLayoutMobileProps (Mobile — interno)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `toolbarContent` | `ReactNode` | **requerido** | Contenido del Toolbar |
| `children` | `ReactNode` | **requerido** | Contenido del Main |
| `toolbarHeight` | `number` | `auto` | Altura del toolbar |
| `className` | `string` | - | Clases CSS adicionales |
| `mainPaddingX` | `number` | - | Padding horizontal del Main |
| `mainPaddingY` | `number` | - | Padding vertical del Main |
| `bottomNavContent` | `ReactNode` | - | Navegación inferior fija en la parte baja |

### SidebarLayoutContextValue

| Prop | Tipo | Descripción |
|------|------|-------------|
| `collapsed` | `boolean` | Estado actual de colapso |
| `setCollapsed` | `(value: boolean) => void` | Establecer estado de colapso |
| `toggleCollapse` | `() => void` | Alternar estado de colapso |
| `sidebarWidth` | `number \| 'auto'` | Ancho actual del sidebar |

## Hook: useSidebarLayout

Permite a los componentes hijos acceder al estado del layout. Solo disponible en web.

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

| Método | Tipo | Descripción |
|--------|------|-------------|
| `collapsed` | `boolean` | Estado actual de colapso |
| `setCollapsed` | `(value: boolean) => void` | Establecer estado de colapso |
| `toggleCollapse` | `() => void` | Alternar estado de colapso |
| `sidebarWidth` | `number \| 'auto'` | Ancho actual del sidebar (px o auto) |

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

En web (>= 768px): muestra Sidebar + Toolbar + Main.
En mobile (< 768px): solo muestra Toolbar + Main + Bottom Nav (sin sidebar).

## Con Bottom Nav en Mobile

```tsx
function MyBottomNav() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', background: '#1e293b', padding: 10, color: 'white' }}>
      <span>Inicio</span>
      <span>Buscar</span>
      <span>Perfil</span>
    </nav>
  );
}

function App() {
  return (
    <SidebarLayout
      sidebarContent={<MySidebar />}
      toolbarContent={<MyToolbar />}
      bottomNavContent={<MyBottomNav />}
    >
      <MainContent />
    </SidebarLayout>
  );
}
```

- En web (>= 768px): `bottomNavContent` no se renderiza — el usuario navega con el sidebar
- En mobile (< 768px): `bottomNavContent` aparece fijo en la parte inferior, debajo del Main
- Si no se pasa `bottomNavContent`, no aparece nada abajo — solo Toolbar + Main

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

## Con Padding en el área Main

```tsx
<SidebarLayout
  mainPaddingX={24}
  mainPaddingY={16}
  sidebarContent={<MySidebar />}
  toolbarContent={<MyToolbar />}
>
  <MyContent />
</SidebarLayout>
```

## Comportamiento del Área Main

### Cálculo del espacio disponible

```
Altura total del viewport (100dvh / 100vh)
  - Altura del Toolbar (fija o auto)
  - Altura del Bottom Nav (si existe)
  = Espacio disponible para Main
```

El Toolbar y el Bottom Nav usan `flex-shrink: 0` y el Main usa `flex: 1`, por lo que el Main siempre ocupa exactamente el espacio restante entre ambos. Se usa `100dvh` (dynamic viewport height) con fallback a `100vh` para manejar correctamente la barra del navegador en dispositivos móviles.

### Scroll interno

- El contenedor Main tiene `overflow: hidden` para que nada desborde
- Dentro hay un wrapper con `overflow-y: auto` que proporciona scroll automático
- Si el contenido es más pequeño que el espacio, no hay scroll
- Si el contenido excede el espacio, aparece scroll vertical

## Dependencies

- SCSS Modules
- `useIsMobile` hook (de `@/lib/ui-library/hooks/useResponsive`)

## Notas de Desarrollo

- El layout es **completamente agnóstico** — no tiene colores, solo estructura
- Los colores y estilos visuales deben ir en los componentes que se pasan (`sidebarContent`, `toolbarContent`, `children`)
- El scroll del área Main es interno al layout
- La transición del sidebar es animada (0.3s ease) — solo web
- En mobile, el `sidebarContent` se ignora completamente (no se renderiza)
- El hook `useSidebarLayout` solo funciona dentro del context web; en mobile no hay sidebar context

## Changelog

### v2.0.0 (Marzo 2026)
- Archivos web movidos a subcarpeta `web/`
- Agregada variante mobile: solo renderiza Toolbar + Main, sin Sidebar
- Resolución automática web/mobile via `useIsMobile()` (breakpoint 768px)
- Tipos mobile independientes: `SidebarLayoutMobileProps`

### v1.0.0 (Febrero 2026)
- Versión inicial con estructura Sidebar + Toolbar + Main
