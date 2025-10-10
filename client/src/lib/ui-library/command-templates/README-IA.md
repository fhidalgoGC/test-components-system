# Component Templates

Plantillas base para generar componentes de UI con soporte i18n reactivo y patrón responsivo incremental.

## 📁 Estructura

```
command-templates/
├── hooks/
│   ├── useComponentName.hook.ts.template    # Hook personalizado del componente
│   └── useI18nMerge.hook.ts.template        # Hook i18n (copia de TagSelector)
├── providers/
│   └── ComponentName.provider.tsx.template  # Provider con Context + i18n + ConfigProvider
├── types/
│   └── ComponentName.type.ts.template       # Interfaces (Props + Context)
├── views/
│   └── ComponentName.view.tsx.template      # Vista del componente
├── css/
│   ├── ComponentName.module.css.template    # Estilos CSS Module
│   └── ComponentName.module.ts.template     # Helper de clases CSS
├── i18n/
│   ├── lang.json.template                   # Archivo JSON vacío por idioma
│   ├── en.json.template                     # Plantilla en inglés
│   ├── es.json.template                     # Plantilla en español
│   ├── fr.json.template                     # Plantilla en francés
│   ├── de.json.template                     # Plantilla en alemán
│   └── index.ts.template                    # Index con localDictionaries + getLocalDict
├── environment/
│   ├── enviroment.ts.template               # Configuración del componente (flat structure)
│   └── index.ts.template                    # Re-export con nombre COMPONENT_NAME_CONFIG
├── utils/
│   └── componentname.util.ts.template       # Utilidades del componente
└── index.tsx.template                       # Wrapper responsivo (deprecated - ahora dinámico)
```

## 🎯 Modos de Generación

El generador soporta **tres modos** de creación de componentes:

### 1. 📦 **Estructura Raíz** (sin flags)
```bash
npm run new-component -- MyComponent
```

**Estructura creada:**
```
MyComponent/
├── css/
├── hooks/
├── types/
├── views/
└── index.tsx    # ✅ Export simple desde ./views
```

**Cuándo usar:**
- Componentes que NO necesitan variantes mobile/web
- Componentes simples que funcionan igual en todos los dispositivos

**Wrapper generado:**
```typescript
export { MyComponentView as MyComponent } from './views';
export type { MyComponentProps } from './types';
```

---

### 2. 📱 **Variante Mobile** (`--mobile`)
```bash
npm run new-component -- MyComponent --mobile
```

**Estructura creada:**
```
MyComponent/
├── mobile/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
└── index.tsx    # ✅ Wrapper con NotImplemented para web
```

**Wrapper generado:**
```typescript
import { useIsMobile } from '../../hooks';
import { MyComponent as MyComponentMobile } from './mobile';
import { NotImplemented } from '../NotImplemented';

export const MyComponent = (props: MyComponentProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MyComponentMobile {...props} />;
  }

  // Fallback: web no implementado
  return <NotImplemented platform="Web" componentName="MyComponent" />;
};
```

---

### 3. 💻 **Variante Web** (`--web`)
```bash
npm run new-component -- MyComponent --web
```

**Estructura creada:**
```
MyComponent/
├── web/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
└── index.tsx    # ✅ Wrapper con NotImplemented para mobile
```

**Wrapper generado:**
```typescript
import { useIsMobile } from '../../hooks';
import { MyComponent as MyComponentWeb } from './web';
import { NotImplemented } from '../NotImplemented';

export const MyComponent = (props: MyComponentProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="MyComponent" />;
  }

  return <MyComponentWeb {...props} />;
};
```

---

### 4. 📱💻 **Ambas Variantes** (`--mobile --web`)
```bash
npm run new-component -- MyComponent --mobile --web
```

**Estructura creada:**
```
MyComponent/
├── mobile/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
├── web/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
└── index.tsx    # ✅ Wrapper responsivo activo
```

**Wrapper generado:**
```typescript
import { useIsMobile } from '../../hooks';
import { MyComponent as MyComponentMobile } from './mobile';
import { MyComponent as MyComponentWeb } from './web';

export const MyComponent = (props: MyComponentProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MyComponentMobile {...props} />;
  }

  return <MyComponentWeb {...props} />;
};
```

