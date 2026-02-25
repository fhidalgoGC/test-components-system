# AppAuthProvider - Provider de Autenticación y Gestión de Sesiones

**Version: 1.1.0**

## 📖 Descripción

`AppAuthProvider` es el proveedor de autenticación y gestión de sesiones para aplicaciones que usan GC-UI-COMPONENTS. Controla el estado de autenticación global, la expiración automática de sesiones basada en tiempo real, y sincroniza el estado de la sesión entre múltiples pestañas usando BroadcastChannel API.

**Características principales:**
- ✅ Gestión de estado de autenticación (`isAuthenticated`, `login()`, `logout()`)
- ✅ Datos de sesión genéricos con `login(data)` y `sessionData` (v1.1.0)
- ✅ Validación automática de sesión basada en tiempo real
- ✅ Sincronización cross-tab usando BroadcastChannel
- ✅ Persistencia de sesión y datos en localStorage
- ✅ Modo `skipInitialValidation` para páginas de login (v1.0.8)
- ✅ Callbacks de ciclo de vida (`onLogging`, `onLogout`, `onSessionInvalid`) (v1.0.9)
- ✅ Componentes `ProtectedRoute` y `PublicRoute` para protección de rutas (v1.1.0)
- ✅ Integración con ConfigProvider para configuración jerárquica

## 🏗️ Estructura Modular

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

## 🏗️ Arquitectura

### **Características Principales**

```
AppAuthProvider
├── 🔐 Control de autenticación global
│   ├── Estado isAuthenticated
│   ├── Función login(data?) con datos genéricos
│   ├── Función logout()
│   └── sessionData (datos guardados con login)
│
├── 📦 Datos de sesión genéricos (v1.1.0)
│   ├── login(data) guarda datos en localStorage
│   ├── sessionData expuesto en contexto
│   ├── sessionDataKey configurable
│   ├── Persistencia y recuperación automática
│   └── logout() borra datos automáticamente
│
├── 🛡️ Protección de rutas (v1.1.0)
│   ├── ProtectedRoute (renderiza si autenticado, redirige si no)
│   └── PublicRoute (renderiza si NO autenticado, redirige si sí)
│
├── ⏰ Gestión automática de sesión
│   ├── Expiración basada en tiempo REAL (no inactividad)
│   ├── sessionStartTime (marca de inicio de sesión)
│   ├── sessionDuration configurable
│   ├── SessionValidator automático
│   └── skipInitialValidation para páginas de login
│
├── 🔄 Sincronización cross-tab
│   ├── BroadcastChannel API
│   ├── Sincronización automática de login/logout
│   └── Persistencia en localStorage
│
├── 🎯 Callbacks de ciclo de vida
│   ├── onLogging (al iniciar sesión manualmente)
│   ├── onLogout (SIEMPRE que hay logout)
│   └── onSessionInvalid (solo cuando sesión es inválida)
│
└── ⚙️ Integración con ConfigProvider
    ├── Configuración jerárquica (props → ConfigProvider → defaults)
    ├── sessionDuration configurable
    └── validationInterval configurable
```

## 📋 Props Interface

```typescript
interface AppAuthProviderProps {
  children: React.ReactNode;
  sessionDuration?: number;        // Duración de la sesión en ms (default: 8 horas)
  validationInterval?: number;     // Intervalo de validación en ms (default: 10 segundos)
  skipInitialValidation?: boolean; // Si es true, no valida la sesión al iniciar (útil para páginas de login)
  sessionDataKey?: string;         // Clave de localStorage para datos de sesión (default: 'app_session_data')
  onLogging?: () => void;          // Callback al iniciar sesión manualmente
  onLogout?: () => void;           // Callback SIEMPRE que hay logout (manual o automático)
  onSessionInvalid?: () => void;   // Callback solo cuando sesión es inválida/expirada
}

interface AppAuthContextValue {
  isAuthenticated: boolean;
  sessionData: unknown | null;     // Datos genéricos guardados con login(data)
  login: (data?: unknown) => void; // Login con datos opcionales
  logout: () => void;
}

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo: string;              // Ruta de redirección si NO autenticado
  fallback?: ReactNode;            // Componente mientras redirige
}

interface PublicRouteProps {
  children: ReactNode;
  redirectTo: string;              // Ruta de redirección si YA autenticado
  fallback?: ReactNode;            // Componente mientras redirige
}
```

## 🎯 Callbacks del Ciclo de Vida

