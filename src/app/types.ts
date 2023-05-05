export interface Product {
  id: number;
  name: string;
  price: number;
  imageOne: string;
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
