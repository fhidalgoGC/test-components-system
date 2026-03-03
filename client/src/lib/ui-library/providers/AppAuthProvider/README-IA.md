# AppAuthProvider - Provider de Autenticación y Gestión de Sesiones

**Version: 1.3.0**

## Descripción

`AppAuthProvider` es el proveedor de autenticación y gestión de sesiones para aplicaciones que usan GC-UI-COMPONENTS. Controla el estado de autenticación global, la expiración automática de sesiones basada en inactividad, y sincroniza el estado de la sesión entre múltiples pestañas usando BroadcastChannel API.

**Características principales:**
- Gestión de estado de autenticación (`isAuthenticated`, `login()`, `logout()`)
- Datos de sesión genéricos con `login(data)` y `sessionData`
- Expiración por inactividad con `refreshActivity()`
- `ProtectedRoute` y `PublicRoute` para control de acceso a rutas
- Estado `sessionInvalidated` para evitar callbacks duplicados
- Auto-logout en `PublicRoute` configurable con `autoLogoutDelay`
- Validación automática de sesión con intervalo configurable
- Sincronización cross-tab usando BroadcastChannel
- Persistencia de sesión y datos en localStorage
- Callbacks de ciclo de vida (`onLogging`, `onLogout`, `onSessionInvalid`)
- Integración con ConfigProvider para configuración jerárquica

## Estructura Modular

```
AppAuthProvider/
├── views/
│   └── AppAuthProvider.view.tsx
├── types/
│   └── AppAuthProvider.types.ts
├── hooks/
│   └── useAppAuth.hook.ts
├── components/
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── index.ts
├── utils/
│   ├── deepMerge.ts
│   └── index.ts
├── index.ts
└── README-IA.md
```

## Flujos de Autenticación

### Flujo 1: Login exitoso

```
Usuario en /login (PublicRoute)
    │
    ├─> Ingresa credenciales
    ├─> Tu app valida con backend
    ├─> Llama login({ name: 'Juan', role: 'admin' })
    │
    ├─> Provider:
    │   ├─> isAuthenticated = true
    │   ├─> sessionInvalidated = false (reset)
    │   ├─> Guarda sessionData en localStorage
    │   ├─> Guarda lastActivityTime en localStorage
    │   ├─> Ejecuta onLogging(data)
    │   └─> BroadcastChannel notifica otras pestañas
    │
    ├─> PublicRoute: cancela timer de autoLogoutDelay (si estaba activo)
    │
    └─> Usuario navega a /dashboard (ProtectedRoute)
        ├─> ProtectedRoute ve isAuthenticated = true
        ├─> Llama refreshActivity() (renueva lastActivityTime)
        └─> Renderiza children
```

### Flujo 2: Navegación entre rutas protegidas (sesión activa)

```
Usuario en /dashboard (ProtectedRoute)
    │
    ├─> ProtectedRoute al montarse:
    │   ├─> Ve isAuthenticated = true
    │   ├─> Llama refreshActivity()
    │   └─> lastActivityTime = Date.now() (se renueva)
    │
    ├─> Usuario navega a /profile (ProtectedRoute)
    │   ├─> ProtectedRoute al montarse:
    │   │   ├─> Ve isAuthenticated = true
    │   │   ├─> Llama refreshActivity()
    │   │   └─> lastActivityTime = Date.now() (se renueva)
    │   └─> Renderiza children
    │
    └─> Mientras navegue, la sesión nunca expira
        (cada navegación renueva lastActivityTime)
```

### Flujo 3: Sesión expira por inactividad

```
Usuario en /dashboard (ProtectedRoute) - dejó de navegar
    │
    ├─> SessionValidator revisa cada N segundos (validationInterval)
    │   └─> (Date.now() - lastActivityTime) > sessionDuration?
    │
    ├─> SI, la sesión expiró:
    │   ├─> Provider:
    │   │   ├─> isAuthenticated = false
    │   │   ├─> sessionInvalidated = true
    │   │   ├─> Limpia localStorage
    │   │   ├─> Ejecuta onLogout()
    │   │   ├─> Ejecuta onSessionInvalid()
    │   │   └─> BroadcastChannel notifica otras pestañas
    │   │
    │   └─> ProtectedRoute re-renderiza:
    │       ├─> Ve isAuthenticated = false
    │       ├─> Ve sessionInvalidated = true
    │       ├─> NO dispara callbacks (ya fueron disparados por SessionValidator)
    │       └─> Muestra fallback o null
    │
    └─> onSessionInvalid del provider maneja la redirección a /login
```

