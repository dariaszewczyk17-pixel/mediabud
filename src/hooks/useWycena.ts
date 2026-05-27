import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface WycenaItem {
  product: Product;
  quantity: number;
  unit: string;
  note: string;
}

interface WycenaStore {
  items: WycenaItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  updateNote: (productId: string, note: string) => void;
  clearWycena: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  totalItems: () => number;
}

export const useWycena = create<WycenaStore>()(
  persist(
    (set, get) => ({
      items: [] as WycenaItem[],
      isOpen: false,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(i => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, quantity, unit: product.unit, note: "" }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter(i => i.product.id !== productId) })),

      updateQty: (productId, quantity) =>
        set((state) => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),

      updateNote: (productId, note) =>
        set((state) => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, note } : i
          ),
        })),

      clearWycena: () => set({ items: [] }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "mediabud-wycena" }
  )
);
