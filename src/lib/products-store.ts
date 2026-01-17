"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface ProductsStore {
  products: Product[];
  bearerToken: string;
  setProducts: (products: Product[]) => void;
  setBearerToken: (token: string) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Donat Chocolate Glazed",
    price: 15000,
    description: "Donat lembut dengan lapisan cokelat manis yang menggoda",
    image: "https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/desserts-&-bakery/donat-kentang/main-header.jpg",
    category: "Klasik",
    popular: true
  },
  {
    id: 2,
    name: "Donat Original Glazed",
    price: 12000,
    description: "Donat klasik dengan glazur manis yang sempurna",
    image: "https://placehold.co/300x300?text=Original+Glazed+Donut+with+Sweet+Sugar+Coating",
    category: "Klasik",
    popular: true
  },
  {
    id: 3,
    name: "Donat Strawberry",
    price: 16000,
    description: "Donat dengan topping strawberry segar dan manis",
    image: "https://placehold.co/300x300?text=Strawberry+Donut+with+Fresh+Pink+Strawberry+Topping",
    category: "Buah",
    popular: false
  },
  {
    id: 4,
    name: "Donat Boston Cream",
    price: 18000,
    description: "Donat isi krim vanilla dengan topping cokelat",
    image: "https://placehold.co/300x300?text=Boston+Cream+Donut+with+Vanilla+Cream+Filling",
    category: "Premium",
    popular: true
  },
  {
    id: 5,
    name: "Donat Jelly Filled",
    price: 17000,
    description: "Donat lembut berisi selai buah pilihan",
    image: "https://placehold.co/300x300?text=Jelly+Filled+Donut+with+Fruit+Jam+Center",
    category: "Premium",
    popular: false
  },
  {
    id: 6,
    name: "Donat Red Velvet",
    price: 20000,
    description: "Donat red velvet dengan cream cheese frosting",
    image: "https://placehold.co/300x300?text=Red+Velvet+Donut+with+Cream+Cheese+Frosting",
    category: "Spesial",
    popular: true
  },
  {
    id: 7,
    name: "Donat Matcha",
    price: 19000,
    description: "Donat dengan rasa matcha autentik dan topping white chocolate",
    image: "https://placehold.co/300x300?text=Matcha+Green+Tea+Donut+with+White+Chocolate+Drizzle",
    category: "Spesial",
    popular: false
  },
  {
    id: 8,
    name: "Donat Tiramisu",
    price: 22000,
    description: "Donat dengan rasa tiramisu yang kaya dan creamy",
    image: "https://placehold.co/300x300?text=Tiramisu+Donut+with+Coffee+Cream+and+Cocoa+Powder",
    category: "Spesial",
    popular: true
  }
];

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set, get) => ({
      products: defaultProducts,
      bearerToken: '',

      setProducts: (products: Product[]) => {
        set({ products });
      },

      setBearerToken: (token: string) => {
        set({ bearerToken: token });
      },

      updateProduct: (id: number, updates: Partial<Product>) => {
        set({
          products: get().products.map(product =>
            product.id === id ? { ...product, ...updates } : product
          )
        });
      },

      addProduct: (product: Product) => {
        set({
          products: [...get().products, product]
        });
      },

      removeProduct: (id: number) => {
        set({
          products: get().products.filter(product => product.id !== id)
        });
      },
    }),
    {
      name: 'MarinCookies-products',
    }
  )
);
