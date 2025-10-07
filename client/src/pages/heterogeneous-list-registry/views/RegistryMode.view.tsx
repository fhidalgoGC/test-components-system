import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell, Calendar, CheckCircle2, MessageSquare, ShoppingCart } from 'lucide-react';

interface ProductItem {
  id: number;
  kindComponent: 'product';
  name: string;
  price: number;
  category: string;
}

interface UserItem {
  id: number;
  kindComponent: 'user';
  name: string;
  email: string;
  role: string;
}

interface NotificationItem {
  id: number;
  kindComponent: 'notification';
  title: string;
  message: string;
  time: string;
}

interface TaskItem {
  id: number;
  kindComponent: 'task';
  title: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

interface EventItem {
  id: number;
  kindComponent: 'event';
  name: string;
  date: string;
  location: string;
}

interface MessageItem {
  id: number;
  kindComponent: 'message';
  sender: string;
  content: string;
  unread: boolean;
}

type RegistryItemType = ProductItem | UserItem | NotificationItem | TaskItem | EventItem | MessageItem;

const ProductCard = ({ item }: { item: ProductItem; index: number }) => (
  <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          {item.name}
        </div>
        <Badge variant="secondary" className="bg-blue-600 text-white">${item.price}</Badge>
      </CardTitle>
      <CardDescription>{item.category}</CardDescription>
    </CardHeader>
  </Card>
);

const UserCard = ({ item }: { item: UserItem; index: number }) => (
  <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span className="text-purple-900 dark:text-purple-100">{item.name}</span>
        <Badge className="bg-purple-600">{item.role}</Badge>
      </CardTitle>
      <CardDescription className="text-purple-600 dark:text-purple-400">{item.email}</CardDescription>
    </CardHeader>
  </Card>
);

const NotificationCard = ({ item }: { item: NotificationItem; index: number }) => (
  <Alert className="border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
    <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
    <AlertTitle className="text-yellow-800 dark:text-yellow-300">{item.title}</AlertTitle>
    <AlertDescription className="text-yellow-700 dark:text-yellow-400">
      {item.message} • {item.time}
    </AlertDescription>
  </Alert>
);

const TaskCard = ({ item }: { item: TaskItem; index: number }) => (
  <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {item.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          <span className="text-green-900 dark:text-green-100">{item.title}</span>
        </div>
        <Badge variant={item.priority === 'high' ? 'destructive' : 'outline'}>
          {item.priority}
        </Badge>
      </CardTitle>
      <CardDescription className="text-green-600 dark:text-green-400">
        {item.status === 'completed' ? 'Completada' : 'Pendiente'}
      </CardDescription>
    </CardHeader>
  </Card>
);

const EventCard = ({ item }: { item: EventItem; index: number }) => (
  <Card className="bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-orange-900 dark:text-orange-100">
        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        {item.name}
      </CardTitle>
      <CardDescription className="text-orange-600 dark:text-orange-400">
        {item.date} • {item.location}
      </CardDescription>
    </CardHeader>
  </Card>
);

const MessageCard = ({ item }: { item: MessageItem; index: number }) => (
  <Card className={`${item.unread ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-300 dark:border-indigo-700' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'}`}>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-indigo-900 dark:text-indigo-100">{item.sender}</span>
        </div>
        {item.unread && <Badge className="bg-indigo-600">Nuevo</Badge>}
      </CardTitle>
      <CardDescription className="text-indigo-600 dark:text-indigo-400">{item.content}</CardDescription>
    </CardHeader>
  </Card>
);

export function RegistryModeView() {
  const items: RegistryItemType[] = [
    { id: 1, kindComponent: 'notification', title: 'Nueva actualización', message: 'Versión 2.0 disponible', time: 'Hace 5 min' },
    { id: 2, kindComponent: 'product', name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 3, kindComponent: 'task', title: 'Completar informe mensual', status: 'pending', priority: 'high' },
    { id: 4, kindComponent: 'user', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 5, kindComponent: 'event', name: 'Reunión de equipo', date: '15 Nov 2024', location: 'Sala A' },
    { id: 6, kindComponent: 'message', sender: 'María García', content: '¿Tienes el reporte de ventas?', unread: true },
    { id: 7, kindComponent: 'product', name: 'Mouse', price: 29, category: 'Accessories' },
    { id: 8, kindComponent: 'task', title: 'Revisar código PR #123', status: 'completed', priority: 'medium' },
    { id: 9, kindComponent: 'notification', title: 'Recordatorio', message: 'Reunión en 30 minutos', time: 'Hace 10 min' },
    { id: 10, kindComponent: 'user', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 11, kindComponent: 'event', name: 'Conferencia Tech 2024', date: '20 Nov 2024', location: 'Centro de Convenciones' },
    { id: 12, kindComponent: 'message', sender: 'Carlos López', content: 'Excelente trabajo en el proyecto', unread: false },
    { id: 13, kindComponent: 'product', name: 'Keyboard', price: 79, category: 'Accessories' },
    { id: 14, kindComponent: 'task', title: 'Actualizar documentación', status: 'pending', priority: 'low' },
    { id: 15, kindComponent: 'notification', title: 'Sistema', message: 'Backup completado exitosamente', time: 'Hace 1 hora' },
  ];

  const registry = {
    product: ProductCard,
    user: UserCard,
    notification: NotificationCard,
    task: TaskCard,
    event: EventCard,
    message: MessageCard,
  };

  return (
    <div data-testid="registry-mode-page">
      <HeterogeneousList
        mode="registry"
        items={items}
        registry={registry}
        dividerVariant="line"
        gap={16}
        data-testid="registry-list"
      />
    </div>
  );
}
