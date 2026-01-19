# NavigationSidebar Component

Componente de navegación lateral configurable con soporte para i18n, temas y estructura de menú jerárquica.

## Importación

```tsx
import { NavigationSidebar } from "@/lib/ui-library/components/NavigationSidebar";
import type { NavigationItem, NavigationSubItem } from "@/lib/ui-library/components/NavigationSidebar";
```

## Características

- Items de navegación configurables por props
- Soporte para sub-menús con componentes personalizados
- Toggle de tema claro/oscuro
- Selector de idioma integrado
- Modo colapsado/expandido
- Responsive (menú móvil incluido)
- Soporte completo para i18n

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `items` | `NavigationItem[]` | **requerido** | Array de items de navegación |
| `brandTitle` | `string` | `'UI Library'` | Título de la marca |
| `brandSubtitle` | `string` | - | Subtítulo opcional |
| `brandIcon` | `ReactNode` | `<Package />` | Icono de la marca |
| `version` | `string` | `'v1.0.0'` | Versión mostrada |
| `currentPath` | `string` | - | Ruta actual para marcar items activos |
| `defaultCollapsed` | `boolean` | `false` | Estado inicial colapsado |
| `showThemeToggle` | `boolean` | `true` | Mostrar botón de cambio de tema |
| `showLanguageSelector` | `boolean` | `true` | Mostrar selector de idioma |
| `availableLanguages` | `string[]` | `['en', 'es']` | Idiomas disponibles |
| `currentLanguage` | `string` | - | Idioma actual (modo controlado) |
| `currentTheme` | `'light' \| 'dark'` | - | Tema actual (modo controlado) |
| `onNavigate` | `(path: string) => void` | - | Callback al navegar |
| `onThemeChange` | `(theme: 'light' \| 'dark') => void` | - | Callback al cambiar tema |
| `onLanguageChange` | `(language: string) => void` | - | Callback al cambiar idioma |
| `onCollapseChange` | `(collapsed: boolean) => void` | - | Callback al colapsar/expandir |
| `langOverride` | `string` | - | Override del idioma para traducciones |
| `i18nOrder` | `'global-first' \| 'local-first'` | `'local-first'` | Prioridad de traducciones |
| `className` | `string` | - | Clases CSS adicionales |
| `footerContent` | `ReactNode` | - | Contenido personalizado del footer |

## Interfaces

### NavigationItem

```tsx
interface NavigationItem {
  id: string;                       // ID único del item
  label: string;                    // Texto a mostrar
  path?: string;                    // Ruta de navegación
  icon?: ReactNode;                 // Icono del item
  isActive?: boolean;               // Estado activo (calculado automáticamente)
  children?: NavigationSubItem[];   // Sub-items
  component?: ReactNode;            // Componente personalizado
}
```

### NavigationSubItem

```tsx
interface NavigationSubItem {
  id: string;                       // ID único del sub-item
  label: string;                    // Texto a mostrar
  path: string;                     // Ruta de navegación
  icon?: ReactNode;                 // Icono opcional
  isActive?: boolean;               // Estado activo
  component?: ReactNode;            // Componente personalizado
}
```

## Ejemplo Básico

```tsx
import { NavigationSidebar } from "@/lib/ui-library/components/NavigationSidebar";
import { Home, Settings, Users } from "lucide-react";

const menuItems = [
  {
    id: "home",
    label: "Inicio",
    path: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: "users",
    label: "Usuarios",
    icon: <Users className="h-5 w-5" />,
    children: [
      { id: "users-list", label: "Lista", path: "/users" },
      { id: "users-add", label: "Agregar", path: "/users/add" },
    ],
  },
  {
    id: "settings",
    label: "Configuración",
    path: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

function App() {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <NavigationSidebar
      items={menuItems}
      brandTitle="Mi App"
      version="v2.0.0"
      currentPath={window.location.pathname}
      onNavigate={handleNavigate}
    />
  );
}
```

## Ejemplo con Componentes Personalizados en Sub-items

```tsx
const menuItems = [
  {
    id: "components",
    label: "Componentes",
    icon: <Package className="h-5 w-5" />,
    children: [
      {
        id: "button",
        label: "Button",
        path: "/components/button",
        component: (
          <div className="flex items-center gap-2">
            <span className="truncate">Button</span>
            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">New</span>
          </div>
        ),
      },
      {
        id: "card",
        label: "Card",
        path: "/components/card",
      },
    ],
  },
];
```

## Ejemplo con Footer Personalizado

```tsx
<NavigationSidebar
  items={menuItems}
  footerContent={
    <div className="flex items-center gap-2">
      <img src="/avatar.png" className="w-8 h-8 rounded-full" />
      <span>John Doe</span>
    </div>
  }
/>
```

## Modo Controlado vs No Controlado

### No Controlado (manejo interno)

```tsx
<NavigationSidebar
  items={menuItems}
  onNavigate={(path) => navigate(path)}
  onThemeChange={(theme) => console.log('Theme:', theme)}
  onLanguageChange={(lang) => console.log('Language:', lang)}
/>
```

El componente maneja internamente el tema e idioma usando `localStorage`.

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

El estado es manejado externamente por la aplicación padre.

## Traducciones

El componente incluye traducciones para:
- `navigationsidebar.themeToggle.light` / `dark` / `switch`
- `navigationsidebar.language.select` / `current`
- `navigationsidebar.menu.expand` / `collapse` / `openMobile` / `closeMobile`
- `navigationsidebar.navigation.main`

### Agregar traducciones personalizadas

```tsx
// Usando langOverride
<NavigationSidebar
  items={menuItems}
  langOverride="en"
/>

// Usando i18nOrder para priorizar traducciones globales
<NavigationSidebar
  items={menuItems}
  i18nOrder="global-first"
/>
```

## Estructura de Archivos

```
NavigationSidebar/
├── index.tsx                    # Export principal
├── README.md                    # Documentación
├── css/
│   ├── NavigationSidebar.module.css
│   └── index.ts
├── hooks/
│   ├── useNavigationSidebar.hook.ts
│   ├── useI18nMerge.hook.ts
│   └── index.ts
├── i18n/
│   ├── en.json
│   ├── es.json
│   └── index.ts
├── types/
│   ├── NavigationSidebar.type.ts
│   └── index.ts
└── views/
    ├── NavigationSidebar.view.tsx
    └── index.ts
```

## Responsive

- **Desktop (≥1024px)**: Sidebar fijo en el lado izquierdo, botón de colapsar visible
- **Mobile (<1024px)**: Sidebar oculto por defecto, botón hamburguesa fijo en esquina superior izquierda

## Accesibilidad

- Usa `aria-label` en botones
- Navegación semántica con `<nav>`
- Focus visible en elementos interactivos
- `data-testid` en todos los elementos interactivos
