# Guía para Crear Páginas de Demo

Esta guía documenta cómo crear nuevas páginas de demostración para componentes, providers u otras funcionalidades de la librería.

## Estructura de Carpetas

Cada página debe seguir esta estructura con soporte para web y mobile:

```
client/src/pages/[nombre-pagina]/
├── web/
│   ├── components/       # Un archivo por cada ejemplo/demo de la página
│   ├── types/            # Tipos TypeScript para web
│   ├── view/             # Vista principal web (importa y renderiza los ejemplos)
│   └── css/              # Estilos CSS/SCSS para web
├── mobile/
│   ├── components/       # Un archivo por cada ejemplo/demo de la página (mobile)
│   ├── types/            # Tipos TypeScript para mobile
│   ├── view/             # Vista principal mobile
│   └── css/              # Estilos CSS/SCSS para mobile
├── shared/               # (Opcional) Código compartido entre web y mobile
│   ├── types/
│   └── utils/
└── index.tsx             # Exporta la página correcta según plataforma (usa useResponsive)
```

## Ejemplos como Componentes Independientes

Cada página de demo contiene **varios ejemplos** que demuestran distintas funcionalidades del componente. Cada ejemplo debe ser un **componente independiente** dentro de la carpeta `components/`, con **un archivo por cada ejemplo**.

La vista principal (`view/`) solo se encarga de importar y renderizar los ejemplos en orden, sin contener lógica de demo directamente.

### Estructura de la carpeta `components/`

```
client/src/pages/[nombre-pagina]/web/components/
├── BasicExample.tsx          # Ejemplo básico del componente
├── InfiniteScrollExample.tsx # Ejemplo con scroll infinito
├── StatesExample.tsx         # Ejemplo de estados visuales
└── CustomRenderExample.tsx   # Ejemplo con renders personalizados
```

### Reglas

1. **Un archivo = Un ejemplo**: Cada archivo en `components/` representa una demo autocontenida con su propio estado y lógica.
2. **Nombre descriptivo**: El nombre del archivo debe describir qué funcionalidad demuestra (ej: `BasicExample.tsx`, `WithControllerExample.tsx`).
3. **Autocontenido**: Cada ejemplo maneja su propio estado, callbacks y datos de prueba. No depende de otros ejemplos.
4. **La vista principal solo compone**: El archivo en `view/` importa los ejemplos y los renderiza, sin duplicar lógica de demo.

### Ejemplo de vista principal componiendo ejemplos

```typescript
// client/src/pages/grid-demo/web/view/GridDemo.view.tsx
import { BasicGridExample } from '../components/BasicGridExample';
import { InfiniteScrollExample } from '../components/InfiniteScrollExample';
import { StatesExample } from '../components/StatesExample';
import styles from '../css/GridDemo.module.css';

export function GridDemoWebView() {
  return (
    <div className={styles.container}>
      <h1>Grid Component</h1>
      <BasicGridExample />
      <InfiniteScrollExample />
      <StatesExample />
    </div>
  );
}
```

### Ejemplo de un componente de ejemplo

```typescript
// client/src/pages/grid-demo/web/components/BasicGridExample.tsx
import { useState } from 'react';
import { Grid } from '@/lib/ui-library/components/Grid';
import styles from '../css/GridDemo.module.css';

export function BasicGridExample() {
  const [data] = useState(() => generateData(8));

  return (
    <div className={styles.section}>
      <h2>Grid Estático</h2>
      <p>Grid básico sin controller.</p>
      <Grid
        data={data}
        grid={{ minColumns: 1, maxColumns: 4, minCardWidth: 220 }}
        item={{ renderType: 'component', render: (item) => <Card item={item} /> }}
      />
    </div>
  );
}
```

---

## 1. Detección de Plataforma con useResponsive

Para detectar si el usuario está en web o mobile se usa el hook centralizado `useResponsive` de la librería:

```typescript
// client/src/lib/ui-library/hooks/useResponsive.ts
import { useResponsive } from '@/lib/ui-library/hooks/useResponsive';

const { isMobile, isTablet, isDesktop, orientation } = useResponsive();
```

**NO crear hooks locales `usePlatform.ts`** en cada página. Usar siempre `useResponsive` del archivo `client/src/lib/ui-library/hooks/useResponsive.ts`.

Breakpoints:
- `isMobile`: < 768px
- `isTablet`: 768px - 1023px
- `isDesktop`: >= 1024px

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
import { useResponsive } from '@/lib/ui-library/hooks/useResponsive';
import { [NombrePagina]WebView } from './web/view/[NombrePagina].view';
import { [NombrePagina]MobileView } from './mobile/view/[NombrePagina].view';

const [NombrePagina]Demo = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
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
- [ ] Crear carpeta `web/components/` con un archivo por cada ejemplo
- [ ] Crear vista web en `web/view/` que importe y componga los ejemplos
- [ ] Crear vista mobile en `mobile/view/`
- [ ] Crear `index.tsx` con `useResponsive` para selector de plataforma
- [ ] Registrar ruta en `client/src/routes/index.tsx`
- [ ] Agregar al menú en `client/src/layouts/app-layout/utils/AppLayout.utils.ts`
- [ ] Si es página independiente, agregar `openInNewTab: true`
