export interface CartItem {
  id: string;
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

export interface MenuState {
  hoverMenuId: number;
  activeMenu: string | null;
  activeMenuChild: Array<string>;
  menus: Menu[];
}

export interface Menu {
  id: number;
  name: string;
  collectionTypes: CollectionType[];
}

export interface CollectionType {
  name: string;
  collections: Array<Collection>;
}

export interface Collection {
  name: string;
}

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterDataActionPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginDataActionPayload {
  email: string;
  password: string;
}

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
  status: number | null;
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

export interface PathState {
  pathName: string;
}

export interface Product {
  uuid: string;
  name: string;
  price: number;
  images: Array<string>;
}

export interface ProductState {
  colors: Array<string>;
  sizes: Array<string>;
  products: Array<Product>;
}
