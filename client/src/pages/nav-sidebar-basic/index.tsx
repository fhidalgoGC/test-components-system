import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Settings, Users, FileText } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'users', label: 'Usuarios', path: '/users', icon: <Users className="h-5 w-5" /> },
  { id: 'docs', label: 'Documentos', path: '/docs', icon: <FileText className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export default function NavSidebarBasicPage() {
  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        items={menuItems}
        currentPath="/home"
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Ejemplo Básico</h1>
        <p className="text-gray-600 dark:text-gray-400">
          NavigationSidebar con Header y Footer predeterminados.
          El Footer incluye controles de tema e idioma.
        </p>
      </div>
    </div>
  );
}
