export interface CartItem {
  id: number;
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
  menus: MenuData[];
}

export interface MegaMenuItem {
  id: number;
  name: string;
  url: string;
}

export interface MegaMenuData {
  id: number;
  name: string;
  megaMenuItems: MegaMenuItem[];
}

export interface MenuData {
  id: number;
  name: string;
  megaMenus: MegaMenuData[];
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
