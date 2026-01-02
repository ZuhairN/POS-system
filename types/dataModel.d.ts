interface Option {
  content: string;
  value: string;
  btnRef?: React.RefObject<HTMLButtonElement>;
}

export type AvailabilityStatus = 'In Stock' | 'Out of Stock';
export type CartStatus = 'open' | 'pending' | 'paid' | 'completed' | 'abandoned' | 'cancelled';

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode?: string;
  qrCode?: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  stock: number;
  tags: string[];
  sku?: string;
  availabilityStatus?: AvailabilityStatus;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: Meta;
  thumbnail?: string;
}

export interface CartItem {
  id: string;
  productId: number | string;
  sku?: string;
  title: string;
  unitPrice: number;
  quantity: number;
  metadata?: Record<string, unknown>;
}

export interface PaymentInfo {
  method?: string;
  provider?: string;
  last4?: string;
  paidAt?: Date | string;
  transactionId?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  discount?: number;
  taxTotal?: number;
  discountTotal?: number;
  subtotal?: number;
  total?: number;
  note?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  status?: CartStatus;
  payment?: PaymentInfo;
  metadata?: Record<string, unknown>;
}
