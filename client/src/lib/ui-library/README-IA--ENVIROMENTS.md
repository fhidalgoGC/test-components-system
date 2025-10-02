# 🌍 Sistema de Variables de Entorno - GC-UI-COMPONENTS

**Version: 1.0.5**

## 📖 Descripción

Sistema híbrido de gestión de variables de entorno que permite a las aplicaciones padre sobrescribir la configuración por defecto de la librería con precedencia configurable.

---

## 🏗️ Arquitectura del Sistema

### **Componentes Principales**

```
client/src/lib/ui-library/enviorments/
├── config.types.ts          # Interfaces TypeScript
├── config.provider.tsx      # ConfigProvider + Hooks React
├── config.ts                # Funciones sin React Context
└── enviroment.ts            # Variables base (defaults)
```

### **Flujo de Configuración**

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
Precedencia inteligente: el padre gana solo si el valor está definido y no está vacío.

```jsx
<ConfigProvider parentConfig={config} priority="auto">
  {/* Padre gana solo para valores definidos */}
</ConfigProvider>
```

### **2. Parent (Padre Primero)**
El padre siempre gana cuando define un valor, incluso si está vacío.

```jsx
<ConfigProvider parentConfig={config} priority="parent">
  {/* Padre tiene prioridad absoluta */}
</ConfigProvider>
```

### **3. Library (Solo Librería)**
Ignora la configuración del padre, usa solo los valores de la librería.

```jsx
<ConfigProvider parentConfig={config} priority="library">
  {/* Solo valores de la librería */}
</ConfigProvider>
```

---

## 🚀 Uso en Aplicaciones Padre

### **Instalación Básica**

```jsx
import { ConfigProvider } from 'GC-UI-COMPONENTS';

function App() {
  const myConfig = {
    API_LIMIT: 200,
    DEFAULT_CURRENCY: 'mxn',
    CRM_BASE_URL: 'https://mi-api.com'
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

## 🎯 Mejores Prácticas

1. **Usa "auto" por defecto**: Es la estrategia más flexible y segura
2. **Centraliza configuración**: Define config en un solo lugar del padre
3. **Valida valores**: Asegúrate de que las variables de entorno sean válidas
4. **Documenta overrides**: Anota qué valores sobrescribes y por qué
5. **Usa TypeScript**: Aprovecha el tipado para evitar errores

---

## 📚 Ver También

- **Sistema de Estilos**: `./README-IA--STYLES.md`
- **Sistema de Idiomas**: `./README-IA--LANGUAJE.md`
- **Instalación**: `./README-IA.md`
- **Índice General**: `./README-INDEX.md`

---

**Version: 1.0.5** | **Última actualización: Octubre 2025**