El AppAuthProvider ofrece **3 callbacks** para gestionar eventos del ciclo de autenticación:

### **1️⃣ onLogging - Login Manual**

**Se ejecuta:** Solo cuando el usuario hace `login()` manualmente (después de autenticarse con tu backend)

```typescript
const handleLogin = () => {
  console.log("✅ Usuario inició sesión");
  // Redirigir al dashboard
  navigate('/dashboard');
  // Enviar evento de analytics
  analytics.track('user_login');
};
```

**NO se ejecuta:**
- ❌ Al restaurar sesión desde localStorage
- ❌ Al sincronizar login desde otra pestaña

### **2️⃣ onLogout - Cualquier Logout** ⚡ NUEVO

**Se ejecuta:** **SIEMPRE** que hay un logout (manual o automático)

```typescript
const handleLogout = () => {
  console.log("🔓 Logout detectado");
  // Limpiar datos locales
  localStorage.removeItem('user_data');
  localStorage.removeItem('auth_token');
  // Cerrar conexiones WebSocket
  websocket.close();
};
```

**Se ejecuta en:**
- ✅ Logout manual del usuario (botón "Cerrar Sesión")
- ✅ Sesión expiró (SessionValidator)
- ✅ No hay sesión al cargar la app
- ✅ Sesión expirada al cargar la app
- ✅ Logout sincronizado desde otra pestaña

### **3️⃣ onSessionInvalid - Solo Sesiones Inválidas**

**Se ejecuta:** Solo cuando la sesión es inválida o expiró (NO en logout manual)

```typescript
const handleSessionExpired = () => {
  console.log("❌ Sesión inválida o expiró");
  // Redirigir al login
  window.location.href = '/login';
  // Mostrar notificación
  toast.error('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
};
```

**Se ejecuta en:**
- ✅ No hay sesión al cargar la app
- ✅ Sesión expirada al cargar la app
- ✅ SessionValidator detecta expiración

**NO se ejecuta en:**
- ❌ Logout manual del usuario

### **Tabla de Comportamiento Completo**

| Acción | `onLogging` | `onLogout` | `onSessionInvalid` |
|--------|-------------|------------|-------------------|
| Usuario hace login manual | ✅ SÍ | ❌ No | ❌ No |
| Usuario hace logout manual | ❌ No | ✅ SÍ | ❌ No |
| NO hay sesión al iniciar app | ❌ No | ✅ SÍ | ✅ SÍ |
| Sesión expiró al iniciar app | ❌ No | ✅ SÍ | ✅ SÍ |
| SessionValidator detecta expiración | ❌ No | ✅ SÍ | ✅ SÍ |
| Otra pestaña hace logout | ❌ No | ✅ SÍ | ❌ No |
| Restaurar sesión válida al recargar | ❌ No | ❌ No | ❌ No |

### **Ejemplo Completo de Uso**

```typescript
import { AppAuthProvider } from 'GC-UI-COMPONENTS';

function App() {
  const handleLogin = () => {
    console.log("✅ Usuario inició sesión");
    navigate('/dashboard');
  };

  const handleLogout = () => {
    console.log("🔓 Cerrando sesión");
    // Limpiar datos locales
    localStorage.clear();
  };

  const handleSessionExpired = () => {
    console.log("❌ Sesión inválida");
    // Redirigir al login
    window.location.href = '/login';
  };

  return (
    <AppAuthProvider
      sessionDuration={8 * 60 * 60 * 1000}
      onLogging={handleLogin}              // Login manual
      onLogout={handleLogout}              // Cualquier logout
      onSessionInvalid={handleSessionExpired}  // Solo sesiones inválidas
    >
      <MyApp />
    </AppAuthProvider>
  );
}
```

## ⚡ skipInitialValidation - Cuándo y Cómo Usar

### **¿Qué hace `skipInitialValidation`?**

Por defecto, cuando montas el `AppAuthProvider`, automáticamente busca en `localStorage` si existe una sesión válida. Si la encuentra, activa `isAuthenticated = true`. 

**El problema:** En páginas de login, el usuario AÚN NO ha iniciado sesión, por lo que no existe sesión en localStorage. Esto genera un comportamiento no deseado.

### **Cuándo usar `skipInitialValidation={true}`**

✅ **USA en:**
- Páginas de login/registro donde el usuario NO está autenticado aún
- Rutas públicas donde quieres usar `login()` después de validar con tu backend
- Componentes donde llamas `login()` manualmente después de OAuth/SSO

