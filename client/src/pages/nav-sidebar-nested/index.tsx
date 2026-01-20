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

export default function NavSidebarNestedPage() {
  const [selectedPath, setSelectedPath] = useState('/home');

  const handleNavigate = (path: string) => {
    setSelectedPath(path);
    console.log('Navigate to:', path);
  };

  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        items={menuItems}
        currentPath={selectedPath}
        onNavigate={handleNavigate}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Items Anidados</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          NavigationSidebar con children (submenús), badges personalizados y componentes custom en items.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">Estado actual:</h3>
          <p className="text-blue-600 dark:text-blue-400 font-mono">{selectedPath}</p>
          <p className="text-sm text-gray-500 mt-2">
            Haz clic en cualquier item del menú para ver cómo cambia el estado.
          </p>
        </div>
      </div>
    </div>
  );
}
