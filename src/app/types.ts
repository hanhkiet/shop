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

export interface MegaMenuItem {
  id: number;
  name: string;
  url: string;
}

export interface MegaMenu {
  id: number;
  name: string;
  megaMenuItems: MegaMenuItem[];
}

export interface Menu {
  id: number;
  name: string;
  megaMenus: MegaMenu[];
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
  colors: Array<string>;
  sizes: Array<string>;
  products: Array<Product>;
}

type Role = 'ADMIN';
export interface Manager {
  uuid: string;
  firstName: string;
  lastName: string;
  username: string;
  role: Role;
}

export interface ManagerState {
  isAuthenticated: boolean;
  loading: boolean;
  manager: Manager | null;
}
