export type CategorySlug =
  | 'sert-seker'
  | 'jelibon'
  | 'cikolata-kapli'
  | 'lolipop-sakiz'
  | 'geleneksel'
  | 'tuzlu-atistirmalik';

export interface Category {
  slug: CategorySlug;
  name: string;
  description?: string;
  color: string;
  inkColor: string;
  badge?: string;
}

export interface FlavorOption {
  label: string;
  color: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  description?: string;
  category: CategorySlug;
  price: number;
  netWeight: string;
  batchCode?: string;
  flavor: string;
  flavors?: FlavorOption[];
  image: string;
  imageAlt?: string;
  gallery?: string[];
  tags?: string[];
  featured?: boolean;
  inStock?: boolean;
  ingredients?: string | string[];
  allergens?: string | string[];
  storage?: string;
}

export declare const categories: Category[];
export declare const products: Product[];
