import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { COPY } from '../content/copy';
import type { CategorySlug, Product } from '../data/products';

export const MAX_QTY = 99;

export interface CustomMixItem {
  id: string;
  name: string;
  weight: string;
}

export interface CartItem {
  key: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  netWeight: string;
  flavor: string;
  category: CategorySlug;
  image: string;
  quantity: number;
  /** Opsiyonel "Kendi poşetini doldur" genişleme noktası */
  isCustomMix?: boolean;
  mixItems?: CustomMixItem[];
}

export interface RemovedCartSnapshot {
  type: 'item' | 'clear';
  items: CartItem[];
  label: string;
}

interface CartState {
  items: CartItem[];
  favorites: string[];
  isDrawerOpen: boolean;
  lastRemoved: RemovedCartSnapshot | null;
  ekle: (product: Product, quantity?: number, selectedFlavor?: string) => void;
  addCustomMix: (selectedProducts: Product[], totalPrice: number, totalWeight: string, mixItems?: CustomMixItem[]) => void;
  setQty: (key: string, quantity: number) => void;
  artir: (key: string) => void;
  azalt: (key: string) => void;
  sil: (key: string) => void;
  temizle: () => void;
  restoreLastRemoved: () => void;
  dismissUndo: () => void;
  toggleFavorite: (slug: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
}

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(MAX_QTY, Math.max(1, Math.floor(qty)));
}

function buildItemKey(slug: string, flavor: string): string {
  return `${slug}::${flavor.toLowerCase()}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      favorites: [],
      isDrawerOpen: false,
      lastRemoved: null,

      ekle: (product, quantity = 1, selectedFlavor) =>
        set((state) => {
          const flavor = selectedFlavor || product.flavor || COPY.common.defaultFlavor;
          const key = buildItemKey(product.slug, flavor);
          const existing = state.items.find((item) => item.key === key);
          const safeAdd = clampQty(quantity);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: clampQty(item.quantity + safeAdd) }
                  : item
              ),
              isDrawerOpen: true,
            };
          }

          const newItem: CartItem = {
            key,
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            netWeight: product.netWeight,
            flavor,
            category: product.category,
            image: product.image,
            quantity: safeAdd,
          };

          return {
            items: [...state.items, newItem],
            isDrawerOpen: true,
          };
        }),

      addCustomMix: (selectedProducts, totalPrice, totalWeight, customMixItems) =>
        set((state) => {
          if (selectedProducts.length === 0) return state;

          const sortedIds = selectedProducts.map((p) => p.id).sort().join('+');
          const key = `mix::${sortedIds}`;
          const existing = state.items.find((item) => item.key === key);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.key === key
                  ? { ...item, quantity: clampQty(item.quantity + 1) }
                  : item
              ),
              isDrawerOpen: true,
            };
          }

          const mixItems: CustomMixItem[] =
            customMixItems ??
            selectedProducts.map((p) => ({
              id: p.id,
              name: p.name,
              weight: p.netWeight,
            }));

          const first = selectedProducts[0];
          const newItem: CartItem = {
            key,
            id: key,
            slug: first.slug,
            name: COPY.mix.customMixItemName(selectedProducts.length),
            price: totalPrice,
            netWeight: totalWeight,
            flavor: selectedProducts
              .map((p) => p.flavor)
              .slice(0, 3)
              .join(' · '),
            category: first.category,
            image: first.image,
            quantity: 1,
            isCustomMix: true,
            mixItems,
          };

          return {
            items: [...state.items, newItem],
            isDrawerOpen: true,
          };
        }),

      setQty: (key, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity: clampQty(quantity) } : item
          ),
        })),

      artir: (key) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.key === key ? { ...item, quantity: clampQty(item.quantity + 1) } : item
          ),
        })),

      azalt: (key) =>
        set((state) => {
          const target = state.items.find((item) => item.key === key);
          if (!target) return state;
          if (target.quantity <= 1) {
            return {
              items: state.items.filter((item) => item.key !== key),
              lastRemoved: {
                type: 'item',
                items: [target],
                label: target.name,
              },
            };
          }
          return {
            items: state.items.map((item) =>
              item.key === key ? { ...item, quantity: clampQty(item.quantity - 1) } : item
            ),
          };
        }),

      sil: (key) =>
        set((state) => {
          const target = state.items.find((item) => item.key === key);
          if (!target) return state;
          return {
            items: state.items.filter((item) => item.key !== key),
            lastRemoved: {
              type: 'item',
              items: [target],
              label: target.name,
            },
          };
        }),

      temizle: () =>
        set((state) => {
          if (state.items.length === 0) return state;
          return {
            items: [],
            lastRemoved: {
              type: 'clear',
              items: state.items,
              label: `${state.items.length} ürün`,
            },
          };
        }),

      restoreLastRemoved: () =>
        set((state) => {
          if (!state.lastRemoved) return state;
          const nextItems = [...state.items];
          for (const restored of state.lastRemoved.items) {
            const idx = nextItems.findIndex((item) => item.key === restored.key);
            if (idx >= 0) {
              nextItems[idx] = {
                ...nextItems[idx],
                quantity: clampQty(nextItems[idx].quantity + restored.quantity),
              };
            } else {
              nextItems.push({
                ...restored,
                quantity: clampQty(restored.quantity),
              });
            }
          }
          return {
            items: nextItems,
            lastRemoved: null,
          };
        }),

      dismissUndo: () => set({ lastRemoved: null }),

      toggleFavorite: (slug) =>
        set((state) => {
          const exists = state.favorites.includes(slug);
          return {
            favorites: exists
              ? state.favorites.filter((s) => s !== slug)
              : [...state.favorites, slug],
          };
        }),

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),
    }),
    {
      name: 'lupuk-cart-v1',
      partialize: (state) => ({
        items: state.items,
        favorites: state.favorites,
      }),
    }
  )
);

export function selectTotalItems(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectSubtotal(state: CartState): number {
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