### Flujo 4: Acceso directo a ruta protegida sin sesión

```
Usuario abre /dashboard directamente en el navegador (sin sesión)
    │
    ├─> Provider al montar:
    │   ├─> Revisa localStorage: no hay sesión
    │   ├─> isAuthenticated = false
    │   ├─> sessionInvalidated = true
    │   ├─> Ejecuta onLogout()
    │   └─> Ejecuta onSessionInvalid()
    │
    ├─> ProtectedRoute al montarse:
    │   ├─> Ve isAuthenticated = false
    │   ├─> Ve sessionInvalidated = true (ya procesado)
    │   ├─> NO dispara callbacks duplicados
    │   └─> Muestra fallback o null
    │
    └─> onSessionInvalid del provider ya manejó la redirección a /login
```

### Flujo 5: Usuario autenticado llega a ruta pública (PublicRoute)

```
Usuario con sesión activa navega a /login (PublicRoute)
    │
    ├─> PublicRoute al montarse:
    │   ├─> Ve isAuthenticated = true
    │   ├─> Inicia timer de autoLogoutDelay (default: 30 seg)
    │   └─> Renderiza children normalmente (NO oculta contenido)
    │
    ├─> CASO A: Usuario navega a otra ruta antes del timeout
    │   ├─> Timer se cancela (cleanup del useEffect)
    │   └─> Sesión permanece activa
    │
    └─> CASO B: Usuario se queda sin hacer nada
        ├─> Timer termina (30 seg)
        ├─> Provider:
        │   ├─> triggerSessionInvalid() → sessionInvalidated = true
        │   ├─> Ejecuta onSessionInvalid()
        │   └─> logout() → isAuthenticated = false
        └─> Sesión cerrada como si hubiera expirado
```

### Flujo 6: Logout manual

```
Usuario hace clic en "Cerrar Sesión"
    │
    ├─> Llama logout({ reason: 'user_action' })
    │
    ├─> Provider:
    │   ├─> isAuthenticated = false
    │   ├─> Limpia localStorage (sesión + sessionData)
    │   ├─> Ejecuta onLogout({ reason: 'user_action' })
    │   ├─> NO ejecuta onSessionInvalid (es logout manual)
    │   ├─> sessionInvalidated NO cambia (no es invalidación)
    │   └─> BroadcastChannel notifica otras pestañas
    │
    └─> Tu app redirige a /login manualmente
```

### Flujo 7: Sincronización cross-tab

```
Pestaña 1                              Pestaña 2
    │                                      │
    ├─> Usuario hace login()               │
    │   └─> BroadcastChannel ──────────> Recibe evento
    │                                      ├─> Verifica localStorage
    │                                      ├─> isAuthenticated = true
    │                                      └─> Actualiza estado
    │                                      │
    ├─> Usuario hace logout()              │
    │   └─> BroadcastChannel ──────────> Recibe evento
    │                                      ├─> isAuthenticated = false
    │                                      └─> Ejecuta onLogout()
```

### Flujo 8: Recarga de página con sesión válida

```
Usuario recarga /dashboard (F5)
    │
    ├─> Provider al montar:
    │   ├─> Lee localStorage: encuentra sesión
    │   ├─> Verifica: (Date.now() - lastActivityTime) < sessionDuration?
    │   │
    │   ├─> SI, sesión válida:
    │   │   ├─> isAuthenticated = true
    │   │   ├─> Restaura sessionData de localStorage
    │   │   └─> NO dispara callbacks (restauración silenciosa)
    │   │
    │   └─> NO, sesión expirada:
    │       ├─> isAuthenticated = false
    │       ├─> sessionInvalidated = true
    │       ├─> Ejecuta onLogout()
    │       └─> Ejecuta onSessionInvalid()
    │
    └─> ProtectedRoute renderiza según isAuthenticated
```

