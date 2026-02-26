# AppAuthProvider - Provider de Autenticación y Gestión de Sesiones

**Version: 1.2.1**

## Descripción

`AppAuthProvider` es el proveedor de autenticación y gestión de sesiones para aplicaciones que usan GC-UI-COMPONENTS. Controla el estado de autenticación global, la expiración automática de sesiones basada en inactividad, y sincroniza el estado de la sesión entre múltiples pestañas usando BroadcastChannel API.

**Características principales:**
- Gestión de estado de autenticación (`isAuthenticated`, `login()`, `logout()`)
- Datos de sesión genéricos con `login(data)` y `sessionData` (v1.1.0)
- Expiración por inactividad con `refreshActivity()` (v1.2.0)
- `ProtectedRoute` con callback `onUnauthorized` — agnóstico al router (v1.2.0)
- `PublicRoute` simplificado — solo `children`, retorna null si autenticado (v1.2.0)
- `ProtectedRoute` llama `refreshActivity()` automáticamente al montarse (v1.2.0)
- Validación automática de sesión con intervalo configurable
- Sincronización cross-tab usando BroadcastChannel
- Persistencia de sesión y datos en localStorage
- Callbacks de ciclo de vida (`onLogging`, `onLogout`, `onSessionInvalid`)
- Integración con ConfigProvider para configuración jerárquica

## Estructura Modular

```
AppAuthProvider/
├── views/
│   └── AppAuthProvider.view.tsx  # AppAuthProvider component
├── types/
│   └── AppAuthProvider.types.ts  # TypeScript types
├── hooks/
│   └── useAppAuth.hook.ts        # Custom hook (useAppAuth)
├── components/
│   ├── ProtectedRoute.tsx        # Wrapper para rutas protegidas
│   ├── PublicRoute.tsx           # Wrapper para rutas públicas
│   └── index.ts                  # Exports de componentes
├── index.ts                      # Exports principales
└── README-IA.md                  # This documentation
```

## Arquitectura

```
AppAuthProvider
├── Control de autenticación global
│   ├── Estado isAuthenticated
│   ├── Función login(data?) con datos genéricos
│   ├── Función logout()
│   ├── Función refreshActivity() (v1.2.0)
│   └── sessionData (datos guardados con login)
│
├── Datos de sesión genéricos (v1.1.0)
│   ├── login(data) guarda datos en localStorage
│   ├── sessionData expuesto en contexto
│   ├── sessionDataKey configurable (default: 'app_auth_session_data')
│   ├── Persistencia y recuperación automática
│   └── logout() borra datos automáticamente
│
├── Protección de rutas (v1.2.0)
│   ├── ProtectedRoute (renderiza si autenticado, llama onSessionInvalid + onUnauthorized si no)
│   ├── ProtectedRoute llama refreshActivity() al montarse
│   └── PublicRoute (renderiza si NO autenticado, retorna null si hay sesión)
│
├── Gestión automática de sesión (v1.2.0)
│   ├── Expiración basada en INACTIVIDAD (lastActivityTime)
│   ├── refreshActivity() renueva lastActivityTime
│   ├── ProtectedRoute renueva automáticamente al navegar
│   ├── sessionDuration configurable (default: 8 horas)
│   ├── validationInterval configurable (default: 60 segundos)
│   └── SessionValidator automático
│
├── Sincronización cross-tab
│   ├── BroadcastChannel API
│   ├── Sincronización automática de login/logout
│   └── Persistencia en localStorage
│
├── Callbacks de ciclo de vida
│   ├── onLogging (al iniciar sesión manualmente)
│   ├── onLogout (SIEMPRE que hay logout)
│   └── onSessionInvalid (solo cuando sesión es inválida/expirada)
│
└── Integración con ConfigProvider
    ├── Configuración jerárquica (props > ConfigProvider > defaults)
    ├── sessionDuration configurable
    └── validationInterval configurable
```

## Props Interface

```typescript
interface AppAuthProviderProps {
  children: React.ReactNode;
  sessionDuration?: number;        // Tiempo de inactividad en ms antes de expirar (default: 8 horas)
  validationInterval?: number;     // Intervalo de revisión en ms (default: 60 segundos)
  sessionDataKey?: string;         // Clave de localStorage para datos genéricos (default: 'app_auth_session_data')
  onLogging?: (data?: unknown) => void; // Callback al iniciar sesión, recibe la data del login
  onLogout?: (data?: unknown) => void;  // Callback en cualquier logout, recibe data del logout manual
  onSessionInvalid?: () => void;   // Callback solo cuando sesión es inválida/expirada
}

interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionData: unknown | null;     // Datos genéricos guardados con login(data)
  login: (data?: unknown) => void; // Login con datos opcionales
  logout: (data?: unknown) => void; // Logout con datos opcionales
  refreshActivity: () => void;     // Renueva lastActivityTime, extendiendo la sesión (v1.2.0)
  triggerSessionInvalid: () => void; // Dispara el callback onSessionInvalid manualmente (v1.2.1)
}

interface ProtectedRouteProps {
  children: ReactNode;
  onUnauthorized?: () => void;     // Callback opcional cuando NO autenticado (se llama junto con onSessionInvalid)
  fallback?: ReactNode;            // Componente a mostrar cuando no autenticado
}

interface PublicRouteProps {
  children: ReactNode;             // Solo se renderiza si NO autenticado; retorna null si hay sesión
}
```

