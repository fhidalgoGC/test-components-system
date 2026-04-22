# ApiInterceptor

Sistema de interceptores de API **agnóstico** y configurable para manejar peticiones HTTP con soporte para autenticación y endpoints públicos/privados.

## Estructura de Carpetas

```
interceptors/
├── ApiInterceptor.ts          # Factory principal
├── index.ts                   # Exports
├── README.md                  # Documentación
├── hooks/
│   ├── index.ts
│   └── useApiInterceptor.hook.ts  # Hook para React
└── types/
    └── index.ts               # Definiciones de tipos
```

## Principio de Diseño: Agnóstico

El ApiInterceptor es **completamente agnóstico** - no impone ninguna estructura específica para query params, filtros, o paginación. El consumidor define su propio formato y el interceptor simplemente lo serializa.

```typescript
// El interceptor acepta cualquier estructura de params
await api.get('/users', { 
  status: 'active',           // Simple key-value
  roles: ['admin', 'user'],   // Arrays
  pagination: { page: 1 },    // Objetos anidados
  custom: { nested: { deep: true } }  // Cualquier estructura
});

// Se serializa automáticamente a query string:
// ?status=active&roles=admin&roles=user&pagination[page]=1&custom[nested][deep]=true
```

## Uso Básico

```typescript
import { createApiInterceptor } from '@/lib/ui-library/utils/interceptors';

const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

// GET request
const response = await api.get('/users');

// GET con query params (cualquier estructura)
const users = await api.get('/users', { 
  active: true, 
  limit: 10 
});

// POST request
const newUser = await api.post('/users', { 
  name: 'John', 
  email: 'john@example.com' 
});
```

## Endpoints Públicos vs Privados

Define patrones para identificar endpoints que requieren autenticación:

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultVisibility: 'public',
  endpoints: [
    // Endpoints públicos
    { pattern: '/auth/login', visibility: 'public' },
    { pattern: '/auth/register', visibility: 'public' },
    { pattern: '/products', methods: ['GET'], visibility: 'public' },
    
    // Endpoints privados (requieren auth)
    { pattern: '/users', visibility: 'private', requiresAuth: true },
    { pattern: '/orders', visibility: 'private', requiresAuth: true },
    { pattern: /^\/admin\/.*/, visibility: 'private', requiresAuth: true },
    
    // Endpoints con headers específicos
    { 
      pattern: '/legacy-api', 
      visibility: 'private',
      headers: { 'X-Legacy-Client': 'true' }
    },
    
    // Endpoints con transformador de respuesta
    { 
      pattern: '/users', 
      visibility: 'private',
      transform: (data) => data.map((u: any) => ({ ...u, fullName: `${u.firstName} ${u.lastName}` }))
    },
  ],
});
```

## Autenticación Externa

El interceptor NO accede a storage directamente. La autenticación se configura externamente mediante `setAuth`:

### Tipos de autenticación

```typescript
// Bearer Token
api.setAuth({
  type: 'bearer',
  getToken: () => myAuthStore.accessToken,  // Tu estado/store externo
});
// → Authorization: Bearer <token>

// Basic Auth
api.setAuth({
  type: 'basic',
  getToken: () => btoa(`${username}:${password}`),
});
// → Authorization: Basic <base64>

// API Key
api.setAuth({
  type: 'api-key',
  headerName: 'X-API-Key',  // Opcional, default: 'X-API-Key'
  getToken: () => myApiKey,
});
// → X-API-Key: <key>

// Custom Header
api.setAuth({
  type: 'custom',
  headerName: 'X-Custom-Auth',
  getToken: () => myCustomToken,
});
// → X-Custom-Auth: <token>
```

### Integración con React Context/Provider

```typescript
// AuthProvider.tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const { api } = useApiInterceptor({ config: apiConfig });

  // Configurar auth cuando cambie el token
  useEffect(() => {
    if (token) {
      api.setAuth({
        type: 'bearer',
        getToken: () => token,
        onAuthError: (error) => {
          if (error.status === 401) {
            setToken(null);
          }
        },
      });
    } else {
      api.clearAuth();
    }
  }, [token, api]);

  const login = async (credentials: Credentials) => {
    const response = await api.post('/auth/login', credentials);
    setToken(response.data.accessToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Con refresh token

```typescript
api.setAuth({
  type: 'bearer',
  getToken: () => authStore.accessToken,
  refreshToken: async () => {
    const response = await fetch('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: authStore.refreshToken }),
    });
    const data = await response.json();
    authStore.setAccessToken(data.accessToken);
    return data.accessToken;
  },
  onTokenExpired: () => {
    authStore.logout();
    window.location.href = '/login';
  },
});
```

### Limpiar autenticación

```typescript
// Al hacer logout
api.clearAuth();
```

## Response Transformers

Castea automáticamente las respuestas según el endpoint. Se pueden definir en la config inicial o agregarlos dinámicamente.

### En config inicial

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  endpoints: [
    { 
      pattern: '/users', 
      visibility: 'private',
      transform: (data) => data.map((u: any) => ({ 
        ...u, 
        fullName: `${u.firstName} ${u.lastName}` 
      })) as User[]
    },
    { 
      pattern: '/products', 
      visibility: 'public',
      transform: (data) => data as Product[]
    },
  ],
});

