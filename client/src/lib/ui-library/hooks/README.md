# Hooks - UI Library

Hooks reutilizables de la biblioteca de componentes UI.

---

## useResponsive

**Archivo:** `useResponsive.ts`

Hook principal para detección responsiva. Detecta el tipo de dispositivo y la orientación de la pantalla en tiempo real.

### Breakpoints

| Tipo | Ancho |
|------|-------|
| `mobile` | < 768px |
| `tablet` | 768px – 1023px |
| `desktop` | >= 1024px |

### Orientación

| Tipo | Condición |
|------|-----------|
| `portrait` | alto > ancho |
| `landscape` | ancho > alto |

### Retorno

```ts
const {
  deviceType,    // 'mobile' | 'tablet' | 'desktop'
  orientation,   // 'portrait' | 'landscape'
  isMobile,      // boolean
  isTablet,      // boolean
  isDesktop,     // boolean
  isPortrait,    // boolean
  isLandscape,   // boolean
} = useResponsive();
```

### Ejemplo

```tsx
import { useResponsive } from '../hooks';

function MyComponent() {
  const { isMobile, isTablet, isLandscape, isDesktop } = useResponsive();

  if (isMobile) {
    return <MobileView />;
  }

  if (isTablet && isLandscape) {
    return <TabletLandscapeView />;
  }

  if (isTablet) {
    return <TabletPortraitView />;
  }

  return <DesktopView />;
}
```

### Eventos que escucha

- `resize` — cambio de tamaño de ventana
- `orientationchange` — rotación de dispositivo

---

## useIsMobile

**Archivo:** `useResponsive.ts` (mismo archivo que `useResponsive`)

Atajo que devuelve solo un `boolean` indicando si es móvil (< 768px). Usa `useResponsive` internamente.

### Retorno

```ts
const isMobile: boolean = useIsMobile();
```

### Ejemplo

```tsx
import { useIsMobile } from '../hooks';

function MyComponent() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileView /> : <WebView />;
}
```

### Uso principal

Los componentes con variante web/mobile usan este hook en su `index.tsx` para decidir qué vista renderizar:

```tsx
import { useIsMobile } from '../../hooks';
import { MyComponentWeb } from './web/views/MyComponent.view';
import { MyComponentMobile } from './mobile/views/MyComponent.view';

export function MyComponent(props) {
  const isMobile = useIsMobile();
  return isMobile ? <MyComponentMobile {...props} /> : <MyComponentWeb {...props} />;
}
```

---

## useI18nMerge

**Archivo:** `useI18nMerge.ts`

Hook para internacionalización (i18n) a nivel de componente. Fusiona diccionarios locales del componente con las traducciones globales del proveedor `AppLanguageLibUiProvider`.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `localDictionaries` | `LocalDictionaries` | Diccionarios locales del componente (`{ en: {...}, es: {...} }`) |
| `opts.order` | `'local-first' \| 'global-first'` | Prioridad de traducciones (opcional) |
| `opts.langOverride` | `string` | Forzar un idioma específico (opcional) |

### Tipos

```ts
type LocalDictionaries = {
  [lang: string]: Record<string, string>;
};

interface UseI18nMergeOptions {
  order?: TranslationOrder;
  langOverride?: string;
}
```

### Retorno

```ts
const { lang, t } = useI18nMerge(dictionaries, options?);
// lang: idioma activo (string)
// t: función traductora (key: string) => string
```

### Ejemplo

```tsx
import { useI18nMerge } from '../hooks';

const dictionaries = {
  en: { 'mycomponent.title': 'My Title', 'mycomponent.save': 'Save' },
  es: { 'mycomponent.title': 'Mi Título', 'mycomponent.save': 'Guardar' },
};

function MyComponent({ langOverride, i18nOrder }) {
  const { t } = useI18nMerge(dictionaries, { order: i18nOrder });

  return (
    <div>
      <h1>{t('mycomponent.title')}</h1>
      <button>{t('mycomponent.save')}</button>
    </div>
  );
}
```

### Resolución de idioma

1. Si se pasa `langOverride`, usa ese idioma
2. Si no, usa el idioma del proveedor global `AppLanguageLibUiProvider`
3. Fallback: busca por prefijo de idioma (ej: `es-MX` → `es`)
4. Último recurso: `en` o el primer diccionario disponible

### Prioridad de traducciones

- `local-first`: las traducciones del componente tienen prioridad sobre las globales
- `global-first`: las traducciones globales tienen prioridad sobre las locales

---

## Estructura de archivos

```
hooks/
├── index.ts            # Re-exporta todos los hooks
├── useResponsive.ts    # useResponsive + useIsMobile
├── useI18nMerge.ts     # Hook de internacionalización
└── README.md           # Esta documentación
```

## Importación

Desde dentro de la biblioteca (componentes):
```ts
import { useResponsive, useIsMobile, useI18nMerge } from '../../hooks';
```

Desde el proyecto padre:
```ts
import { useResponsive, useIsMobile, useI18nMerge } from 'GC-UI-COMPONENTS/hooks';
```
