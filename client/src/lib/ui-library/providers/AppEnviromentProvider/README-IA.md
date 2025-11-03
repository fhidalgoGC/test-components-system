# 🌍 AppEnviromentProvider - Sistema de Configuración Híbrida

**Version: 2.0.0**

## 📖 Descripción

AppEnviromentProvider (ConfigProvider) es un sistema híbrido de gestión de configuración que permite a las aplicaciones padre sobrescribir la configuración por defecto de la librería con precedencia configurable.

---

## 🏗️ Arquitectura del Sistema

### **Estructura Modular:**

```
AppEnviromentProvider/
├── index.provider.tsx   # ConfigProvider component
├── index.types.ts       # TypeScript types
├── index.hook.ts        # React hooks (useConfig, useConfigValue)
└── index.utils.ts       # Non-React utilities (getConfig, mergeConfigs)
```

### **Flujo de Configuración:**

```
┌─────────────────────────────────────────┐
│  Aplicación Padre                       │
│  ┌──────────────────────────────────┐  │
│  │ ConfigProvider                    │  │
│  │  parentConfig={{                 │  │
│  │    API_LIMIT: 200,               │  │
│  │    DEFAULT_CURRENCY: 'mxn'       │  │
│  │  }}                              │  │
│  │  priority="auto"                 │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Sistema de Precedencia                 │
│  1. Padre (si definido y no vacío)      │
│  2. Librería (defaults)                 │
│  3. Fallback seguro                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Componentes de la Librería             │
│  useConfig() / useConfigValue()         │
└─────────────────────────────────────────┘
```

---

## ⚖️ Estrategias de Precedencia

### **1. Auto (Recomendado)**
Merge inteligente: sobrescribe solo valores definidos y no vacíos del padre.
- ✅ Solo procesa keys que existen en el config interno de la librería
- ✅ Keys extras del padre son ignoradas
- ✅ Valida que valores no sean `undefined`, `null`, o strings vacíos
- ✅ Keys que no existen en el padre mantienen valores internos por defecto

```jsx
<ConfigProvider parentConfig={config} priority="auto">
  {/* Merge inteligente: padre sobrescribe solo valores válidos */}
</ConfigProvider>
```

### **2. Parent (Padre Primero)**
El padre siempre gana para keys que define.
- ✅ Solo procesa keys que existen en el config interno de la librería
- ✅ Keys extras del padre son ignoradas
- ✅ Sobrescribe incluso con valores vacíos (menos estricto que "auto")
- ✅ Keys que no existen en el padre mantienen valores internos por defecto

```jsx
<ConfigProvider parentConfig={config} priority="parent">
  {/* Padre tiene prioridad para keys que existen en la librería */}
</ConfigProvider>
```

### **3. Library (Solo Librería)**
Ignora completamente la configuración del padre, usa solo valores internos.
- ✅ parentConfig es completamente ignorado
- ✅ Siempre usa valores por defecto de la librería

```jsx
<ConfigProvider parentConfig={config} priority="library">
  {/* 100% valores internos de la librería */}
</ConfigProvider>
```

---

## 🔑 Sistema de Keys y Tipado

### **Tipado Flexible**
El `parentConfig` acepta `Record<string, any>`, permitiendo que tu aplicación tenga keys adicionales:

```typescript
// ✅ Correcto - parentConfig puede tener MÁS keys que LibraryConfig
const myAppConfig = {
  // Keys de la librería (serán procesadas)
  AVAILABLE_LANGUAGES: ['es', 'en'],
  DEFAULT_LANGUAGE: 'es',
  IS_DEVELOPMENT: true,
  
  // Keys propias de tu app (ignoradas por la librería)
  MY_API_URL: 'https://api.example.com',
  MY_FEATURE_FLAG: true,
  MY_CUSTOM_DATA: { foo: 'bar' }
};

<ConfigProvider parentConfig={myAppConfig} priority="auto">
  {/* La librería solo lee las keys que conoce */}
</ConfigProvider>
```

