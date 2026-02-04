# ApiInterceptor

Sistema de interceptores de API configurable y declarativo para manejar peticiones HTTP con soporte para filtros dinámicos, autenticación, y endpoints públicos/privados.

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

// POST request
const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });
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
  ],
  auth: {
    type: 'bearer',
    tokenKey: 'access_token',  // Lee de localStorage
    onAuthError: (error) => {
      console.log('Auth error:', error);
      window.location.href = '/login';
    },
  },
});
```

## Filtros Dinámicos

Sistema de filtros similar a BaseTable, configurable y extensible:

```typescript
import type { QueryParams, FilterRule } from '@/lib/ui-library/utils/interceptors';

// Definir filtros
const filters: FilterRule[] = [
  { field: 'status', operator: 'equals', value: 'active' },
  { field: 'name', operator: 'contains', value: 'john' },
  { field: 'price', operator: 'between', value: [10, 100] },
  { field: 'category', operator: 'in', value: ['electronics', 'books'] },
];

// Definir ordenamiento
const sort = [
  { field: 'createdAt', direction: 'desc' },
  { field: 'name', direction: 'asc' },
];

// Definir paginación
const pagination = {
  page: 1,
  pageSize: 20,
};

// Ejecutar petición con parámetros
const response = await api.get('/products', {
  filters,
  sort,
  pagination,
  search: 'laptop',
  searchFields: ['name', 'description'],
});
```

### Operadores de Filtro Disponibles

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `equals` | Igualdad exacta | `{ field: 'status', operator: 'equals', value: 'active' }` |
| `not_equals` | Diferente de | `{ field: 'status', operator: 'not_equals', value: 'deleted' }` |
| `contains` | Contiene texto | `{ field: 'name', operator: 'contains', value: 'john' }` |
| `starts_with` | Comienza con | `{ field: 'email', operator: 'starts_with', value: 'admin' }` |
| `ends_with` | Termina con | `{ field: 'email', operator: 'ends_with', value: '.com' }` |
| `greater_than` | Mayor que | `{ field: 'price', operator: 'greater_than', value: 100 }` |
| `less_than` | Menor que | `{ field: 'age', operator: 'less_than', value: 18 }` |
| `in` | En lista | `{ field: 'category', operator: 'in', value: ['a', 'b'] }` |
| `not_in` | No en lista | `{ field: 'status', operator: 'not_in', value: ['deleted'] }` |
| `between` | Entre valores | `{ field: 'price', operator: 'between', value: [10, 100] }` |
| `is_null` | Es nulo | `{ field: 'deletedAt', operator: 'is_null', value: true }` |
| `is_not_null` | No es nulo | `{ field: 'email', operator: 'is_not_null', value: true }` |

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
        // Intentar refresh token
        const newToken = await refreshToken();
        if (newToken) {
          // Reintentar la petición original
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
    
    // Callback cuando expira el token
    onTokenExpired: () => {
      console.log('Token expired');
    },
    
    // Callback en errores de auth (401, 403)
    onAuthError: (error) => {
      if (error.status === 401) {
        window.location.href = '/login';
      }
    },
  },
});
```

## useApiInterceptor Hook

Hook para React con estado de loading y error:

```typescript
import { useApiInterceptor } from '@/lib/ui-library/utils/interceptors';

function ProductList() {
  const { api, loading, error, clearError, buildFilters, buildParams } = useApiInterceptor({
    config: {
      baseUrl: 'https://api.example.com',
      auth: {
        type: 'bearer',
        tokenKey: 'token',
      },
    },
  });

  const [products, setProducts] = useState([]);
  const [statusFilter, setStatusFilter] = useState('active');

  const loadProducts = async () => {
    const params = buildParams({
      filters: buildFilters(
        { field: 'status', operator: 'equals', value: statusFilter }
      ),
      pagination: { page: 1, pageSize: 20 },
      sort: [{ field: 'name', direction: 'asc' }],
    });

    const response = await api.get('/products', params);
    setProducts(response.data);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
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
      // Enviar a servicio de logging
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

## Tipos Principales

```typescript
interface FilterRule {
  field: string;
  operator: FilterOperator;
  value: unknown;
  caseSensitive?: boolean;
}

interface SortRule {
  field: string;
  direction: 'asc' | 'desc';
}

interface PaginationConfig {
  page: number;
  pageSize: number;
}

interface QueryParams {
  filters?: FilterRule[];
  sort?: SortRule[];
  pagination?: PaginationConfig;
  search?: string;
  searchFields?: string[];
}

interface EndpointMatch {
  pattern: string | RegExp;
  methods?: HttpMethod[];
  visibility: 'public' | 'private';
  requiresAuth?: boolean;
}

interface AuthConfig {
  type: 'bearer' | 'basic' | 'api-key' | 'custom';
  tokenKey?: string;
  headerName?: string;
  getToken?: () => string | null | Promise<string | null>;
  onAuthError?: (error: AuthError) => void;
  onTokenExpired?: () => void;
}
```

## Override Chain

Similar a BaseTable, el sistema sigue una cadena de prioridades:

1. **Request-specific options** (mayor prioridad)
2. **Endpoint match config**
3. **Default config** (menor prioridad)

```typescript
// Config base
const api = createApiInterceptor({
  baseUrl: 'https://api.example.com',
  defaultVisibility: 'public',  // Default para todos
  endpoints: [
    { pattern: '/admin', visibility: 'private' },  // Override para /admin
  ],
});

// Override en petición específica
await api.get('/admin/users', { 
  visibility: 'private',  // Override explícito (mayor prioridad)
  requiresAuth: true,
});
```
