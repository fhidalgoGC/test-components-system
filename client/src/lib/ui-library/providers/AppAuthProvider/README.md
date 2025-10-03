# AppAuthProvider - Provider de Autenticación y Gestión de Sesiones

**Version: 1.0.0**

## 📖 Descripción

`AppAuthProvider` es el proveedor de autenticación y gestión de sesiones para aplicaciones que usan GC-UI-COMPONENTS. Controla el estado de autenticación global, la expiración automática de sesiones basada en tiempo real, y sincroniza el estado de la sesión entre múltiples pestañas usando BroadcastChannel API.

## 🏗️ Estructura Modular

```
AppAuthProvider/
├── views/
│   └── AppAuthProvider.view.tsx  # AppAuthProvider component
├── types/
│   └── AppAuthProvider.types.ts  # TypeScript types
├── index.hook.ts                 # Custom hook (useAppAuth)
└── README.md                     # This documentation
```

## 🏗️ Arquitectura

### **Características Principales**

```
AppAuthProvider
├── 🔐 Control de autenticación global
│   ├── Estado isAuthenticated
│   ├── Función login()
│   └── Función logout()
│
├── ⏰ Gestión automática de sesión
│   ├── Expiración basada en tiempo REAL (no inactividad)
│   ├── sessionStartTime (marca de inicio de sesión)
│   ├── sessionDuration configurable
│   └── SessionValidator automático
│
├── 🔄 Sincronización cross-tab
│   ├── BroadcastChannel API
│   ├── Sincronización automática de login/logout
│   └── Persistencia en sessionStorage
│
├── 🎯 Callbacks de ciclo de vida
│   ├── onLogging (al iniciar sesión)
│   └── onSessionInvalid (al expirar sesión)
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
  onLogging?: () => void;          // Callback al iniciar sesión
  onSessionInvalid?: () => void;   // Callback al expirar sesión
}

interface AppAuthContextValue {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
```

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
  const { isAuthenticated, login, logout } = useAppAuth();
  
  if (isAuthenticated) {
    return <button onClick={logout}>Cerrar Sesión</button>;
  }
  
  return <button onClick={login}>Iniciar Sesión</button>;
}
```

### **Componente de Autenticación Protegida**

```jsx
import { useAppAuth } from 'GC-UI-COMPONENTS';

function ProtectedContent() {
  const { isAuthenticated } = useAppAuth();
  
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  
  return <Dashboard />;
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

## 🗄️ Persistencia de Sesión

### **SessionStorage Automático**

El AppAuthProvider guarda automáticamente la sesión en sessionStorage:

```typescript
// Estructura guardada en sessionStorage
{
  sessionId: 'session-1234567890-abc123',
  sessionStartTime: 1633024800000,
  lastActivityTime: 1633024800000
}
```

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

## 🚨 Errores Comunes

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

## 🔗 API Reference

### **AppAuthProvider Props**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Contenido de la aplicación |
| `sessionDuration` | `number` | `8 * 60 * 60 * 1000` | Duración de sesión en ms (8 horas) |
| `validationInterval` | `number` | `10000` | Intervalo de validación en ms (10 seg) |
| `onLogging` | `() => void` | `undefined` | Callback al iniciar sesión |
| `onSessionInvalid` | `() => void` | `undefined` | Callback al expirar sesión |

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

1. **Usar ConfigProvider para configuración centralizada**: Permite cambiar configuración sin modificar props
2. **Implementar callbacks para UX mejorada**: Notificar al usuario sobre cambios de sesión
3. **Limpiar datos sensibles en logout**: Usar el callback onSessionInvalid para limpiar localStorage
4. **Validar duración de sesión**: Asegúrate de pasar milisegundos correctamente
5. **Combinar con autenticación real**: AppAuthProvider solo maneja el estado, no la autenticación
6. **Usar useCallback para callbacks**: Evita re-renders innecesarios
7. **Probar sincronización cross-tab**: Abre múltiples pestañas para verificar

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

**Version: 1.0.0** | **Última actualización: Octubre 2025**