❌ **NO USES en:**
- Páginas protegidas que requieren sesión válida
- Dashboard o rutas privadas
- Componentes que solo muestran contenido para usuarios autenticados

### **Ejemplo: Página de Login vs Página Protegida**

```typescript
import { AppAuthProvider, useAppAuth } from 'GC-UI-COMPONENTS';
import { Switch, Route } from 'wouter';

// ✅ Página de login - skipInitialValidation=true
function LoginPage() {
  const { login } = useAppAuth();
  
  const handleSuccessfulAuth = async () => {
    const response = await fetch('/api/auth/login', { /* ... */ });
    if (response.ok) {
      login(); // Activar sesión manualmente
      window.location.href = '/dashboard';
    }
  };
  
  return <LoginCard onSuccess={handleSuccessfulAuth} />;
}

// ✅ Página protegida - sin skipInitialValidation (valida automáticamente)
function DashboardPage() {
  const { isAuthenticated } = useAppAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Dashboard />;
}

// Configuración en App.tsx
function App() {
  return (
    <Switch>
      {/* Login: skipInitialValidation=true */}
      <Route path="/login">
        <AppAuthProvider skipInitialValidation={true}>
          <LoginPage />
        </AppAuthProvider>
      </Route>
      
      {/* Dashboard: validación automática */}
      <Route path="/dashboard">
        <AppAuthProvider>
          <DashboardPage />
        </AppAuthProvider>
      </Route>
    </Switch>
  );
}
```

### **Comportamiento Interno**

```typescript
// Con skipInitialValidation={false} (default)
useEffect(() => {
  const session = getSessionFromStorage();
  if (session && !isSessionExpired(session, duration)) {
    login(true); // ← Auto-login si hay sesión válida
  }
}, []);

// Con skipInitialValidation={true}
useEffect(() => {
  return; // ← No hace nada, espera que llames login() manualmente
}, []);
```

### **⚠️ IMPORTANTE: skipInitialValidation NO desactiva la validación periódica**

Muchos desarrolladores confunden estos dos conceptos:

| Característica | ¿Qué valida? | ¿Cuándo ocurre? | ¿Se afecta con skipInitialValidation? |
|----------------|--------------|-----------------|---------------------------------------|
| **Validación inicial** | Si existe sesión guardada | Al montar el componente (1 sola vez) | ✅ SÍ (se desactiva con `true`) |
| **SessionValidator** | Si la sesión expiró por tiempo | Cada X segundos mientras `isAuthenticated = true` | ❌ NO (siempre activo cuando hay sesión) |

**Ejemplo del flujo completo:**

```typescript
// PÁGINA DE LOGIN con skipInitialValidation={true}
function App() {
  return (
    <AppAuthProvider skipInitialValidation={true}>
      <LoginPage />
    </AppAuthProvider>
  );
}

// 1. Usuario carga la página
//    ✅ skipInitialValidation=true → NO busca sesión en localStorage
//    → isAuthenticated = false
//    → SessionValidator NO está activo

// 2. Usuario ingresa credenciales y llama login()
const { login } = useAppAuth();
login();
//    → isAuthenticated = true
//    → SessionValidator SE ACTIVA AUTOMÁTICAMENTE ✅
//    → Guarda sessionStartTime en localStorage

// 3. SessionValidator verifica cada 10 segundos
//    Cada 10 seg → ¿(Date.now() - sessionStartTime) > sessionDuration?
//    Si NO → Sesión válida, continúa
//    Si SÍ → logout() automáticamente

// 4. Después de 8 horas (sessionDuration)
//    → SessionValidator detecta expiración
//    → Llama logout() automáticamente
//    → isAuthenticated = false
//    → SessionValidator se DESACTIVA
```

**Resumen:**
- `skipInitialValidation={true}` → Solo salta la validación **al montar** el componente
- SessionValidator → Siempre se activa **después de login()** y valida periódicamente
- La validación periódica **NUNCA** se desactiva mientras haya sesión activa

## 🚀 Uso Básico

### **Instalación Mínima**

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

### **Uso del Hook useAppAuth**

```jsx
import { useAppAuth } from 'GC-UI-COMPONENTS';

function LoginButton() {
  const { isAuthenticated, sessionData, login, logout } = useAppAuth();
  
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

### **Componente de Autenticación Protegida con ProtectedRoute**

```jsx
import { ProtectedRoute, PublicRoute } from 'GC-UI-COMPONENTS';

