# 🌍 Sistema de Variables de Entorno - GC-UI-COMPONENTS

**Version: 1.0.5**

## 📖 Descripción

El sistema de variables de entorno de GC-UI-COMPONENTS permite configuración flexible y jerárquica donde las aplicaciones padre pueden sobrescribir los valores por defecto de la librería con precedencia configurable.

## 🏗️ Arquitectura del Sistema

### **Componentes Principales**

1. **`enviroment.ts`** - Configuración base de la librería desde variables de entorno
2. **`config.types.ts`** - Interfaces y tipos para la configuración híbrida
3. **`config.provider.tsx`** - Provider React para gestión de configuración
4. **`config.ts`** - Punto único de acceso sin React Context

### **Estrategias de Precedencia**

El sistema soporta 3 estrategias de precedencia:

- **`'auto'` (Por defecto)**: Inteligente - padre gana solo para valores definidos y no vacíos
- **`'parent'`**: Padre siempre gana cuando está definido
- **`'library'`**: Librería siempre gana, padre es ignorado

## 🚀 Configuración en Aplicaciones Padre

### **Método 1: Usando ConfigProvider (Recomendado)**

```jsx
import { 
  ConfigProvider, 
  TagSelector, 
  LibI18nProvider 
} from 'GC-UI-COMPONENTS';

// Configuración personalizada de la aplicación padre
const parentConfig = {
  API_LIMIT: 200,
  DEFAULT_CURRENCY: 'mxn',
  AUTH0_SCOPE: 'openid profile email',
  CRM_BASE_URL: 'https://mi-api.ejemplo.com',
  NUMBER_FORMAT_PATTERN: '0,000.000',
  IS_DEVELOPMENT: false
};

function App() {
  return (
    <ConfigProvider 
      parentConfig={parentConfig}
      priority="auto"
      enableOverrides={true}
    >
      <LibI18nProvider language="es">
        <TagSelector 
          items={[]}
          onSelectionChange={() => {}}
        />
      </LibI18nProvider>
    </ConfigProvider>
  );
}
```

### **Método 2: Configuración Dinámica**

```jsx
import { ConfigProvider, useConfig } from 'GC-UI-COMPONENTS';

function ConfigurableApp() {
  const [dynamicConfig, setDynamicConfig] = useState({
    API_LIMIT: 150,
    DEFAULT_CURRENCY: 'eur'
  });

  return (
    <ConfigProvider 
      parentConfig={dynamicConfig}
      priority="parent"
    >
      <MyComponents />
      <ConfigControls onConfigChange={setDynamicConfig} />
    </ConfigProvider>
  );
}

function ConfigControls({ onConfigChange }) {
  const { config, updateConfig } = useConfig();
  
  const changeApiLimit = (newLimit) => {
    updateConfig({ API_LIMIT: newLimit });
    onConfigChange(prev => ({ ...prev, API_LIMIT: newLimit }));
  };

  return (
    <div>
      <p>API Limit actual: {config.API_LIMIT}</p>
      <button onClick={() => changeApiLimit(300)}>
        Cambiar a 300
      </button>
    </div>
  );
}
```

## 🎯 Configuración de Variables de Entorno

### **Variables Disponibles**

#### **APIs y URLs Base**
```bash
VITE_API_LIMIT=100
VITE_URL_CRM=https://api.crm.ejemplo.com
VITE_TRM_BASE_URL=https://api.trm.ejemplo.com
VITE_URL_IDENTITY=https://auth.ejemplo.com
VITE_CRAFTMYPDF_BASE_URL=https://api.craftmypdf.com
VITE_SSM_BASE_URL=https://api.ssm.ejemplo.com
```

#### **Configuración Auth0**
```bash
VITE_AUTH0_URL=https://mi-tenant.auth0.com
VITE_AUTH0_AUDIENCE=https://api.mi-app.com
VITE_AUTH0_CLIENT_ID=tu_client_id_aqui
VITE_AUTH0_SCOPE=openid offline_access
VITE_AUTH0_GRANT_TYPE=password
VITE_AUTH0_REALM=Username-Password-Authentication
```

#### **Moneda y Formato**
```bash
VITE_DEFAULT_CURRENCY=usd
VITE_NUMBER_FORMAT_PATTERN=0,000.00
VITE_NUMBER_ROUND_MODE=truncate
VITE_NUMBER_LOCATE=en-US
VITE_NUMBER_MIN_DECIMALS=2
VITE_NUMBER_MAX_DECIMALS=4
```

#### **Thresholds de Precios**
```bash
VITE_PRICE_THRESHOLD_MIN=0
VITE_PRICE_THRESHOLD_MAX=0
VITE_SHOW_THRESHOLDS=false
```

## 🔧 Uso en Componentes

### **Opción 1: Hook useConfig (Con Context)**

