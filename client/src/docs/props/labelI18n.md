# labelI18n — Estandar de etiquetas multilenguaje

El prop `labelI18n` es el estandar que usamos en los componentes de la libreria para textos visibles al usuario que deben traducirse segun el idioma activo. Cuando el usuario cambia de idioma, el componente actualiza sus textos automaticamente sin recargar la pagina.

## Interfaz

```ts
interface MultiLanguageLabel {
  [languageCode: string]: any;
  default: string;
  metadata?: any;
}

type LabelOrMultiLanguage = string | MultiLanguageLabel;
```

Ambos tipos se importan desde:

```ts
import type { MultiLanguageLabel, LabelOrMultiLanguage } from '@/lib/ui-library/types';
```

## Propiedades de MultiLanguageLabel

| Propiedad | Tipo | Requerido | Descripcion |
|-----------|------|:---------:|-------------|
| `default` | `string` | SI | Texto de fallback obligatorio. Se usa cuando no hay traduccion para el idioma activo. |
| `[languageCode]` | `string` | NO | Traduccion para un idioma especifico (`en`, `es`, `fr`, etc.). |
| `metadata` | `any` | NO | Informacion adicional opcional (no se usa en la resolucion del texto). |

## LabelOrMultiLanguage

Es un tipo flexible que acepta:

- Un `string` simple (no traducible, se muestra tal cual).
- Un `MultiLanguageLabel` (traducible segun el idioma activo).

```ts
type LabelOrMultiLanguage = string | MultiLanguageLabel;
```

Los componentes de la libreria usan `LabelOrMultiLanguage` como tipo del prop `labelI18n` para aceptar ambos formatos.

## Resolucion del idioma

La funcion `resolveMultiLanguageLabel` convierte un `LabelOrMultiLanguage` al string del idioma activo:

```ts
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

const texto = resolveMultiLanguageLabel(label, lang);
```

### Orden de resolucion

1. Coincidencia exacta del codigo de idioma (`es`, `en`)
2. Prefijo del idioma (`en` para `en-US`)
3. Cualquier clave que empiece con el prefijo
4. Fallback a `default`
5. Ultimo recurso: primer valor string encontrado

### Si el label es un string simple

Si se pasa un `string` en vez de un `MultiLanguageLabel`, `resolveMultiLanguageLabel` lo retorna tal cual sin intentar traducirlo.

## Como implementar en un componente

### Paso 1 — Definir la prop como labelI18n

```ts
import type { LabelOrMultiLanguage } from '@/lib/ui-library/types';

interface MiComponenteProps {
  labelI18n?: LabelOrMultiLanguage;
}
```

### Paso 2 — Obtener el idioma activo

Los componentes **internos de la libreria** usan el contexto `LibI18nContext`:

```ts
import { useContext } from 'react';
import { LibI18nContext } from '@/lib/ui-library/providers/AppLanguageLibUiProvider/index.hook';

const libI18n = useContext(LibI18nContext);
const lang = libI18n?.lang || 'en';
```

Los componentes de **aplicacion** usan el hook `useAppLanguage`:

```ts
import { useAppLanguage } from '@/lib/ui-library/providers';

const { lang } = useAppLanguage();
```

### Paso 3 — Resolver el label en el render

```ts
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

function MiComponente({ labelI18n }: MiComponenteProps) {
  const libI18n = useContext(LibI18nContext);
  const lang = libI18n?.lang || 'en';

  const textoResuelto = labelI18n
    ? resolveMultiLanguageLabel(labelI18n, lang)
    : undefined;

  return textoResuelto ? <span>{textoResuelto}</span> : null;
}
```

Al depender de `lang` (que viene del contexto reactivo), el componente se re-renderiza automaticamente cuando el usuario cambia de idioma.

## Ejemplos de uso

### Label simple (string)

```tsx
<Loading
  state="loading"
  labelI18n="Cargando..."
/>
```

Se muestra "Cargando..." sin importar el idioma.

### Label multilenguaje

```tsx
<Loading
  state="loading"
  labelI18n={{
    en: 'Loading data...',
    es: 'Cargando datos...',
    default: 'Loading data...',
  }}
/>
```