// Uso - la respuesta ya viene transformada
const response = await api.get('/users');
// response.data ya tiene fullName agregado
```

### Agregar dinámicamente

```typescript
// Agregar transformer después de crear el interceptor
api.addResponseTransformer('/orders', (data) => data as Order[]);
api.addResponseTransformer(/^\/reports\/.*/, (data) => new ReportModel(data));

// Remover transformer
api.removeResponseTransformer('/orders');
```

### Directamente en el request

```typescript
// Transform inline al llamar el endpoint
const users = await api.get<User[]>('/users', undefined, {
  transform: (data) => data.map((u: any) => ({ ...u, isActive: true }))
});

// POST con transform
const order = await api.post<Order>('/orders', orderData, {
  transform: (data) => new OrderModel(data)
});
```

**Prioridad de transformers** (de mayor a menor):
1. Transform en el request (`options.transform`)
2. Transformers dinámicos (`addResponseTransformer`)
3. Transformers en config (`endpoints[].transform`)

**Nota**: Los patterns se evalúan sobre el **path** (sin query params). Si registras el mismo pattern nuevamente, se reemplaza el transformer anterior.

## Dynamic Headers

Headers que se evalúan en cada request - perfectos para estados reactivos (React state, stores, etc.).

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
});

// En un componente o provider React
const [tenantId, setTenantId] = useState('tenant-123');
const [language, setLanguage] = useState('es');

// Registrar headers dinámicos - el getter se ejecuta en cada request
api.addDynamicHeader('X-Tenant-ID', () => tenantId);
api.addDynamicHeader('Accept-Language', () => language);

// Header condicional (solo para ciertas rutas)
// Nota: request.url contiene la URL completa incluyendo query params
api.addDynamicHeader(
  'X-Admin-Token', 
  () => getAdminToken(),
  (request) => request.url.includes('/admin')
);

// Cuando cambies el estado, los siguientes requests usarán el nuevo valor
setTenantId('tenant-456');  // Próximos requests tendrán X-Tenant-ID: tenant-456

// Remover header dinámico
api.removeDynamicHeader('X-Tenant-ID');
```

### Usar con Context/Provider

```typescript
// TenantProvider.tsx
export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const { api } = useApiInterceptor({ config: apiConfig });

  useEffect(() => {
    // El header se actualiza automáticamente cuando cambia el tenant
    api.addDynamicHeader('X-Tenant-ID', () => tenant?.id ?? null);
    
    return () => {
      api.removeDynamicHeader('X-Tenant-ID');
    };
  }, [tenant, api]);

  return (
    <TenantContext.Provider value={{ tenant, setTenant }}>
      {children}
    </TenantContext.Provider>
  );
}
```

## Query Params Genéricos

El interceptor serializa cualquier estructura de params:

```typescript
// Params simples
await api.get('/users', { status: 'active', page: 1 });
// → /users?status=active&page=1

// Arrays
await api.get('/products', { categories: ['electronics', 'books'] });
// → /products?categories=electronics&categories=books

// Objetos anidados
await api.get('/search', { 
  filters: { 
    price: { min: 10, max: 100 },
    brand: 'apple'
  }
});
// → /search?filters[price][min]=10&filters[price][max]=100&filters[brand]=apple

// El consumidor define la estructura según lo que espera su backend
```

## Interceptores Personalizados

