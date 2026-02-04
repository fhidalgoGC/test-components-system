# Guía para Crear Páginas de Demo

Esta guía documenta cómo crear nuevas páginas de demostración para componentes, providers u otras funcionalidades de la librería.

## Estructura de Carpetas

Cada página debe seguir esta estructura con soporte para web y mobile:

```
client/src/pages/[nombre-pagina]/
├── web/
│   ├── components/       # Componentes específicos de la demo web
│   ├── types/            # Tipos TypeScript para web
│   ├── view/             # Vista principal web
│   └── css/              # Estilos CSS/SCSS para web
├── mobile/
│   ├── components/       # Componentes específicos de la demo mobile
│   ├── types/            # Tipos TypeScript para mobile
│   ├── view/             # Vista principal mobile
│   └── css/              # Estilos CSS/SCSS para mobile
├── shared/               # (Opcional) Código compartido entre web y mobile
│   ├── types/
│   └── utils/
├── usePlatform.ts        # Hook que detecta la plataforma
└── index.tsx             # Exporta la página correcta según plataforma
```

---

## 1. Crear el Hook usePlatform

Este hook detecta si el usuario está en web o mobile y retorna la plataforma:

```typescript
// client/src/pages/[nombre-pagina]/usePlatform.ts
import { useState, useEffect } from 'react';

export type Platform = 'web' | 'mobile';

export const usePlatform = (): Platform => {
  const [platform, setPlatform] = useState<Platform>('web');

  useEffect(() => {
    const checkPlatform = () => {
      const isMobile = window.innerWidth < 768;
      setPlatform(isMobile ? 'mobile' : 'web');
    };

    checkPlatform();
    window.addEventListener('resize', checkPlatform);
    
    return () => window.removeEventListener('resize', checkPlatform);
  }, []);

  return platform;
};
```

---

## 2. Crear las Vistas Web y Mobile

### Vista Web
```typescript
// client/src/pages/[nombre-pagina]/web/view/[NombrePagina].view.tsx
import styles from '../css/[NombrePagina].module.css';

export const [NombrePagina]WebView = () => {
  return (
    <div className={styles.container}>
      {/* Contenido de la demo web */}
    </div>
  );
};
```

### Vista Mobile
```typescript
// client/src/pages/[nombre-pagina]/mobile/view/[NombrePagina].view.tsx
import styles from '../css/[NombrePagina].module.css';

export const [NombrePagina]MobileView = () => {
  return (
    <div className={styles.container}>
      {/* Contenido de la demo mobile */}
    </div>
  );
};
```

---

## 3. Crear el Index con Selector de Plataforma

```typescript
// client/src/pages/[nombre-pagina]/index.tsx
import { usePlatform } from './usePlatform';
import { [NombrePagina]WebView } from './web/view/[NombrePagina].view';
import { [NombrePagina]MobileView } from './mobile/view/[NombrePagina].view';

const [NombrePagina]Demo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <[NombrePagina]MobileView />;
  }

  return <[NombrePagina]WebView />;
};

export default [NombrePagina]Demo;
```

---

## 4. Registrar la Ruta

Agregar la ruta en `client/src/routes/index.tsx`:

### Importar el componente (lazy loading)
```typescript
const [NombrePagina]Demo = lazy(() => import("@/pages/[nombre-pagina]"));
```

### Agregar la ruta según el tipo de página:

#### Opción A: Página dentro del Layout Principal
La mayoría de demos usan el `AppLayoutView` (sidebar + contenido):

```typescript
<Route path="/components/[nombre-componente]" component={[NombrePagina]Demo} />
```

#### Opción B: Página Independiente (sin layout)
Para demos que necesitan su propio layout completo (ej: NavigationSidebar demos):

```typescript
// Agregar verificación antes del return principal
const is[NombrePagina]Page = location.startsWith('/components/[nombre-componente]/');

if (is[NombrePagina]Page) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/components/[nombre-componente]/basic" component={[NombrePagina]Basic} />
        <Route path="/components/[nombre-componente]/advanced" component={[NombrePagina]Advanced} />
      </Switch>
    </Suspense>
  );
}
```

---

## 5. Agregar al Menú Lateral

Editar `client/src/layouts/app-layout/utils/AppLayout.utils.ts`:

### Opción A: Componente Simple (hijo de "Components")

Agregar dentro del array `children` de "Components":

```typescript
{ 
  id: 'components', 
  label: 'Components',
  icon: 'Package',
  children: [
    // ... otros componentes
    { 
      id: '[nombre-componente]', 
      label: '[NombreComponente]', 
      i18n: { en: '[NombreComponente]', es: '[NombreComponenteES]', default: '[NombreComponente]' },
      path: '/components/[nombre-componente]', 
      icon: 'IconName'  // Usar icono de lucide-react
    },
  ]
}
```

