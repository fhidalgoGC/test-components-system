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
| `headerHeight` | `number \| string` | - | Altura fija del header (ej: `80` o `"5rem"`) |
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

## Altura del Header

Usa el prop `headerHeight` para definir una altura fija del header. El divider aparecerá después de esa altura:

```tsx
// Con número (píxeles)
<NavigationSidebar
  headerHeight={80}
  headerContent={
    <div className="flex items-center gap-3">
      <img src="/logo.png" className="w-10 h-10" />
      <div>
        <h1 className="font-bold">Mi App</h1>
        <p className="text-xs text-gray-500">v1.0.0</p>
      </div>
    </div>
  }
  items={menuItems}
/>

// Con string (rem, vh, etc)
<NavigationSidebar
  headerHeight="5rem"
  headerContent={...}
  items={menuItems}
/>
```

## Personalización de Colores

El componente soporta tres formas de personalizar los colores:

### Opción 1: Via `className` (más simple)

Pasa clases de Tailwind directamente. Soporta variantes `dark:` para modo oscuro:

```tsx
<NavigationSidebar
  className="bg-slate-100 dark:bg-slate-900"
  items={menuItems}
/>

// Con color específico (hex, rgb, hsl)
<NavigationSidebar
  className="bg-[#1a2332] dark:bg-[#0f1419]"
  items={menuItems}
/>
```

### Opción 2: Via CSS Variables (recomendado)

Define las variables CSS en tu archivo global (index.css). Esto permite control completo sobre todos los colores:

```css
:root {
  /* Colores del sidebar en modo light */
  --sidebar-background: 0 0% 98%;           /* fondo */
  --sidebar-foreground: 240 5.3% 26.1%;     /* texto */
  --sidebar-primary: 240 5.9% 10%;          /* items activos */
  --sidebar-accent: 240 4.8% 95.9%;         /* hover */
  --sidebar-border: 220 13% 91%;            /* bordes */
}

.dark {
  /* Colores del sidebar en modo dark */
  --sidebar-background: 240 5.9% 10%;       /* fondo oscuro */
  --sidebar-foreground: 240 4.8% 95.9%;     /* texto claro */
  --sidebar-primary: 224.3 76.3% 48%;       /* azul primario */
  --sidebar-accent: 240 3.7% 15.9%;         /* hover */
  --sidebar-border: 240 3.7% 15.9%;         /* bordes */
}
```

> **Nota:** Los valores son HSL sin `hsl()`, solo números separados por espacios.

### Opción 3: Clase CSS personalizada

Define una clase en tu proyecto y pásala via `className`:

```css
/* En tu CSS */
.mi-sidebar-custom {
  background-color: #1e293b;
  color: #f8fafc;
}

.dark .mi-sidebar-custom {
  background-color: #0f172a;
}
```

```tsx
<NavigationSidebar
  className="mi-sidebar-custom"
  items={menuItems}
/>
```

### Variables CSS disponibles

| Variable | Descripción |
|----------|-------------|
| `--sidebar-background` | Color de fondo del sidebar |
| `--sidebar-foreground` | Color del texto |
| `--sidebar-primary` | Color de items activos |
| `--sidebar-accent` | Color de hover/focus |
| `--sidebar-border` | Color de bordes |
| `--sidebar-primary-foreground` | Texto sobre color primario |
| `--sidebar-accent-foreground` | Texto sobre color accent |

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
