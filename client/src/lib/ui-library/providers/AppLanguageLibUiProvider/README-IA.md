# AppLanguageLibUiProvider (LibI18nProvider) - Documentación de Uso

**Version: 2.0.0**

## 📖 Descripción

`LibI18nProvider` es el proveedor de internacionalización específico de la librería UI. Maneja traducciones locales de componentes y se integra con proveedores de idioma externos de la aplicación padre.

## 🏗️ Estructura Modular

```
AppLanguageLibUiProvider/
├── index.provider.tsx   # LibI18nProvider component
├── index.types.ts       # TypeScript types
├── index.hook.ts        # Custom hooks (useLibI18n, useParentLanguageInjection)
└── README.md           # This documentation
```

## 🏗️ Arquitectura

### **Arquitectura Padre-Hijo con ConfigProvider**
```
App Level (PADRE)
├── ConfigProvider                    # Sistema de configuración híbrida (opcional)
│   ├── Permite override de config interna de la librería
│   ├── Proporciona AVAILABLE_LANGUAGES
│   └── Priority modes: auto | parent | library
│
├── AppLanguageProvider               # Proveedor principal de la aplicación
│   ├── Control de idioma global
│   ├── Estado del idioma actual  
│   └── Función setLanguage()
│
└── Library Level (HIJO)
    └── LibI18nProvider               # Proveedor específico de la librería
        ├── Lee AVAILABLE_LANGUAGES de ConfigProvider (cuando existe)
        ├── Falls back a environment interno si no hay ConfigProvider
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
  lang: string;  // Idioma como string genérico ('es', 'en', etc.)
  path?: string; // URL del módulo JSON (usar makeModuleUrl). Ignorado si se pasa `data`.
  data?: Record<string, any>; // Objeto de traducciones ya cargado. Si se pasa, se usa directamente sin fetch.
};
// Nota: path o data son mutuamente excluyentes. Si ambos están, `data` tiene prioridad.
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
import { LibI18nProvider, useLibI18n } from 'GC-UI-COMPONENTS';

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
import { LibI18nProvider, useAppLanguage } from 'GC-UI-COMPONENTS';

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

### **2b. Uso con ConfigProvider + Provider Padre**

```jsx
import { 
  ConfigProvider, 
  LibI18nProvider, 
  useAppLanguage 
} from 'GC-UI-COMPONENTS';

function MyApp() {
  const app = useAppLanguage();
  
  // Environment externo puede sobrescribir config interno de la librería
  const externalConfig = {
    AVAILABLE_LANGUAGES: ['es', 'en'],  // Sobrescribe idiomas disponibles
    DEFAULT_LANGUAGE: 'es',
    IS_DEVELOPMENT: true
  };
  
  return (
    <ConfigProvider parentConfig={externalConfig} priority="auto">
      <LibI18nProvider parentLanguageProvider={app}>
        {/* LibI18nProvider lee AVAILABLE_LANGUAGES del config merged */}
        <TagSelector {...props} />
      </LibI18nProvider>
    </ConfigProvider>
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

### **3b. Traducciones pasadas como objeto (sin fetch)**

Útil cuando los JSON ya están importados estáticamente en el bundle o cuando las traducciones se construyen dinámicamente en runtime.

```jsx
import esTranslations from '../../../i18n/es.json';
import enTranslations from '../../../i18n/en.json';

function ExternalAppDemo() {
  const app = useAppLanguage();

  // Con `data`, el objeto se usa directamente — no hay fetch ni URL
  const globalTranslationPaths = [
    { lang: "es", data: esTranslations },
    { lang: "en", data: enTranslations },
  ];

  return (
    <LibI18nProvider
      parentLanguageProvider={app}
      globalTranslationPaths={globalTranslationPaths}
    >
      <TagSelector {...props} />
    </LibI18nProvider>
  );
}
```

También se puede mezclar: unas entradas con `path` y otras con `data`:

```jsx
const globalTranslationPaths = [
  { lang: "es", data: esTranslations },      // objeto directo
  { lang: "en", path: makeModuleUrl(enTranslations) }, // carga dinámica
];
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

### **Prioridad para AVAILABLE_LANGUAGES:**
1. **ConfigProvider merged config** (cuando ConfigProvider existe)
2. **Environment interno de la librería** (fallback)

### **Flujo de Cambio de Idioma:**
1. Se llama `setLanguage('es')`
2. Si hay **provider padre**: `parentLanguageProvider.setLanguage('es')`
3. Si no hay padre pero hay **onLanguageChange**: `onLanguageChange('es')`
4. Si nada existe: actualiza **estado interno**

### **Integración con ConfigProvider:**
LibI18nProvider usa `useOptionalConfig()` para acceder a ConfigProvider de forma segura:
- Si ConfigProvider existe: lee `AVAILABLE_LANGUAGES` del config merged
- Si ConfigProvider NO existe: usa `AVAILABLE_LANGUAGES` del environment interno
- Respeta las reglas de React hooks (sin try-catch con useContext)

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

## 🔧 Integración con ConfigProvider

### **Lectura de AVAILABLE_LANGUAGES**

LibI18nProvider detecta automáticamente si ConfigProvider está disponible:

```jsx
// Uso interno (dentro de LibI18nProvider)
import { useOptionalConfig } from './index.hook';

function LibI18nProvider({ children }) {
  const optionalConfig = useOptionalConfig();
  
  // Si ConfigProvider existe, usa config.AVAILABLE_LANGUAGES
  // Si no existe, usa AVAILABLE_LANGUAGES del environment interno
  const availableLanguages = optionalConfig?.AVAILABLE_LANGUAGES || 
                              INTERNAL_AVAILABLE_LANGUAGES;
  
  // ... resto de la lógica
}
```

### **Hook useOptionalConfig()**

Hook seguro para acceder a ConfigProvider sin lanzar errores:

```typescript
// Retorna config merged si ConfigProvider existe, null si no
function useOptionalConfig(): LibraryConfig | null;
```

**Características:**
- ✅ No lanza error si ConfigProvider no existe
- ✅ Respeta reglas de React hooks (sin try-catch)
- ✅ Retorna null cuando ConfigProvider no está disponible
- ✅ Permite que LibI18nProvider funcione standalone

---

## 🔗 Enlaces Relacionados

- **../AppLanguageProvider/README.md**: Provider padre de aplicación
- **../AppEnviromentProvider/README.md**: Sistema de configuración de la librería (ConfigProvider)
- **../../enviorments/enviroment.ts**: Configuración interna de idiomas
- **../../components/TagSelector/**: Ejemplo de componente que usa LibI18nProvider

---

**Version: 2.0.0** | **Última actualización: Octubre 2025**