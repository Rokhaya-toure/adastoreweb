import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminDataService } from '../../../core/services/adminedataservice.service';

type BadgeKey = 'orders' | 'payments';
interface NavLink { path: string; label: string; badge?: BadgeKey }

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
})
export class AdminLayoutComponent {
  private data = inject(AdminDataService);
  menuOpen = signal(false);

  groups: { title: string; links: NavLink[] }[] = [
    { title: 'Principal', links: [
      { path: 'dashboard', label: 'Tableau de bord' },
      { path: 'commandes', label: 'Commandes', badge: 'orders' },
      { path: 'paiements', label: 'Paiements', badge: 'payments' },
    ]},
    { title: 'Catalogue', links: [
      { path: 'produits', label: 'Produits' },
      { path: 'categories', label: 'Catégories' },
      { path: 'stocks', label: 'Stocks' },
      { path: 'promotions', label: 'Promotions' },
    ]},
    { title: 'Ventes et clients', links: [
      { path: 'clients', label: 'Clients' },
      { path: 'livraisons', label: 'Livraisons' },
      { path: 'avis', label: 'Avis clients' },
    ]},
    { title: 'Configuration', links: [
      { path: 'contenu', label: 'Contenu du site' },
      { path: 'parametres', label: 'Paramètres' },
      { path: 'utilisateurs', label: 'Utilisateurs et sécurité' },
    ]},
  ];

  count(key: BadgeKey) {
    return key === 'orders' ? this.data.pendingOrdersCount() : this.data.paymentsToVerify().length;
  }
}