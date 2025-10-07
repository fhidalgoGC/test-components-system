import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserItem } from '../types/items.types';

interface UserCardProps {
  item: UserItem;
  index: number;
}

export function UserCard({ item }: UserCardProps) {
  return (
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
}
