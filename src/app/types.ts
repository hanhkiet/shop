export interface CartItem {
  id: string;
  quantity: number;
  size: string;
}

export interface MessageState {
  message: string | null;
  status: number | null;
}

export interface MessagePayload {
  message: string;
  status: number;
}

export interface CartState {
  items: CartItem[];
  visible: boolean;
}

export interface OrderState {
  note: string;
}

export interface CollectionState {
  hoverMenuId: number;
  activeMenu: string | null;
  activeMenuChild: Array<string>;
  collections: Collection[];
}

export interface Collection {
  id: number;
  name: string;
  type: CollectionType;
}

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface RegisterDataActionPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface LoginDataActionPayload {
  username: string;
  password: string;
}

export interface UserRegisterData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface UserProfilePayload {
  firstName: string;
  lastName: string;
  username: string;
}

export interface AccountState {
  isAuthenticated: boolean;
  loading: boolean;
  status: number | null;
  user: User | null;
}

export interface Address {
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
  sizes: Array<string>;
  products: Array<Product>;
}

type Role = 'ADMIN';
export interface Manager {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface ManagerState {
  isAuthenticated: boolean;
  loading: boolean;
  manager: Manager | null;
  collections: CollectionItem[];
}

export interface StorageState {
  loading: boolean;
  collections: CollectionItem[];
}

export type CollectionType = 'FEATURED' | 'TOPS' | 'BOTTOMS';
export interface CollectionItem {
  id: number;
  name: string;
  type: CollectionType;
}

export interface ItemsInStore {
  id: number;
  productUuid: string;
  size: string;
  quantity: number;
}

export interface ProductQuantityState {
  productQuantity: Array<ItemsInStore>;
}

export interface CategoryProduct {
  id: number;
  product: Product;
  productCollection: Collection;
}

export interface CategoryProductState {
  categoryProduct: Array<CategoryProduct>;
}