### Request Interceptor

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  requestInterceptors: [
    {
      name: 'add-timestamp',
      order: 1,
      handler: (request) => ({
        ...request,
        headers: {
          ...request.headers,
          'X-Request-Time': new Date().toISOString(),
        },
      }),
    },
    {
      name: 'admin-header',
      pathPattern: '/admin',  // Solo aplica a rutas que contengan /admin
      handler: (request) => ({
        ...request,
        headers: { ...request.headers, 'X-Admin-Mode': 'true' },
      }),
    },
    {
      name: 'api-v2-transform',
      pathPattern: /^\/api\/v2\//,  // RegExp para rutas que empiecen con /api/v2/
      handler: (request) => {
        // Transformar request para API v2
        return request;
      },
    },
  ],
});
```

### Response Interceptor

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  responseInterceptors: [
    {
      name: 'transform-data',
      handler: (response) => ({
        ...response,
        data: {
          ...response.data,
          _fetchedAt: new Date().toISOString(),
        },
      }),
    },
    {
      name: 'log-slow-requests',
      condition: (response) => (response.timing?.duration ?? 0) > 1000,
      handler: (response) => {
        console.warn('Slow request:', response.request.url, response.timing?.duration);
        return response;
      },
    },
  ],
});
```

### Error Interceptor

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  errorInterceptors: [
    {
      name: 'handle-401-admin',
      pathPattern: '/admin',  // Solo para rutas de admin
      statusCodes: [401],
      handler: async (error) => {
        window.location.href = '/admin/login';
        return error;
      },
    },
    {
      name: 'handle-401-general',
      statusCodes: [401],
      handler: async (error) => {
        const newToken = await refreshToken();
        if (newToken) {
          return error;
        }
        window.location.href = '/login';
        return error;
      },
    },
    {
      name: 'handle-500-api-v2',
      pathPattern: /^\/api\/v2\//,
      statusCodes: [500, 502, 503],
      handler: (error) => {
        // Manejo especial para API v2
        console.error('API v2 server error:', error.message);
        return error;
      },
    },
  ],
});
```

## Configuración de Autenticación (Deprecated)

> **Nota**: Esta sección se mantiene por compatibilidad. Ver la sección "Autenticación Externa" para la forma recomendada de configurar auth.

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  auth: {
    type: 'bearer',
    getToken: () => myAuthStore.accessToken,  // Función obligatoria
    
    onAuthError: (error) => {
      if (error.status === 401) {
        window.location.href = '/login';
      }
    },
    
    onTokenExpired: () => {
      console.log('Token expired');
    },
  },
});
```

## useApiInterceptor Hook

Hook para React con estado de loading y error:

```typescript
import { useApiInterceptor } from '@/lib/ui-library/utils/interceptors';

function UserList() {
  const { api, loading, pendingRequests, error, clearError } = useApiInterceptor({
    config: {
      baseUrl: 'https://api.example.com',
      auth: {
        type: 'bearer',
        tokenKey: 'token',
      },
    },
  });

  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    // Pasa cualquier estructura de params que tu backend espere
    const response = await api.get('/users', { 
      status: 'active',
      limit: 20,
      offset: 0
    });
    setUsers(response.data);
  };

  if (loading) return <div>Loading... ({pendingRequests} requests)</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users.map(u => <div key={u.id}>{u.name}</div>)}
    </div>
  );
}
```

### Manejo de Concurrencia

El hook maneja correctamente múltiples requests concurrentes:

```typescript
const { loading, pendingRequests } = useApiInterceptor({ config });

// loading = true si hay AL MENOS UN request pendiente
// pendingRequests = número exacto de requests en vuelo

// Útil para mostrar estado preciso:
<div>
  {pendingRequests > 0 && `${pendingRequests} requests en progreso...`}
</div>
```

## Retry y Timeout

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultTimeout: 30000,  // 30 segundos
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,  // 1 segundo entre reintentos
    retryOn: [408, 429, 500, 502, 503, 504],  // Status codes para reintentar
  },
});
```

## Logging

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  logging: {
    enabled: true,
    level: 'debug',  // 'debug' | 'info' | 'warn' | 'error'
    onLog: (entry) => {
      sendToLogService(entry);
    },
  },
});
```

## Agregar/Remover Interceptores Dinámicamente

```typescript
// Agregar interceptor
api.addRequestInterceptor({
  name: 'dynamic-header',
  handler: (req) => ({
    ...req,
    headers: { ...req.headers, 'X-Dynamic': 'value' },
  }),
});

// Remover interceptor
api.removeInterceptor('dynamic-header', 'request');

// Cambiar autenticación
api.setAuth({
  type: 'bearer',
  getToken: () => newToken,
});

// Limpiar autenticación
api.clearAuth();
```

## Override Chain

El sistema sigue una cadena de prioridades:

1. **Request-specific options** (mayor prioridad)
2. **Endpoint match config**
3. **Default config** (menor prioridad)

```typescript
// Config base
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultVisibility: 'public',
  endpoints: [
    { 
      pattern: '/admin', 
      visibility: 'private',
      headers: { 'X-Admin': 'true' }
    },
  ],
});

// Override en petición específica
await api.request('/admin/users', { 
  method: 'GET',
  visibility: 'private',
  requiresAuth: true,
  headers: { 'X-Custom': 'value' },  // Se mergea con headers del endpoint
});
```

## Tipos Principales

```typescript
// Query params genéricos - el consumidor define la estructura
type QueryParams = Record<string, unknown>;

interface EndpointMatch {
  pattern: string | RegExp;
  methods?: HttpMethod[];
  visibility: 'public' | 'private';
  requiresAuth?: boolean;
  headers?: Record<string, string>;
}

interface AuthConfig {
  type: 'bearer' | 'basic' | 'api-key' | 'custom';
  tokenKey?: string;
  headerName?: string;
  getToken?: () => string | null | Promise<string | null>;
  onAuthError?: (error: AuthError) => void;
  onTokenExpired?: () => void;
}

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  params?: QueryParams;
  headers?: Record<string, string>;
  timeout?: number;
  visibility?: EndpointVisibility;
  requiresAuth?: boolean;
  signal?: AbortSignal;
  responseType?: ResponseType; // 'json' | 'text' | 'blob' | 'arrayBuffer'
}
```

## Respuestas binarias (Blob) — v1.3.0

Por defecto el interceptor parsea automáticamente la respuesta según el header `Content-Type` (JSON → `.json()`, cualquier otro → `.text()`). Para descargar archivos binarios (Excel, PDF, ZIP, imágenes, etc.) este parseo automático corrompe el contenido al convertirlo en string.

A partir de la **v1.3.0** se agrega la opción `responseType` que permite forzar el tipo de parseo. Es **100% aditiva**: cualquier código existente que NO pase `responseType` sigue funcionando exactamente igual.

### Valores de `responseType`

| Valor | Body | Uso |
|-------|------|-----|
| _omitido_ | auto (JSON o texto según `Content-Type`) | **Comportamiento por defecto** — sin cambios para apps existentes |
| `'json'` | `await response.json()` | Forzar JSON aunque el `Content-Type` no lo indique |
| `'text'` | `await response.text()` | Forzar texto plano |
| `'blob'` | `await response.blob()` → `Blob` | Descarga de Excel, PDF, ZIP, imágenes |
| `'arrayBuffer'` | `await response.arrayBuffer()` → `ArrayBuffer` | Procesamiento binario de bajo nivel |

### Manejo de errores en respuestas binarias

Cuando `responseType` es `'blob'` o `'arrayBuffer'`, el interceptor **no** intenta leer `error.message` desde el body (porque no es JSON). En su lugar usa `response.statusText` como `message`. El `data` del response sigue siendo el `Blob`/`ArrayBuffer` recibido.

### Ejemplo: descarga de Excel

```typescript
import { createApiInterceptor } from '@/lib/ui-library/utils/interceptors';

const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultHeaders: { 'Content-Type': 'application/json' },
});

api.setAuth({ type: 'bearer', getToken: () => myToken });

function extractFilename(contentDisposition?: string): string | null {
  if (!contentDisposition) return null;
  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match?.[1] ?? null;
}

async function downloadExcel(query: Record<string, unknown>) {
  const response = await api.get<Blob>('/reports/journal-flow', query, {
    responseType: 'blob',
  });

  const blob = response.data;
  const filename = extractFilename(response.headers['content-disposition'])
    ?? `report-${Date.now()}.xlsx`;

  // Convertir Blob → URL → click para disparar descarga
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { success: true, filename };
}
```

### Disponible en todos los métodos de conveniencia

`responseType` se acepta como tercer parámetro de `options` en `get`, `post`, `put`, `patch` y `delete`, además de `request`:

```typescript
await api.get<Blob>('/file', undefined, { responseType: 'blob' });
await api.post<ArrayBuffer>('/process', payload, { responseType: 'arrayBuffer' });
await api.request<Blob>('/file', { method: 'GET', responseType: 'blob' });
```

### Compatibilidad

- Sin `responseType`: comportamiento idéntico al de versiones anteriores. Cero breaking changes.
- Las firmas públicas de `get/post/put/patch/delete` solo se extendieron con un campo opcional.
- No se modificó ningún tipo de retorno existente.
```