```jsx
import { useConfig, useConfigValue } from 'GC-UI-COMPONENTS';

function MyComponent() {
  // Obtener toda la configuración
  const { config, updateConfig, resetConfig } = useConfig();
  
  // Obtener valor específico con fallback
  const apiLimit = useConfigValue('API_LIMIT', 50);
  const currency = useConfigValue('DEFAULT_CURRENCY');

  const handleApiCall = async () => {
    const response = await fetch(`${config.CRM_BASE_URL}/api/data`, {
      headers: {
        'X-API-Limit': config.API_LIMIT.toString()
      }
    });
  };

  return (
    <div>
      <p>API Limit: {config.API_LIMIT}</p>
      <p>Moneda: {config.DEFAULT_CURRENCY}</p>
      <button onClick={() => updateConfig({ API_LIMIT: 200 })}>
        Cambiar límite API
      </button>
      <button onClick={resetConfig}>
        Resetear configuración
      </button>
    </div>
  );
}
```

### **Opción 2: Funciones de Configuración (Sin Context)**

```jsx
import { getConfig, getConfigValue } from 'GC-UI-COMPONENTS';

// En utilidades o servicios
export class ApiService {
  static async fetchData() {
    const config = getConfig();
    const apiLimit = getConfigValue('API_LIMIT');
    
    return fetch(`${config.CRM_BASE_URL}/api/data?limit=${apiLimit}`);
  }
  
  static getAuthHeaders() {
    const config = getConfig();
    return {
      'Authorization': `Bearer ${config.AUTH0_CLIENT_ID}`,
      'X-Audience': config.AUTH0_AUDIENCE
    };
  }
}

// En componentes funcionales
function DataDisplay() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const currency = getConfigValue('DEFAULT_CURRENCY');
    fetchPricesInCurrency(currency).then(setData);
  }, []);

  return <div>{/* render data */}</div>;
}
```

## ⚖️ Estrategias de Precedencia

### **Auto (Recomendado)**
```jsx
<ConfigProvider 
  parentConfig={{ 
    API_LIMIT: 200,           // ✅ Se aplica (valor válido)
    DEFAULT_CURRENCY: '',     // ❌ Se ignora (cadena vacía)
    AUTH0_SCOPE: undefined    // ❌ Se ignora (undefined)
  }}
  priority="auto"
>
```

### **Parent (Fuerza)**
```jsx
<ConfigProvider 
  parentConfig={{ 
    API_LIMIT: 200,           // ✅ Se aplica
    DEFAULT_CURRENCY: '',     // ✅ Se aplica (sobrescribe con vacío)
    AUTH0_SCOPE: undefined    // ✅ Se aplica (sobrescribe con undefined)
  }}
  priority="parent"
>
```

### **Library (Solo Librería)**
```jsx
<ConfigProvider 
  parentConfig={{ 
    API_LIMIT: 200,           // ❌ Se ignora
    DEFAULT_CURRENCY: 'eur'   // ❌ Se ignora
  }}
  priority="library"
>
```

## 🚨 Problemas Comunes y Soluciones

### **Error: "useConfig must be used within a ConfigProvider"**

```jsx
// ❌ Incorrecto - useConfig fuera del provider
function App() {
  const config = useConfig(); // Error!
  return <div>...</div>;
}

// ✅ Correcto - useConfig dentro del provider
function App() {
  return (
    <ConfigProvider>
      <MyComponent />
    </ConfigProvider>
  );
}

function MyComponent() {
  const config = useConfig(); // ✅ Funciona
  return <div>...</div>;
}
```

### **Variables de entorno no se actualizan**

```bash
# Asegurar prefijo VITE_ para variables frontend
VITE_API_LIMIT=100          # ✅ Correcto
API_LIMIT=100               # ❌ No funcionará

# Reiniciar servidor después de cambiar .env
npm run dev
```

### **Configuración no se propaga**

```jsx
// ✅ Asegurar enableOverrides está habilitado
<ConfigProvider 
  parentConfig={config}
  enableOverrides={true}  // ✅ Importante
>
```

## 🔄 Migración desde Configuración Antigua

### **Antes (Directo a environment)**
```jsx
import { environment } from './enviroment';

function MyComponent() {
  const apiLimit = environment.API_LIMIT;
  return <div>{apiLimit}</div>;
}
```

### **Después (Con ConfigProvider)**
```jsx
import { ConfigProvider, useConfigValue } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <ConfigProvider parentConfig={{ API_LIMIT: 200 }}>
      <MyComponent />
    </ConfigProvider>
  );
}

function MyComponent() {
  const apiLimit = useConfigValue('API_LIMIT');
  return <div>{apiLimit}</div>;
}
```

## 📋 Checklist de Implementación

- [ ] Envolver aplicación con `ConfigProvider`
- [ ] Definir `parentConfig` con valores específicos
- [ ] Elegir estrategia de `priority` apropiada
- [ ] Usar `useConfig` o `useConfigValue` en componentes
- [ ] Configurar variables de entorno con prefijo `VITE_`
- [ ] Probar precedencia con diferentes valores
- [ ] Documentar configuración específica del proyecto

---

**Version: 1.0.5** | **Última actualización: Septiembre 2025**