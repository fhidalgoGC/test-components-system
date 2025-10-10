# Component Generator

Generador automático de componentes para la biblioteca de UI con soporte completo de i18n reactivo.

## 🚀 Uso básico

```bash
npm run new-component -- <ComponentName> [opciones]
```

⚠️ **Importante**: El `--` es necesario para pasar las opciones al script.

## 📚 Ejemplos

### Componente básico (solo estructura mínima)
```bash
npm run new-component -- Modal
```

Genera:
```
Modal/
├── mobile/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
└── index.tsx
```

### Componente con i18n reactivo (recomendado)
```bash
npm run new-component -- Modal -all-folders
```

Genera además:
- ✅ `environment/` - Configuración local del componente (estructura plana)
- ✅ `i18n/` - Archivos de traducción con ejemplos (en.json, es.json)
- ✅ `hooks/useI18nMerge.hook.ts` - Hook para combinar traducciones locales + globales
- ✅ `providers/` - Context provider con función `t()` para traducir + ConfigProvider integration
- ✅ `utils/` - Utilidades del componente

### Con idiomas personalizados
```bash
npm run new-component -- Modal -all-folders --languages en,es,fr,de
```

Genera archivos i18n con traducciones de ejemplo en 4 idiomas:
- `en.json` - Inglés
- `es.json` - Español  
- `fr.json` - Francés
- `de.json` - Alemán

### Con README de IA
```bash
npm run new-component -- Modal -readme
```

Genera un archivo `README-IA.md` dentro del componente.

### Versión web
```bash
npm run new-component -- Modal -web
```

Por defecto crea versión mobile. Usa `-web` para web, o ambos flags para crear ambas versiones.

### Comando completo
```bash
npm run new-component -- Modal -all-folders -readme -mobile -web --languages en,es,fr
```

## 🎯 Opciones disponibles

| Opción | Descripción |
|--------|-------------|
| `-all-folders` | Crea i18n + utils + provider automáticamente (⭐ recomendado) |
| `-readme` | Genera README-IA.md dentro del componente |
| `-mobile` | Crea versión mobile (por defecto si no se especifica `-web`) |
| `-web` | Crea versión web |
| `--languages <langs>` | Idiomas separados por comas (por defecto: `en,es`) |

## 📁 Estructura generada

### Estructura mínima (sin flags)

```
ComponentName/
├── mobile/
│   ├── css/
│   │   ├── ComponentName.module.css
│   │   ├── ComponentName.module.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useComponentName.hook.ts
│   │   └── index.ts
│   ├── types/
│   │   ├── ComponentName.type.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── ComponentName.view.tsx
│   │   └── index.ts
│   └── index.tsx
└── index.tsx
```

### Con `-all-folders` (⭐ recomendado)

Agrega soporte i18n reactivo completo + configuración:
```
ComponentName/
├── mobile/
│   ├── ... (estructura básica)
│   ├── environment/
│   │   ├── enviroment.ts                  # ⭐ Configuración (estructura plana)
│   │   └── index.ts                       # Re-exporta como COMPONENT_NAME_CONFIG
│   ├── hooks/
│   │   ├── useComponentName.hook.ts
│   │   ├── useI18nMerge.hook.ts          # ⭐ Hook i18n
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json                        # Traducciones inglés
│   │   ├── es.json                        # Traducciones español
│   │   └── index.ts                       # localDictionaries + getLocalDict
│   ├── providers/
│   │   ├── ComponentName.provider.tsx     # ⭐ Provider con Context + i18n + ConfigProvider
│   │   └── index.ts
│   ├── types/
│   │   ├── ComponentName.type.ts          # ⭐ Incluye Context con 't'
│   │   └── index.ts
│   └── utils/
│       ├── componentname.util.ts
│       └── index.ts
```

## ⚙️ Configuración del Componente (Environment)

Los componentes generados con `-all-folders` incluyen una carpeta `environment/` con configuración local usando el **patrón de estructura plana**.

### Estructura de configuración

**`environment/enviroment.ts`** (estructura plana, sin anidación):
```typescript
// Flat structure pattern - NO nesting
export const environment = {
  SOME_CONFIG: import.meta.env.VITE_MODAL_SOME_CONFIG || 'default-value',
  ANOTHER_CONFIG: import.meta.env.VITE_MODAL_ANOTHER_CONFIG || true,
  // Properties directly in environment object
};
```

**`environment/index.ts`** (re-exporta con nombre único):
```typescript
export { environment as MODAL_CONFIG } from './enviroment';
```

### Acceso a la configuración

**En el componente (local):**
```typescript
import { MODAL_CONFIG as environment } from './../environment';

// Acceso directo
const value = environment.SOME_CONFIG;
```

**Con ConfigProvider (cascada de prioridades):**
```typescript
// En el provider
import { ConfigContext } from '../../../../providers/AppEnviromentProvider/index.hook';

const optionalConfig = useContext(ConfigContext);

// Acceso con cascada: Props → ConfigProvider → Environment
const config = optionalConfig?.environment?.MODAL_CONFIG?.SOME_CONFIG ?? environment.SOME_CONFIG;
```

