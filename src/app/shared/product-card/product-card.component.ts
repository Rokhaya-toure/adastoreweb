import { Component, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/models/product';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();
  liked = signal(false);

  fcfa(n: number) {
    return n.toLocaleString('fr-FR') + ' FCFA';
  }

  discount() {
    const p = this.product();
    return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  }
}