## Callbacks del Ciclo de Vida

El AppAuthProvider ofrece **3 callbacks** para gestionar eventos del ciclo de autenticación:

### 1. onLogging - Login Manual

**Se ejecuta:** Solo cuando el usuario hace `login()` manualmente. **Recibe la data** que se pasó a `login(data)`.

```typescript
const handleLogin = (data?: unknown) => {
  console.log("Usuario inició sesión con data:", data);
  // data contiene lo que se pasó a login({ name: 'Juan', role: 'admin' })
  navigate('/dashboard');
  analytics.track('user_login', data);
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
  // data contiene lo que se pasó a logout({ reason: 'user_action' })
  localStorage.removeItem('auth_token');
  websocket.close();
};
```

**Se ejecuta en:**
- Logout manual del usuario (botón "Cerrar Sesión")
- Sesión expiró por inactividad (SessionValidator)
- No hay sesión al cargar la app
- Sesión expirada al cargar la app
- Logout sincronizado desde otra pestaña

### 3. onSessionInvalid - Solo Sesiones Inválidas

**Se ejecuta:** Solo cuando la sesión es inválida o expiró (NO en logout manual)

```typescript
const handleSessionExpired = () => {
  console.log("Sesión expirada por inactividad");
  window.location.href = '/login';
  toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
};
```

**Se ejecuta en:**
- No hay sesión al cargar la app
- Sesión expirada al cargar la app
- SessionValidator detecta expiración por inactividad

**NO se ejecuta en:**
- Logout manual del usuario

### Tabla de Comportamiento Completo

| Acción | `onLogging` | `onLogout` | `onSessionInvalid` |
|--------|-------------|------------|-------------------|
| Usuario hace login manual | SI | No | No |
| Usuario hace logout manual | No | SI | No |
| NO hay sesión al iniciar app | No | SI | SI |
| Sesión expiró por inactividad al iniciar | No | SI | SI |
| SessionValidator detecta expiración | No | SI | SI |
| Otra pestaña hace logout | No | SI | No |
| Restaurar sesión válida al recargar | No | No | No |

## Expiración de Sesión por Inactividad (v1.2.0)

A partir de v1.2.0, la sesión expira por **inactividad**, no por tiempo absoluto desde el login.

```
1. Usuario hace login()
   └─> lastActivityTime = Date.now()

2. Usuario navega a ruta protegida (ProtectedRoute)
   └─> refreshActivity() se llama automáticamente
   └─> lastActivityTime = Date.now() (se renueva)

3. SessionValidator verifica cada N segundos (validationInterval)
   └─> Si (Date.now() - lastActivityTime) > sessionDuration
       └─> Sesión expirada por inactividad
       └─> Llama onSessionInvalid()
       └─> Ejecuta logout()

4. Mientras el usuario navegue entre rutas protegidas, la sesión se renueva
```

### refreshActivity()

Disponible en el contexto via `useAppAuth()`. Actualiza `lastActivityTime` en localStorage.

```typescript
const { refreshActivity } = useAppAuth();

// Llamar manualmente cuando quieras renovar la sesión
refreshActivity();

// ProtectedRoute lo llama automáticamente al montarse
// No necesitas llamarlo manualmente en la mayoría de los casos
```

## ProtectedRoute y PublicRoute (v1.2.0)

### ProtectedRoute

Renderiza sus children solo si el usuario está autenticado. Si no lo está:

1. **Siempre** llama `onSessionInvalid` del provider (via `triggerSessionInvalid()`)
2. **Si se pasó** `onUnauthorized`, también lo llama (para acciones adicionales como redirecciones)
3. Muestra el `fallback` si se proporcionó

Cada vez que se monta (navegación a la ruta), llama `refreshActivity()` automáticamente para renovar la sesión.

