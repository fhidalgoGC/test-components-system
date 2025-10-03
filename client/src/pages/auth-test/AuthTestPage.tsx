import { useAppAuth } from '@/lib/ui-library/providers/AppAuthProvider';
import { getSessionFromStorage, clearSessionFromStorage } from '@/lib/ui-library/components/SessionValidator/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export function AuthTestPage() {
  const { isAuthenticated, login, logout } = useAppAuth();
  const [storageData, setStorageData] = useState<any>(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const data = getSessionFromStorage();
    setStorageData(data);
  }, [updateTrigger, isAuthenticated]);

  const handleLogin = () => {
    login();
    setUpdateTrigger(prev => prev + 1);
  };

  const handleLogout = () => {
    logout();
    setUpdateTrigger(prev => prev + 1);
  };

  const handleClearStorage = () => {
    clearSessionFromStorage();
    setUpdateTrigger(prev => prev + 1);
    alert('Storage limpiado manualmente');
  };

  const handleRefresh = () => {
    setUpdateTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>AppAuthProvider Test Page</CardTitle>
            <CardDescription>
              Prueba el comportamiento del SessionValidator y AppAuthProvider
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Estado de autenticación:</span>
                <Badge variant={isAuthenticated ? "default" : "secondary"} data-testid="badge-auth-status">
                  {isAuthenticated ? "✓ Autenticado" : "✗ No autenticado"}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleLogin} 
                  disabled={isAuthenticated}
                  data-testid="button-login"
                >
                  Login
                </Button>
                <Button 
                  onClick={handleLogout} 
                  variant="destructive"
                  disabled={!isAuthenticated}
                  data-testid="button-logout"
                >
                  Logout
                </Button>
                <Button 
                  onClick={handleClearStorage} 
                  variant="outline"
                  data-testid="button-clear-storage"
                >
                  Borrar Storage
                </Button>
                <Button 
                  onClick={handleRefresh} 
                  variant="ghost"
                  data-testid="button-refresh"
                >
                  Actualizar
                </Button>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Datos en localStorage:</h3>
              {storageData ? (
                <div className="bg-muted p-4 rounded-md space-y-2 font-mono text-sm">
                  <div data-testid="text-session-id">
                    <span className="text-muted-foreground">sessionId:</span> {storageData.sessionId}
                  </div>
                  <div data-testid="text-session-start">
                    <span className="text-muted-foreground">sessionStartTime:</span>{' '}
                    {new Date(storageData.sessionStartTime).toLocaleString()}
                  </div>
                  <div data-testid="text-last-activity">
                    <span className="text-muted-foreground">lastActivityTime:</span>{' '}
                    {new Date(storageData.lastActivityTime).toLocaleString()}
                  </div>
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-md text-muted-foreground" data-testid="text-no-session">
                  No hay sesión en storage
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Instrucciones de prueba:</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Presiona "Login" para iniciar sesión (genera sessionId random)</li>
                <li>Presiona "Logout" para cerrar sesión manualmente</li>
                <li>Presiona "Borrar Storage" para limpiar el storage sin hacer logout</li>
                <li>Abre esta página en dos pestañas para probar comportamiento multi-tab</li>
                <li>Si borras el storage, el SessionValidator detectará la sesión inválida y llamará logout automáticamente</li>
              </ol>
            </div>

            <div className="border-t pt-4 bg-amber-50 dark:bg-amber-950 p-4 rounded-md">
              <h3 className="font-semibold mb-2 text-amber-900 dark:text-amber-100">
                💡 Prueba de múltiples pestañas:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-amber-800 dark:text-amber-200">
                <li>Abre esta página en 2 pestañas</li>
                <li>Haz login en la pestaña 1</li>
                <li>Recarga la pestaña 2 - debería detectar la sesión automáticamente</li>
                <li>Borra el storage en la pestaña 1</li>
                <li>Espera ~1 minuto - ambas pestañas deberían hacer logout automáticamente</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