## Props Interface

```typescript
interface AppAuthProviderProps {
  children: React.ReactNode;
  sessionDuration?: number;        // Tiempo de inactividad en ms antes de expirar (default: 8 horas)
  validationInterval?: number;     // Intervalo de revisión en ms (default: 60 segundos)
  sessionDataKey?: string;         // Clave de localStorage para datos genéricos (default: 'app_auth_session_data')
  autoLogoutDelay?: number;        // Tiempo en ms antes de auto-logout en PublicRoute (default: 30000)
  onLogging?: (data?: unknown) => void; // Callback al iniciar sesión, recibe la data del login
  onLogout?: (data?: unknown) => void;  // Callback en cualquier logout, recibe data del logout manual
  onSessionInvalid?: () => void;   // Callback solo cuando sesión es inválida/expirada
}

interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionInvalidated: boolean;     // true cuando la sesión ya fue invalidada
  sessionData: unknown | null;     // Datos genéricos guardados con login(data)
  login: (data?: unknown) => void; // Login con datos opcionales
  logout: (data?: unknown) => void; // Logout con datos opcionales
  refreshActivity: () => void;     // Renueva lastActivityTime
  triggerSessionInvalid: () => void; // Dispara onSessionInvalid + pone sessionInvalidated=true
  autoLogoutDelay: number;         // Tiempo configurado para auto-logout en PublicRoute
}

interface ProtectedRouteProps {
  children: ReactNode;
  onUnauthorized?: () => void;     // Callback opcional cuando NO autenticado
  fallback?: ReactNode;            // Componente a mostrar cuando no autenticado
}

interface PublicRouteProps {
  children: ReactNode;             // Siempre se renderiza (autoLogoutDelay viene del provider)
}
```

## Callbacks del Ciclo de Vida

El AppAuthProvider ofrece **3 callbacks** para gestionar eventos del ciclo de autenticación:

### 1. onLogging - Login Manual

**Se ejecuta:** Solo cuando el usuario hace `login()` manualmente. **Recibe la data** que se pasó a `login(data)`.

```typescript
const handleLogin = (data?: unknown) => {
  console.log("Usuario inició sesión con data:", data);
  navigate('/dashboard');
};
```

**NO se ejecuta:**
- Al restaurar sesión desde localStorage
- Al sincronizar login desde otra pestaña

### 2. onLogout - Cualquier Logout

**Se ejecuta:** **SIEMPRE** que hay un logout (manual o automático). **Recibe la data** que se pasó a `logout(data)` (solo en logout manual; en logout automático por expiración, data es `undefined`).

```typescript
const handleLogout = (data?: unknown) => {
  console.log("Logout detectado con data:", data);
  localStorage.removeItem('auth_token');
};
```

**Se ejecuta en:**
- Logout manual del usuario
- Sesión expiró por inactividad (SessionValidator)
- No hay sesión al cargar la app
- Sesión expirada al cargar la app
- Logout sincronizado desde otra pestaña
- Auto-logout de PublicRoute

### 3. onSessionInvalid - Solo Sesiones Inválidas

**Se ejecuta:** Solo cuando la sesión es inválida o expiró (NO en logout manual). Pone `sessionInvalidated = true` en el provider.

```typescript
const handleSessionExpired = () => {
  console.log("Sesión expirada por inactividad");
  window.location.href = '/login';
};
```

**Se ejecuta en:**
- No hay sesión al cargar la app
- Sesión expirada al cargar la app
- SessionValidator detecta expiración por inactividad
- ProtectedRoute detecta !isAuthenticated (solo si sessionInvalidated es false)
- Auto-logout de PublicRoute

**NO se ejecuta en:**
- Logout manual del usuario

### Tabla de Comportamiento Completo

