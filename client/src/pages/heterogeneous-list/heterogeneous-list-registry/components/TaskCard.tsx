import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import type { TaskItem } from '../types/items.types';

interface TaskCardProps {
  item: TaskItem;
  index: number;
}

export function TaskCard({ item }: TaskCardProps) {
  return (
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
}
