import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import type { MessageItem } from '../types/items.types';

interface MessageCardProps {
  item: MessageItem;
  index: number;
}

export function MessageCard({ item }: MessageCardProps) {
  return (
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
}