### Patrón de Cascada de Prioridades

El generador crea automáticamente el patrón de prioridades:

**1. Props** (máxima prioridad)
```tsx
<Modal someConfig="override-value" />
```

**2. ConfigProvider** (prioridad media)
```tsx
<ConfigProvider environment={{ MODAL_CONFIG: { SOME_CONFIG: 'global-value' } }}>
  <Modal />
</ConfigProvider>
```

**3. Environment local** (fallback)
```typescript
const environment = { SOME_CONFIG: 'default-value' };
```

### Integración con el Environment Global

El archivo `enviorments/enviroment.ts` importa y agrega automáticamente:

```typescript
import { MODAL_CONFIG } from '../components/Modal/mobile/environment';

export const environment = {
  // ... otras configs
  MODAL_CONFIG,  // ⭐ Configuración agregada
};
```

## 🌐 i18n Reactivo

Los componentes generados con `-all-folders` son **automáticamente reactivos al idioma**, siguiendo el patrón de TagSelector.

### Traducciones incluidas automáticamente

**Inglés (en.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Modal component description"
  }
}
```

**Español (es.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Descripción del componente Modal"
  }
}
```

**Francés (fr.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Description du composant Modal"
  }
}
```

**Alemán (de.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Modal Komponentenbeschreibung"
  }
}
```

### Vista con traducciones reactivas

El componente generado automáticamente muestra las traducciones:

```tsx
export const ModalView = (props: ModalProps) => {
  const { children, className } = props;
  const { t } = useModalContext();  // ⭐ Función de traducción

  return (
    <div className={className} data-testid="modal">
      <div>
        <strong>{t('label')}</strong>       {/* Reactivo! */}
        <p>{t('description')}</p>            {/* Reactivo! */}
      </div>
      {children}
    </div>
  );
};
```

### Uso del componente

```tsx
import { Modal } from '@/lib/ui-library/components/Modal';

// Usa idioma global (reactivo automáticamente)
<Modal>Contenido</Modal>

// Override de idioma específico
<Modal langOverride="es">Contenido</Modal>

// Cambiar prioridad de traducciones
<Modal i18nOrder="global-first">Contenido</Modal>
```

## 📦 Archivos generados

### 1. Types (`ComponentName.type.ts`)

**Sin `-all-folders`:**
```tsx
export interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
}
```

**Con `-all-folders` (incluye i18n):**
```tsx
export interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
  langOverride?: string;                              // ⭐ Override de idioma
  i18nOrder?: 'global-first' | 'local-first';        // ⭐ Prioridad de traducciones
}

export interface ComponentNameContext {
  t: (key: string, params?: Record<string, string | number>) => string;  // ⭐ Función de traducción
  lang: string;                                       // ⭐ Idioma actual
}
```

### 2. Hook (`useComponentName.hook.ts`)
```tsx
import { useState } from 'react';
import type { ComponentNameProps } from '../types';

export const useComponentName = (props: ComponentNameProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
```

### 3. Hook i18n (`useI18nMerge.hook.ts`) - Solo con `-all-folders`
```tsx
import { getLocalDict } from '../i18n';
import { makeTranslator, type TranslationOrder } from '../../../utils';
import { useLibI18n } from '../../../providers/AppLanguageLibUiProvider/index.hook';

export function useI18nMerge(
  langOverride?: string,
  opts?: { order?: TranslationOrder }
) {
  const libI18n = useLibI18n();
  const lang = langOverride ?? libI18n.lang;
  const local = getLocalDict(lang);
  const external = libI18n.getExternalTranslations();
  
  const effectiveOrder = opts?.order ?? 
    (libI18n.translationPriority === 'component-first' ? 'local-first' : 'global-first');
  
  const t = makeTranslator(local as any, external, effectiveOrder);
  
  return { lang, t };
}
```

### 4. Provider (con `-all-folders`)
```tsx
import { createContext, useContext, useState } from 'react';
import type { ComponentNameContext } from '../types';
import { useI18nMerge } from '../hooks';

const ComponentNameCtx = createContext<ComponentNameContext | undefined>(undefined);

export const useComponentNameContext = () => {
  const context = useContext(ComponentNameCtx);
  if (!context) {
    throw new Error('useComponentNameContext must be used within ComponentNameProvider');
  }
  return context;
};

export const ComponentNameProvider = ({ 
  children,
  langOverride,
  i18nOrder = 'local-first'
}: { 
  children: React.ReactNode;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
}) => {
  const [state, setState] = useState({});
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });  // ⭐ Hook i18n

  const value: ComponentNameContext = {
    t,      // ⭐ Función de traducción
    lang,   // ⭐ Idioma actual
  };

  return (
    <ComponentNameCtx.Provider value={value}>
      {children}
    </ComponentNameCtx.Provider>
  );
};
```