// Contenido solo para usuarios autenticados
function Dashboard() {
  return (
    <ProtectedRoute redirectTo="/login" fallback={<p>Redirigiendo...</p>}>
      <DashboardContent />
    </ProtectedRoute>
  );
}

// Contenido solo para usuarios NO autenticados (login page)
function LoginPage() {
  return (
    <PublicRoute redirectTo="/dashboard" fallback={<p>Ya estás autenticado</p>}>
      <LoginForm />
    </PublicRoute>
  );
}
```

## 🎯 Casos de Uso Avanzados

### **Caso 1: Con Callbacks de Ciclo de Vida**

```jsx
import { AppAuthProvider } from 'GC-UI-COMPONENTS';
import { useNavigate } from 'wouter';

function App() {
  const [, navigate] = useNavigate();
  
  const handleLogin = () => {
    console.log('Usuario ha iniciado sesión');
    // Redirigir al dashboard
    navigate('/dashboard');
  };
  
  const handleSessionExpired = () => {
    console.log('Sesión expirada');
    alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    // Redirigir al login
    navigate('/login');
  };
  
  return (
    <AppAuthProvider 
      onLogging={handleLogin}
      onSessionInvalid={handleSessionExpired}
    >
      <MyApp />
    </AppAuthProvider>
  );
}
```

### **Caso 2: Duración Personalizada de Sesión**

```jsx
import { AppAuthProvider } from 'GC-UI-COMPONENTS';

function App() {
  // Sesión de 2 horas en lugar de 8 horas por defecto
  const TWO_HOURS = 2 * 60 * 60 * 1000;
  
  return (
    <AppAuthProvider sessionDuration={TWO_HOURS}>
      <MyApp />
    </AppAuthProvider>
  );
}
```

### **Caso 3: Validación Más Frecuente**

```jsx
import { AppAuthProvider } from 'GC-UI-COMPONENTS';

function App() {
  // Validar cada 30 segundos en lugar de 10 segundos
  const THIRTY_SECONDS = 30 * 1000;
  
  return (
    <AppAuthProvider validationInterval={THIRTY_SECONDS}>
      <MyApp />
    </AppAuthProvider>
  );
}
```

### **Caso 3.5: Página de Login (Sin Validación Inicial) ⚡ NUEVO**

> **⚡ USE CASE:** Útil cuando tienes una página de login donde el usuario AÚN NO está autenticado y quieres usar `login()` después de autenticar con tu backend.

```jsx
import { AppAuthProvider, useAppAuth } from 'GC-UI-COMPONENTS';
import { Switch, Route } from 'wouter';

function LoginPage() {
  const { login } = useAppAuth();
  
  const handleSuccessfulAuth = async () => {
    // Tu lógica de autenticación con el backend
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      // Llamar login() para activar la sesión en el provider
      login();
    }
  };
  
  return <LoginCard onSuccess={handleSuccessfulAuth} />;
}

function App() {
  return (
    <Switch>
      {/* Página de login con skipInitialValidation=true */}
      <Route path="/login">
        <AppAuthProvider skipInitialValidation={true}>
          <LoginPage />
        </AppAuthProvider>
      </Route>
      
      {/* Otras páginas con validación normal */}
      <Route path="/dashboard">
        <AppAuthProvider>
          <Dashboard />
        </AppAuthProvider>
      </Route>
    </Switch>
  );
}
```

**¿Qué hace `skipInitialValidation`?**
- ✅ **true**: No valida sesión al montar el componente (útil para páginas de login)
- ✅ **false/undefined**: Valida sesión automáticamente (comportamiento por defecto)
- ✅ Permite llamar `login()` manualmente después de autenticarte con tu backend

### **Caso 4: Con ConfigProvider (Configuración Jerárquica) - RECOMENDADO para Apps**

> **IMPORTANTE PARA IA:** Este es el patrón recomendado a nivel de aplicación. El `ConfigProvider` debe envolver al `AppAuthProvider` para proporcionar configuración centralizada.

**Jerarquía de Configuración:**
```
Props directos > ConfigProvider > Defaults de la librería
```

**Paso 1: Crear archivo de configuración de la aplicación**

```typescript
// src/enviorments/enviroment.ts
export const SESSION_CONFIG = {
  SESSION_DURATION: 4 * 60 * 60 * 1000,  // 4 horas
  VALIDATION_INTERVAL: 15000              // 15 segundos
};

export const environment = {
  SESSION_CONFIG,
  // ... otras configuraciones
};

