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
  ];

  const registry = {
    product: ProductCard,
    user: UserCard,
  };

  return (
    <div className="p-6 max-w-4xl mx-auto" data-testid="registry-mode-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Registry Mode</h1>
        <p className="text-gray-600 dark:text-gray-400">
          El modo Registry mapea items a componentes basándose en la propiedad `kindComponent`.
          Cada tipo de item se renderiza con su componente correspondiente definido en el registry.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ejemplo de Código</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{`const registry = {
  product: ProductCard,
  user: UserCard,
};

<HeterogeneousList
  mode="registry"
  items={items}
  registry={registry}
  dividerVariant="line"
  gap={16}
/>`}</code>
          </pre>
        </CardContent>
      </Card>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Demo en vivo</h2>
        <HeterogeneousList
          mode="registry"
          items={items}
          registry={registry}
          dividerVariant="line"
          gap={16}
          data-testid="registry-list"
        />
      </div>
    </div>
  );
}