### **Comportamiento del Merge**

#### **Ejemplo Práctico:**

**Config INTERNO (librería):**
```typescript
{
  AVAILABLE_LANGUAGES: ['es', 'en', 'fr'],
  DEFAULT_LANGUAGE: 'en',
  LANGUAGE_CONFIG: {...},
  NUMBER_FORMAT_CONFIG: {...},
  IS_DEVELOPMENT: false
}
```

**Config EXTERNO (tu app):**
```typescript
{
  AVAILABLE_LANGUAGES: ['es', 'en'],
  DEFAULT_LANGUAGE: 'es',
  // Nota: No incluye LANGUAGE_CONFIG ni NUMBER_FORMAT_CONFIG
  
  // Keys adicionales de tu app
  MY_CUSTOM_SETTING: true
}
```

**Resultado con `priority="auto"`:**
```typescript
{
  AVAILABLE_LANGUAGES: ['es', 'en'],      // ✅ Sobrescrito por el padre
  DEFAULT_LANGUAGE: 'es',                  // ✅ Sobrescrito por el padre
  LANGUAGE_CONFIG: {...},                  // ✅ Mantenido del interno (no existe en externo)
  NUMBER_FORMAT_CONFIG: {...},             // ✅ Mantenido del interno (no existe en externo)
  IS_DEVELOPMENT: false                    // ✅ Mantenido del interno (no existe en externo)
  
  // MY_CUSTOM_SETTING es ignorado (no existe en LibraryConfig)
}
```

---

## 🚀 Uso en Aplicaciones Padre

### **Instalación Básica**

```jsx
import { ConfigProvider } from 'GC-UI-COMPONENTS';

function App() {
  // El parentConfig puede tener MÁS keys que el config interno de la librería
  // Solo las keys que existen en el config interno serán sobrescritas
  // Keys adicionales son ignoradas sin errores de tipado
  const myConfig = {
    // Keys que existen en la librería (serán sobrescritas)
    AVAILABLE_LANGUAGES: ['es', 'en'],
    DEFAULT_LANGUAGE: 'es',
    
    // Keys adicionales de tu aplicación (serán ignoradas por la librería)
    MY_CUSTOM_API: 'https://mi-api.com',
    MY_APP_SETTING: true
  };

  return (
    <ConfigProvider parentConfig={myConfig} priority="auto">
      <YourApp />
    </ConfigProvider>
  );
}
```

### **Con Variables de Entorno del Padre**

```jsx
// .env del padre
VITE_API_LIMIT=500
VITE_CRM_BASE_URL=https://production.com
VITE_DEFAULT_CURRENCY=eur

// En tu app
const parentConfig = {
  API_LIMIT: Number(import.meta.env.VITE_API_LIMIT),
  CRM_BASE_URL: import.meta.env.VITE_CRM_BASE_URL,
  DEFAULT_CURRENCY: import.meta.env.VITE_DEFAULT_CURRENCY,
};

<ConfigProvider parentConfig={parentConfig}>
  <App />
</ConfigProvider>
```

### **Configuración Dinámica**

```jsx
function AppWrapper() {
  const [config, setConfig] = useState({
    API_LIMIT: 100,
    DEFAULT_CURRENCY: 'usd'
  });

  const updateLimit = () => {
    setConfig(prev => ({ ...prev, API_LIMIT: 500 }));
  };

  return (
    <ConfigProvider parentConfig={config} enableOverrides={true}>
      <button onClick={updateLimit}>Cambiar Límite</button>
      <App />
    </ConfigProvider>
  );
}
```

---

## 🎯 Variables de Entorno Disponibles

### **API Configuration**
- `API_LIMIT`: Límite de resultados por petición (default: 100)