| Acción | `onLogging` | `onLogout` | `onSessionInvalid` | `sessionInvalidated` |
|--------|-------------|------------|-------------------|---------------------|
| Usuario hace login manual | SI (data) | No | No | false (reset) |
| Usuario hace logout manual | No | SI (data) | No | sin cambio |
| NO hay sesión al iniciar app | No | SI | SI | true |
| Sesión expiró por inactividad | No | SI | SI | true |
| SessionValidator detecta expiración | No | SI | SI | true |
| ProtectedRoute sin sesión (1ra vez) | No | No | SI | true |
| ProtectedRoute sin sesión (ya invalidada) | No | No | No | true (ya estaba) |
| PublicRoute auto-logout | No | SI | SI | true |
| Otra pestaña hace logout | No | SI | No | sin cambio |
| Restaurar sesión válida al recargar | No | No | No | sin cambio |

## ProtectedRoute y PublicRoute

### ProtectedRoute

Renderiza sus children solo si el usuario está autenticado. Si no lo está:

1. Revisa `sessionInvalidated` del provider — si ya es `true`, **no vuelve a disparar callbacks**
2. Si `sessionInvalidated` es `false`, llama `triggerSessionInvalid()` (pone `sessionInvalidated = true` + ejecuta `onSessionInvalid`)
3. Si se pasó `onUnauthorized`, también lo llama
4. Muestra el `fallback` si se proporcionó

Cada vez que se monta con sesión activa, llama `refreshActivity()` automáticamente para renovar la sesión.

```jsx
import { ProtectedRoute } from 'GC-UI-COMPONENTS';

function Dashboard() {
  return (
    <ProtectedRoute fallback={<p>Redirigiendo...</p>}>
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### PublicRoute

Siempre renderiza sus children. Si el usuario ya tiene sesión activa y se queda en esta ruta sin navegar, se activa un temporizador (`autoLogoutDelay`, configurado en el provider). Si pasa el tiempo sin cambiar de ruta, hace logout automático (llama `triggerSessionInvalid` + `logout`).

Si el usuario navega a otra ruta antes del timeout, el timer se cancela automáticamente.

```jsx
import { PublicRoute } from 'GC-UI-COMPONENTS';

function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
```

## Uso Completo con Rutas

```jsx
import { AppAuthProvider, ProtectedRoute, PublicRoute, useAppAuth } from 'GC-UI-COMPONENTS';
import { Route, Switch, useLocation } from 'wouter';

function LoginPage() {
  const { login } = useAppAuth();
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    login({ name: 'Juan', role: 'admin' });
    setLocation('/dashboard');
  };

  return (
    <PublicRoute>
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </PublicRoute>
  );
}

function DashboardPage() {
  const { sessionData, logout } = useAppAuth();
  const [, setLocation] = useLocation();

  return (
    <ProtectedRoute fallback={<p>Redirigiendo...</p>}>
      <p>Bienvenido, {(sessionData as any)?.name}</p>
      <button onClick={() => { logout(); setLocation('/login'); }}>
        Cerrar Sesión
      </button>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AppAuthProvider
      sessionDuration={30 * 60 * 1000}     // 30 minutos de inactividad
      validationInterval={5000}              // Revisa cada 5 segundos
      autoLogoutDelay={30000}                // 30 seg en PublicRoute antes de auto-logout
      onLogging={(data) => {
        console.log("Login:", data);
      }}
      onLogout={(data) => {
        console.log("Logout:", data);
      }}
      onSessionInvalid={() => {
        window.location.href = '/login';
      }}
    >
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/dashboard" component={DashboardPage} />
      </Switch>
    </AppAuthProvider>
  );
}
```

## Configuración

### Orden de Precedencia

```
Props directos del AppAuthProvider
    ↓ (si no se proporciona)
Configuración del ConfigProvider
    ↓ (si no se proporciona)