export const APP_CONFIG = environment;
```

**Paso 2: Implementar en App.tsx**

```jsx
// App.tsx
import { ConfigProvider, AppAuthProvider } from 'GC-UI-COMPONENTS';
import { APP_CONFIG } from './enviorments/enviroment';

function App() {
  return (
    <ConfigProvider config={APP_CONFIG}>
      <AppAuthProvider>
        {/* AppAuthProvider toma SESSION_CONFIG del ConfigProvider automáticamente */}
        <MyApp />
      </AppAuthProvider>
    </ConfigProvider>
  );
}
```

**¿Por qué usar ConfigProvider?**
- ✅ Centraliza toda la configuración de la aplicación
- ✅ Permite override desde variables de entorno
- ✅ Evita prop drilling (pasar props manualmente)
- ✅ Facilita cambios de configuración sin modificar componentes

### **Caso 5: Login con Integración de API**

```jsx
import { useAppAuth } from 'GC-UI-COMPONENTS';
import { useState } from 'react';

function LoginForm() {
  const { login } = useAppAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Aquí va tu llamada a la API de autenticación
      // const response = await fetch('/api/login', {...})
      
      // 2. Validar la respuesta del servidor
      // if (response.ok) {
      //   const data = await response.json();
      //   // Guardar token o datos según tu implementación
      // }
      
      // 3. Solo después de validación exitosa, activar la sesión
      login();
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}
```

> **Nota:** El `AppAuthProvider` solo maneja el estado de sesión (activa/inactiva). La autenticación con tu backend es responsabilidad de tu aplicación.

### **Caso 6: Logout con Limpieza de Datos**

```jsx
import { useAppAuth } from 'GC-UI-COMPONENTS';

function LogoutButton() {
  const { logout } = useAppAuth();
  
  const handleLogout = () => {
    // Limpiar datos locales
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Cerrar sesión en AppAuthProvider
    logout();
    
    // Opcional: Llamar a la API para invalidar el token
    fetch('/api/logout', { method: 'POST' });
  };
  
  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
}
```

### **Caso 7: Configuración Completa con Todos los Props**

```jsx
import { AppAuthProvider } from 'GC-UI-COMPONENTS';

function App() {
  const FOUR_HOURS = 4 * 60 * 60 * 1000;
  const TWENTY_SECONDS = 20 * 1000;
  
  const handleLogin = () => {
    console.log('Sesión iniciada');
    // Enviar evento de analytics
    analytics.track('user_login');
  };
  
  const handleSessionExpired = () => {
    console.log('Sesión expirada');
    // Limpiar datos sensibles
    localStorage.clear();
    // Mostrar notificación
    showNotification('Tu sesión ha expirado');
  };
  
  return (
    <AppAuthProvider
      sessionDuration={FOUR_HOURS}
      validationInterval={TWENTY_SECONDS}
      onLogging={handleLogin}
      onSessionInvalid={handleSessionExpired}
    >
      <MyApp />
    </AppAuthProvider>
  );
}
```

## ⚙️ Configuración

### **Orden de Precedencia de Configuración**

```
Props directos del AppAuthProvider
    ↓ (si no se proporciona)
Configuración del ConfigProvider
    ↓ (si no se proporciona)
Valores por defecto del environment
```

### **Valores por Defecto**

Configurados en `client/src/lib/ui-library/enviorments/enviroment.ts`:

```typescript
export const SESSION_CONFIG = {
  SESSION_DURATION: 8 * 60 * 60 * 1000,  // 8 horas en milisegundos
  VALIDATION_INTERVAL: 10000,            // 10 segundos en milisegundos
};
```

### **Configuración por Variables de Entorno**

Puedes sobrescribir los valores por defecto usando variables de entorno:

```bash
# En .env
VITE_SESSION_DURATION=14400000      # 4 horas
VITE_VALIDATION_INTERVAL=5000       # 5 segundos
```

## 🔄 Sincronización Cross-Tab

### **Cómo Funciona**

El AppAuthProvider usa BroadcastChannel API para sincronizar el estado de autenticación entre múltiples pestañas/ventanas:

```
Pestaña 1                    Pestaña 2
    |                            |
    | login() ────────────────> |
    |                            | → Recibe evento
    |                            | → Actualiza estado
    |                            | → isAuthenticated = true
    |                            |
    | logout() ───────────────> |
    |                            | → Recibe evento
    |                            | → Actualiza estado
    |                            | → isAuthenticated = false