### Opción B: Provider (hijo de "Providers")

Agregar dentro del array `children` de "Providers":

```typescript
{ 
  id: 'providers', 
  label: 'Providers',
  icon: 'Database',
  children: [
    // ... otros providers
    { 
      id: '[nombre-provider]', 
      label: '[NombreProvider]', 
      i18n: { en: '[NombreProvider]', es: '[NombreProviderES]', default: '[NombreProvider]' },
      path: '/providers/[nombre-provider]', 
      icon: 'IconName'
    },
  ]
}
```

### Opción C: Primer Nivel con Sub-páginas

Crear una nueva categoría de primer nivel con páginas anidadas:

```typescript
{ 
  id: '[nombre-categoria]', 
  label: '[NombreCategoria]', 
  i18n: { en: '[NombreCategoria]', es: '[NombreCategoriaES]', default: '[NombreCategoria]' },
  icon: 'IconName',
  children: [
    { 
      id: '[sub-pagina-1]', 
      label: '[SubPagina1]', 
      path: '/components/[nombre-categoria]/[sub-pagina-1]', 
      icon: 'IconName' 
    },
    { 
      id: '[sub-pagina-2]', 
      label: '[SubPagina2]', 
      path: '/components/[nombre-categoria]/[sub-pagina-2]', 
      icon: 'IconName' 
    },
    { 
      id: '[sub-pagina-3]', 
      label: '[SubPagina3]', 
      path: '/components/[nombre-categoria]/[sub-pagina-3]', 
      icon: 'IconName' 
    }
  ]
}
```

**Ejemplo real (HeterogeneousList):**
```typescript
{ 
  id: 'heterogeneous-list', 
  label: 'HeterogeneousList', 
  icon: 'Layout',
  children: [
    { id: 'registry-mode', label: 'Registry Mode', path: '/components/heterogeneous-list/registry' },
    { id: 'elements-mode', label: 'Elements Mode', path: '/components/heterogeneous-list/elements' },
    { id: 'async-loading', label: 'Async Loading', path: '/components/heterogeneous-list/async' }
  ]
}
```

---

## 6. Páginas que Abren en Nueva Pestaña

Para demos que deben abrir en una pestaña separada (páginas independientes):

```typescript
{ 
  id: '[nombre]', 
  label: '[Nombre]', 
  path: '/components/[nombre]/[variante]', 
  icon: 'IconName',
  openInNewTab: true  // <-- Agregar esta propiedad
}
```

**Ejemplo real (NavigationSidebar):**
```typescript
{ 
  id: 'navigation-sidebar', 
  label: 'NavigationSidebar', 
  icon: 'PanelLeft',
  children: [
    { id: 'nav-basic', label: 'Basic', path: '/components/nav-sidebar/basic', icon: 'Layout', openInNewTab: true },
    { id: 'nav-custom-header', label: 'Header Custom', path: '/components/nav-sidebar/custom-header', icon: 'Heading', openInNewTab: true },
    { id: 'nav-full-custom', label: 'Full Custom', path: '/components/nav-sidebar/full-custom', icon: 'Palette', openInNewTab: true }
  ]
}
```

---

## Resumen de Tipos de Página

| Tipo | Layout | openInNewTab | Ejemplo |
|------|--------|--------------|---------|
| Componente simple | AppLayoutView | No | TagSelector, Carousel |
| Provider | AppLayoutView | No | ControlData |
| Categoría con sub-páginas | AppLayoutView | No | HeterogeneousList |
| Página independiente | Sin layout | Sí | NavigationSidebar demos |
| Layout demo | Propio | Sí | SidebarLayout demos |

---

## Iconos Disponibles

Los iconos vienen de `lucide-react`. Algunos comunes:

- `Home`, `Package`, `Layout`, `Settings`, `Database`
- `List`, `Table`, `Grid`, `Rows`, `Columns`
- `Navigation`, `PanelLeft`, `Menu`, `ChevronDown`
- `Tags`, `Image`, `Map`, `Calendar`, `Shield`
- `Filter`, `Search`, `Plus`, `Edit`, `Trash`
- `User`, `Users`, `Building2`, `Palette`

Ver lista completa en: https://lucide.dev/icons

---

## Checklist para Nueva Página

- [ ] Crear estructura de carpetas (web/, mobile/, shared/)
- [ ] Crear `usePlatform.ts`
- [ ] Crear vista web en `web/view/`
- [ ] Crear vista mobile en `mobile/view/`
- [ ] Crear `index.tsx` con selector de plataforma
- [ ] Registrar ruta en `client/src/routes/index.tsx`
- [ ] Agregar al menú en `client/src/layouts/app-layout/utils/AppLayout.utils.ts`
- [ ] Si es página independiente, agregar `openInNewTab: true`