Valores por defecto del environment
```

### Valores por Defecto

Configurados en `client/src/lib/ui-library/enviorments/enviroment.ts`:

```typescript
export const SESSION_CONFIG = {
  SESSION_DURATION: 8 * 60 * 60 * 1000,  // 8 horas de inactividad
  VALIDATION_INTERVAL: 60 * 1000,         // Revisa cada 60 segundos
};
```

### Variables de Entorno

```bash
VITE_SESSION_DURATION=14400000      # 4 horas
VITE_VALIDATION_INTERVAL=5000       # 5 segundos
```

## Sincronización Cross-Tab

El AppAuthProvider usa BroadcastChannel API para sincronizar login/logout entre pestañas automáticamente.

## Storage Keys

- `app_session_validator` — datos internos del SessionValidator (sessionId, sessionStartTime, lastActivityTime)
- `app_auth_session_data` — datos genéricos del usuario guardados con `login(data)` (configurable via `sessionDataKey`)

Estas claves son independientes para evitar colisiones.

## API Reference

### AppAuthProvider Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Contenido de la aplicación |
| `sessionDuration` | `number` | `28800000` (8h) | Tiempo de inactividad en ms antes de expirar |
| `validationInterval` | `number` | `60000` (1min) | Intervalo de revisión en ms |
| `sessionDataKey` | `string` | `'app_auth_session_data'` | Clave de localStorage para datos genéricos |
| `autoLogoutDelay` | `number` | `30000` (30s) | Tiempo en ms antes de auto-logout en PublicRoute |
| `onLogging` | `(data?: unknown) => void` | `undefined` | Callback al hacer login, recibe la data |
| `onLogout` | `(data?: unknown) => void` | `undefined` | Callback en cualquier logout, recibe data |
| `onSessionInvalid` | `() => void` | `undefined` | Callback cuando sesión expira/inválida |

### useAppAuth Hook

```typescript
interface AppAuthContextValue {
  isAuthenticated: boolean;              // Estado de autenticación
  sessionInvalidated: boolean;           // true si la sesión ya fue invalidada
  sessionData: unknown | null;           // Datos genéricos de sesión
  getSessionData: <T = unknown>() => T | null; // Obtener datos tipados de sesión
  updateSessionData: (data: Record<string, unknown>) => void; // Deep merge parcial de datos de sesión
  login: (data?: unknown) => void;       // Iniciar sesión con datos opcionales
  logout: (data?: unknown) => void;      // Cerrar sesión con datos opcionales
  refreshActivity: () => void;           // Renovar lastActivityTime
  triggerSessionInvalid: () => void;     // Dispara onSessionInvalid manualmente
  autoLogoutDelay: number;               // Tiempo configurado para auto-logout
}
```

### ProtectedRoute Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Contenido si autenticado |
| `onUnauthorized` | `() => void` | `undefined` | Callback opcional cuando NO autenticado |
| `fallback` | `ReactNode` | `undefined` | Componente mientras no autenticado |

### PublicRoute Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Siempre se renderiza (autoLogoutDelay viene del provider) |

## updateSessionData — Deep Merge Recursivo

`updateSessionData` permite actualizar parcialmente los datos de sesión sin perder la data existente. Usa deep merge recursivo.

**Requisito:** Solo funciona si `login()` ya fue llamado. Si no hay sesión activa, lanza un warning por consola y no hace nada.

### Comportamiento del Deep Merge

```
Datos actuales:  { name: 'Freddy', role: 'admin' }
updateSessionData({ edad: 15 })
Resultado:       { name: 'Freddy', role: 'admin', edad: 15 }
```

```
Datos actuales:  { name: 'Freddy' }
updateSessionData({ name: 'Juan' })
Resultado:       { name: 'Juan' }
```

```
Datos actuales:  { user: { name: 'Freddy', age: 30 }, token: 'abc' }
updateSessionData({ user: { age: 31, email: 'f@mail.com' } })
Resultado:       { user: { name: 'Freddy', age: 31, email: 'f@mail.com' }, token: 'abc' }
```

**Reglas:**
- Keys nuevas → se agregan
- Keys existentes con valor primitivo → se sobrescriben
- Keys existentes con objetos anidados → merge recursivo
- Arrays → se sobrescriben (no se concatenan)
- `null` → sobrescribe directamente

### Flujo de updateSessionData

```
Usuario autenticado (isAuthenticated = true)
    │
    ├─> Llama updateSessionData({ token: 'xyz', permisos: ['read'] })
    │
    ├─> Provider:
    │   ├─> Verifica isAuthenticated === true ✓
    │   ├─> Lee sessionData actual
    │   ├─> Deep merge: { ...actual, ...nuevo } (recursivo)
    │   ├─> setSessionData(merged)
    │   └─> Persiste en localStorage
    │
    └─> sessionData actualizado, componentes re-renderizan
