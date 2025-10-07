import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

type RegistryItemType = ProductItem | UserItem;

const ProductCard = ({ item }: { item: ProductItem; index: number }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        {item.name}
        <Badge variant="secondary">${item.price}</Badge>
      </CardTitle>
      <CardDescription>{item.category}</CardDescription>
    </CardHeader>
  </Card>
);

const UserCard = ({ item }: { item: UserItem; index: number }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        {item.name}
        <Badge>{item.role}</Badge>
      </CardTitle>
      <CardDescription>{item.email}</CardDescription>
    </CardHeader>
  </Card>
);

export function RegistryModeView() {
  const items: RegistryItemType[] = [
    { id: 1, kindComponent: 'product', name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, kindComponent: 'user', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 3, kindComponent: 'product', name: 'Mouse', price: 29, category: 'Accessories' },
    { id: 4, kindComponent: 'user', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 5, kindComponent: 'product', name: 'Keyboard', price: 79, category: 'Accessories' },
    { id: 6, kindComponent: 'product', name: 'Monitor 27"', price: 349, category: 'Electronics' },
    { id: 7, kindComponent: 'user', name: 'Michael Chen', email: 'michael@example.com', role: 'Developer' },
    { id: 8, kindComponent: 'product', name: 'Webcam HD', price: 89, category: 'Electronics' },
    { id: 9, kindComponent: 'user', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Designer' },
    { id: 10, kindComponent: 'product', name: 'USB-C Cable', price: 19, category: 'Accessories' },
    { id: 11, kindComponent: 'product', name: 'Headphones', price: 159, category: 'Audio' },
    { id: 12, kindComponent: 'user', name: 'David Martinez', email: 'david@example.com', role: 'Manager' },
    { id: 13, kindComponent: 'product', name: 'Desk Lamp', price: 45, category: 'Office' },
    { id: 14, kindComponent: 'user', name: 'Emma Wilson', email: 'emma@example.com', role: 'Analyst' },
    { id: 15, kindComponent: 'product', name: 'External SSD 1TB', price: 129, category: 'Storage' },
  ];

  const registry = {
    product: ProductCard,
    user: UserCard,
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
