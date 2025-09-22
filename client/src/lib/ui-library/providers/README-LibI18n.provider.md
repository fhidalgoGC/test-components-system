# LibI18nProvider - Documentación de Uso

**Version: 1.0.5**

## 📖 Descripción

`LibI18nProvider` es el proveedor de internacionalización específico de la librería UI. Maneja traducciones locales de componentes y se integra con proveedores de idioma externos de la aplicación padre.

## 🏗️ Arquitectura

### **Arquitectura Padre-Hijo**
```
App Level (PADRE)
├── AppLanguageProvider        # Proveedor principal de la aplicación
│   ├── Control de idioma global
│   ├── Estado del idioma actual  
│   └── Función setLanguage()
│
└── Library Level (HIJO)
    └── LibI18nProvider         # Proveedor específico de la librería
        ├── Recibe parentLanguageProvider
        ├── Maneja traducciones locales
        └── Combina con traducciones globales
```

## 📋 Props Interface

```typescript
type LibI18nProviderProps = {
  /** Si lo pasas, la librería se vuelve controlada por props */
  language?: 'es' | 'en';
  
  /** Callback para cambios de idioma disparados desde la librería */
  onLanguageChange?: (next: 'es' | 'en') => void;
  
  /** Proveedor padre inyectado (recomendado) */
  parentLanguageProvider?: GenericLanguageProvider;
  
  /** Array de rutas a archivos JSON de traducciones globales */
  globalTranslationPaths?: GlobalTranslationPath[];
  
  /** Orden de prioridad: 'component-first' (defecto) o 'external-first' */
  translationPriority?: 'component-first' | 'external-first';
  
  children: React.ReactNode;
};

type GlobalTranslationPath = {
  lang: string; // Idioma como string genérico ('es', 'en', etc.)
  path: string; // Ruta relativa al archivo JSON
};
```

## 🎯 Hook useLibI18n

```typescript
type LibI18nContextValue = {
  lang: 'es' | 'en';
  t: (key: string, params?: Record<string, string | number>) => string;
  setLanguage: (next: 'es' | 'en') => void;
  resolveLabel: (label: { [key: string]: string; default: string }) => string;
  getExternalTranslations: () => Record<string, string>;
  translationPriority: 'component-first' | 'external-first';
};
```

## 🚀 Ejemplos de Uso

### **1. Uso Básico (Sin Provider Padre)**

```jsx
import { LibI18nProvider, useLibI18n } from '@/lib/ui-library/providers/LibI18n.provider';

function MyApp() {
  return (
    <LibI18nProvider language="en">
      <MyLibraryComponent />
    </LibI18nProvider>
  );
}

function MyLibraryComponent() {
  const { lang, t, setLanguage } = useLibI18n();
  
  return (
    <div>
      <p>Idioma actual: {lang}</p>
      <p>{t('welcome')}</p>
      <button onClick={() => setLanguage('es')}>
        Cambiar a Español
      </button>
    </div>
  );
}
```

### **2. Uso con Provider Padre (Recomendado)**

```jsx
import { LibI18nProvider } from '@/lib/ui-library/providers/LibI18n.provider';
import { useAppLanguage } from './providers/AppLanguageProvider';

function MyComponentWithLibrary() {
  const app = useAppLanguage(); // Obtener provider padre
  
  return (
    <LibI18nProvider parentLanguageProvider={app}>
      <TagSelector {...props} />
      <Button {...props} />
    </LibI18nProvider>
  );
}
```

### **3. Uso con Traducciones Globales**

```jsx
function ExternalAppDemo() {
  const app = useAppLanguage();
  
  // Configurar rutas a archivos JSON globales
  const globalTranslationPaths = [
    { lang: "es", path: "../../../i18n/es.json" },
    { lang: "en", path: "../../../i18n/en.json" }
  ];
  
  return (
    <LibI18nProvider 
      parentLanguageProvider={app}
      globalTranslationPaths={globalTranslationPaths}
      translationPriority="component-first"
    >
      <TagSelector {...props} />
    </LibI18nProvider>
  );
}
```

### **4. Uso Controlado por Props**

```jsx
function ControlledLanguageExample() {
  const [language, setLanguage] = useState('en');
  
  return (
    <LibI18nProvider 
      language={language}
      onLanguageChange={setLanguage}
    >
      <MyLibraryComponents />
    </LibI18nProvider>
  );
}
```

## 🔧 API Detallada

### **Función `t(key, params?)`**
```jsx
const { t } = useLibI18n();

// Traducción simple
t('welcome') // "Welcome" | "Bienvenido"

// Traducción con parámetros
t('hello_user', { name: 'Juan' }) // "Hello Juan" | "Hola Juan"

// Traducción con claves anidadas
t('form.validation.required') // "Required field" | "Campo requerido"
```

