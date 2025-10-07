import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, CheckCircle2, AlertTriangle } from 'lucide-react';

export function ElementsModeView() {
  const elements = [
    <Alert key="info">
      <Info className="h-4 w-4" />
      <AlertTitle>Información</AlertTitle>
      <AlertDescription>
        Este es un elemento de tipo información pre-renderizado.
      </AlertDescription>
    </Alert>,
    <Card key="card-1">
      <CardHeader>
        <CardTitle>Card Element 1</CardTitle>
        <CardDescription>Un elemento Card pre-construido</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Contenido del primer card element
        </p>
      </CardContent>
    </Card>,
    <Alert key="success" className="border-green-500 dark:border-green-600">
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
      <AlertTitle className="text-green-800 dark:text-green-300">Éxito</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-400">
        Operación completada exitosamente.
      </AlertDescription>
    </Alert>,
    <Card key="card-2">
      <CardHeader>
        <CardTitle>Card Element 2</CardTitle>
        <CardDescription>Otro elemento Card diferente</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Contenido del segundo card element
        </p>
      </CardContent>
    </Card>,
    <Alert key="warning" className="border-yellow-500 dark:border-yellow-600">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-300">Advertencia</AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
        Esto es una advertencia importante.
      </AlertDescription>
    </Alert>,
    <Card key="card-3">
      <CardHeader>
        <CardTitle>Notificación de Sistema</CardTitle>
        <CardDescription>Actualización disponible</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Una nueva versión está lista para instalar
        </p>
      </CardContent>
    </Card>,
    <Alert key="info-2">
      <Info className="h-4 w-4" />
      <AlertTitle>Recordatorio</AlertTitle>
      <AlertDescription>
        No olvides guardar tus cambios antes de salir.
      </AlertDescription>
    </Alert>,
    <Card key="card-4">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Última hora</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          5 nuevas actualizaciones en el sistema
        </p>
      </CardContent>
    </Card>,
    <Alert key="success-2" className="border-green-500 dark:border-green-600">
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
      <AlertTitle className="text-green-800 dark:text-green-300">Sincronizado</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-400">
        Todos los datos están actualizados.
      </AlertDescription>
    </Alert>,
    <Card key="card-5">
      <CardHeader>
        <CardTitle>Configuración</CardTitle>
        <CardDescription>Ajustes del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Personaliza tu experiencia
        </p>
      </CardContent>
    </Card>,
    <Alert key="warning-2" className="border-yellow-500 dark:border-yellow-600">
      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-300">Mantenimiento</AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
        Programado para mañana a las 2:00 AM.
      </AlertDescription>
    </Alert>,
    <Card key="card-6">
      <CardHeader>
        <CardTitle>Estadísticas</CardTitle>
        <CardDescription>Métricas del día</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          1,234 usuarios activos hoy
        </p>
      </CardContent>
    </Card>,
    <Alert key="info-3">
      <Info className="h-4 w-4" />
      <AlertTitle>Consejo</AlertTitle>
      <AlertDescription>
        Usa atajos de teclado para trabajar más rápido.
      </AlertDescription>
    </Alert>,
    <Card key="card-7">
      <CardHeader>
        <CardTitle>Reporte Mensual</CardTitle>
        <CardDescription>Noviembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Crecimiento del 15% este mes
        </p>
      </CardContent>
    </Card>,
    <Alert key="success-3" className="border-green-500 dark:border-green-600">
      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
      <AlertTitle className="text-green-800 dark:text-green-300">Backup Completo</AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-400">
        Copia de seguridad realizada con éxito.
      </AlertDescription>
    </Alert>,
  ];

  return (
    <div data-testid="elements-mode-page">
      <HeterogeneousList
        mode="elements"
        elements={elements}
        dividerVariant="line"
        dividerInset={16}
        gap={16}
        data-testid="elements-list"
      />
    </div>
  );
}
