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

export function ManyItemsDemo() {
  return (
    <div className="border rounded-lg overflow-hidden h-[400px] relative">
      <p className="absolute top-2 right-2 z-50 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
        Body hace scroll
      </p>
      <NavigationSidebar
        items={menuItems}
        currentPath="/home"
        onNavigate={(path) => console.log('Navigate to:', path)}
      />
    </div>
  );
}
