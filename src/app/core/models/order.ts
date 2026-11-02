export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'wave' | 'orange-money' | 'cod';
export type PaymentStatus = 'pending' | 'to_verify' | 'received' | 'failed';
export type OrderSource = 'site' | 'whatsapp';

export interface Order {
  id: number;
  ref: string;
  createdAt: string;
  customer: string;
  phone: string;
  city: string;
  items: number;
  total: number;
  method: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentRef?: string; // référence de transaction indiquée par le client
  status: OrderStatus;
  source: OrderSource;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  preparing: 'En préparation',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
};

export const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-sky-100 text-sky-800',
  preparing: 'bg-indigo-100 text-indigo-800',
  shipped: 'bg-violet-100 text-violet-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-slate-200 text-slate-600',
};

export const METHOD_LABELS: Record<PaymentMethod, string> = {
  wave: 'Wave',
  'orange-money': 'Orange Money',
  cod: 'À la livraison',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'À encaisser',
  to_verify: 'À vérifier',
  received: 'Reçu',
  failed: 'Échoué',
};

export const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: 'bg-slate-100 text-slate-600',
  to_verify: 'bg-amber-100 text-amber-800',
  received: 'bg-emerald-100 text-emerald-800',
  failed: 'bg-red-100 text-red-700',
};

export const fcfa = (n: number) => n.toLocaleString('fr-FR') + ' FCFA';