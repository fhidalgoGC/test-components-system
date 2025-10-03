# SessionValidator - AI Implementation Guide
**Version: 1.0.0**

## Overview

`SessionValidator` is an invisible wrapper component that monitors and validates user session state in the background. It doesn't render any visible UI elements but continuously checks session validity, handles expiration, and provides callbacks for session-related events.

## Key Features

- **Invisible Monitoring**: Renders children while validating session in background
- **localStorage Integration**: Persists and validates session data across tabs
- **Smart Activation**: Auto-activates when session exists in storage (multi-tab support)
- **Configurable Intervals**: Customizable validation frequency and session duration
- **Callback System**: Provides hooks for session expired and invalid events
- **No Redux Required**: Uses localStorage and React hooks for state management
- **Multi-tab Sync**: Detects existing sessions when opening new tabs

## Installation & Imports

```typescript
import SessionValidator from '@/lib/ui-library/components/SessionValidator';
import { useSessionValidator } from '@/lib/ui-library/components/SessionValidator';
import type { 
  SessionValidatorProps, 
  SessionData 
} from '@/lib/ui-library/components/SessionValidator';
```

## Complete Props Interface

```typescript
interface SessionValidatorProps {
  children: ReactNode;
  
  // Control activation from parent component
  enabled?: boolean; // Default: false
  
  // Session configuration
  sessionDuration?: number; // Default: 3600000 (1 hour in ms)
  checkInterval?: number; // Default: 60000 (1 minute in ms)
  
  // Auto-activation when session exists in storage
  autoActivateIfSession?: boolean; // Default: true
  
  // Event callbacks
  onSessionExpired?: () => void; // Called when session duration exceeded
  onSessionInvalid?: () => void; // Called when session data missing/corrupted
  onSessionValidated?: (sessionData: SessionData) => void; // Called on validation success
}

interface SessionData {
  sessionId: string;
  sessionStartTime: number;
  lastActivityTime: number;
}
```

## Basic Implementation

### Scenario 1: Login Flow (Controlled Activation)

```tsx
import { useState } from 'react';
import SessionValidator from '@/lib/ui-library/components/SessionValidator';
import { saveSessionToStorage } from '@/lib/ui-library/components/SessionValidator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (userId: string) => {
    // After successful login, save session
    const sessionData = {
      sessionId: userId,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    };
    saveSessionToStorage(sessionData);
    
    // Activate SessionValidator
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear session storage
    localStorage.removeItem('app_session_data');
  };

  return (
    <SessionValidator 
      enabled={isAuthenticated}
      sessionDuration={3600000} // 1 hour
      onSessionExpired={handleLogout}
      onSessionInvalid={handleLogout}
    >
      <AppRoutes />
      <Toaster />
    </SessionValidator>
  );
}
```

### Scenario 2: Multi-tab Support (Auto-activation)

```tsx
import SessionValidator from '@/lib/ui-library/components/SessionValidator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('app_session_data');
  };

  return (
    <SessionValidator 
      enabled={isAuthenticated}
      autoActivateIfSession={true} // Detects session in new tabs
      sessionDuration={3600000}
      onSessionExpired={handleLogout}
      onSessionInvalid={handleLogout}
    >
      <AppRoutes />
    </SessionValidator>
  );
}
```

## Advanced Usage

### Custom Session Duration with Callbacks

```tsx
import SessionValidator from '@/lib/ui-library/components/SessionValidator';
import type { SessionData } from '@/lib/ui-library/components/SessionValidator';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSessionExpired = () => {
    console.log('Session expired due to timeout');
    // Redirect to login
    window.location.href = '/login';
  };

  const handleSessionInvalid = () => {
    console.log('Session invalid or missing');
    // Redirect to login
    window.location.href = '/login';
  };

  const handleSessionValidated = (sessionData: SessionData) => {
    console.log('Session validated:', sessionData);
    // Update analytics or state
  };

  return (
    <SessionValidator 
      enabled={isAuthenticated}
      sessionDuration={7200000} // 2 hours
      checkInterval={30000} // Check every 30 seconds
      autoActivateIfSession={true}
      onSessionExpired={handleSessionExpired}
      onSessionInvalid={handleSessionInvalid}
      onSessionValidated={handleSessionValidated}
    >
      <Layout>
        <Sidebar />
        <MainContent />
      </Layout>
    </SessionValidator>
  );
}
```

### Using the Hook Directly

```tsx
import { useSessionValidator } from '@/lib/ui-library/components/SessionValidator';

function CustomSessionManager({ children }) {
  const { 
    isActive, 
    sessionData, 
    isValidating,
    initializeSession,
    clearSession 
  } = useSessionValidator({
    enabled: true,
    sessionDuration: 3600000,
    onSessionExpired: () => console.log('Expired'),
    onSessionInvalid: () => console.log('Invalid'),
  });

  const handleLogin = (userId: string) => {
    initializeSession(userId);
  };

  const handleLogout = () => {
    clearSession();
  };

  return (
    <div>
      <div>Session Active: {isActive ? 'Yes' : 'No'}</div>
      <div>Validating: {isValidating ? 'Yes' : 'No'}</div>
      <button onClick={() => handleLogin('user-123')}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </div>
  );
}
```

