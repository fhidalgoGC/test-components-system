import { Package } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const mockProducts: Product[] = [
  { id: 1, name: 'Laptop Pro', price: 1299, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: 49, category: 'Electronics' },
  { id: 3, name: 'USB-C Hub', price: 79, category: 'Accessories' },
  { id: 4, name: 'Mechanical Keyboard', price: 159, category: 'Electronics' },
  { id: 5, name: 'Monitor 27"', price: 399, category: 'Electronics' },
  { id: 6, name: 'Webcam HD', price: 89, category: 'Electronics' },
  { id: 7, name: 'Desk Lamp', price: 45, category: 'Office' },
  { id: 8, name: 'Notebook Set', price: 25, category: 'Office' },
];

export const fetchProducts = async (page: number, pageSize: number): Promise<Product[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const start = (page - 1) * pageSize;
  return mockProducts.slice(start, start + pageSize);
};

export const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-800 mb-2 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
        <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white">{product.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
      </div>
    </div>
    <span className="text-lg font-semibold text-green-600 dark:text-green-400">
      ${product.price}
    </span>
  </div>
);
