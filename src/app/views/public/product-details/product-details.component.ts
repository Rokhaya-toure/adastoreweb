import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { ProductService } from '../../../core/services/product.service';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';

import { Product } from '../../../core/models/product';
import { ProductGalleryComponent } from '../../../shared/product-gallery/product-gallery.component';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, ProductCardComponent, ProductGalleryComponent],
  templateUrl: './product-details.component.html',
})
export class ProductDetailsComponent {
  private ps = inject(ProductService);
  private cart = inject(CartService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id = toSignal(this.route.paramMap.pipe(map(m => Number(m.get('id')))), { initialValue: 0 });
  product = computed(() => this.ps.getById(this.id()));
  similar = computed(() => (this.product() ? this.ps.similar(this.product()!) : []));

  qty = signal(1);

  discount = computed(() => {
    const p = this.product();
    return p?.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  });

  add() {
    this.cart.add(this.product()!, this.qty());
  }

  buyNow() {
    this.add();
    this.router.navigate(['/commande']);
  }

  addSimilar(p: Product) {
    this.cart.add(p);
  }
}