import { NavigationSidebar } from '@/lib/ui-library/components/NavigationSidebar';
import { Home, FileText, Folder, Star, Heart, Bell, Mail, Calendar, Clock, User, Settings, HelpCircle, Info, AlertCircle, CheckCircle } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Inicio', path: '/home', icon: <Home className="h-5 w-5" /> },
  { id: 'documents', label: 'Documentos', path: '/documents', icon: <FileText className="h-5 w-5" /> },
  { id: 'folders', label: 'Carpetas', path: '/folders', icon: <Folder className="h-5 w-5" /> },
  { id: 'favorites', label: 'Favoritos', path: '/favorites', icon: <Star className="h-5 w-5" /> },
  { id: 'liked', label: 'Me gusta', path: '/liked', icon: <Heart className="h-5 w-5" /> },
  { id: 'notifications', label: 'Notificaciones', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
  { id: 'messages', label: 'Mensajes', path: '/messages', icon: <Mail className="h-5 w-5" /> },
  { id: 'calendar', label: 'Calendario', path: '/calendar', icon: <Calendar className="h-5 w-5" /> },
  { id: 'history', label: 'Historial', path: '/history', icon: <Clock className="h-5 w-5" /> },
  { id: 'profile', label: 'Perfil', path: '/profile', icon: <User className="h-5 w-5" /> },
  { id: 'settings', label: 'Configuración', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  { id: 'help', label: 'Ayuda', path: '/help', icon: <HelpCircle className="h-5 w-5" /> },
  { id: 'about', label: 'Acerca de', path: '/about', icon: <Info className="h-5 w-5" /> },
  { id: 'warnings', label: 'Alertas', path: '/warnings', icon: <AlertCircle className="h-5 w-5" /> },
  { id: 'completed', label: 'Completados', path: '/completed', icon: <CheckCircle className="h-5 w-5" /> },
];

export default function NavSidebarScrollPage() {
  return (
    <div className="h-screen w-full flex">
      <NavigationSidebar
        items={menuItems}
        currentPath="/home"
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
      <div className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Scroll en Body</h1>
        <p className="text-gray-600 dark:text-gray-400">
          NavigationSidebar con muchos items. Solo el Body hace scroll, Header y Footer permanecen fijos.
        </p>
      </div>
    </div>
  );
}
