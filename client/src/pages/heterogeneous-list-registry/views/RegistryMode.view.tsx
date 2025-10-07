import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
import { ProductCard } from '../components/ProductCard';
import { UserCard } from '../components/UserCard';
import { NotificationCard } from '../components/NotificationCard';
import { TaskCard } from '../components/TaskCard';
import { EventCard } from '../components/EventCard';
import { MessageCard } from '../components/MessageCard';
import type { RegistryItemType } from '../types/items.types';

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
