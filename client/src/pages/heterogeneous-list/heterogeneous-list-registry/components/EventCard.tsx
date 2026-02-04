import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import type { EventItem } from '../types/items.types';

interface EventCardProps {
  item: EventItem;
  index: number;
}

export function EventCard({ item }: EventCardProps) {
  return (
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
}
