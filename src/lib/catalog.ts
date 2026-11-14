import { COPY } from '../content/copy';
import { categories, products, type Category, type CategorySlug, type Product } from '../data/products';

export const DEFAULT_CATEGORIES: Category[] = [
  { slug: 'sert-seker', name: COPY.catalog.defaultCategoryNames['sert-seker'], color: '#C8281C', inkColor: '#FFF8EE' },
  { slug: 'jelibon', name: COPY.catalog.defaultCategoryNames['jelibon'], color: '#8ECAE6', inkColor: '#2B1410' },
  { slug: 'cikolata-kapli', name: COPY.catalog.defaultCategoryNames['cikolata-kapli'], color: '#6E352C', inkColor: '#FFF8EE' },
  { slug: 'lolipop-sakiz', name: COPY.catalog.defaultCategoryNames['lolipop-sakiz'], color: '#FF6FA8', inkColor: '#2B1410' },
  { slug: 'geleneksel', name: COPY.catalog.defaultCategoryNames['geleneksel'], color: '#C9A7FF', inkColor: '#2B1410' },
  { slug: 'tuzlu-atistirmalik', name: COPY.catalog.defaultCategoryNames['tuzlu-atistirmalik'], color: '#FFD447', inkColor: '#2B1410' },
];

export function getCategories(): Category[] {
  return categories.length > 0 ? categories : DEFAULT_CATEGORIES;
}

export function getCategoryBySlug(slug?: string): Category | undefined {
  if (!slug) return undefined;
  return getCategories().find((cat) => cat.slug === slug);
}

export function getProductBySlug(slug?: string): Product | undefined {
  if (!slug) return undefined;
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: CategorySlug | string): Product[] {
  if (!category || category === 'tumu') return products;
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const others = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
