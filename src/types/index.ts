export type CategoryId =
  | 'power-tools'
  | 'hand-tools'
  | 'garden'
  | 'electrical'
  | 'kitchen'
  | 'hardware';

export type Brand = 'Leiya' | 'Workman' | 'Jayakirana';

export interface Category {
  id: CategoryId;
  name: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  brand: Brand;
  category: CategoryId;
  price: number;
  originalPrice: number | null;
  image: string | null;
  rating: number;
  reviews: number;
  inStock: boolean;
  badge: string | null;
  description: string;
  specs?: ProductSpec[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'bank' | 'store';
