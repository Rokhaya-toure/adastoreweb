import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES, PRODUCTS } from '../../../core/data/mock-data';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { Product } from '../../../core/models/product';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private cart = inject(CartService);

  categories = CATEGORIES;
  news = PRODUCTS.filter(p => p.isNew).slice(0, 4);
  promos = PRODUCTS.filter(p => p.oldPrice).slice(0, 4);
  popular = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 4);

  // 4 produits pour le hero : photo si disponible, sinon emoji
  heroItems = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 4);

  // Remise maximale réelle, calculée à partir des produits en promo
  maxDiscount = Math.round(
    Math.max(
      0,
      ...PRODUCTS.filter(p => p.oldPrice).map(p => ((p.oldPrice! - p.price) / p.oldPrice!) * 100),
    ),
  );

  // Liens de la section créateurs (les slugs doivent exister dans CATEGORIES)
  creatorLinks = [
    { label: '💍 Ring light', cat: 'ring-lights' },
    { label: '🎙️ Micro', cat: 'micros' },
    { label: '📸 Trépied', cat: 'trepieds' },
  ];

  reassurance = [
    { title: 'Livraison soignée', text: 'Nous préparons soigneusement vos commandes pour vous garantir une livraison fiable.' },
    { title: 'Commande via WhatsApp', text: 'Passez commande en quelques clics et finalisez directement avec notre équipe.' },
    { title: 'Assistance client', text: 'Notre équipe est disponible pour vous accompagner.' },
    { title: 'Produits sélectionnés', text: 'Nous sélectionnons des produits utiles et adaptés à vos besoins.' },
  ];

  addToCart(p: Product) {
    this.cart.add(p);
  }
}