```

### **Ejemplo Práctico**

```jsx
// Si el usuario hace login en la Pestaña 1
// Automáticamente la Pestaña 2, 3, etc. también se actualizan

function Dashboard() {
  const { isAuthenticated } = useAppAuth();
  
  // Este componente se actualiza automáticamente
  // cuando cambia el estado en CUALQUIER pestaña
  return (
    <div>
      {isAuthenticated ? 'Sesión activa' : 'Sin sesión'}
    </div>
  );
}
```

## ⏰ Expiración de Sesión

### **Importante: Tiempo Real vs Inactividad**

El AppAuthProvider usa **tiempo real** para la expiración, NO tiempo de inactividad:

```typescript
// ✅ Correcto: Expira después de 8 horas desde el login
sessionStartTime: Date.now()  // Guardado al hacer login
// La sesión expira cuando: Date.now() - sessionStartTime > sessionDuration

// ❌ Incorrecto: No usa lastActivityTime
// El provider NO reinicia el temporizador con la actividad del usuario
```

### **Flujo de Expiración**

```
1. Usuario hace login()
   └─> sessionStartTime = Date.now()

2. SessionValidator verifica cada 10 segundos
   └─> Si (Date.now() - sessionStartTime) > sessionDuration
       └─> Llama a onSessionInvalid()
       └─> Ejecuta logout()
       └─> isAuthenticated = false

3. Usuario es redirigido a login
```

### **Extender una Sesión**

Para extender la sesión, el usuario debe hacer logout y login nuevamente:

```jsx
function ExtendSessionButton() {
  const { logout, login } = useAppAuth();
  
  const extendSession = () => {
    // Cerrar sesión y volver a iniciar
    logout();
    setTimeout(() => login(), 100);
  };
  
  return <button onClick={extendSession}>Extender Sesión</button>;
}
```

## 🔍 Cómo Funciona la Validación de Sesión

### **¿Qué Valida el AppAuthProvider?**

El AppAuthProvider **NO** valida:
- ❌ Tokens JWT contra un backend
- ❌ Credenciales de usuario
- ❌ Sesiones en base de datos
- ❌ Cookies de autenticación

El AppAuthProvider **SÍ** valida:
- ✅ Si existe datos de sesión en `localStorage['app_session_data']`
- ✅ Si el tiempo transcurrido desde `sessionStartTime` es menor a `sessionDuration`

### **Flujo de Validación**

```
1. Usuario llama login()
   ↓
2. Se guarda en localStorage:
   {
     sessionId: "session-123",
     sessionStartTime: Date.now(), ← Marca de tiempo
     lastActivityTime: Date.now()
   }
   ↓
3. Cada X segundos (validationInterval), SessionValidator verifica:
   ↓
4. ¿Existe localStorage['app_session_data']?
   └─ NO → logout()
   └─ SÍ → Continúa
   ↓
5. ¿(Date.now() - sessionStartTime) > sessionDuration?
   └─ SÍ → logout() (expiró)
   └─ NO → Sesión válida
```

### **Importante: Es Validación Local**

El AppAuthProvider solo mantiene un **estado de sesión temporal en el cliente**. Para autenticación real:

```typescript
// 1. Tu backend valida credenciales
const response = await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});

if (response.ok) {
  const { token } = await response.json();
  
  // 2. Guardas el token en localStorage
  localStorage.setItem('auth_token', token);
  
  // 3. Activas la sesión en AppAuthProvider
  login(); // ← Solo activa el estado local
}
```

## 🗄️ Persistencia de Sesión

### **localStorage Automático**

El AppAuthProvider guarda automáticamente la sesión en localStorage:

```typescript
// Estructura guardada en localStorage['app_session_data']
{
  sessionId: 'session-1234567890-abc123',
  sessionStartTime: 1633024800000,  // Timestamp de login
  lastActivityTime: 1633024800000    // Timestamp de última actividad
}
```

**⚠️ Nota:** Este es un dato separado de tu token de autenticación. El AppAuthProvider NO accede a tu token.

### **Restauración al Recargar Página**

```jsx
// Al recargar la página, el AppAuthProvider:
// 1. Lee la sesión de sessionStorage
// 2. Verifica si sigue siendo válida
// 3. Si es válida: restaura isAuthenticated = true
// 4. Si expiró: ejecuta logout()

