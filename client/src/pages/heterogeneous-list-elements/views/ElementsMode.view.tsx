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
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto" data-testid="elements-mode-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Elements Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          El modo Elements renderiza una lista de ReactElements pre-construidos.
          Útil cuando ya tienes los elementos listos y solo necesitas mostrarlos en una lista.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ejemplo de Código</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{`const elements = [
  <Alert key="info">
    <AlertTitle>Información</AlertTitle>
    <AlertDescription>Mensaje info</AlertDescription>
  </Alert>,
  <Card key="card-1">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
  </Card>,
  // ... más elementos
];

<HeterogeneousList
  mode="elements"
  elements={elements}
  dividerVariant="line"
  dividerInset={16}
/>`}</code>
          </pre>
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Demo en vivo</h2>
        <HeterogeneousList
          mode="elements"
          elements={elements}
          dividerVariant="line"
          dividerInset={16}
          gap={16}
          data-testid="elements-list"
        />
      </div>
    </div>
  );
}