## Storage Utilities

```typescript
import {
  saveSessionToStorage,
  getSessionFromStorage,
  clearSessionFromStorage,
  updateLastActivity,
  hasValidSession,
} from '@/lib/ui-library/components/SessionValidator';

// Save session manually
saveSessionToStorage({
  sessionId: 'user-123',
  sessionStartTime: Date.now(),
  lastActivityTime: Date.now(),
});

// Get session data
const session = getSessionFromStorage();

// Check if valid session exists
const isValid = hasValidSession();

// Update activity timestamp
updateLastActivity();

// Clear session
clearSessionFromStorage();
```

## Activation Logic

### Decision Flow:

1. **Parent controls via `enabled` prop**:
   - `enabled={true}` → Validation ACTIVE
   - `enabled={false}` → Check auto-activation

2. **Auto-activation via storage**:
   - If `autoActivateIfSession={true}` AND session exists in storage → Validation ACTIVE
   - Otherwise → Validation INACTIVE

3. **Final state**:
   ```typescript
   isActive = enabled || (autoActivateIfSession && hasValidSession())
   ```

### Use Cases:

| Scenario | `enabled` | Storage | Auto-activate | Result |
|----------|-----------|---------|---------------|--------|
| Login page | `false` | Empty | `true` | ❌ Inactive |
| After login | `true` | Has session | `true` | ✅ Active |
| New tab | `false` | Has session | `true` | ✅ Active |
| Logout | `false` | Empty | `true` | ❌ Inactive |

## Troubleshooting

### Issue: Session expires immediately after login

**Cause**: `sessionDuration` is too short or not set.

**Solution**: 
```tsx
<SessionValidator sessionDuration={3600000} /> // 1 hour
```

### Issue: Logout triggered on page refresh

**Cause**: `enabled` is not properly managed in parent state.

**Solution**: Persist authentication state or use `autoActivateIfSession={true}`.

### Issue: Multiple tabs don't sync

**Cause**: `autoActivateIfSession={false}` or session not saved to storage.

**Solution**:
```tsx
<SessionValidator autoActivateIfSession={true} />
```

### Issue: onSessionExpired called multiple times

**Cause**: Internal flag prevents this - if happening, check for multiple SessionValidator instances.

**Solution**: Only use one SessionValidator per app.

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | Components to wrap |
| `enabled` | `boolean` | `false` | Control activation from parent |
| `sessionDuration` | `number` | `3600000` | Session duration in milliseconds |
| `checkInterval` | `number` | `60000` | Validation check frequency in ms |
| `autoActivateIfSession` | `boolean` | `true` | Auto-activate if storage has session |
| `onSessionExpired` | `function` | `undefined` | Callback when session expires |
| `onSessionInvalid` | `function` | `undefined` | Callback when session invalid |
| `onSessionValidated` | `function` | `undefined` | Callback on successful validation |

### Hook Return Values

```typescript
{
  isActive: boolean;              // Is validation active
  sessionData: SessionData | null; // Current session data
  isValidating: boolean;           // Is currently validating
  initializeSession: (id: string) => void; // Initialize new session
  clearSession: () => void;        // Clear session data
}
```

### Storage Functions

- `saveSessionToStorage(data: SessionData): void`
- `getSessionFromStorage(): SessionData | null`
- `clearSessionFromStorage(): void`
- `updateLastActivity(): void`
- `hasValidSession(): boolean`
- `isSessionExpired(data: SessionData, duration: number): boolean`

## Best Practices

1. **Single Instance**: Use only one `SessionValidator` per application
2. **Centralized Logout**: Use same logout function for all callbacks
3. **Persist Auth State**: Manage `enabled` prop with persistent state
4. **Reasonable Intervals**: Don't check too frequently (minimum 10 seconds)
5. **Handle All Callbacks**: Always provide `onSessionExpired` and `onSessionInvalid`
6. **Clear Storage on Logout**: Always clear session data when logging out

## Integration with Authentication Systems

### With React Context

```tsx
import { createContext, useContext, useState } from 'react';
import SessionValidator from '@/lib/ui-library/components/SessionValidator';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    saveSessionToStorage({
      sessionId: userData.id,
      sessionStartTime: Date.now(),
      lastActivityTime: Date.now(),
    });
  };

  const logout = () => {
    setUser(null);
    clearSessionFromStorage();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <SessionValidator 
        enabled={!!user}
        onSessionExpired={logout}
        onSessionInvalid={logout}
      >
        {children}
      </SessionValidator>
    </AuthContext.Provider>
  );
}
```

---

**Version: 1.0.0** | **Last Updated: October 2025**
