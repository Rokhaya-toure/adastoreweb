import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  cart = inject(CartService);
}