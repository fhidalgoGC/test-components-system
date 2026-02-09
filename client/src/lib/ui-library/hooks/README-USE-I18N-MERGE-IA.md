# useI18nMerge

**Archivo:** `useI18nMerge.ts`

Hook de internacionalización (i18n) a nivel de componente. Fusiona diccionarios locales del componente con las traducciones globales del proveedor `AppLanguageLibUiProvider`.

---

## Parámetros

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `localDictionaries` | `LocalDictionaries` | Sí | Diccionarios locales del componente |
| `opts.order` | `'local-first' \| 'global-first'` | No | Prioridad de traducciones |
| `opts.langOverride` | `string` | No | Forzar un idioma específico |

## Tipos exportados

```ts
type LocalDictionaries = {
  [lang: string]: Record<string, string>;
};

interface UseI18nMergeOptions {
  order?: TranslationOrder;
  langOverride?: string;
}
```

## Retorno

```ts
const {
  lang,  // string — idioma activo
  t,     // (key: string) => string — función traductora
} = useI18nMerge(dictionaries, options?);
```

## Resolución de idioma

1. Si se pasa `langOverride`, usa ese idioma
2. Si no, usa el idioma del proveedor global `AppLanguageLibUiProvider`
3. Fallback por prefijo de idioma (ej: `es-MX` → `es`)
4. Último recurso: `en` o el primer diccionario disponible

## Prioridad de traducciones

| Valor | Comportamiento |
|-------|---------------|
| `local-first` | Traducciones del componente tienen prioridad sobre las globales |
| `global-first` | Traducciones globales tienen prioridad sobre las locales |

Si no se especifica, se determina automáticamente a partir de `libI18n.translationPriority`:
- `component-first` → `local-first`
- Cualquier otro → `global-first`

## Dependencias internas

- `makeTranslator` de `../utils` — crea la función `t()` fusionando diccionarios
- `useLibI18n` de `../providers/AppLanguageLibUiProvider` — obtiene idioma y traducciones globales

## Ejemplo

```tsx
import { useI18nMerge } from '../hooks';

const dictionaries = {
  en: {
    'mycomponent.title': 'My Title',
    'mycomponent.save': 'Save',
    'mycomponent.cancel': 'Cancel',
  },
  es: {
    'mycomponent.title': 'Mi Título',
    'mycomponent.save': 'Guardar',
    'mycomponent.cancel': 'Cancelar',
  },
};

function MyComponent({ langOverride, i18nOrder }) {
  const { t, lang } = useI18nMerge(dictionaries, {
    order: i18nOrder,
    langOverride,
  });

  return (
    <div>
      <h1>{t('mycomponent.title')}</h1>
      <button>{t('mycomponent.save')}</button>
      <button>{t('mycomponent.cancel')}</button>
    </div>
  );
}
```

## Importación

Desde dentro de la biblioteca:
```ts
import { useI18nMerge } from '../../hooks';
```

Desde el proyecto padre:
```ts
import { useI18nMerge } from 'GC-UI-COMPONENTS/hooks';
```
