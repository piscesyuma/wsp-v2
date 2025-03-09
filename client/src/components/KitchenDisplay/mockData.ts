import { OrderStatuses } from '@/constants/orderStatuses';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  status: string;
  instructions?: string;
  modifiers?: string[];
}

export interface Order {
  id: number;
  orderNumber: number;
  orderType: string;
  tableName?: string;
  time: string;
  status: string;
  items: OrderItem[];
  editedTime?: string;
  paymentStatus?: string;
  collectingBill?: boolean;
  collectingBillTime?: string;
}

export const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: 203,
    orderType: 'Table',
    tableName: 'B201',
    time: '2024-03-04 13:50:45',
    status: OrderStatuses.ORDERED,
    items: [
      { id: 1, name: 'French Fries', quantity: 3, status: OrderStatuses.ORDERED, modifiers: ['Salt: No'] },
      { id: 2, name: 'Fried Chicken Sandwich', quantity: 1, status: OrderStatuses.ORDERED, modifiers: ['No Ketchup'] },
      { id: 3, name: 'Soda', quantity: 4, status: OrderStatuses.ORDERED },
      { id: 4, name: 'Housed Salad', quantity: 1, status: OrderStatuses.ORDERED, modifiers: ['No Pickles'] },
      { id: 5, name: 'Sandwich', quantity: 2, status: OrderStatuses.ORDERED, modifiers: ['Chicken', 'Veg', 'Please don\'t add ketchup'] },
      { id: 6, name: 'Texas Meatlover', quantity: 2, status: OrderStatuses.ORDERED, modifiers: ['Rare'] },
      { id: 7, name: 'Mushroom Burger', quantity: 1, status: OrderStatuses.ORDERED, modifiers: ['Salt: A little', 'Cheese: A lot'] },
    ],
  },
  {
    id: 2,
    orderNumber: 202,
    orderType: 'Table',
    tableName: 'A101',
    time: '2024-03-04 14:06:45',
    status: OrderStatuses.ACCEPTED,
    editedTime: '1 min ago',
    items: [
      { id: 1, name: 'Fillet Stack + Mushroom cream Sauce', quantity: 1, status: OrderStatuses.ACCEPTED, modifiers: ['Onion: A lot'] },
      { id: 2, name: 'Bacon & Egg', quantity: 1, status: OrderStatuses.ACCEPTED, modifiers: ['Salt: No'] },
      { id: 3, name: 'Fresh Juice', quantity: 2, status: OrderStatuses.READY },
    ],
    paymentStatus: 'Paid',
  },
  {
    id: 3,
    orderNumber: 207,
    orderType: 'Delivery',
    time: '2024-03-04 14:06:45',
    status: OrderStatuses.READY,
    items: [
      { id: 1, name: 'Spaghetti Sisco', quantity: 1, status: OrderStatuses.ACCEPTED, modifiers: ['Salt: No'] },
      { id: 2, name: 'Grilled Italian Chicken', quantity: 2, status: OrderStatuses.READY },
    ],
  },
  {
    id: 4,
    orderNumber: 204,
    orderType: 'Delivery',
    time: '2024-03-04 13:48:45',
    status: OrderStatuses.SERVED,
    items: [
      { id: 1, name: 'Sweet Potato Fries', quantity: 1, status: OrderStatuses.READY },
      { id: 2, name: 'Blackberry Pie', quantity: 2, status: OrderStatuses.READY },
    ],
  },
  {
    id: 5,
    orderNumber: 303,
    orderType: 'Table',
    tableName: 'A106',
    time: '2024-03-04 13:18:45',
    status: OrderStatuses.ACCEPTED,
    items: [
      { id: 1, name: 'Fried Chicken Sandwich', quantity: 1, status: OrderStatuses.ACCEPTED, modifiers: ['No Ketchup'] },
      { id: 2, name: 'Mushroom Burger', quantity: 1, status: OrderStatuses.ORDERED, modifiers: ['Salt: A little', 'Cheese: A lot'] },
    ],
  },
  {
    id: 6,
    orderNumber: 203,
    orderType: 'Table',
    tableName: 'A107',
    time: '2024-03-04 13:01:45',
    status: OrderStatuses.ACCEPTED,
    items: [
      { id: 1, name: 'French Fries', quantity: 3, status: OrderStatuses.ORDERED, modifiers: ['Salt: No'] },
      { id: 2, name: 'Fried Chicken Sandwich', quantity: 1, status: OrderStatuses.ACCEPTED, modifiers: ['No Ketchup'] },
      { id: 3, name: 'Soda', quantity: 4, status: OrderStatuses.ORDERED },
      { id: 4, name: 'Housed Salad', quantity: 1, status: OrderStatuses.ORDERED, modifiers: ['No Pickles'] },
      { id: 5, name: 'Veggie Burger', quantity: 2, status: OrderStatuses.ORDERED, modifiers: ['Dressing on the side as a birthday surprise'] },
    ],
  },
  {
    id: 7,
    orderNumber: 206,
    orderType: 'Pickup',
    time: '2024-03-04 13:28:45',
    status: OrderStatuses.READY,
    items: [
      { id: 1, name: 'Sweet Potato Fries', quantity: 1, status: OrderStatuses.ACCEPTED },
      { id: 2, name: 'Blackberry Pie', quantity: 2, status: OrderStatuses.ACCEPTED },
      { id: 3, name: 'Beer', quantity: 2, status: OrderStatuses.READY },
    ],
  },
  {
    id: 8,
    orderNumber: 205,
    orderType: 'Table',
    tableName: 'A104',
    time: '2024-03-04 13:21:45',
    status: OrderStatuses.ORDERED,
    collectingBill: true,
    collectingBillTime: '19:59',
    items: [
      { id: 1, name: 'Grilled Chicken', quantity: 1, status: OrderStatuses.SERVED },
    ],
  },
  {
    id: 9,
    orderNumber: 205,
    orderType: 'Table',
    tableName: 'A105',
    time: '2024-03-04 13:26:45',
    status: OrderStatuses.ORDERED,
    collectingBill: true,
    collectingBillTime: '19:59',
    items: [
      { id: 1, name: 'Grilled Chicken', quantity: 1, status: OrderStatuses.SERVED },
    ],
  },
]; 