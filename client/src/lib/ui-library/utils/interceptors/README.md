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
  ],
  auth: {
    type: 'bearer',
    tokenKey: 'access_token',
    onAuthError: (error) => {
      console.log('Auth error:', error);
      window.location.href = '/login';
    },
  },
});
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
      name: 'only-private',
      order: 2,
      condition: (request) => request.visibility === 'private',
      handler: (request) => {
        console.log('Private endpoint accessed:', request.url);
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
      name: 'handle-401',
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
      name: 'handle-500',
      statusCodes: [500, 502, 503],
      handler: (error) => {
        console.error('Server error:', error.message);
        return error;
      },
    },
  ],
});
```

## Configuración de Autenticación

```typescript
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  auth: {
    // Tipos: 'bearer' | 'basic' | 'api-key' | 'custom'
    type: 'bearer',
    
    // Opción 1: Leer de localStorage
    tokenKey: 'access_token',
    
    // Opción 2: Función personalizada
    getToken: async () => {
      const session = await getSession();
      return session?.accessToken ?? null;
    },
    
    // Callback cuando hay errores de auth (401, 403)
    onAuthError: (error) => {
      if (error.status === 401) {
        window.location.href = '/login';
      }
    },
    
    // Callback cuando expira el token
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
}
```
