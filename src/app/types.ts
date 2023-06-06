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

export enum Color {
  BLACK = 'BLACK',
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  RED = 'RED',
  GREEN = 'GREEN',
  GREY = 'GREY',
  OLIVE = 'OLIVE',
  NAVY = 'NAVY',
  CHAI = 'CHAI',
  PLUM = 'PLUM',
  TAUPE = 'TAUPE',
  SAGE = 'SAGE',
  CREAM = 'CREAM',
  RAVEN = 'RAVEN',
  SMOKE = 'SMOKE',
  SKY = 'SKY',
  STONE = 'STONE',
}

export interface Product {
  uuid: string;
  name: string;
  price: number;
  color: Color;
  images: Array<string>;
  collections: CollectionItem[];
  catalogs: Catalog[];
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
  products: Product[];
}

export interface ProductFilterPayload {
  type?: CollectionType;
  collectionId?: number;
  color?: Color;
  query?: string;
}

export type CollectionType = 'FEATURED' | 'TOPS' | 'BOTTOMS';
export interface CollectionItem {
  id: number;
  name: string;
  type: CollectionType;
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export interface Catalog {
  size: Size;
  quantity: number;
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
