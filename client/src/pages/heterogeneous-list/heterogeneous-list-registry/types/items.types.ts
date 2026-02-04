export interface ProductItem {
  id: number;
  kindComponent: 'product';
  name: string;
  price: number;
  category: string;
}

export interface UserItem {
  id: number;
  kindComponent: 'user';
  name: string;
  email: string;
  role: string;
}

export interface NotificationItem {
  id: number;
  kindComponent: 'notification';
  title: string;
  message: string;
  time: string;
}

export interface TaskItem {
  id: number;
  kindComponent: 'task';
  title: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface EventItem {
  id: number;
  kindComponent: 'event';
  name: string;
  date: string;
  location: string;
}

export interface MessageItem {
  id: number;
  kindComponent: 'message';
  sender: string;
  content: string;
  unread: boolean;
}

export type RegistryItemType = 
  | ProductItem 
  | UserItem 
  | NotificationItem 
  | TaskItem 
  | EventItem 
  | MessageItem;