### **Función `resolveLabel(label)`**
```jsx
const { resolveLabel } = useLibI18n();

const multiLangLabel = {
  en: "English Text",
  es: "Texto en Español", 
  default: "Fallback Text"
};

const resolved = resolveLabel(multiLangLabel); // Resuelve según idioma actual
```

### **Función `setLanguage(lang)`**
```jsx
const { setLanguage } = useLibI18n();

// Cambiar idioma (notifica al provider padre si existe)
setLanguage('es');
setLanguage('en');
```

### **Función `getExternalTranslations()`**
```jsx
const { getExternalTranslations } = useLibI18n();

// Obtener todas las traducciones externas cargadas
const externalTranslations = getExternalTranslations();
```

## 🎨 Sistema de Prioridades

### **translation Priority: 'component-first' (Defecto)**
```
1. Traducciones locales del componente
2. Traducciones globales externas
3. Clave sin traducir (fallback)
```

### **translationPriority: 'external-first'**
```
1. Traducciones globales externas
2. Traducciones locales del componente  
3. Clave sin traducir (fallback)
```

## 📁 Estructura de Archivos JSON

### **Archivo de Traducciones Globales**
```json
// i18n/es.json
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar"
  },
  "forms": {
    "validation": {
      "required": "Campo requerido",
      "email": "Email inválido"
    }
  }
}
```

### **Traducción Local del Componente**
```json
// TagSelector/i18n/es.json
{
  "select_all": "Seleccionar todo",
  "clear_all": "Limpiar todo",
  "loading": "Cargando..."
}
```

## 🔄 Flujo de Comportamiento

### **Prioridad de Control de Idioma:**
1. **Provider padre** (`parentLanguageProvider.lang`)
2. **Prop controlada** (`language`)
3. **Estado interno** (default: 'en')

### **Flujo de Cambio de Idioma:**
1. Se llama `setLanguage('es')`
2. Si hay **provider padre**: `parentLanguageProvider.setLanguage('es')`
3. Si no hay padre pero hay **onLanguageChange**: `onLanguageChange('es')`
4. Si nada existe: actualiza **estado interno**

## ⚠️ Consideraciones Importantes

### **1. Provider Padre Requerido**
```jsx
// ❌ MAL - Sin conexión con la app
<LibI18nProvider>
  <TagSelector />
</LibI18nProvider>

// ✅ BIEN - Conectado con provider padre
<LibI18nProvider parentLanguageProvider={app}>
  <TagSelector />
</LibI18nProvider>
```

### **2. Carga Dinámica de Traducciones**
```jsx
// Las traducciones se cargan asíncronamente
const globalTranslationPaths = [
  { lang: "es", path: "../../../i18n/es.json" }, // ⚠️ Ruta relativa válida
  { lang: "en", path: "../../../i18n/en.json" }
];
```

### **3. Error Handling**
```jsx
// Hook debe usarse dentro del provider
try {
  const { t } = useLibI18n();
} catch (error) {
  // Error: useLibI18n must be used within LibI18nProvider
}
```

## 🧪 Casos de Uso Avanzados

### **1. Múltiples Instancias de LibI18nProvider**
```jsx
function MultiInstanceExample() {
  const app = useAppLanguage();
  
  return (
    <div>
      {/* Instancia 1: Prioridad componente-primero */}
      <LibI18nProvider 
        parentLanguageProvider={app}
        translationPriority="component-first"
      >
        <TagSelector />
      </LibI18nProvider>
      
      {/* Instancia 2: Prioridad externa-primero */}
      <LibI18nProvider 
        parentLanguageProvider={app}
        translationPriority="external-first"
      >
        <Button />
      </LibI18nProvider>
    </div>
  );
}
```

### **2. Traducciones Condicionales**
```jsx
function ConditionalTranslations() {
  const { lang, t } = useLibI18n();
  
  const getTranslationPaths = () => {
    const basePaths = [
      { lang: "en", path: "../../../i18n/en.json" }
    ];
    
    // Cargar español solo si es necesario
    if (lang === 'es') {
      basePaths.push({ lang: "es", path: "../../../i18n/es.json" });
    }
    
    return basePaths;
  };
  
  return (
    <LibI18nProvider globalTranslationPaths={getTranslationPaths()}>
      <MyComponents />
    </LibI18nProvider>
  );
}
```

---

## 🔗 Enlaces Relacionados

- **README-IA--LANGUAJE.md**: Documentación completa del sistema de idiomas
- **TagSelector README-IA.md**: Ejemplo de uso en componentes específicos
- **language.types.ts**: Definiciones de tipos TypeScript