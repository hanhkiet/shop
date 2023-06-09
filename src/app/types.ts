export interface CartItem {
  productUuid: string;
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
  sizeCartItemChosen: string | null;
  sizeCartItemChosenTemp: string | null;
}

export interface OrderState {
  note: string;
  emailOrder: string;
  streetOrder: string;
  firstNameOrder: string;
  lastNameOrder: string;
  addressOrder: string;
  districtOrder: string;
  cityOrder: string;
  phoneOrder: string;
  showQuantityWarning: boolean;
  shippingPrice: number;
  shippingIndex: number;
  streetIndex: number;
  orders: OrderPayload;
}

export interface CollectionState {
  hoverMenuId: number;
  activeMenu: string | null;
  activeMenuChild: Array<string>;
  visibleMenu: boolean;
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

export interface SearchState {
  showSearchBar: boolean;
  query: string;
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
  images: Array<string>;
  catalogs: Catalog[];
  color: string;
  collections: Collection[];
}

export interface ProductState {
  sizes: Array<string>;
  products: Array<Product>;
}

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

export type OrderStatus = 'PENDING' | 'DELIVERING' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'COD' | 'CREDIT_CARD';
export interface Order {
  uuid: string;
  address: Address;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  totalPrice: number;
}

export interface OrderDetail {
  uuid: string;
  name: string;
  price: number;
  color: Color;
  size: Size;
  quantity: number;
}

export interface StorageState {
  loading: boolean;
  collections: CollectionItem[];
  products: Product[];
  recentlyAddedProducts: Product[];
  recentlyUpdatedProducts: Product[];
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

export interface AddCatalogPayload {
  productUuid: string;
  catalogs: Catalog[];
}

export interface AddressPayload {
  uuid: string;
}

export interface OrderPayload {
  address: AddressPayload;
  items: CartItem[];
}
