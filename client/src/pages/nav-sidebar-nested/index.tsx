import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Package, Settings, Layout, MousePointer, Tag, Calendar } from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  {
    id: 'components',
    label: 'Componentes',
    icon: <Package className="h-5 w-5" />,
    children: [
      { id: 'button', label: 'Button', path: '/components/button', icon: <MousePointer className="h-4 w-4" /> },
      { id: 'card', label: 'Card', path: '/components/card', icon: <Layout className="h-4 w-4" /> },
      { 
        id: 'carousel', 
        label: 'Carousel', 
        path: '/components/carousel',
        component: (
          <div className="flex items-center gap-2">
            <span>Carousel</span>
            <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">New</span>
          </div>
        )
      },
      { id: 'tag', label: 'TagSelector', path: '/components/tag', icon: <Tag className="h-4 w-4" /> },
    ],
  },
  {
    id: 'utilities',
    label: 'Utilidades',
    icon: <Settings className="h-5 w-5" />,
    children: [
      { id: 'calendar', label: 'Calendario', path: '/utilities/calendar', icon: <Calendar className="h-4 w-4" /> },
      { id: 'settings', label: 'Configuración', path: '/utilities/settings' },
    ],
  },
];

const quickNavOptions = [
  { path: '/home', label: 'Inicio' },
  { path: '/components/button', label: 'Button' },
  { path: '/components/card', label: 'Card' },
  { path: '/components/carousel', label: 'Carousel' },
  { path: '/components/tag', label: 'TagSelector' },
  { path: '/utilities/calendar', label: 'Calendario' },
  { path: '/utilities/settings', label: 'Configuración' },
];

export default function NavSidebarNestedPage() {
  const [selectedPath, setSelectedPath] = useState('/home');

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  const handleExternalNavigation = (path: string) => {
    setSelectedPath(path);
    console.log('External navigation to:', path);
  };

  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Control Externo del Menú</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Este ejemplo demuestra cómo cambiar el item seleccionado desde fuera del menú usando botones externos.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow mb-6">
          <h3 className="font-semibold mb-2">Estado actual:</h3>
          <p className="text-blue-600 dark:text-blue-400 font-mono text-lg">{selectedPath}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
          <h3 className="font-semibold mb-4">Navegación Externa (Botones)</h3>
          <p className="text-sm text-gray-500 mb-4">
            Haz clic en cualquier botón para cambiar el item seleccionado en el menú:
          </p>
          <div className="flex flex-wrap gap-3">
            {quickNavOptions.map((option) => (
              <button
                key={option.path}
                onClick={() => handleExternalNavigation(option.path)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPath === option.path
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow mb-6">
          <h3 className="font-semibold mb-4">Navegación con Select</h3>
          <select
            value={selectedPath}
            onChange={(e) => handleExternalNavigation(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
          >
            {quickNavOptions.map((option) => (
              <option key={option.path} value={option.path}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-3 text-blue-800 dark:text-blue-300">Cómo funciona</h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <p><strong>1.</strong> El estado <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">selectedPath</code> se maneja en el componente padre.</p>
            <p><strong>2.</strong> Se pasa a NavigationSidebar como <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">currentPath</code> prop.</p>
            <p><strong>3.</strong> Los botones externos llaman <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">setSelectedPath()</code> directamente.</p>
            <p><strong>4.</strong> El menú reacciona automáticamente al cambio de estado.</p>
          </div>
          <div className="mt-4 p-4 bg-gray-900 rounded-lg overflow-x-auto">
            <pre className="text-green-400 text-xs">
{`const [selectedPath, setSelectedPath] = useState('/home');

// Botón externo cambia el estado
<button onClick={() => setSelectedPath('/components/carousel')}>
  Ir a Carousel
</button>

// El menú recibe el estado
<NavigationSidebar
  items={menuItems}
  currentPath={selectedPath}  // ← Controlado externamente
  onNavigate={setSelectedPath}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