```

```
Usuario NO autenticado (isAuthenticated = false)
    │
    ├─> Llama updateSessionData({ token: 'xyz' })
    │
    └─> Provider:
        ├─> Verifica isAuthenticated === false ✗
        ├─> console.warn('[AppAuth] updateSessionData ignorado...')
        └─> No hace nada
```

### Ejemplo de Uso

```tsx
function ProfilePage() {
  const { getSessionData, updateSessionData } = useAppAuth();
  const session = getSessionData<{ name: string; token: string }>();

  const handleUpdateToken = (newToken: string) => {
    updateSessionData({ token: newToken });
  };

  const handleAddPermissions = (permisos: string[]) => {
    updateSessionData({ permisos });
  };

  return <div>Hola, {session?.name}</div>;
}
```

### Ejemplo con ApiInterceptor

```tsx
function ApiAuthConnector({ children }: { children: ReactNode }) {
  const { getSessionData, updateSessionData, isAuthenticated } = useAppAuth();

  useEffect(() => {
    if (isAuthenticated) {
      privateApi.setAuth({
        type: 'bearer',
        getToken: () => getSessionData<{ access_token: string }>()?.access_token ?? null,
      });
    } else {
      privateApi.clearAuth();
    }
  }, [isAuthenticated]);

  return children;
}
```

## Changelog

### v1.3.0 (Marzo 2026)
- Agregado `updateSessionData(data)` al contexto — deep merge recursivo de datos de sesión
- Agregado `getSessionData<T>()` al contexto — obtener datos tipados de sesión
- `updateSessionData` solo funciona post-login (requiere `isAuthenticated === true`)
- Deep merge recursivo: objetos anidados se mezclan, arrays y primitivos se sobrescriben
- Datos actualizados se persisten automáticamente en localStorage
- Agregada utilidad interna `deepMerge` en `utils/deepMerge.ts`

### v1.2.1 (Febrero 2026)
- `onLogging` ahora recibe `(data?: unknown)` — la misma data que se pasó a `login(data)`
- `onLogout` ahora recibe `(data?: unknown)` — la misma data que se pasó a `logout(data)`
- `logout()` en el contexto ahora acepta `(data?: unknown)` opcional
- Eliminado `skipInitialValidation` — ya no es necesario porque `PublicRoute` maneja las rutas públicas
- `ProtectedRoute` ahora llama `onSessionInvalid` automáticamente cuando detecta que no hay sesión
- Agregado `triggerSessionInvalid()` al contexto para disparar el callback manualmente
- `PublicRoute` ya no oculta contenido — siempre renderiza children
- `PublicRoute` ahora tiene auto-logout: si hay sesión y el usuario no navega, hace logout automático después de `autoLogoutDelay` (default 30s)
- `autoLogoutDelay` se configura a nivel del provider, no de PublicRoute
- Agregado `sessionInvalidated` al contexto — evita callbacks duplicados entre SessionValidator y ProtectedRoute
- ProtectedRoute usa `sessionInvalidated` para no disparar callbacks si ya fueron procesados

### v1.2.0 (Febrero 2026)
- Expiración de sesión ahora basada en INACTIVIDAD (lastActivityTime) en vez de tiempo absoluto
- Agregado `refreshActivity()` al contexto para renovar el tiempo de sesión
- `ProtectedRoute` llama `refreshActivity()` automáticamente al montarse
- `ProtectedRoute` ahora usa callback `onUnauthorized` en vez de `redirectTo` — agnóstico al router
- Separadas storage keys: `app_session_validator` (interno) y `app_auth_session_data` (datos usuario)
- Default `validationInterval` actualizado a 60 segundos
- Default `sessionDataKey` actualizado a `'app_auth_session_data'`

### v1.1.0 (Enero 2026)
- Datos de sesión genéricos con `login(data)` y `sessionData`
- `sessionDataKey` configurable
- Componentes `ProtectedRoute` y `PublicRoute`
- Persistencia y recuperación automática de datos de sesión

### v1.0.9 (Noviembre 2025)
- Agregado prop `onLogout`
- Modificado `onSessionInvalid` para ejecutarse solo en sesiones inválidas

### v1.0.0 (Octubre 2025)
- Versión inicial
