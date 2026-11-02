import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private router = inject (Router);
  private cart = inject(CartService);
  menuOpen = signal(false);
  cartCount = this.cart.count;
  // constructor(private router: Router) {}

  search(q: string) {
    this.router.navigate(['/boutique'], { queryParams: { q: q.trim() } });
    this.menuOpen.set(false);
  }

}
