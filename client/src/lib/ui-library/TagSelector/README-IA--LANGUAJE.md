# 🌐 TagSelector - Sistema de Idiomas/Languages

Este documento explica completamente el sistema de idiomas del TagSelector, incluyendo configuración, casos de uso y arquitectura de traducciones.

## 📋 Tabla de Contenidos

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Configuración del Provider Padre](#configuración-del-provider-padre)
3. [Configuración de Traducciones Externas](#configuración-de-traducciones-externas)
4. [Casos de Uso](#casos-de-uso)
5. [Interfaces y Tipos](#interfaces-y-tipos)
6. [Ejemplos Prácticos](#ejemplos-prácticos)
7. [Resolución de Problemas](#resolución-de-problemas)

## 🏗️ Arquitectura del Sistema

### **Flujo de Providers Jerárquico**

```
AppLanguageProvider (Aplicación Padre)
    ↓
LibI18nProvider (Biblioteca)
    ↓
TagSelectorProvider (Componente)
    ↓
TagSelectorView (Vista)
```

### **Principios de Diseño**

1. **Single Source of Truth**: Un solo provider de idioma por aplicación
2. **Reactividad Completa**: Cambios de idioma se propagan automáticamente
3. **Flexibilidad**: Soporte para traducciones locales y externas
4. **Prioridad Configurable**: Control sobre qué traducciones tienen precedencia

## 🔧 Configuración del Provider Padre

### **1. Crear el AppLanguageProvider**

```typescript
// providers/AppLanguageProvider.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';

type AppLanguage = 'es' | 'en';

type AppLanguageContextValue = {
  lang: AppLanguage;
  setLang: (next: AppLanguage) => void;
};

const AppLanguageContext = createContext<AppLanguageContextValue | undefined>(undefined);

export function useAppLanguage() {
  return useContext(AppLanguageContext);
}

export function AppLanguageProvider({
  initial = 'en',
  children,
}: {
  initial?: AppLanguage;
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<AppLanguage>(initial);
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <AppLanguageContext.Provider value={value}>{children}</AppLanguageContext.Provider>;
}
```

### **2. Configurar en App Principal**

```typescript
// App.tsx
function App() {
  return (
    <AppLanguageProvider initial="en">
      {/* Tu aplicación aquí */}
      <TagSelectorDemo />
    </AppLanguageProvider>
  );
}
```

## 📁 Configuración de Traducciones Externas

### **1. Estructura de Archivos JSON**

Crear archivos de traducción en `src/i18n/`:

```json
// src/i18n/es.json
{
  "all": "Todos",
  "loading": "Cargando...",
  "no_tags": "Sin etiquetas",
  "custom_text": "Texto personalizado en español"
}
```

```json
// src/i18n/en.json
{
  "all": "All",
  "loading": "Loading...",
  "no_tags": "No tags",
  "custom_text": "Custom text in English"
}
```

### **2. Configurar Rutas de Traducciones**

```typescript
const globalTranslationPaths = [
  { lang: 'es', path: '../../../i18n/es.json' },
  { lang: 'en', path: '../../../i18n/en.json' }
];
```

## 🎯 Casos de Uso

### **Caso 1: Uso Básico sin Traducciones Externas**

```typescript
function BasicExample() {
  const app = useAppLanguage();
  
  return (
    <LibI18nProvider parentLanguageProvider={app}>
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allLabel={{
          en: 'All',
          es: 'Todos',
          default: 'All'
        }}
      />
    </LibI18nProvider>
  );
}
```

### **Caso 2: Con Traducciones Externas y Prioridad**

```typescript
function AdvancedExample() {
  const app = useAppLanguage();
  const [translationPriority, setTranslationPriority] = useState<'component-first' | 'external-first'>('component-first');
  
  const globalTranslationPaths = [
    { lang: 'es', path: '../../../i18n/es.json' },
    { lang: 'en', path: '../../../i18n/en.json' }
  ];

  return (
    <LibI18nProvider 
      parentLanguageProvider={app}
      globalTranslationPaths={globalTranslationPaths}
      translationPriority={translationPriority}
    >
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        allowMultiple={true}
        allowAll={true}
        allLabel={{
          en: 'All',
          es: 'Todos',
          default: 'All'
        }}
      />
    </LibI18nProvider>
  );
}
```

### **Caso 3: Override de Idioma Específico**

```typescript
function LanguageOverrideExample() {
  const app = useAppLanguage();
  
  return (
    <LibI18nProvider 
      parentLanguageProvider={app}
      language="es" // Forzar español independientemente del app
    >
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={setSelectedTags}
        langOverride="es" // Override adicional en el componente
      />
    </LibI18nProvider>
  );
}
```

## 🔗 Interfaces y Tipos

### **LibI18nProvider Props**

```typescript
interface LibI18nProviderProps {
  children: React.ReactNode;
  
  // Provider padre para reactividad
  parentLanguageProvider?: {
    lang: string;
    setLang: (lang: string) => void;
  };
  
  // Override de idioma local
  language?: 'es' | 'en';
  
  // Rutas a archivos JSON externos
  globalTranslationPaths?: Array<{
    lang: string;
    path: string;
  }>;
  
  // Control de prioridad de traducciones
  translationPriority?: 'component-first' | 'external-first';
}
```

### **MultiLanguageLabel Interface**

```typescript
interface MultiLanguageLabel {
  en: string;
  es: string;
  fr?: string;
  pt?: string;
  default: string;
}
```

### **TagItem con Traducciones**

```typescript
interface TagItem {
  id: string;
  label: MultiLanguageLabel;
  metadata?: {
    colors?: TagStateColors;
    sizing?: TagSizing;
  };
}
```

## 💡 Ejemplos Prácticos

### **Función getTagsFunction con Traducciones**

```typescript
const getMultilingualTags = async (): Promise<TagItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 'react',
      label: {
        en: 'React',
        es: 'React',
        fr: 'React',
        default: 'React'
      }
    },
    {
      id: 'design',
      label: {
        en: 'UI/UX Design',
        es: 'Diseño UI/UX',
        fr: 'Design UI/UX',
        default: 'UI/UX Design'
      }
    }
  ];
};
```

### **Control de Cambio de Idioma**

```typescript
function LanguageControls() {
  const app = useAppLanguage();
  
  if (!app) return null;
  
  return (
    <div>
      <button onClick={() => app.setLang('es')}>
        Español
      </button>
      <button onClick={() => app.setLang('en')}>
        English
      </button>
      <p>Idioma actual: {app.lang}</p>
    </div>
  );
}
```

## 🎚️ Configuración de Prioridades

### **Component-First (Por Defecto)**

```typescript
translationPriority="component-first"
```

**Orden de Resolución:**
1. Traducciones locales del componente
2. Traducciones externas (JSON)
3. Fallback al texto por defecto

### **External-First**

```typescript
translationPriority="external-first"
```

**Orden de Resolución:**
1. Traducciones externas (JSON)
2. Traducciones locales del componente  
3. Fallback al texto por defecto

## 🔄 Flujo de Reactividad

### **Cadena de Eventos**

```
1. Usuario cambia idioma en UI
   ↓
2. AppLanguageProvider.setLang()
   ↓
3. LibI18nProvider detecta cambio
   ↓
4. useI18nMerge recalcula traducciones
   ↓
5. TagSelectorProvider actualiza contexto
   ↓
6. TagSelectorView re-renderiza con nuevo idioma
```

### **Sincronización Automática**

- **Cambios de idioma**: Se propagan automáticamente
- **Carga de traducciones**: Dinámicas via `import()`
- **Fallbacks**: Automáticos si falta una traducción

## 🛠️ Resolución de Problemas

### **Problema: Cambios de idioma no se reflejan**

**Solución**: Verificar que no haya providers duplicados

```typescript
// ❌ INCORRECTO: Providers anidados
<AppLanguageProvider>
  <LibI18nProvider>
    <AppLanguageProvider> // ← Provider duplicado
      <TagSelector />
    </AppLanguageProvider>
  </LibI18nProvider>
</AppLanguageProvider>

// ✅ CORRECTO: Un solo provider padre
<AppLanguageProvider>
  <LibI18nProvider>
    <TagSelector />
  </LibI18nProvider>
</AppLanguageProvider>
```

### **Problema: Traducciones no cargan**

**Solución**: Verificar rutas de archivos JSON

```typescript
// ✅ Rutas relativas correctas
const globalTranslationPaths = [
  { lang: 'es', path: '../../../i18n/es.json' },
  { lang: 'en', path: '../../../i18n/en.json' }
];
```

### **Problema: Textos en idioma incorrecto**

**Solución**: Verificar prioridad de traducciones

```typescript
// Para usar traducciones externas primero
<LibI18nProvider translationPriority="external-first">

// Para usar traducciones del componente primero  
<LibI18nProvider translationPriority="component-first">
```

## 🚀 Mejores Prácticas

### **1. Organización de Archivos**

```
src/
├── i18n/                     # Traducciones globales
│   ├── es.json
│   └── en.json
├── providers/                # Providers de la aplicación
│   └── AppLanguageProvider.tsx
└── lib/ui-library/TagSelector/ # Componente
    ├── i18n/                 # Traducciones locales
    │   ├── es.json
    │   └── en.json
    └── README-IA--LANGUAJE.md # Esta documentación
```

### **2. Convenciones de Nomenclatura**

- **Claves de traducción**: snake_case (`loading`, `no_tags`)
- **Códigos de idioma**: ISO 639-1 (`es`, `en`, `fr`)
- **Props de idioma**: camelCase (`langOverride`, `translationPriority`)

### **3. Fallbacks Obligatorios**

```typescript
// ✅ Siempre incluir 'default'
label: {
  en: 'English text',
  es: 'Texto en español',
  default: 'English text' // ← Obligatorio
}
```

### **4. Rendimiento**

- **Carga dinámica**: Las traducciones se cargan bajo demanda
- **Memoización**: Los valores traducidos se cachean automáticamente
- **Hot Module Replacement**: Los cambios en JSON se reflejan inmediatamente

---

## 📞 Soporte

Para más información o problemas específicos, consulta:

1. **Código fuente**: `client/src/lib/ui-library/TagSelector/`
2. **Ejemplos**: `client/src/pages/external-app-demo/`
3. **Tipos**: `client/src/lib/ui-library/types/language.ts`

---

**Fecha de actualización**: Septiembre 2025  
**Versión del TagSelector**: v1.2.0