---

## 🔄 Desarrollo Incremental

El generador es **inteligente** y permite agregar variantes paso a paso:

### Ejemplo 1: Mobile primero, Web después
```bash
# Paso 1: Crear solo mobile
npm run new-component -- UserProfile --mobile
# ✅ Crea mobile/
# ✅ Wrapper con NotImplemented para web

# Paso 2: Más tarde, agregar web
npm run new-component -- UserProfile --web
# ✅ Detecta que mobile existe (lo omite)
# ✅ Crea web/
# ✅ Actualiza wrapper automáticamente (ahora usa ambos)
```

### Ejemplo 2: Web primero, Mobile después
```bash
# Paso 1: Crear solo web
npm run new-component -- Dashboard --web
# ✅ Crea web/
# ✅ Wrapper con NotImplemented para mobile

# Paso 2: Más tarde, agregar mobile
npm run new-component -- Dashboard --mobile
# ✅ Detecta que web existe (lo omite)
# ✅ Crea mobile/
# ✅ Actualiza wrapper automáticamente (ahora usa ambos)
```

### Comportamiento inteligente:
- ✅ Si variante ya existe → **la omite** y continúa
- ✅ Wrapper se actualiza automáticamente según variantes disponibles
- ✅ No se puede mezclar estructura raíz con variantes (validación)
- ✅ Mensaje claro sobre qué se creó o actualizó

---

## 🔧 Variables de reemplazo

El script `generate-component.mjs` reemplaza estas variables en las plantillas:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `{{ComponentName}}` | Nombre en PascalCase | `Modal` |
| `{{componentname}}` | Nombre en lowercase | `modal` |
| `{{COMPONENT_NAME_UPPER}}` | Nombre en UPPERCASE | `MODAL` |
| `{{COMPONENT_NAME}}` | Nombre en UPPER_SNAKE_CASE | `BOTTOM_NAV` |
| `{{LANGUAGES_IMPORTS}}` | Imports dinámicos de idiomas | `import en from './en.json';` |
| `{{LANGUAGES_KEYS}}` | Keys del objeto localDictionaries | `en, es, fr` |
| `{{LANGUAGE_SELECTION_LOGIC}}` | Lógica de selección de idioma | Código ternario generado |

---

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
    "descripción": "Descripción del componente ComponentName"
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

---

## 🎨 Patrón Responsivo

### Hook `useIsMobile`
Los wrappers usan el hook global `useIsMobile()` que detecta:
- **Mobile**: `< 768px` (Tailwind 'md')
- **Desktop**: `≥ 768px`

### Hook avanzado `useResponsive`
Para control granular, usa `useResponsive()`:
```typescript
const { deviceType, orientation, isMobile, isTablet, isDesktop } = useResponsive();

// deviceType: 'mobile' | 'tablet' | 'desktop'
// orientation: 'portrait' | 'landscape'
// Breakpoints: mobile <768px, tablet 768-1024px, desktop ≥1024px
```

### Componente NotImplemented
Cuando una variante no existe, se muestra automáticamente:
```typescript
<NotImplemented platform="Web" componentName="MyComponent" />
```

---

## 🚀 Uso desde el generador

### Estructura raíz (sin variantes)
```bash
npm run new-component -- Alert
# ✅ Crea estructura en raíz
# ✅ Export directo desde ./views
```

### Solo mobile
```bash
npm run new-component -- Alert --mobile
# ✅ Crea mobile/
# ✅ Wrapper con NotImplemented para web
```

### Ambas variantes
```bash
npm run new-component -- Alert --mobile --web
# ✅ Crea mobile/ y web/
# ✅ Wrapper responsivo activo
```

### Con todas las carpetas opcionales
```bash
npm run new-component -- Alert --mobile --web -all-folders
# ✅ Crea mobile/ y web/
# ✅ Agrega: i18n/, utils/, providers/, environment/
# ✅ Wrapper responsivo activo
```

