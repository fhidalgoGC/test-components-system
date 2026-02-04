import { Package } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const productNames = [
  'Laptop Pro', 'Wireless Mouse', 'USB-C Hub', 'Mechanical Keyboard', 'Monitor 27"',
  'Webcam HD', 'Desk Lamp', 'Notebook Set', 'Standing Desk', 'Ergonomic Chair',
  'Headphones', 'Microphone', 'Smart Watch', 'Tablet', 'Phone Case',
  'Power Bank', 'USB Cable', 'HDMI Adapter', 'Memory Card', 'External SSD'
];

const categories = ['Electronics', 'Accessories', 'Office', 'Audio', 'Mobile'];

export const mockProducts: Product[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `${productNames[i % productNames.length]} ${Math.floor(i / productNames.length) + 1}`,
  price: Math.floor(Math.random() * 500) + 20,
  category: categories[i % categories.length],
}));

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
