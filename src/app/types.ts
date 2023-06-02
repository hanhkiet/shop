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
  visibleMenu: boolean;
  menus: Menu[];
}

export interface Menu {
  id: number;
  name: string;
  collectionTypes: CollectionType[];
}

export interface CollectionType {
  id: number;
  name: string;
  collections: Array<Collection>;
}

export interface Collection {
  id: number;
  name: string;
}

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
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

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
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
