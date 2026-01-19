# NavigationSidebar Component

Componente de navegación lateral con estructura de **Header**, **Body** y **Footer** configurable.

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

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `NavigationItem[]` | **requerido** | Items de navegación (Body) |
| `headerContent` | `ReactNode` | - | Componente para el Header |
| `footerContent` | `ReactNode` | - | Componente personalizado para el Footer |
| `currentPath` | `string` | - | Ruta actual para marcar items activos |
| `defaultCollapsed` | `boolean` | `false` | Estado inicial colapsado |
| `showThemeToggle` | `boolean` | `true` | Mostrar botón de tema (solo si no hay footerContent) |
| `showLanguageSelector` | `boolean` | `true` | Mostrar selector de idioma (solo si no hay footerContent) |
| `availableLanguages` | `string[]` | `['en', 'es']` | Idiomas disponibles |
| `currentLanguage` | `string` | - | Idioma actual (modo controlado) |
| `currentTheme` | `'light' \| 'dark'` | - | Tema actual (modo controlado) |
| `onNavigate` | `(path: string) => void` | - | Callback al navegar |
| `onThemeChange` | `(theme) => void` | - | Callback al cambiar tema |
| `onLanguageChange` | `(language) => void` | - | Callback al cambiar idioma |
| `onCollapseChange` | `(collapsed) => void` | - | Callback al colapsar/expandir |
| `collapsedWidth` | `number` | `80` | Ancho en modo colapsado (px) |
| `expandedWidth` | `number` | `280` | Ancho en modo expandido (px) |
| `langOverride` | `string` | - | Override del idioma para traducciones |
| `className` | `string` | - | Clases CSS adicionales |

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
}
```

## Ejemplo Básico

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

## Header Personalizado

El header recibe un `ReactNode` para renderizar cualquier contenido:

```tsx
<NavigationSidebar
  headerContent={
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <img src="/logo.png" className="w-8 h-8" />
        <span className="font-bold">Brand</span>
      </div>
      <span className="text-xs bg-blue-100 px-2 py-1 rounded">v2.0</span>
    </div>
  }
  items={menuItems}
/>
```

## Footer Personalizado

Por defecto, el footer muestra los controles de tema e idioma. Puedes personalizarlo:

```tsx
// Footer predeterminado (tema + idioma)
<NavigationSidebar
  items={menuItems}
  showThemeToggle={true}
  showLanguageSelector={true}
/>

// Footer personalizado
<NavigationSidebar
  items={menuItems}
  footerContent={
    <div className="flex items-center gap-2">
      <img src="/avatar.png" className="w-8 h-8 rounded-full" />
      <div>
        <p className="text-sm font-medium">John Doe</p>
        <p className="text-xs text-gray-500">Admin</p>
      </div>
    </div>
  }
/>
```

## Items con Sub-menús

```tsx
const menuItems = [
  {
    id: "components",
    label: "Components",
    icon: <Package className="h-5 w-5" />,
    children: [
      { id: "button", label: "Button", path: "/components/button" },
      { id: "card", label: "Card", path: "/components/card" },
      { 
        id: "carousel", 
        label: "Carousel", 
        path: "/components/carousel",
        component: (
          <div className="flex items-center gap-2">
            <span>Carousel</span>
            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">New</span>
          </div>
        )
      },
    ],
  },
];
```

## Modo Controlado vs No Controlado

### No Controlado (manejo interno)

```tsx
<NavigationSidebar
  items={menuItems}
  onThemeChange={(theme) => console.log(theme)}
  onLanguageChange={(lang) => console.log(lang)}
/>
```

### Controlado (manejo externo)

```tsx
const [theme, setTheme] = useState<'light' | 'dark'>('light');
const [language, setLanguage] = useState('es');

<NavigationSidebar
  items={menuItems}
  currentTheme={theme}
  currentLanguage={language}
  onThemeChange={setTheme}
  onLanguageChange={setLanguage}
/>
```

## Responsive

- **Desktop (≥1024px)**: Sidebar fijo, botón de colapsar visible
- **Mobile (<1024px)**: Sidebar oculto, botón hamburguesa fijo

## Estructura de Archivos

```
NavigationSidebar/
├── index.tsx
├── README.md
├── css/
│   └── NavigationSidebar.module.css
├── hooks/
│   ├── useNavigationSidebar.hook.ts
│   └── useI18nMerge.hook.ts
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── index.ts
├── types/
│   └── NavigationSidebar.type.ts
└── views/
    └── NavigationSidebar.view.tsx
```
