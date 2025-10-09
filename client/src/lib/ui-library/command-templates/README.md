# Component Templates

Plantillas base para generar componentes de UI con soporte i18n reactivo.

## 📁 Estructura

```
command-templates/
├── hooks/
│   ├── useComponentName.hook.ts.template    # Hook personalizado del componente
│   └── useI18nMerge.hook.ts.template        # Hook i18n (copia de TagSelector)
├── providers/
│   └── ComponentName.provider.tsx.template  # Provider con Context + i18n
├── types/
│   └── ComponentName.type.ts.template       # Interfaces (Props + Context)
├── views/
│   └── ComponentName.view.tsx.template      # Vista del componente
├── css/
│   ├── ComponentName.module.css.template    # Estilos CSS Module
│   └── ComponentName.module.ts.template     # Helper de clases CSS
├── i18n/
│   ├── lang.json.template                   # Archivo JSON vacío por idioma
│   └── index.ts.template                    # Index con localDictionaries + getLocalDict
└── utils/
    └── componentname.util.ts.template       # Utilidades del componente
```

## 🔧 Variables de reemplazo

El script `generate-component.mjs` reemplaza estas variables en las plantillas:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{ComponentName}}` | Nombre en PascalCase | `Modal` |
| `{{componentname}}` | Nombre en lowercase | `modal` |
| `{{LANGUAGES_IMPORTS}}` | Imports dinámicos de idiomas | `import en from './en.json';` |
| `{{LANGUAGES_KEYS}}` | Keys del objeto localDictionaries | `en, es, fr` |
| `{{LANGUAGE_SELECTION_LOGIC}}` | Lógica de selección de idioma | Código ternario generado |

## 🌐 Sistema i18n

Los componentes generados siguen el patrón de **TagSelector**:

### 1. **Traducciones locales** (`i18n/`)

**Archivos JSON** - Incluyen traducciones de ejemplo:
```json
// en.json
{
  "componentname": {
    "label": "ComponentName",
    "description": "ComponentName component description"
  }
}

// es.json
{
  "componentname": {
    "label": "ComponentName",
    "description": "Descripción del componente ComponentName"
  }
}
```

**Plantillas específicas por idioma:**
- ✅ `en.json.template` - Inglés
- ✅ `es.json.template` - Español
- ✅ `fr.json.template` - Francés
- ✅ `de.json.template` - Alemán
- ⚠️ Otros idiomas usan `lang.json.template` (inglés genérico)

**Index dinámico:**
```typescript
// i18n/index.ts (generado automáticamente)
import en from './en.json';
import es from './es.json';

export const localDictionaries = { en, es } as const;

export const getLocalDict = (lang?: string) => {
  const pick = (lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return localDictionaries[pick];
};
```

### 2. **Hook de i18n** (`hooks/useI18nMerge.hook.ts`)
- Combina traducciones locales del componente con traducciones globales
- Soporta prioridad configurable (`local-first` o `global-first`)
- Retorna función `t()` para traducir

```typescript
export function useI18nMerge(langOverride?, opts?) {
  const libI18n = useLibI18n();
  const lang = langOverride ?? libI18n.lang;
  const local = getLocalDict(lang);
  const external = libI18n.getExternalTranslations();
  
  const t = makeTranslator(local, external, effectiveOrder);
  
  return { lang, t };
}
```

### 3. **Provider con Context** (`providers/`)
- Usa `useI18nMerge` para obtener traductor
- Pasa `t` y `lang` en el Context
- Acepta props `langOverride` y `i18nOrder`

```typescript
export const ComponentProvider = ({ 
  children, 
  langOverride, 
  i18nOrder = 'local-first' 
}) => {
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  
  const value: ComponentContext = { t, lang };
  
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};
```

### 4. **Context con traductor** (`types/`)
```typescript
export interface ComponentContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
}

export interface ComponentProps {
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}
```

### 5. **Vista usando traducciones** (`views/`)
```typescript
export const ComponentView = (props: ComponentProps) => {
  const { t } = useComponentContext();
  
  return <div>{t('key')}</div>; // Reactivo al idioma!
};
```

## 🚀 Uso desde el generador

```bash
# Generar con idiomas personalizados
npm run new-component -- Alert -all-folders --languages en,es,fr,de

# Resultado:
# - Crea 4 archivos JSON: en.json, es.json, fr.json, de.json
# - Genera i18n/index.ts con localDictionaries y getLocalDict dinámico
# - Hook useI18nMerge para combinar traducciones
# - Provider con Context que incluye 't' y 'lang'
# - Componente reactivo al cambio de idioma
```

## 📝 Modificar plantillas

Para cambiar cómo se generan los componentes:

1. Edita el archivo `.template` correspondiente
2. Usa las variables `{{...}}` donde sea necesario
3. El script las reemplazará automáticamente al generar

## ✨ Características automáticas

Todos los componentes generados incluyen:

✅ **i18n reactivo** - Cambian automáticamente con el idioma  
✅ **Traducciones combinadas** - Local + Global con prioridad configurable  
✅ **Provider pattern** - Context para compartir estado  
✅ **TypeScript completo** - Tipos para Props y Context  
✅ **CSS Modules** - Estilos encapsulados  
✅ **Test IDs** - data-testid automático para testing  

## 🔗 Referencias

- **Script generador**: `scripts/generate-component.mjs`
- **Componente de referencia**: `client/src/lib/ui-library/components/TagSelector`
- **Utilidades i18n**: `client/src/lib/ui-library/utils/i18n.util.ts`
