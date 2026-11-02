import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './shop.component.html',
})
export class ShopComponent {
  ps = inject(ProductService);
  private cart = inject(CartService);
  private route = inject(ActivatedRoute);

  private params = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  q = computed(() => (this.params().get('q') ?? '').toLowerCase());
  cat = computed(() => this.params().get('cat') ?? '');

  maxPrice = signal(100000);
  onlyStock = signal(false);
  onlyPromo = signal(false);
  onlyNew = signal(false);
  sort = signal('rel');

  constructor() {
    effect(() => this.onlyPromo.set(this.params().get('promo') === '1'));
  }

  list = computed(() => {
    const l = this.ps.products.filter(p =>
      (!this.cat() || p.category === this.cat()) &&
      p.name.toLowerCase().includes(this.q()) &&
      p.price <= this.maxPrice() &&
      (!this.onlyStock() || p.inStock !== false) &&
      (!this.onlyPromo() || !!p.oldPrice) &&
      (!this.onlyNew() || !!p.isNew)
    );
    switch (this.sort()) {
      case 'asc': return [...l].sort((a, b) => a.price - b.price);
      case 'desc': return [...l].sort((a, b) => b.price - a.price);
      case 'new': return [...l].sort((a, b) => +!!b.isNew - +!!a.isNew);
      case 'best': return [...l].sort((a, b) => b.sales - a.sales);
      default: return l;
    }
  });

  add(p: Product) {
    this.cart.add(p);
  }
}