### **Base URLs**
- `CRM_BASE_URL`: URL base del CRM
- `TRM_BASE_URL`: URL base del TRM
- `IDENTITY_BASE_URL`: URL base de identidad
- `CRAFTMYPDF_BASE_URL`: URL base de CraftMyPDF
- `SSM_BASE_URL`: URL base de SSM

### **Auth0 Configuration**
- `AUTH0_URL`: URL de Auth0
- `AUTH0_AUDIENCE`: Audiencia de Auth0
- `AUTH0_GRANT_TYPE`: Tipo de grant
- `AUTH0_REALM`: Realm de Auth0
- `AUTH0_CLIENT_ID`: Client ID de Auth0
- `AUTH0_SCOPE`: Scope de Auth0 (default: "openid offline_access")

### **Currency & Formatting**
- `DEFAULT_CURRENCY`: Moneda por defecto (default: "usd")
- `NUMBER_FORMAT_PATTERN`: Patrón de formato (default: "0,000.00")
- `NUMBER_ROUND_MODE`: Modo de redondeo (default: "truncate")
- `NUMBER_LOCATE`: Locale para números (default: "en-US")
- `NUMBER_MIN_DECIMALS`: Decimales mínimos (default: 2)
- `NUMBER_MAX_DECIMALS`: Decimales máximos (default: 4)

### **Price Thresholds**
- `PRICE_THRESHOLD_MIN`: Umbral mínimo de precio (default: 0)
- `PRICE_THRESHOLD_MAX`: Umbral máximo de precio (default: 0)
- `SHOW_THRESHOLDS`: Mostrar umbrales (default: false)

### **Session Configuration**
- `MAX_SESSION_DURATION_MINUTES`: Duración máxima de sesión (default: 1440)
- `INACTIVITY_TIMEOUT_MINUTES`: Timeout de inactividad (default: 480)

### **Development**
- `IS_DEVELOPMENT`: Detección de ambiente de desarrollo

---

## 🔧 Uso en Componentes

### **Con Hooks React (Recomendado)**

```jsx
import { useConfig, useConfigValue } from 'GC-UI-COMPONENTS';

function MyComponent() {
  // Obtener configuración completa
  const { config, updateConfig, resetConfig } = useConfig();
  
  // Obtener valor específico
  const apiLimit = useConfigValue('API_LIMIT');
  const currency = useConfigValue('DEFAULT_CURRENCY', 'usd'); // con fallback

  return (
    <div>
      <p>API Limit: {apiLimit}</p>
      <p>Currency: {currency}</p>
      <button onClick={() => updateConfig({ API_LIMIT: 200 })}>
        Actualizar Límite
      </button>
    </div>
  );
}
```

### **Sin React Context (Utilidades)**

```jsx
import { getConfig, getConfigValue } from 'GC-UI-COMPONENTS';

// En funciones fuera de componentes
function fetchData() {
  const config = getConfig();
  const apiLimit = getConfigValue('API_LIMIT');
  
  fetch(`${config.CRM_BASE_URL}/data?limit=${apiLimit}`);
}
```

---

## 📋 Casos de Uso Comunes

### **Caso 1: Ambiente Development vs Production**

```jsx
const isDev = import.meta.env.DEV;

const config = {
  CRM_BASE_URL: isDev 
    ? 'http://localhost:3000'
    : 'https://api.production.com',
  IS_DEVELOPMENT: isDev
};

<ConfigProvider parentConfig={config} priority="parent">
  <App />
</ConfigProvider>
```

### **Caso 2: Multi-tenant con diferentes configuraciones**

