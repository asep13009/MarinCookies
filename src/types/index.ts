export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popular: boolean;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  paymentMethod: 'COD' | 'transfer';
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
}
