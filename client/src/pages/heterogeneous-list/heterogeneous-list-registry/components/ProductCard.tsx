import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import type { ProductItem } from '../types/items.types';

interface ProductCardProps {
  item: ProductItem;
  index: number;
}

export function ProductCard({ item }: ProductCardProps) {
  return (
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
}