function App() {
  return (
    <AppAuthProvider>
      {/* La sesión se restaura automáticamente */}
      <MyApp />
    </AppAuthProvider>
  );
}
```

## 🚨 Errores Comunes y Troubleshooting

### **Error: "useAppAuth must be used within AppAuthProvider"**

```jsx
// ❌ Incorrecto - Hook usado fuera del provider
function App() {
  const { login } = useAppAuth(); // Error!
  return <button onClick={login}>Login</button>;
}

// ✅ Correcto - Hook usado dentro del provider
function App() {
  return (
    <AppAuthProvider>
      <LoginButton /> {/* Aquí sí puedes usar useAppAuth */}
    </AppAuthProvider>
  );
}
```

### **Callbacks se ejecutan múltiples veces**

```jsx
// ❌ Incorrecto - Callback inline causa re-renders
<AppAuthProvider onLogging={() => console.log('Login')}>
  <App />
</AppAuthProvider>

// ✅ Correcto - Usar useCallback o función estable
function App() {
  const handleLogin = useCallback(() => {
    console.log('Login');
  }, []);
  
  return (
    <AppAuthProvider onLogging={handleLogin}>
      <MyApp />
    </AppAuthProvider>
  );
}
```

### **Sesión no expira**

```jsx
// Verifica que sessionDuration sea un número válido en milisegundos
// ❌ Incorrecto
<AppAuthProvider sessionDuration={8}> {/* Solo 8 ms! */}

// ✅ Correcto
<AppAuthProvider sessionDuration={8 * 60 * 60 * 1000}> {/* 8 horas */}
```

### **Problema: Página de login muestra isAuthenticated=true**

Si tu página de login muestra que el usuario está autenticado al cargar, significa que hay una sesión guardada y el AppAuthProvider la está restaurando automáticamente.

```jsx
// ❌ Problema: Login page restaura sesión automáticamente
function App() {
  return (
    <AppAuthProvider>  {/* Sin skipInitialValidation */}
      <LoginPage />    {/* isAuthenticated puede ser true! */}
    </AppAuthProvider>
  );
}

// ✅ Solución: Usar skipInitialValidation en páginas de login
function App() {
  return (
    <AppAuthProvider skipInitialValidation={true}>
      <LoginPage />  {/* isAuthenticated siempre false al iniciar */}
    </AppAuthProvider>
  );
}
```

**¿Por qué pasa esto?**
- Al montar el provider, revisa `localStorage['app_session_data']`
- Si encuentra una sesión válida, activa `isAuthenticated = true` automáticamente
- Esto es el comportamiento deseado en páginas protegidas, pero no en login

**Solución:** Usa `skipInitialValidation={true}` para que NO valide automáticamente.

### **Problema: skipInitialValidation no funciona con rutas protegidas**

Si usas `skipInitialValidation={true}` en una página protegida, los usuarios no podrán acceder aunque tengan sesión válida.

```jsx
// ❌ Incorrecto: skipInitialValidation en página protegida
<Route path="/dashboard">
  <AppAuthProvider skipInitialValidation={true}>
    <Dashboard />  {/* Usuario siempre será redirigido a login */}
  </AppAuthProvider>
</Route>

// ✅ Correcto: Sin skipInitialValidation en páginas protegidas
<Route path="/dashboard">
  <AppAuthProvider>
    <Dashboard />  {/* Restaura sesión automáticamente */}
  </AppAuthProvider>
</Route>
```

**Regla simple:**
- `skipInitialValidation={true}` → Solo para login/registro
- Sin `skipInitialValidation` → Todas las demás páginas

### **Problema: Login manual no funciona**

Si llamas `login()` pero `isAuthenticated` sigue siendo `false`, verifica:

```jsx
// ❌ Problema común: Llamar login fuera del provider
function LoginPage() {
  const handleAuth = async () => {
    const response = await fetch('/api/login', {...});
    if (response.ok) {
      login(); // ← Error: login no está definido
    }
  };
  
  return <LoginCard onSuccess={handleAuth} />;
}

// ✅ Solución: Usar useAppAuth dentro del provider
function LoginPage() {
  const { login } = useAppAuth(); // ← Obtener login del hook
  
  const handleAuth = async () => {
    const response = await fetch('/api/login', {...});
    if (response.ok) {
      login(); // ← Ahora sí funciona
    }
  };
  
  return <LoginCard onSuccess={handleAuth} />;
}

