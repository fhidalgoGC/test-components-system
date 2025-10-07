import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import type { NotificationItem } from '../types/items.types';

interface NotificationCardProps {
  item: NotificationItem;
  index: number;
}

export function NotificationCard({ item }: NotificationCardProps) {
  return (
    <Alert className="border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950">
      <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="text-yellow-800 dark:text-yellow-300">{item.title}</AlertTitle>
      <AlertDescription className="text-yellow-700 dark:text-yellow-400">
        {item.message} • {item.time}
      </AlertDescription>
    </Alert>
  );
}
