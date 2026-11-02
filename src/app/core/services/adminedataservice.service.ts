import { Injectable, computed, signal } from '@angular/core';
import { Order, Product } from '../models/order';

const ago = (days: number, hours = 0) =>
  new Date(Date.now() - (days * 24 + hours) * 3_600_000).toISOString();

/**
 * Données fictives pour construire l'interface.
 * Pour brancher Spring Boot : injecte HttpClient et remplace les signals
 * par des appels GET /api/admin/orders et /api/admin/products.
 */
@Injectable({ providedIn: 'root' })
export class AdminDataService {
  orders = signal<Order[]>([
    { id: 1048, ref: 'AD-1048', createdAt: ago(0, 1), customer: 'Awa Diop', phone: '771234567', city: 'Dakar', items: 2, total: 37000, method: 'wave', paymentStatus: 'to_verify', paymentRef: 'T-8Q2K91', status: 'pending', source: 'whatsapp' },
    { id: 1047, ref: 'AD-1047', createdAt: ago(0, 3), customer: 'Moussa Ndiaye', phone: '780987654', city: 'Pikine', items: 1, total: 85000, method: 'orange-money', paymentStatus: 'to_verify', paymentRef: 'OM-55F20A', status: 'pending', source: 'site' },
    { id: 1046, ref: 'AD-1046', createdAt: ago(0, 5), customer: 'Fatou Sarr', phone: '765554433', city: 'Dakar', items: 3, total: 41000, method: 'cod', paymentStatus: 'pending', status: 'pending', source: 'whatsapp' },
    { id: 1045, ref: 'AD-1045', createdAt: ago(1, 2), customer: 'Cheikh Fall', phone: '701112233', city: 'Thiès', items: 1, total: 18000, method: 'wave', paymentStatus: 'received', paymentRef: 'W-77PL3D', status: 'confirmed', source: 'whatsapp' },
    { id: 1044, ref: 'AD-1044', createdAt: ago(1, 6), customer: 'Aïssatou Ba', phone: '774445566', city: 'Dakar', items: 2, total: 26000, method: 'orange-money', paymentStatus: 'to_verify', paymentRef: 'OM-91XC4B', status: 'pending', source: 'whatsapp' },
    { id: 1043, ref: 'AD-1043', createdAt: ago(2, 1), customer: 'Ibrahima Sy', phone: '782223344', city: 'Rufisque', items: 1, total: 15000, method: 'wave', paymentStatus: 'received', status: 'preparing', source: 'site' },
    { id: 1042, ref: 'AD-1042', createdAt: ago(2, 8), customer: 'Mariama Diallo', phone: '763334455', city: 'Dakar', items: 4, total: 62000, method: 'cod', paymentStatus: 'pending', status: 'shipped', source: 'whatsapp' },
    { id: 1041, ref: 'AD-1041', createdAt: ago(3, 2), customer: 'Ousmane Gueye', phone: '776667788', city: 'Guédiawaye', items: 1, total: 9500, method: 'wave', paymentStatus: 'received', status: 'delivered', source: 'site' },
    { id: 1040, ref: 'AD-1040', createdAt: ago(3, 9), customer: 'Khady Mbaye', phone: '705556677', city: 'Dakar', items: 2, total: 33000, method: 'orange-money', paymentStatus: 'received', status: 'delivered', source: 'whatsapp' },
    { id: 1039, ref: 'AD-1039', createdAt: ago(4, 4), customer: 'Pape Thiam', phone: '778889900', city: 'Mbour', items: 1, total: 85000, method: 'wave', paymentStatus: 'failed', status: 'cancelled', source: 'whatsapp' },
    { id: 1038, ref: 'AD-1038', createdAt: ago(4, 7), customer: 'Ndeye Faye', phone: '761112244', city: 'Dakar', items: 3, total: 30500, method: 'cod', paymentStatus: 'received', status: 'delivered', source: 'site' },
    { id: 1037, ref: 'AD-1037', createdAt: ago(5, 3), customer: 'Samba Cissé', phone: '772223355', city: 'Dakar', items: 1, total: 12000, method: 'orange-money', paymentStatus: 'received', status: 'delivered', source: 'whatsapp' },
    { id: 1036, ref: 'AD-1036', createdAt: ago(6, 1), customer: 'Rokhaya Seck', phone: '783334466', city: 'Dakar', items: 2, total: 23000, method: 'wave', paymentStatus: 'received', status: 'delivered', source: 'whatsapp' },
    { id: 1035, ref: 'AD-1035', createdAt: ago(8, 5), customer: 'Alioune Badji', phone: '704445577', city: 'Dakar', items: 1, total: 18000, method: 'wave', paymentStatus: 'received', status: 'delivered', source: 'site' },
  ]);

  products = signal<Product[]>([
    { id: 1, name: 'Ring light 18" LED', category: 'Ring lights', stock: 12, price: 25000 },
    { id: 2, name: 'Ring light 12" mini', category: 'Ring lights', stock: 4, price: 15000 },
    { id: 3, name: 'Micro cravate sans fil', category: 'Micros', stock: 3, price: 12000 },
    { id: 4, name: 'Micro USB studio', category: 'Micros', stock: 0, price: 18000 },
    { id: 5, name: 'Trépied 2 m', category: 'Trépieds', stock: 9, price: 8000 },
    { id: 6, name: 'Trépied de table flexible', category: 'Trépieds', stock: 2, price: 6500 },
    { id: 7, name: 'Projecteur LED portable', category: 'Projecteurs', stock: 5, price: 85000 },
    { id: 8, name: 'Mini projecteur HD', category: 'Projecteurs', stock: 0, price: 95000 },
    { id: 9, name: 'Ventilateur rechargeable', category: 'Ventilateurs', stock: 14, price: 15000 },
    { id: 10, name: 'Panneau LED vidéo', category: 'Éclairage', stock: 1, price: 32000 },
  ]);

  // Paiements les plus anciens d'abord : ce sont ceux qui attendent depuis le plus longtemps
  paymentsToVerify = computed(() =>
    this.orders()
      .filter(o => o.paymentStatus === 'to_verify')
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)));

  pendingOrdersCount = computed(() => this.orders().filter(o => o.status === 'pending').length);

  confirmPayment(id: number) {
    this.orders.update(list => list.map(o => o.id === id
      ? { ...o, paymentStatus: 'received', status: o.status === 'pending' ? 'confirmed' : o.status }
      : o));
  }

  markPaymentFailed(id: number) {
    this.orders.update(list => list.map(o => o.id === id ? { ...o, paymentStatus: 'failed' } : o));
  }
}