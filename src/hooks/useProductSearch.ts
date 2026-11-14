import { useMemo, useState } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import type { Product } from '../data/products';

const FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: 'name', weight: 0.45 },
    { name: 'flavor', weight: 0.25 },
    { name: 'subtitle', weight: 0.15 },
    { name: 'tags', weight: 0.1 },
    { name: 'category', weight: 0.05 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function useProductSearch(sourceProducts: Product[], initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);

  const fuse = useMemo(() => new Fuse(sourceProducts, FUSE_OPTIONS), [sourceProducts]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return sourceProducts;
    return fuse.search(trimmed).map((match) => match.item);
  }, [fuse, query, sourceProducts]);

  return {
    query,
    setQuery,
    results,
    isSearching: query.trim().length > 0,
  };
}