```jsx
function TenantApp({ tenantId }) {
  const tenantConfig = {
    CRM_BASE_URL: `https://${tenantId}.api.com`,
    DEFAULT_CURRENCY: tenantId === 'mx' ? 'mxn' : 'usd'
  };

  return (
    <ConfigProvider parentConfig={tenantConfig}>
      <App />
    </ConfigProvider>
  );
}
```

### **Caso 3: Configuración desde API**

```jsx
function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(setConfig);
  }, []);

  if (!config) return <Loading />;

  return (
    <ConfigProvider parentConfig={config}>
      <MainApp />
    </ConfigProvider>
  );
}
```

---

## 🚨 Problemas Comunes

### **Error: "useConfig must be used within a ConfigProvider"**

```jsx
// ❌ Incorrecto
function App() {
  const config = useConfig(); // Error!
  return <div>...</div>;
}

// ✅ Correcto
function App() {
  return (
    <ConfigProvider parentConfig={{}}>
      <MyComponent /> {/* Aquí sí puedes usar useConfig */}
    </ConfigProvider>
  );
}
```

### **Variables no se sobrescriben**

```jsx
// Verificar que priority sea "auto" o "parent"
<ConfigProvider 
  parentConfig={myConfig}
  priority="auto"  // ← Verificar esto
>

// Verificar que enableOverrides esté en true (default)
<ConfigProvider 
  parentConfig={myConfig}
  enableOverrides={true}  // ← Verificar esto
>
```

### **Valores undefined en configuración del padre**

```jsx
// ❌ Valores undefined son ignorados
const config = {
  API_LIMIT: undefined  // Se usará el default de la librería
};

// ✅ Usar valores explícitos o condicionales
const config = {
  API_LIMIT: import.meta.env.VITE_API_LIMIT 
    ? Number(import.meta.env.VITE_API_LIMIT)
    : 100  // Valor explícito
};
```

---

## 🔄 Migración desde Configuración Antigua

### **Antes (Configuración Estática)**

```jsx
import { environment } from './enviroment';

function MyComponent() {
  const limit = environment.API_LIMIT;
  // ...
}
```

### **Después (Configuración Híbrida)**

```jsx
import { useConfigValue } from 'GC-UI-COMPONENTS';

function MyComponent() {
  const limit = useConfigValue('API_LIMIT');
  // Reactivo a cambios del padre
}
```

---

## 🎯 Mejores Prácticas

1. **Usa "auto" por defecto**: Es la estrategia más flexible y segura
2. **Centraliza configuración**: Define config en un solo lugar del padre
3. **Valida valores**: Asegúrate de que las variables de entorno sean válidas
4. **Documenta overrides**: Anota qué valores sobrescribes y por qué
5. **Usa TypeScript**: Aprovecha el tipado para evitar errores

---

## 🔗 API Reference

### **ConfigProvider Props**

```typescript
interface ConfigProviderProps {
  children: React.ReactNode;
  
  // Acepta cualquier objeto - solo keys que existen en LibraryConfig serán procesadas
  parentConfig?: Record<string, any>;
  
  priority?: ConfigPriority; // "parent" | "library" | "auto"
  enableOverrides?: boolean;
}

type ConfigPriority = "parent" | "library" | "auto";
```

### **useConfig Hook**

```typescript
interface ConfigContextType {
  config: LibraryConfig;
  
  // Acepta cualquier objeto - solo keys que existen en LibraryConfig serán actualizadas
  updateConfig: (newConfig: Record<string, any>) => void;
  
  resetConfig: () => void;
  priority: ConfigPriority;
}
```

### **Utility Functions (Non-React)**

```typescript
// Get full configuration
getConfig(): LibraryConfig

// Get specific value
getConfigValue<K extends keyof LibraryConfig>(key: K): LibraryConfig[K]

// Update global config
// Acepta cualquier objeto - solo keys que existen en LibraryConfig serán actualizadas
updateGlobalConfig(newConfig: Record<string, any>): void

// Reset to defaults
resetGlobalConfig(): void

// Merge configurations (used internally)
mergeConfigs(
  libraryConfig: LibraryConfig,
  parentConfig: Record<string, any>,
  priority: ConfigPriority
): LibraryConfig
```

---

**Version: 2.0.0** | **Última actualización: Octubre 2025**
