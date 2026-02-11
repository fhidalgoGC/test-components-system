import styles from '../css/GridDemo.module.css';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  icon: string;
  color: string;
}

const CATEGORIES = ['Electronics', 'Audio', 'Accessories', 'Office', 'Gaming', 'Photography'];
const ICONS = ['💻', '🎧', '⌨️', '🖥️', '🎮', '📷', '🖱️', '📱', '🔌', '💡'];
const COLORS = ['#dbeafe', '#fce7f3', '#d1fae5', '#fef3c7', '#ede9fe', '#ffedd5'];

export function generateProducts(startIndex: number, count: number): Product[] {
  return Array.from({ length: count }, (_, i) => {
    const idx = startIndex + i;
    return {
      id: `product-${idx}`,
      name: `Product ${idx + 1}`,
      category: CATEGORIES[idx % CATEGORIES.length],
      price: Math.floor(Math.random() * 900) + 50,
      rating: Math.round((3 + Math.random() * 2) * 10) / 10,
      icon: ICONS[idx % ICONS.length],
      color: COLORS[idx % COLORS.length],
    };
  });
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className={styles.card} data-testid={`card-product-${product.id}`}>
      <div className={styles.cardIcon} style={{ background: product.color }}>
        {product.icon}
      </div>
      <div className={styles.cardTitle}>{product.name}</div>
      <div className={styles.cardCategory}>{product.category}</div>
      <div className={styles.cardBottom}>
        <div className={styles.cardPrice}>${product.price}</div>
        <div className={styles.cardRating}>{'★'.repeat(Math.round(product.rating))} {product.rating}</div>
      </div>
    </div>
  );
}