Se muestra "Cargando datos..." cuando el idioma es español, "Loading data..." cuando es ingles.

### Con el provider

```tsx
const { show } = useLoading();

show({
  labelI18n: {
    en: 'Saving...',
    es: 'Guardando...',
    default: 'Saving...',
  },
});
```

### Lista de items con labels traducidos

Para listas donde cada item tiene su propia etiqueta traducida, usar `ItemWithMultiLanguageLabel`:

```ts
import type { ItemWithMultiLanguageLabel } from '@/lib/ui-library/types';

const opciones: ItemWithMultiLanguageLabel[] = [
  { id: 'driver', label: { en: 'Driver', es: 'Conductor', default: 'Driver' } },
  { id: 'fleet', label: { en: 'Fleet', es: 'Flota', default: 'Fleet' } },
];
```

## Helpers disponibles

| Funcion | Descripcion |
|---------|-------------|
| `resolveMultiLanguageLabel(label, lang)` | Resuelve un `LabelOrMultiLanguage` al string del idioma activo |
| `createSimpleLabel(text)` | Crea un `MultiLanguageLabel` con solo `default` |
| `createMultiLanguageLabel({ en, es })` | Crea un `MultiLanguageLabel` completo con fallback automatico |
| `isMultiLanguageLabel(value)` | Type guard — verifica si un valor es `MultiLanguageLabel` |

Todas se importan desde:

```ts
import {
  resolveMultiLanguageLabel,
  createSimpleLabel,
  createMultiLanguageLabel,
  isMultiLanguageLabel,
} from '@/lib/ui-library/utils';
```

## Componentes que usan labelI18n

| Componente | Prop | Tipo | Descripcion |
|------------|------|------|-------------|
| `Loading` | `labelI18n` | `LabelOrMultiLanguage` | Texto debajo del spinner (solo `renderType: 'self'`) |
| `NavigationSidebar` | `items[].i18n` | `MultiLanguageLabel` | Label de cada item del menu |
| `TagSelector` | `allLabel` | `MultiLanguageLabel` | Label del tag "Todos" |
| `TagSelector` | `items[].label` | `MultiLanguageLabel` | Label de cada tag |
| `BottomNavigationBar` | `items[].label` | `MultiLanguageLabel` | Label de cada item |
| `LoginCard` | `title`, `subtitle` | `MultiLanguageLabel` | Titulo y subtitulo del card |
| `LoadingProvider` | `defaultLabelI18n` / `show({ labelI18n })` | `LabelOrMultiLanguage` | Label del loading global |

## Convencion de nombres

| Tipo de prop | Nombre correcto | Ejemplo |
|-------------|-----------------|---------|
| Label de texto visible unico | `labelI18n` | `labelI18n?: LabelOrMultiLanguage` |
| Titulo traducible | `titleI18n` o `title` con tipo `MultiLanguageLabel` | `title?: MultiLanguageLabel` |
| Label dentro de un item | `label` con tipo `MultiLanguageLabel` | `items[].label: MultiLanguageLabel` |
| Label del provider (default) | `defaultLabelI18n` | `defaultLabelI18n?: LabelOrMultiLanguage` |

La regla general: si el prop se llama `label` y contiene texto visible al usuario, debe ser de tipo `LabelOrMultiLanguage` o `MultiLanguageLabel` y su nombre debe incluir el sufijo `I18n` (por ejemplo, `labelI18n`). Excepciones: cuando el label esta dentro de un objeto item (como `items[].label`), el nombre `label` es aceptable porque el tipo `MultiLanguageLabel` ya deja claro que es traducible.

## Regla importante

Todos los componentes de la libreria que muestran textos visibles al usuario deben:

1. Usar `labelI18n` (tipo `LabelOrMultiLanguage`) para props de texto traducible.
2. Resolver el texto con `resolveMultiLanguageLabel(labelI18n, lang)`.
3. Obtener `lang` del contexto reactivo (`LibI18nContext` para componentes internos, `useAppLanguage` para aplicaciones).
4. El `MultiLanguageLabel` siempre debe incluir la clave `default` como fallback obligatorio.
5. Aceptar tambien strings simples (via `LabelOrMultiLanguage`) para uso rapido sin traduccion.
