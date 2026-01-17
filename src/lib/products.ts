import { Product } from '@/types';

export const products: Product[] = [
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
    image: "https://drive.google.com/file/d/1ixrO7-0P5kfj7mj1-s-P2TOICnho2ti-",
    category: "Spesial",
    popular: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getPopularProducts = (): Product[] => {
  return products.filter(product => product.popular);
};