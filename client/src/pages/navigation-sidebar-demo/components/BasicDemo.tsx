import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, Settings, Users, FileText } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'users', label: 'Usuarios', path: '/users', icon: <Users className="h-5 w-5" /> },
  { id: 'docs', label: 'Documentos', path: '/docs', icon: <FileText className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
];

export function BasicDemo() {
  return (
    <div className="border rounded-lg overflow-hidden h-[500px] relative">
      <NavigationSidebar
        items={menuItems}
        currentPath="/home"
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
    </div>
  );
}