### 5. i18n Index (con `-all-folders`)
```tsx
import en from './en.json';
import es from './es.json';

export const localDictionaries = { en, es } as const;

export const getLocalDict = (lang?: string) => {
  const pick = (lang || 'en').toLowerCase().startsWith('es') ? 'es' : 'en';
  return localDictionaries[pick];
};
```

### 6. CSS Module (`ComponentName.module.css` y `.ts`)
Estilos CSS Modules con Tailwind + exportaciones TypeScript

### 7. Environment Config (con `-all-folders`)

**`environment/enviroment.ts`** - Configuración con estructura plana:
```typescript
// Flat structure pattern - NO nesting
export const environment = {
  SOME_CONFIG: import.meta.env.VITE_MODAL_SOME_CONFIG || 'default-value',
  ANOTHER_CONFIG: import.meta.env.VITE_MODAL_ANOTHER_CONFIG || true,
};
```

**`environment/index.ts`** - Re-exporta con nombre único:
```typescript
export { environment as MODAL_CONFIG } from './enviroment';
```

### 8. Utils (con `-all-folders`)
Archivo de utilidades para funciones auxiliares del componente

## 🎨 Sistema de Plantillas

Las plantillas están centralizadas en `client/src/lib/ui-library/command-templates/`:

```
command-templates/
├── environment/
│   ├── enviroment.ts.template                # ⭐ Configuración (estructura plana)
│   └── index.ts.template                     # Re-exporta como COMPONENT_NAME_CONFIG
├── hooks/
│   ├── useComponentName.hook.ts.template
│   └── useI18nMerge.hook.ts.template        # Copiado de TagSelector
├── providers/
│   └── ComponentName.provider.tsx.template   # Con i18n + ConfigProvider
├── types/
│   └── ComponentName.type.ts.template        # Con Context + 't'
├── views/
│   └── ComponentName.view.tsx.template       # Con traducciones
├── css/
│   ├── ComponentName.module.css.template
│   └── ComponentName.module.ts.template
├── i18n/
│   ├── en.json.template                      # Inglés
│   ├── es.json.template                      # Español
│   ├── fr.json.template                      # Francés
│   ├── de.json.template                      # Alemán
│   ├── lang.json.template                    # Genérico (fallback)
│   └── index.ts.template                     # localDictionaries
└── utils/
    └── componentname.util.ts.template
```

### Variables de reemplazo

El generador reemplaza automáticamente:

- `{{ComponentName}}` → Nombre en PascalCase (`Modal`)
- `{{componentname}}` → Nombre en lowercase (`modal`)
- `{{COMPONENT_NAME}}_CONFIG` → Nombre del config en UPPER_SNAKE_CASE (`MODAL_CONFIG`)
- `{{LANGUAGES_IMPORTS}}` → Imports dinámicos de idiomas
- `{{LANGUAGES_KEYS}}` → Keys del objeto localDictionaries
- `{{LANGUAGE_SELECTION_LOGIC}}` → Lógica ternaria de selección

## 📝 Importación

El componente se exporta automáticamente en `components/index.ts`:

```tsx
import { Modal } from '@/lib/ui-library/components/Modal';

function Example() {
  return (
    <Modal langOverride="es">
      Contenido
    </Modal>
  );
}
```

## ✨ Características

✅ **Configuración local** - Cada componente tiene su propia carpeta `environment/` (con `-all-folders`)  
✅ **Estructura plana** - Configuración sin anidación para fácil acceso  
✅ **ConfigProvider integration** - Cascada de prioridades (Props → ConfigProvider → Environment)  
✅ **Variables de entorno** - Soporte para `VITE_COMPONENT_NAME_*` vars  
✅ **i18n reactivo** - Cambian automáticamente con el idioma (con `-all-folders`)  
✅ **Traducciones de ejemplo** - Listas para probar la reactividad  
✅ **Traducciones combinadas** - Local + Global con prioridad configurable  
✅ **Provider pattern** - Context para compartir estado + i18n + config  
✅ **TypeScript completo** - Tipos para Props y Context  
✅ **CSS Modules** - Estilos encapsulados  
✅ **Test IDs** - data-testid automático para testing  
✅ **Plantillas centralizadas** - Fácil mantenimiento y actualización  

## 📖 Notas

- Los nombres de componentes deben estar en **PascalCase**
- Las keys i18n se generan en **lowercase** (ej: `"modal"`)
- El `data-testid` se genera en **lowercase** automáticamente
- **Plantillas de idiomas disponibles:** en, es, fr, de (otros usan genérico en inglés)
- El componente base usa `t('label')` y `t('description')` para demostrar la traducción reactiva
- Modifica las plantillas en `command-templates/` para cambiar cómo se generan todos los componentes

## 🔗 Referencias

- **Plantillas**: `client/src/lib/ui-library/command-templates/`
- **Script generador**: `scripts/generate-component.mjs`
- **Componente de referencia**: `client/src/lib/ui-library/components/TagSelector`
- **Documentación técnica**: `scripts/README.md`
