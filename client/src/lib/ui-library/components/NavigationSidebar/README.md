# NavigationSidebar Component

Componente de navegación lateral con estructura de **Header**, **Body** y **Footer** configurable.

## Soporte de Plataformas

| Plataforma | Variante | Descripción |
|-----------|----------|-------------|
| Web (≥ 768px) | Sidebar fijo | Sidebar lateral con colapsar/expandir |
| Mobile (< 768px) | Drawer | Drawer que se desliza desde la izquierda con overlay |

## Arquitectura

```
┌─────────────────────────────┐
│         HEADER              │  ← headerContent (ReactNode)
│   (componente custom)       │
├─────────────────────────────┤
│                             │
│         BODY                │  ← items (NavigationItem[])
│   (items de navegación)     │
│                             │
├─────────────────────────────┤
│         FOOTER              │  ← footerContent (ReactNode) o default
│   (tema/idioma o custom)    │
└─────────────────────────────┘
```

## Importación

```tsx
import { NavigationSidebar } from "@/lib/ui-library/components/NavigationSidebar";
import type { NavigationItem } from "@/lib/ui-library/components/NavigationSidebar";
```

Para mobile, importar con props adicionales:

```tsx
import type { NavigationSidebarMobileProps } from "@/lib/ui-library/components/NavigationSidebar";
```

## Props

### Props compartidas (web + mobile)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `NavigationItem[]` | **requerido** | Items de navegación (Body) |
| `headerContent` | `ReactNode` | - | Componente para el Header |
| `headerIcon` | `ReactNode` | - | Icono para el Header |
| `headerHeight` | `number \| string` | - | Altura fija del header (ej: `80` o `"5rem"`) |
| `footerContent` | `ReactNode` | - | Componente personalizado para el Footer |
| `currentPath` | `string` | - | Ruta actual para marcar items activos |
| `showThemeToggle` | `boolean` | `true` | Mostrar botón de tema (solo si no hay footerContent) |
| `showLanguageSelector` | `boolean` | `true` | Mostrar selector de idioma (solo si no hay footerContent) |
| `availableLanguages` | `string[]` | `['en', 'es']` | Idiomas disponibles |
| `currentLanguage` | `string` | - | Idioma actual (modo controlado) |
| `currentTheme` | `'light' \| 'dark'` | - | Tema actual (modo controlado) |
| `onNavigate` | `(path: string) => void` | - | Callback al navegar |
| `onThemeChange` | `(theme) => void` | - | Callback al cambiar tema |
| `onLanguageChange` | `(language) => void` | - | Callback al cambiar idioma |
| `onCollapseChange` | `(collapsed) => void` | - | Callback al colapsar/expandir |
| `langOverride` | `string` | - | Override del idioma para traducciones |
| `className` | `string` | - | Clases CSS adicionales |
| `showFooter` | `boolean` | `true` | Mostrar footer |

### Props exclusivas de web

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `defaultCollapsed` | `boolean` | `false` | Estado inicial colapsado |
| `collapsedWidth` | `number` | `80` | Ancho en modo colapsado (px) |
| `expandedWidth` | `number` | `280` | Ancho en modo expandido (px) |

### Props exclusivas de mobile

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **requerido** | Si el drawer está abierto |
| `onClose` | `() => void` | **requerido** | Callback al cerrar el drawer |

## Interfaces

### NavigationItem

```tsx
interface NavigationItem {
  id: string;
  label: string;
  path?: string;
  icon?: ReactNode;
  isActive?: boolean;
  children?: NavigationSubItem[];
  component?: ReactNode;
  i18n?: MultiLanguageLabel;
}
```

### NavigationSubItem

```tsx
interface NavigationSubItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  component?: ReactNode;
  i18n?: MultiLanguageLabel;
}
```

## Ejemplo Básico (Web)

```tsx
import { NavigationSidebar } from "@/lib/ui-library/components/NavigationSidebar";
import { Home, Settings, Package } from "lucide-react";

const menuItems = [
  { id: "home", label: "Inicio", path: "/", icon: <Home className="h-5 w-5" /> },
  { id: "settings", label: "Config", path: "/settings", icon: <Settings className="h-5 w-5" /> },
];

function App() {
  return (
    <NavigationSidebar
      headerContent={
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold">Mi App</h1>
            <p className="text-xs text-gray-500">v1.0.0</p>
          </div>
        </div>
      }
      items={menuItems}
      onNavigate={(path) => window.location.href = path}
    />
  );
}
```

## Ejemplo Mobile (Drawer)

En mobile (< 768px), el componente se comporta como un drawer que se desliza desde la izquierda. Necesitas controlar su estado `isOpen`/`onClose`:

```tsx
import { useState } from "react";
import { NavigationSidebar } from "@/lib/ui-library/components/NavigationSidebar";
import type { NavigationSidebarMobileProps } from "@/lib/ui-library/components/NavigationSidebar";
import { Menu, Home, Settings } from "lucide-react";

const menuItems = [
  { id: "home", label: "Inicio", path: "/", icon: <Home size={20} /> },
  { id: "settings", label: "Config", path: "/settings", icon: <Settings size={20} /> },
];

function MobileApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <header>
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <h1>Mi App</h1>
      </header>

      <NavigationSidebar
        items={menuItems}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(path) => console.log("Navegar a:", path)}
      />
    </div>
  );
}
```

## Comportamiento Mobile

- El drawer se renderiza via `createPortal` a `document.body`
- Overlay semi-transparente con `z-index: 9998`
- Drawer con `z-index: 9999` (siempre por encima de BottomNavigationBar y otros elementos fijos)
- Se cierra de 3 formas:
  1. **Tocar el overlay** (fuera del drawer)
  2. **Tocar el botón X** en el header del drawer
  3. **Gesto swipe** hacia la izquierda sobre el drawer (deslizar de derecha a izquierda)
- El gesto de swipe detecta velocidad y distancia: un swipe rápido (> 0.5 px/ms) o que supere el 30% del ancho cierra el drawer
- El drawer sigue el dedo mientras se arrastra, dando feedback visual en tiempo real
- Indicador visual de swipe (barra vertical) en el borde derecho del drawer
- Se bloquea el scroll del body mientras está abierto
- Animación de slide-in desde la izquierda con transición de 300ms
- Al seleccionar un item de navegación, el drawer se cierra automáticamente

## Responsive

- **Web (≥ 768px)**: Sidebar fijo lateral, con botón de colapsar visible en ≥ 1024px
- **Mobile (< 768px)**: Drawer desde la izquierda con overlay

## Estructura de Archivos

```
NavigationSidebar/
├── index.tsx                           # Dispatch web/mobile via useIsMobile()
├── README.md
├── shared/
│   ├── types/
│   │   ├── NavigationSidebar.type.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useNavigationSidebar.hook.ts
│   │   ├── useNavigationSidebarController.hook.ts
│   │   ├── useI18nMerge.hook.ts
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.ts
│   └── index.ts
├── web/
│   ├── views/
│   │   ├── NavigationSidebar.view.tsx
│   │   └── index.ts
│   ├── styles/
│   │   └── NavigationSidebar.module.css
│   └── index.ts
└── mobile/
    ├── views/
    │   ├── NavigationSidebar.mobile.view.tsx
    │   └── index.ts
    ├── styles/
    │   └── NavigationSidebar.mobile.module.css
    ├── hooks/
    │   ├── useDrawerSwipe.hook.ts
    │   └── index.ts
    └── index.ts
```
