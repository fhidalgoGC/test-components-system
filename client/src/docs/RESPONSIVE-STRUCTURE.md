# Estructura Responsiva de Componentes

Guía para organizar componentes y layouts con soporte dual web/mobile (y futuras variantes como tablet, portrait, landscape).

---

## Hook: `useResponsive`

Ubicación: `client/src/lib/ui-library/hooks/useResponsive.ts`

### Valores disponibles

```tsx
const {
  deviceType,    // 'mobile' | 'tablet' | 'desktop'
  orientation,   // 'portrait' | 'landscape'
  isMobile,      // true si width < 768px
  isTablet,      // true si width >= 768px y < 1024px
  isDesktop,     // true si width >= 1024px
  isPortrait,    // true si height > width
  isLandscape,   // true si width > height
} = useResponsive();
```

### Breakpoints

| Device   | Rango               |
|----------|---------------------|
| mobile   | `< 768px`           |
| tablet   | `>= 768px, < 1024px`|
| desktop  | `>= 1024px`         |

### Atajo: `useIsMobile()`

```tsx
import { useIsMobile } from '../../hooks';

const isMobile = useIsMobile(); // true si < 768px
```

Este atajo se usa en el root `index.tsx` de cada componente para el dispatch web/mobile.

---

## Estructura de Carpetas

### Caso base: web + mobile + shared

```
ComponentName/
├── shared/                  # Todo lo compartido entre variantes
│   ├── types/
│   │   ├── ComponentName.type.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useComponentName.hook.ts
│   │   ├── useI18nMerge.hook.ts
│   │   └── index.ts
│   ├── providers/
│   │   ├── ComponentName.provider.tsx
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.ts
│   ├── environment/
│   │   ├── enviroment.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── componentname.util.ts
│   │   └── index.ts
│   └── index.ts
├── web/                     # Solo vista y estilos específicos de web
│   ├── styles/
│   │   └── ComponentName.module.scss
│   ├── views/
│   │   ├── ComponentName.view.tsx
│   │   └── index.ts
│   └── index.ts
├── mobile/                  # Solo vista y estilos específicos de mobile
│   ├── styles/
│   │   └── ComponentName.mobile.module.css
│   ├── views/
│   │   ├── ComponentName.mobile.view.tsx
│   │   └── index.ts
│   └── index.ts
├── index.tsx                # Dispatch web/mobile
└── README.md
```

### Regla principal

> Las carpetas `web/`, `mobile/`, `shared/` son las únicas permitidas al nivel raíz del componente (junto con `index.tsx`, `README.md`, `README-IA.md`).

> Nunca crear carpetas como `types/`, `hooks/`, `utils/` al nivel raíz. Todo va dentro de `shared/`, `web/` o `mobile/`.

---

## Qué va en cada carpeta

### `shared/`
Todo lo que usan **ambas** variantes (o más):

| Contenido     | Ejemplo                          |
|---------------|----------------------------------|
| **types**     | Props, interfaces, tokens        |
| **hooks**     | useI18nMerge, useComponentName   |
| **providers** | Context providers                |
| **i18n**      | Traducciones en/es               |
| **environment** | Configuración del componente   |
| **utils**     | Funciones de cálculo, helpers    |

### `web/`
Solo lo exclusivo de la variante web:

| Contenido   | Ejemplo                           |
|-------------|-----------------------------------|
| **views**   | ComponentName.view.tsx            |
| **styles**  | ComponentName.module.scss      |

Importa directamente de `../../shared/types`, `../../shared/utils`, etc.

### `mobile/`
Solo lo exclusivo de la variante mobile:

| Contenido   | Ejemplo                           |
|-------------|-----------------------------------|
| **views**   | ComponentName.mobile.view.tsx     |
| **styles**  | ComponentName.mobile.module.css   |

Importa directamente de `../../shared/types`, `../../shared/utils`, etc.

---

## Patrón del Root `index.tsx`

El archivo `index.tsx` en la raíz del componente es el punto de entrada público. Su única responsabilidad es resolver la variante según el dispositivo.

### Ejemplo estándar (web/mobile)

```tsx
import { useIsMobile } from '../../hooks';
import { ComponentName as ComponentNameWeb } from './web';
import { ComponentName as ComponentNameMobile } from './mobile';
import type { ComponentNameProps } from './shared/types';

export const ComponentName = (props: ComponentNameProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ComponentNameMobile {...props} />;
  }

  return <ComponentNameWeb {...props} />;
};

export type { ComponentNameProps };
```

### Con props diferentes por variante

Cuando mobile necesita menos props que web, se pueden filtrar:

```tsx
export function ComponentName(props: ComponentNameWebProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ComponentNameMobile
        content={props.content}
        className={props.className}
      />
    );
  }

  return <ComponentNameWeb {...props} />;
}
```

---

## Variantes Futuras

### Agregando tablet

Si un componente necesita una vista específica para tablet:

```
ComponentName/
├── shared/
├── web/
├── mobile/
├── tablet/                  # Nueva variante
│   ├── styles/
│   │   └── ComponentName.tablet.module.css
│   ├── views/
│   │   ├── ComponentName.tablet.view.tsx
│   │   └── index.ts
│   └── index.ts
└── index.tsx
```

Root `index.tsx`:

```tsx
import { useResponsive } from '../../hooks';
import { ComponentName as ComponentNameWeb } from './web';
import { ComponentName as ComponentNameMobile } from './mobile';
import { ComponentName as ComponentNameTablet } from './tablet';
import type { ComponentNameProps } from './shared/types';

export const ComponentName = (props: ComponentNameProps) => {
  const { deviceType } = useResponsive();

  if (deviceType === 'mobile') {
    return <ComponentNameMobile {...props} />;
  }

  if (deviceType === 'tablet') {
    return <ComponentNameTablet {...props} />;
  }

  return <ComponentNameWeb {...props} />;
};
```

### Agregando orientación (portrait/landscape)

Para variantes por orientación dentro de mobile:

```
ComponentName/
├── shared/
├── web/
├── mobile/
│   ├── portrait/
│   │   ├── styles/
│   │   │   └── ComponentName.portrait.module.css
│   │   ├── views/
│   │   │   ├── ComponentName.portrait.view.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── landscape/
│   │   ├── styles/
│   │   │   └── ComponentName.landscape.module.css
│   │   ├── views/
│   │   │   ├── ComponentName.landscape.view.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── index.ts             # Dispatch portrait/landscape
└── index.tsx                 # Dispatch web/mobile
```

`mobile/index.ts`:

```tsx
import { useResponsive } from '../../../hooks';
import { ComponentNamePortrait } from './portrait';
import { ComponentNameLandscape } from './landscape';
import type { ComponentNameProps } from '../shared/types';

export const ComponentName = (props: ComponentNameProps) => {
  const { isPortrait } = useResponsive();

  if (isPortrait) {
    return <ComponentNamePortrait {...props} />;
  }

  return <ComponentNameLandscape {...props} />;
};
```

### Combinando todo (web + tablet + mobile-portrait + mobile-landscape)

```tsx
import { useResponsive } from '../../hooks';

export const ComponentName = (props: ComponentNameProps) => {
  const { deviceType, orientation } = useResponsive();

  if (deviceType === 'mobile') {
    if (orientation === 'portrait') {
      return <ComponentNameMobilePortrait {...props} />;
    }
    return <ComponentNameMobileLandscape {...props} />;
  }

  if (deviceType === 'tablet') {
    return <ComponentNameTablet {...props} />;
  }

  return <ComponentNameWeb {...props} />;
};
```

---

## Convenciones de Nombrado

### Archivos

| Variante           | Vista                                  | Estilos                                    |
|--------------------|-----------------------------------------|--------------------------------------------|
| Web                | `ComponentName.view.tsx`               | `ComponentName.module.scss`                |
| Mobile             | `ComponentName.mobile.view.tsx`        | `ComponentName.mobile.module.css`          |
| Tablet             | `ComponentName.tablet.view.tsx`        | `ComponentName.tablet.module.css`          |
| Mobile Portrait    | `ComponentName.portrait.view.tsx`      | `ComponentName.portrait.module.css`        |
| Mobile Landscape   | `ComponentName.landscape.view.tsx`     | `ComponentName.landscape.module.css`       |

### Carpeta de estilos

- Componentes nuevos: usar `styles/`
- Componentes legacy (SplitLayout, SidebarLayout): usan `css/` por compatibilidad, migrar a `styles/` cuando se toquen

---

## Resumen de Reglas

1. **`shared/`** contiene todo lo reutilizable: types, hooks, providers, i18n, environment, utils
2. **`web/`** y **`mobile/`** solo contienen vistas y estilos específicos de plataforma
3. Las vistas importan directamente de `../../shared/...`, nunca duplican lógica
4. El root `index.tsx` es el único punto de entrada público del componente
5. El dispatch usa `useIsMobile()` para web/mobile o `useResponsive()` para más variantes
6. Nunca crear carpetas de lógica (types, hooks, etc.) al nivel raíz del componente
7. Cada variante es una carpeta al mismo nivel: `web/`, `mobile/`, `tablet/`
8. Sub-variantes (portrait/landscape) van como subcarpetas dentro de su variante padre
