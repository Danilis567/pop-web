import { useEffect, useMemo, useState } from 'react';
import type Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { Product } from '../data/products';

type FuseConstructor = typeof Fuse;

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

let cachedFuseClass: FuseConstructor | null = null;

export function useProductSearch(sourceProducts: Product[], initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [FuseClass, setFuseClass] = useState<FuseConstructor | null>(() => cachedFuseClass);

  const trimmed = query.trim();

  useEffect(() => {
    if (!trimmed || FuseClass) return;
    let cancelled = false;
    void import('fuse.js').then((mod) => {
      cachedFuseClass = mod.default;
      if (!cancelled) {
        setFuseClass(() => mod.default);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [trimmed, FuseClass]);

  const fuse = useMemo(
    () => (FuseClass ? new FuseClass(sourceProducts, FUSE_OPTIONS) : null),
    [FuseClass, sourceProducts],
  );

  const results = useMemo(() => {
    if (!trimmed) return sourceProducts;
    if (!fuse) {
      const lower = trimmed.toLocaleLowerCase('tr-TR');
      return sourceProducts.filter(
        (p) =>
          p.name.toLocaleLowerCase('tr-TR').includes(lower) ||
          p.flavor.toLocaleLowerCase('tr-TR').includes(lower) ||
          (p.subtitle?.toLocaleLowerCase('tr-TR').includes(lower) ?? false),
      );
    }
    return fuse.search(trimmed).map((match) => match.item);
  }, [fuse, trimmed, sourceProducts]);

  return {
    query,
    setQuery,
    results,
    isSearching: trimmed.length > 0,
  };
}