### Con idiomas personalizados
```bash
npm run new-component -- Alert --mobile -all-folders --languages en,es,fr,de
# ✅ Crea 4 archivos JSON: en.json, es.json, fr.json, de.json
# ✅ Genera i18n/index.ts con localDictionaries y getLocalDict dinámico
# ✅ Hook useI18nMerge para combinar traducciones
# ✅ Provider con Context que incluye 't' y 'lang'
# ✅ Componente reactivo al cambio de idioma
```

---

## 🔧 ConfigProvider Integration

Los componentes generados con `-all-folders` incluyen soporte para **ConfigProvider** siguiendo el patrón de cascada de prioridades.

### Environment (Flat Structure)
```typescript
// mobile/environment/enviroment.ts
export const environment = {
  SOME_CONFIG: import.meta.env.VITE_COMPONENT_SOME_CONFIG || 'default',
  ANOTHER_CONFIG: import.meta.env.VITE_COMPONENT_ANOTHER_CONFIG || 42,
};

// mobile/environment/index.ts
export { environment as COMPONENT_NAME_CONFIG } from './enviroment';
```

### Hook `useOptionalConfig`
```typescript
// Dentro del provider (incluido automáticamente)
function useOptionalConfig() {
  const configContext = useContext(ConfigContext);
  return configContext?.config || null;
}
```

### Cascada de Prioridades (Props → ConfigProvider → Environment)
```typescript
const optionalConfig = useOptionalConfig();
const localEnv = environment; // Importado de ./environment

const finalConfigValue =
  props.configProp ??                                          // 1️⃣ Props (máxima prioridad)
  optionalConfig?.environment?.COMPONENT_NAME_CONFIG?.SOME_VALUE ??  // 2️⃣ ConfigProvider
  localEnv.SOME_VALUE;                                        // 3️⃣ Default (fallback)
```

### Agregar al environment global:
```typescript
// client/src/lib/ui-library/enviorments/enviroment.ts
import { COMPONENT_NAME_CONFIG } from '../components/ComponentName/mobile/environment';

export const environment = {
  // ... otras configs
  COMPONENT_NAME_CONFIG,
};
```

### Uso desde la aplicación padre:
```tsx
// Sin ConfigProvider (usa defaults)
<MyComponent />

// Con ConfigProvider (configuración externa)
<ConfigProvider config={{ 
  environment: {
    COMPONENT_NAME_CONFIG: { 
      SOME_VALUE: customValue 
    }
  }
}}>
  <MyComponent />
</ConfigProvider>
```

---

## 📝 Modificar plantillas

Para cambiar cómo se generan los componentes:

1. Edita el archivo `.template` correspondiente
2. Usa las variables `{{...}}` donde sea necesario
3. El script las reemplazará automáticamente al generar

**Nota:** El wrapper `index.tsx` ahora se genera **dinámicamente** en el script, no desde template.

---

## ✨ Características automáticas

Todos los componentes generados incluyen:

✅ **Patrón Responsivo Incremental** - Agrega mobile/web cuando lo necesites  
✅ **Wrappers Inteligentes** - Se adaptan automáticamente a variantes disponibles  
✅ **i18n reactivo** - Cambian automáticamente con el idioma  
✅ **Traducciones combinadas** - Local + Global con prioridad configurable  
✅ **Provider pattern** - Context para compartir estado  
✅ **ConfigProvider integration** - Hook useOptionalConfig y cascada de prioridades  
✅ **Environment Decentralizado** - Config en carpeta local con flat structure  
✅ **TypeScript completo** - Tipos para Props y Context  
✅ **CSS Modules** - Estilos encapsulados  
✅ **Test IDs** - data-testid automático para testing  

---

## 🔗 Referencias

- **Script generador**: `scripts/generate-component.mjs`
- **Componente de referencia mobile/web**: `client/src/lib/ui-library/components/HeterogeneousList`
- **Componente de referencia i18n**: `client/src/lib/ui-library/components/TagSelector`
- **Utilidades i18n**: `client/src/lib/ui-library/utils/i18n.util.ts`
- **Hook responsivo**: `client/src/lib/ui-library/hooks/use-mobile.tsx`
- **NotImplemented**: `client/src/lib/ui-library/components/NotImplemented`