```jsx
import { ProtectedRoute } from 'GC-UI-COMPONENTS';
import { useLocation } from 'wouter';

// Opción 1: Sin onUnauthorized (la redirección se maneja en onSessionInvalid del provider)
function Dashboard() {
  return (
    <ProtectedRoute fallback={<p>Redirigiendo...</p>}>
      <DashboardContent />
    </ProtectedRoute>
  );
}

// Opción 2: Con onUnauthorized (acción extra específica de esta ruta)
function Dashboard() {
  const [, setLocation] = useLocation();

  return (
    <ProtectedRoute
      onUnauthorized={() => setLocation('/login')}
      fallback={<p>Redirigiendo al login...</p>}
    >
      <DashboardContent />
    </ProtectedRoute>
  );
}
```

### PublicRoute

Renderiza sus children solo si el usuario **NO** está autenticado. Si hay sesión activa, retorna `null`. Sin callbacks, sin redirecciones — solo oculta el contenido.

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

## Uso Básico

### Instalación Mínima

```jsx
import { AppAuthProvider } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <AppAuthProvider>
      <MyAppContent />
    </AppAuthProvider>
  );
}
```

### Uso del Hook useAppAuth

```jsx
import { useAppAuth } from 'GC-UI-COMPONENTS';

function LoginButton() {
  const { isAuthenticated, sessionData, login, logout, refreshActivity } = useAppAuth();

  if (isAuthenticated) {
    return (
      <div>
        <p>Bienvenido, {(sessionData as any)?.name}</p>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }

  return (
    <button onClick={() => login({ name: 'Juan', role: 'admin' })}>
      Iniciar Sesión
    </button>
  );
}
```

### Ejemplo Completo con Rutas

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
      sessionDuration={30 * 60 * 1000}
      validationInterval={5000}
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
| `onLogging` | `(data?: unknown) => void` | `undefined` | Callback al hacer login, recibe la data |
| `onLogout` | `(data?: unknown) => void` | `undefined` | Callback en cualquier logout, recibe data |
| `onSessionInvalid` | `() => void` | `undefined` | Callback cuando sesión expira/inválida |

### useAppAuth Hook

```typescript
interface AppAuthContextValue {
  isAuthenticated: boolean;              // Estado de autenticación
  sessionData: unknown | null;           // Datos genéricos de sesión
  login: (data?: unknown) => void;       // Iniciar sesión con datos opcionales
  logout: (data?: unknown) => void;      // Cerrar sesión con datos opcionales
  refreshActivity: () => void;           // Renovar lastActivityTime (v1.2.0)
  triggerSessionInvalid: () => void;     // Dispara onSessionInvalid manualmente (v1.2.1)
}
```

### ProtectedRoute Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Contenido si autenticado |
| `onUnauthorized` | `() => void` | No | Callback opcional cuando NO autenticado |
| `fallback` | `ReactNode` | `undefined` | Componente mientras no autenticado |

### PublicRoute Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Contenido si NO autenticado. Retorna null si hay sesión |

## Changelog

### v1.2.1 (Febrero 2026)
- `onLogging` ahora recibe `(data?: unknown)` — la misma data que se pasó a `login(data)`
- `onLogout` ahora recibe `(data?: unknown)` — la misma data que se pasó a `logout(data)`
- `logout()` en el contexto ahora acepta `(data?: unknown)` opcional
- Eliminado `skipInitialValidation` — ya no es necesario porque `PublicRoute` maneja las rutas públicas
- `ProtectedRoute` ahora llama `onSessionInvalid` automáticamente cuando detecta que no hay sesión
- Agregado `triggerSessionInvalid()` al contexto para disparar el callback manualmente

### v1.2.0 (Febrero 2026)
- Expiración de sesión ahora basada en INACTIVIDAD (lastActivityTime) en vez de tiempo absoluto
- Agregado `refreshActivity()` al contexto para renovar el tiempo de sesión
- `ProtectedRoute` llama `refreshActivity()` automáticamente al montarse
- `ProtectedRoute` ahora usa callback `onUnauthorized` en vez de `redirectTo` — agnóstico al router
- `PublicRoute` simplificado: solo `children`, retorna null si autenticado (sin redirectTo)
- Separadas storage keys: `app_session_validator` (interno) y `app_auth_session_data` (datos usuario)
- Eliminado console.log del SessionValidator
- Default `validationInterval` actualizado a 60 segundos
- Default `sessionDataKey` actualizado a `'app_auth_session_data'`
- Demo interactiva con rutas reales (wouter), inputs de configuración y timer visual

### v1.1.0 (Enero 2026)
- Datos de sesión genéricos con `login(data)` y `sessionData`
- `sessionDataKey` configurable
- Componentes `ProtectedRoute` y `PublicRoute`
- Persistencia y recuperación automática de datos de sesión

### v1.0.9 (Noviembre 2025)
- Agregado prop `onLogout`
- Modificado `onSessionInvalid` para ejecutarse solo en sesiones inválidas
- Documentación de callbacks

### v1.0.0 (Octubre 2025)
- Versión inicial
