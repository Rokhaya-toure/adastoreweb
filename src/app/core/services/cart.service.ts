import { Injectable, computed, effect, signal } from '@angular/core';
import { CartItem, Customer, Product } from '../models/product';

const KEY = 'adaastor-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>(this.load());

  readonly count = computed(() => this.items().reduce((n, i) => n + i.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((s, i) => s + i.product.price * i.quantity, 0));
  readonly shipping = computed(() => (this.subtotal() === 0 || this.subtotal() >= 100000 ? 0 : 2000));
  readonly total = computed(() => this.subtotal() + this.shipping());

  constructor() {
    effect(() => localStorage.setItem(KEY, JSON.stringify(this.items())));
  }

  add(product: Product, quantity = 1) {
    this.items.update(list =>
      list.some(i => i.product.id === product.id)
        ? list.map(i => (i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i))
        : [...list, { product, quantity }]
    );
  }

  setQuantity(id: number, quantity: number) {
    this.items.update(list =>
      list.map(i => (i.product.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(i => i.product.id !== id));
  }

  clear() {
    this.items.set([]);
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? '[]');
    } catch {
      return [];
    }
  }

 

// dans la classe, à côté de `items` :
readonly customer = signal<Customer | null>(null);
}