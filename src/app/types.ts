export interface Product {
  id: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface CartState {
  items: CartItem[];
  visible: boolean;
}

export interface OrderState {
  note: string;
}

export interface User {
  uuid: string;
  email: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface Address {
  isPrimary: boolean;
  uuid: string;
  recipientName: string;
  recipientPhone: string;
  street: string;
  district: string;
  city: string;
}