// En App.tsx
function App() {
  return (
    <AppAuthProvider skipInitialValidation={true}>
      <LoginPage />  {/* Ahora LoginPage puede usar useAppAuth */}
    </AppAuthProvider>
  );
}
```

## 🔗 API Reference

### **AppAuthProvider Props**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido de la aplicación |
| `sessionDuration` | `number` | `8 * 60 * 60 * 1000` | Duración de sesión en ms (8 horas) |
| `validationInterval` | `number` | `10000` | Intervalo de validación en ms (10 seg) |
| `skipInitialValidation` | `boolean` | `false` | Si es true, no valida la sesión al montar (útil para login) |
| `onLogging` | `() => void` | `undefined` | Callback al iniciar sesión manualmente |
| `onLogout` | `() => void` | `undefined` | Callback SIEMPRE que hay logout (manual o automático) |
| `onSessionInvalid` | `() => void` | `undefined` | Callback solo cuando sesión es inválida/expirada |

### **useAppAuth Hook**

```typescript
interface AppAuthContextValue {
  isAuthenticated: boolean;  // Estado de autenticación
  login: () => void;         // Iniciar sesión
  logout: () => void;        // Cerrar sesión
}
```

### **Funciones de Login/Logout**

```typescript
// login()
// - Genera un nuevo sessionId único
// - Guarda sessionStartTime en sessionStorage
// - Establece isAuthenticated = true
// - Ejecuta callback onLogging (si existe)
// - Sincroniza el estado con otras pestañas

// logout()
// - Limpia sessionStorage
// - Establece isAuthenticated = false
// - Ejecuta callback onSessionInvalid (si existe)
// - Sincroniza el estado con otras pestañas
```

## 🎯 Mejores Prácticas

1. **Usar skipInitialValidation correctamente**: Solo en páginas de login/registro, nunca en rutas protegidas
2. **Usar ConfigProvider para configuración centralizada**: Permite cambiar configuración sin modificar props
3. **Implementar callbacks para UX mejorada**: Notificar al usuario sobre cambios de sesión
4. **Limpiar datos sensibles en logout**: Usar el callback onSessionInvalid para limpiar localStorage
5. **Validar duración de sesión**: Asegúrate de pasar milisegundos correctamente
6. **Combinar con autenticación real**: AppAuthProvider solo maneja el estado, no la autenticación
7. **Usar useCallback para callbacks**: Evita re-renders innecesarios
8. **Probar sincronización cross-tab**: Abre múltiples pestañas para verificar
9. **Entender la validación periódica**: SessionValidator siempre se activa después de login(), independientemente de skipInitialValidation

## 📊 Ejemplos de Duración de Sesión

```typescript
// 30 minutos
const THIRTY_MINUTES = 30 * 60 * 1000;

// 1 hora
const ONE_HOUR = 60 * 60 * 1000;

// 4 horas
const FOUR_HOURS = 4 * 60 * 60 * 1000;

// 8 horas (default)
const EIGHT_HOURS = 8 * 60 * 60 * 1000;

// 24 horas
const ONE_DAY = 24 * 60 * 60 * 1000;
```

## 🔗 Enlaces Relacionados

- **../AppEnviromentProvider/README.md**: Sistema de configuración jerárquica
- **../../components/SessionValidator/**: Componente interno de validación de sesión
- **../../enviorments/enviroment.ts**: Configuración por defecto de sesión

---

**Version: 1.0.9** | **Última actualización: Noviembre 2025**

## 📝 Changelog

### v1.0.9 (Noviembre 2025)
- ✨ **NUEVO:** Agregado prop `onLogout` que se ejecuta SIEMPRE que hay logout (manual o automático)
- 🔧 Modificado `onSessionInvalid` para ejecutarse SOLO cuando la sesión es inválida (no en logout manual)
- 📚 Documentación completa sobre los 3 callbacks del ciclo de vida
- 📊 Tabla de comportamiento de callbacks para cada escenario
- 🐛 Corregido comportamiento cuando NO hay sesión al cargar app (ahora ejecuta callbacks apropiados)

### v1.0.8 (Noviembre 2025)
- ✨ Agregado prop `skipInitialValidation` para páginas de login
- 📚 Documentación extendida sobre validación inicial vs periódica
- 🐛 Aclarado que SessionValidator siempre se activa después de login()
- 📖 Agregados ejemplos de troubleshooting para `skipInitialValidation`

### v1.0.0 (Octubre 2025)
- 🎉 Versión inicial del AppAuthProvider
- ✅ Gestión de estado de autenticación
- ✅ Validación automática basada en tiempo real
- ✅ Sincronización cross-tab con BroadcastChannel
- ✅ Integración con ConfigProvider
